import { MapPin, Droplet, Mail, Edit3, Phone } from "lucide-react";

export default function ProfileCard({
  image, name, email, district, bloodGroup,
  isEditing = false,
  onEdit, phone
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60">
      {/* Cover */}
      <div className="relative h-28 bg-gradient-to-r from-primary to-red-400">
        <button
          type="button"
          onClick={onEdit}
          disabled={isEditing}
          className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Edit3 className="h-3.5 w-3.5" />
          {isEditing ? "Editing..." : "Edit"}
        </button>

        {/* Avatar */}
        <img
          src={image}
          alt={name}
          className="absolute -bottom-10 left-6 h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="px-6 pt-14 pb-6">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <Mail className="h-4 w-4" />
          <span>{email}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <Phone className="h-4 w-4" />
          <span>{phone}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-primary">
            <Droplet className="h-3.5 w-3.5" />
            {bloodGroup}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
            <MapPin className="h-3.5 w-3.5" />
            {district}
          </span>
        </div>

      </div>
    </div>
  );
}