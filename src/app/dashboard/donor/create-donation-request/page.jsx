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

export default function CreateDonationRequestPage() {
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Create Donation Request
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Fill in the patient's information so nearby matching donors can be
          notified immediately.
        </p>
      </div>

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
            step={600}
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
    </div>
  );
}