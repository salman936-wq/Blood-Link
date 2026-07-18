"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Droplet,
  Building2,
  MapPin,
  CalendarDays,
  Clock,
  MessageSquare,
  Heart,
  X,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Check,
  Copy,
  Trash,
} from "lucide-react";
import { acceptedRequestForBlod, deleteDonetionRequestForBlod } from "@/lib/api/action/requestblod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



const statusStyles = {
  Pending: { label: "Pending", className: "badge-warning" },
  Inprogress: { label: "Inprogress", className: "badge-info" },
  Completed: { label: "Completed", className: "badge-success" },
  Cancelled: { label: "Cancelled", className: "badge-error" },
};

const urgencyStyles = {
  high: "badge-error",
  medium: "badge-warning",
  low: "badge-success",
};

// --- Mapper: raw DB document -> shape the UI renders -----------------------
function mapDataToRequest(data) {

  const [rawDate, rawTime] = (data.requiredDateTime || "").split("T");



  const urgencyLabelRaw = (data.urgency || "").trim(); // e.g. "Medium 🟡"
  const urgencyKey = urgencyLabelRaw
    .toLowerCase()
    .replace(/[^a-z]/g, ""); // "medium"

  return {
    id: data._id,
    donorId: data.donorId,
    recipientName: data.patientName,
    recipientType: "Recipient • Patient",
    bloodGroup: data.bloodGroup,
    hospitalName: data.hospitalName,
    hospitalArea: [data.district, data.division].filter(Boolean).join(", "),
    fullAddress: [data.hospitalName, data.district, data.division]
      .filter(Boolean)
      .join(", "),
    requiredDate: rawDate || "",
    requiredTime: rawTime || "",
    message: data.notes || "",
    status: (data.status || "Pending"),
    unitsNeeded: data.unitsNeeded,
    urgencyLabel: urgencyLabelRaw,
    urgencyKey,
  };
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeStr) {
  if (!timeStr) return "—";
  const [h, m] = timeStr.split(":").map(Number);
  if (Number.isNaN(h)) return timeStr;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export default function BloodRequestClient({ data, id, name }) {
  const router = useRouter();
  const dialogRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const request = mapDataToRequest(data);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.donatedByPhone);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDeleteData = async (id) => {
    const res = await deleteDonetionRequestForBlod(id);

    if (res.success) {
      toast.success("Successfully deleted donetion request")
      router.push("/dashboard/donor/my-donation-requests")
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: name,
      phone: "",
      bloodGroup: request.bloodGroup,
      note: "",
    },
  });

  const openModal = () => {
    setSubmitted(false);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    router.refresh();
  };

  const onSubmit = async (formData) => {
    // Wire this up to your API route / server action.
    await new Promise((r) => setTimeout(r, 700));
    const status = "Inprogress";
    const donetionDetails = { donatedBy: id, donatedByPhone: formData.phone, status };
    const result = await acceptedRequestForBlod(data._id, donetionDetails)



    setSubmitted(true);
    reset({ ...formData });
  };



  const status = statusStyles[request.status] || statusStyles.Pending;
  const urgencyClass =
    urgencyStyles[request.urgencyKey] || "badge-ghost";



  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-10">
      {/* Heading */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-base-content">
          Request <span className="text-primary">Details</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-base-content/50">
          View urgency, location, and requirements.
        </p>
      </div>

      {/* Card */}
      <div className="relative bg-base-100 rounded-[2rem] shadow-xl shadow-base-300/40 border border-base-200 p-5 sm:p-8">
        {/* Status + urgency badges */}
        <div className="absolute -top-3 right-4 sm:right-6 flex gap-2">
          {request.urgencyLabel && (
            <span
              className={`badge ${urgencyClass} gap-1 px-3 py-3 font-semibold text-xs tracking-wide shadow-sm`}
            >
              <AlertTriangle className="w-3 h-3" />
              {request.urgencyLabel}
            </span>
          )}
          <span
            className={`badge ${status.className} gap-1 px-3 py-3 font-semibold text-xs tracking-wide shadow-sm`}
          >
            <Clock className="w-3 h-3" />
            {status.label.toUpperCase()}
          </span>
        </div>

        {/* Top row: recipient + blood group */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-bold text-lg text-base-content leading-tight">
                {request.recipientName}
              </p>
              <p className="text-xs font-semibold tracking-wide text-base-content/40 uppercase">
                {request.recipientType}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-primary/5 rounded-2xl p-3 sm:p-3.5 sm:min-w-[180px]">
            <div className="w-11 h-11 rounded-xl bg-primary text-primary-content flex items-center justify-center font-extrabold text-base shrink-0">
              {request.bloodGroup}
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wide text-primary/70 uppercase">
                Required &middot; {request.unitsNeeded}{" "}
                {Number(request.unitsNeeded) === 1 ? "unit" : "units"}
              </p>
              <p className="font-bold text-base-content text-sm">
                Blood Group
              </p>
            </div>
          </div>
        </div>

        <div className="divider my-5 sm:my-6" />

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Location details */}
          <div>
            <p className="text-[11px] font-bold tracking-widest text-base-content/35 uppercase mb-4">
              Location Details
            </p>

            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-base-content/40 uppercase">
                  Hospital
                </p>
                <p className="font-bold text-sm text-base-content">
                  {request.hospitalName}
                </p>
                <p className="text-xs text-base-content/50">
                  {request.hospitalArea}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-error/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-error" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-base-content/40 uppercase">
                  Full Address
                </p>
                <p className="font-bold text-sm text-base-content">
                  {request.fullAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Timing & urgency */}
          <div>
            <p className="text-[11px] font-bold tracking-widest text-base-content/35 uppercase mb-4">
              Timing &amp; Urgency
            </p>

            <div className="flex gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-base-content/40 uppercase">
                    Required Date
                  </p>
                  <p className="font-bold text-sm text-base-content">
                    {formatDate(request.requiredDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-base-200 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-base-content/60" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-base-content/40 uppercase">
                    Time
                  </p>
                  <p className="font-bold text-sm text-base-content">
                    {formatTime(request.requiredTime)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-xl p-3">
              <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-warning-content/70 uppercase mb-1">
                <MessageSquare className="w-3 h-3" />
                Request Message
              </p>
              <p className="text-sm italic text-base-content/70">
                &ldquo;{request.message || "No additional notes"}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}

        {data.donatedByPhone ? <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
          <a
            href={`tel:${data.donatedByPhone}`}
            className="btn btn-primary flex-1 rounded-full"
          >
            <Phone size={18} />
            Call Now Donor - {data.donatedByPhone}
          </a>

          <button
            onClick={handleCopy}
            className="btn btn-outline btn-primary rounded-full"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied" : "Copy Number"}
          </button>
        </div> : <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">

          {data.status == "Canceled" ? <button onClick={() => handleDeleteData(data._id)} className="btn btn-error"><Trash /> Delete the requist</button> : <button
            onClick={openModal}
            className={`btn rounded-full px-8 gap-2 w-full sm:w-auto shadow-lg ${status.label === "Pending"
              ? "btn-primary shadow-primary/30 cursor-pointer"
              : "btn-disabled cursor-not-allowed"
              }`}
          >
            <Heart className="w-4 h-4 fill-current" />
            Donate Now
          </button>}


        </div>}



      </div>

      {/* Donate modal with react-hook-form */}
      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-t-3xl sm:rounded-2xl">
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
              <h3 className="font-bold text-lg">Thank you!</h3>
              <p className="text-sm text-base-content/60 mt-1">
                Your donation confirmation has been sent to{" "}
                {request.recipientName}&apos;s request.
              </p>
              <button
                onClick={closeModal}
                className="btn btn-primary rounded-full mt-5 px-8"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-1">Confirm your donation</h3>
              <p className="text-sm text-base-content/50 mb-5">
                For {request.recipientName} &middot; {request.bloodGroup} needed
                at {request.hospitalName}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-xs font-semibold">
                      Your name
                    </span>
                  </label>
                  <label className="input input-bordered rounded-xl flex items-center gap-2 w-full">
                    <User className="w-4 h-4 opacity-40" />
                    <input
                      type="text"
                      placeholder="Full name"
                      className="grow"
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name is too short" },
                      })}
                    />
                  </label>
                  {errors.name && (
                    <span className="text-error text-xs mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-xs font-semibold">
                      Phone number
                    </span>
                  </label>
                  <label className="input input-bordered rounded-xl flex items-center gap-2 w-full">
                    <Phone className="w-4 h-4 opacity-40" />
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className="grow"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^01[0-9]{9}$/,
                          message: "Enter a valid BD phone number",
                        },
                      })}
                    />
                  </label>
                  {errors.phone && (
                    <span className="text-error text-xs mt-1">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-xs font-semibold">
                      Blood group
                    </span>
                  </label>
                  <label className="input input-bordered rounded-xl flex items-center gap-2 w-full">
                    <Droplet className="w-4 h-4 opacity-40" />
                    <input
                      type="text"
                      className="grow"
                      readOnly
                      {...register("bloodGroup")}
                    />
                  </label>
                </div>

                <div className="form-control">
                  <textarea
                    className="w-full textarea textarea-bordered rounded-xl"
                    rows={3}
                    placeholder="Anything you'd like to add (optional)..."
                    {...register("note")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary rounded-full w-full gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <Heart className="w-4 h-4 fill-current" />
                  )}
                  Confirm Donation
                </button>
              </form>
            </>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>






    </div>


  );
}