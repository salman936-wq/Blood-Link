"use client";

import {
  X,
  Pencil,
  Mail,
  Phone,
  MapPin,
  Droplets,
  Shield,
  Calendar,
  BadgeCheck,
  Ban,
  HeartHandshake,
  UserRound,
} from "lucide-react";

const ROLE_CONFIG = {
  admin: { badge: "badge-error", icon: Shield },
  volunteer: { badge: "badge-warning", icon: HeartHandshake },
  donor: { badge: "badge-success", icon: UserRound },
};

export default function UserViewModal({ user, isOpen, onClose, onEdit }) {
  if (!isOpen || !user) return null;

  const displayName = user.fullName || user.name;
  const roleConfig = ROLE_CONFIG[user?.role] || {
    badge: "badge-ghost",
    icon: UserRound,
  };
  const RoleIcon = roleConfig.icon;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 z-[60] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-base-300 bg-base-100 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-300 p-6">
          <div>
            <h2 className="text-2xl font-bold">User Details</h2>
            <p className="text-sm text-base-content/60">
              Complete profile information
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(user)}
              className="btn btn-primary btn-sm"
            >
              <Pencil size={16} />
              Edit
            </button>

            <button onClick={onClose} className="btn btn-ghost btn-circle">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img
              src={user.image}
              alt={displayName}
              className="h-28 w-28 rounded-full border-4 border-primary object-cover"
            />

            <h3 className="mt-4 text-2xl font-bold">{displayName}</h3>
            <p className="text-base-content/60">{user.email}</p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="badge badge-error badge-lg gap-1">
                <Droplets size={14} />
                {user.bloodGroup}
              </span>

              <span className={`badge ${roleConfig.badge} badge-lg gap-1 capitalize`}>
                <RoleIcon size={14} />
                {user?.role}
              </span>

              <span
                className={`badge badge-lg gap-1 ${
                  user.activeStutus ? "badge-success" : "badge-error"
                }`}
              >
                {user.activeStutus ? (
                  <>
                    <BadgeCheck size={14} />
                    Active
                  </>
                ) : (
                  <>
                    <Ban size={14} />
                    Blocked
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Info grid */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-base-300 p-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-base-content/60">Email</p>
                  <p className="font-medium break-all">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-base-300 p-4">
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-base-content/60">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-base-300 p-4">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-base-content/60">District</p>
                  <p className="font-medium">{user.district}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-base-300 p-4">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-base-content/60">Division</p>
                  <p className="font-medium">{user.division}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-base-300 p-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-base-content/60">Joined</p>
                  <p className="font-medium">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-base-300 p-5">
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>

          <button className="btn btn-primary" onClick={() => onEdit(user)}>
            <Pencil size={16} />
            Edit User
          </button>
        </div>
      </div>
    </>
  );
}