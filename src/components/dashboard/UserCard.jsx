import { Mail, MapPin, Droplet } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function UserCard({ user }) {
  const { name, email, bloodGroup, district, role, status, avatar } = user;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
      <img src={avatar} alt={name} className="h-16 w-16 rounded-2xl object-cover shadow-sm mb-4" />
      <h3 className="font-display font-semibold text-gray-900">{name}</h3>
      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Mail className="h-3 w-3" /> {email}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 text-primary text-xs font-semibold px-2.5 py-1">
          <Droplet className="h-3 w-3" /> {bloodGroup}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 text-gray-600 text-xs font-semibold px-2.5 py-1">
          <MapPin className="h-3 w-3" /> {district}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-xs font-medium text-gray-400">{role}</span>
        <StatusBadge status={status} />
      </div>
    </div>
  );
}
