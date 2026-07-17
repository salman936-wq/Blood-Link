"use client";

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
  const [district, setDistrict] = useState("");

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

      <form className="space-y-6">
        {/* Patient */}
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Patient Name"
            icon={User}
            placeholder="e.g. Rafiul Islam"
          />

          <Select
            label="Blood Group Needed"
            icon={Droplet}
            options={bloodGroups}
            placeholder="Select Blood Group"
          />
        </div>

        {/* Hospital */}
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Hospital Name"
            icon={Hospital}
            placeholder="e.g. Dhaka Medical College Hospital"
          />

          <Input
            label="Units Needed"
            type="number"
            min="1"
            placeholder="e.g. 2"
          />
        </div>

        {/* Location */}
        <div className="grid gap-5 md:grid-cols-2">
          <Select
            label="Division"
            icon={MapPin}
            options={divisions}
            defaultValue={division}
            onChange={(e) => {
              setDivision(e.target.value);
              setDistrict("");
            }}
            placeholder="Select Division"
          />

          <Select
            label="District"
            icon={MapPin}
            options={division ? districts[division] : []}
            defaultValue={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!division}
            placeholder="Select District"
          />
        </div>

        {/* Date & Urgency */}
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Required Date"
            icon={Calendar}
            type="date"
          />

          <Select
            label="Urgency"
            options={[
              "Critical 🔴",
              "High 🟠",
              "Standard 🟢",
            ]}
            placeholder="Select Urgency"
          />
        </div>

        {/* Notes */}
        <Textarea
          label="Additional Notes"
          placeholder="Ward number, contact person, operation time, or any other important information..."
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