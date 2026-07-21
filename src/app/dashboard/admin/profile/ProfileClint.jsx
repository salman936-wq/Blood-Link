"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import ProfileCard from "@/components/dashboard/ProfileCard";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { bloodGroups, divisions, districts } from "@/lib/data";
import { User, Mail, Phone } from "lucide-react";
import { profileUpdateChange } from "@/lib/api/action/requestblod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProfileClint({image, id, name, email, district, phone, bloodGroup, division:vivag}) {
    
const router = useRouter()

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      fullName: name,
      email: email,
      phone: phone,
      bloodGroup: bloodGroup,
      division: vivag,
      district: district,
    },
  });

  const division = watch("division");

  const onSubmit = async (data) => {
    const res = await profileUpdateChange(id, data)
    if(res.matchedCount > 0) {
        toast.success(`${name} your profile update succesfully`)
        router.refresh();
        setIsEditing(false)
    }
    
    
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <ProfileCard isEditing={isEditing} onEdit={() => setIsEditing(true)} image={image} name={name} email={email} district={district} bloodGroup={bloodGroup} phone={phone}/>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-100/60 sm:p-8 lg:col-span-2">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">
          Profile Information
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Full name"
              icon={User}
              disabled={!isEditing}
              {...register("fullName")}
            />

            <Input
              label="Email address"
              icon={Mail}
              type="email"
              disabled={!isEditing}
              {...register("email")}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Phone number"
              icon={Phone}
              disabled={!isEditing}
              {...register("phone")}
            />

            <Select
              label="Blood group"
              options={bloodGroups}
              placeholder="Select blood group"
              disabled={!isEditing}
              {...register("bloodGroup")}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Division"
              options={divisions}
              disabled={!isEditing}
              {...register("division", {
                onChange: () => setValue("district", ""),
              })}
            />

            <Select
              label="District"
              options={division ? districts[division] : []}
              disabled={!isEditing || !division}
              placeholder="Select district"
              {...register("district")}
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

              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}