"use client";

import { useState } from "react";
import ProfileCard from "@/components/dashboard/ProfileCard";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { bloodGroups, divisions, districts } from "@/lib/data";
import { User, Mail, Phone } from "lucide-react";

export default function DonorProfilePage() {
  const [division, setDivision] = useState("Dhaka");
  const [district, setDistrict] = useState("Dhaka");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // API Call

    setIsEditing(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <ProfileCard
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
        />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-100/60 sm:p-8 lg:col-span-2">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">
          Profile Information
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Full name"
              icon={User}
              defaultValue="Tanvir Ahmed"
              disabled={!isEditing}
            />

            <Input
              label="Email address"
              icon={Mail}
              defaultValue="tanvir@example.com"
              type="email"
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Phone number"
              icon={Phone}
              defaultValue="+880 1XXXXXXXXX"
              disabled={!isEditing}
            />

            <Select
              label="Blood group"
              options={bloodGroups}
              placeholder="Select blood group"
              defaultValue="O+"
              disabled={!isEditing}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Division"
              options={divisions}
              defaultValue={division}
              disabled={!isEditing}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
              }}
            />

            <Select
              label="District"
              options={division ? districts[division] : []}
              defaultValue={district}
              disabled={!isEditing || !division}
              placeholder="Select district"
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>

              <Button type="submit">
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}