"use client";

import { useState } from "react";
import ProfileCard from "@/components/dashboard/ProfileCard";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { divisions, districts } from "@/lib/data";
import { User, Mail, Phone } from "lucide-react";

export default function VolunteerProfilePage() {
  const [division, setDivision] = useState("Khulna");
  const [district, setDistrict] = useState("Khulna");
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
          name="Farzana Yasmin"
          district={district}
          email="farzana@example.com"
          avatar="https://i.pravatar.cc/150?img=32"
          donations={9}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
        />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-100/60 sm:p-8 lg:col-span-2">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">
          Profile Information
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-3">
            <Input
              label="Full Name"
              icon={User}
              defaultValue="Farzana Yasmin"
              disabled={!isEditing}
            />

            <Input
              label="Email Address"
              icon={Mail}
              defaultValue="farzana@example.com"
              type="email"
              disabled={!isEditing}
            />

            <Input
              label="Phone Number"
              icon={Phone}
              defaultValue="+880 1XXXXXXXXX"
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
            placeholder="Select District"
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