import ProfileCard from "@/components/dashboard/ProfileCard";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { bloodGroups, districts } from "@/lib/data";
import { User, Mail, Phone } from "lucide-react";

export default function DonorProfilePage() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <ProfileCard />
      </div>

      <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 sm:p-8">
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">Edit profile</h3>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input label="Full name" icon={User} defaultValue="Tanvir Ahmed" />
            <Input label="Email address" icon={Mail} defaultValue="tanvir@example.com" type="email" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input label="Phone number" icon={Phone} defaultValue="+880 1XXXXXXXXX" />
            <Select label="Blood group" options={bloodGroups} placeholder="Select blood group" defaultValue="O+" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Select label="District" options={districts} placeholder="Select district" defaultValue="Dhaka" />
            <Input label="Upazila" placeholder="e.g. Mirpur" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button">Cancel</Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
