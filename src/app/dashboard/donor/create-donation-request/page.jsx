import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import { bloodGroups, districts } from "@/lib/data";
import { User, Hospital, Calendar, Droplet } from "lucide-react";

export default function CreateDonationRequestPage() {
  return (
    <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 sm:p-8">
      <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">Create a donation request</h3>
      <p className="text-sm text-gray-500 mb-6">Fill in the patient's details so nearby matching donors can be notified.</p>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="Patient name" icon={User} placeholder="e.g. Rafiul Islam" />
          <Select label="Blood group needed" icon={Droplet} options={bloodGroups} placeholder="Select blood group" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="Hospital name" icon={Hospital} placeholder="e.g. Dhaka Medical College Hospital" />
          <Select label="District" options={districts} placeholder="Select district" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="Units needed" type="number" min="1" placeholder="e.g. 2" />
          <Input label="Date needed" icon={Calendar} type="date" />
        </div>
        <Select label="Urgency" options={["Critical", "High", "Standard"]} placeholder="Select urgency level" />
        <Textarea label="Additional notes" placeholder="Any extra context for donors — ward number, contact person, etc." />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" type="button">Save as draft</Button>
          <Button type="submit">Submit request</Button>
        </div>
      </form>
    </div>
  );
}
