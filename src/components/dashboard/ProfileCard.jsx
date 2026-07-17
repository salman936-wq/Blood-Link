import { MapPin, Droplet, Mail, Edit3 } from "lucide-react";

export default function ProfileCard({
  name = "Tanvir Ahmed", bloodGroup = "O+", district = "Dhaka",
  email = "tanvir@example.com", avatar = "https://i.pravatar.cc/150?img=12", donations = 14,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary to-red-400 relative">
        <button className="absolute top-4 right-4 flex items-center gap-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 backdrop-blur-sm transition-colors">
          <Edit3 className="h-3.5 w-3.5" /> Edit
        </button>
      </div>
      <div className="px-6 pb-6">
        <img src={avatar} alt={name} className="h-20 w-20 rounded-2xl border-4 border-white shadow-md -mt-10 object-cover" />
        <h3 className="font-display text-lg font-semibold text-gray-900 mt-3">{name}</h3>
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1"><Mail className="h-3.5 w-3.5" /> {email}</div>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-primary text-xs font-semibold px-3 py-1.5">
            <Droplet className="h-3.5 w-3.5" /> {bloodGroup}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 text-gray-600 text-xs font-semibold px-3 py-1.5">
            <MapPin className="h-3.5 w-3.5" /> {district}
          </span>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Total donations</span>
          <span className="font-display font-bold text-gray-900">{donations}</span>
        </div>
      </div>
    </div>
  );
}
