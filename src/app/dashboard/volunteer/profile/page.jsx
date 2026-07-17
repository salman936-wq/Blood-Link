import ProfileCard from "@/components/dashboard/ProfileCard";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { districts } from "@/lib/data";
import { User, Mail, Phone } from "lucide-react";

export default function VolunteerProfilePage() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <ProfileCard name="Farzana Yasmin" bloodGroup="A+" district="Khulna" email="farzana@example.com" avatar="https://i.pravatar.cc/150?img=32" donations={9} />
      </div>

      <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 sm:p-8">
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">Edit profile</h3>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input label="Full name" icon={User} defaultValue="Farzana Yasmin" />
            <Input label="Email address" icon={Mail} defaultValue="farzana@example.com" type="email" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input label="Phone number" icon={Phone} defaultValue="+880 1XXXXXXXXX" />
            <Select label="Coverage district" options={districts} placeholder="Select district" defaultValue="Khulna" />
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
