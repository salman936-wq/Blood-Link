"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";

import { bloodGroups, divisions, districts } from "@/lib/data";

import {
    User,
    Hospital,
    Calendar,
    Droplet,
    MapPin,
} from "lucide-react";
import { requestForBlood } from "@/lib/api/action/requestblod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";





const DonationReqForm = ({ donorId }) => {

    const router = useRouter()
    const [division, setDivision] = useState("");

    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            patientName: "",
            requiredDateTime: "",
            hospitalName: "",
            unitsNeeded: "",
            division: "",
            district: "",
            bloodGroup: "",
            urgency: "",
            notes: "",
        },
    });

    const selectedDivision = watch("division");

    const onSubmit = async (data) => {
        if (!data.patientName) return toast.error("Patient name is required");
        if (!data.requiredDateTime) return toast.error("Required date & time is required");
        if (!data.hospitalName) return toast.error("Hospital name is required");
        if (!data.unitsNeeded) return toast.error("Units needed is required");
        if (!data.division) return toast.error("Division is required");
        if (!data.district) return toast.error("District is required");
        if (!data.bloodGroup) return toast.error("Blood group is required");
        if (!data.urgency) return toast.error("Urgency is required");
        const status = "Pending";
        const donatedBy = "";
        const donatedByPhone = "";
        const finalData = { ...data, status, donorId, donatedBy, donatedByPhone}

        const requestingBlood = await requestForBlood(finalData)


        if (requestingBlood.acknowledged) {
            toast.success("Donation Request Successfully Created");
            router.push('/dashboard/donor/my-donation-requests')
        }
        else {
toast.error('Feild requist')
        }

    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Patient */}
            <div className="grid gap-5 md:grid-cols-2">
                <Input
                    label="Patient Name"
                    icon={User}
                    placeholder="e.g. Rafiul Islam"
                    {...register("patientName")}
                />

                <Input
                    label="Required Date & Time"
                    icon={Calendar}
                    type="datetime-local"
                    {...register("requiredDateTime")}
                />
            </div>

            {/* Hospital */}
            <div className="grid gap-5 md:grid-cols-2">
                <Input
                    label="Hospital Name"
                    icon={Hospital}
                    placeholder="e.g. Dhaka Medical College Hospital"
                    {...register("hospitalName")}
                />

                <Input
                    label="Units Needed"
                    type="number"
                    min="1"
                    placeholder="e.g. 2"
                    {...register("unitsNeeded")}
                />
            </div>

            {/* Location */}
            <div className="grid gap-5 md:grid-cols-2">
                <Select
                    label="Division"
                    icon={MapPin}
                    options={divisions}
                    placeholder="Select Division"
                    defaultValue={selectedDivision}
                    {...register("division")}
                    onChange={(e) => {
                        setDivision(e.target.value);
                        setValue("division", e.target.value);
                        setValue("district", "");
                    }}
                />

                <Select
                    label="District"
                    icon={MapPin}
                    options={selectedDivision ? districts[selectedDivision] : []}
                    placeholder="Select District"
                    disabled={!selectedDivision}
                    {...register("district")}
                    onChange={(e) => setValue("district", e.target.value)}
                />
            </div>

            {/* Blood Group & Urgency */}
            <div className="grid gap-5 md:grid-cols-2">
                <Select
                    label="Blood Group Needed"
                    icon={Droplet}
                    options={bloodGroups}
                    placeholder="Select Blood Group"
                    {...register("bloodGroup")}
                />

                <Select
                    label="Urgency"
                    options={[
                        "Critical 🔴",
                        "High 🟠",
                        "Standard 🟢",
                    ]}
                    placeholder="Select Urgency"
                    {...register("urgency")}
                />
            </div>

            {/* Notes */}
            <Textarea
                label="Additional Notes"
                placeholder="Ward number, contact person, operation time, or any other important information..."
                {...register("notes")}
            />

            <div className="flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:justify-end">
                <Button variant="secondary" type="button">
                    Save as Draft
                </Button>

                <Button type="submit">
                    Submit Request
                </Button>
            </div>
        </form>
    );
};

export default DonationReqForm;