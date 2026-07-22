"use client";

import { useState, useEffect } from "react";
import {
  EllipsisVertical,
  Eye,
  Pencil,
  Trash2,
  Shield,
  UserRound,
  HeartHandshake,
  Droplets,
  Phone,
  MapPin,
} from "lucide-react";
import UserViewModal from "./UserViewModal";
import UserEditModal from "./UserEditModal";

const ROLE_CONFIG = {
  admin: { badge: "badge-error", icon: Shield },
  volunteer: { badge: "badge-warning", icon: HeartHandshake },
  donor: { badge: "badge-success", icon: UserRound },
};

function RoleBadge({ role }) {
  const config = ROLE_CONFIG[role] || {
    badge: "badge-ghost",
    icon: UserRound,
  };
  const Icon = config.icon;

  return (
    <span className={`badge ${config.badge} gap-1 capitalize font-medium`}>
      <Icon size={13} />
      {role}
    </span>
  );
}

function StatusBadge({ activeStutus }) {
  return activeStutus ? (
    <span className="badge badge-success gap-1 font-medium">Active</span>
  ) : (
    <span className="badge badge-error gap-1 font-medium">Blocked</span>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function UsersTable({ users, onDeleteUser, onUserUpdated }) {
  const [userList, setUserList] = useState(users || []);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setUserList(users || []);
  }, [users]);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleEditFromView = (user) => {
    setIsViewOpen(false);
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleUpdated = (updatedUser) => {
    // API call দিয়ে backend update করবে, এখানে শুধু local state sync হচ্ছে
    setUserList((prev) =>
      prev.map((u) =>
        u._id === updatedUser._id ? { ...u, ...updatedUser } : u
      )
    );
    onUserUpdated?.(updatedUser);
  };

  const confirmDelete = () => {
    setUserList((prev) => prev.filter((u) => u._id !== deleteTarget._id));
    onDeleteUser?.(deleteTarget);
    setDeleteTarget(null);
  };

  const closeAllModals = () => {
    setIsViewOpen(false);
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-base-300">
          <div>
            <h2 className="text-lg font-bold text-base-content">
              Registered Users
            </h2>
            <p className="text-sm text-base-content/60 mt-0.5">
              {userList.length} total users
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-200/60 text-xs uppercase tracking-wide text-base-content/60">
                <th className="py-3">User</th>
                <th>Blood</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th className="text-right pr-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {userList.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-base-200/40 transition-colors"
                >
                  {/* Avatar + Name + Email */}
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.image}
                        alt={user.fullName || user.name}
                        className="h-11 w-11 rounded-full object-cover border border-base-300"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-base-content truncate">
                          {user.fullName || user.name}
                        </p>
                        <p className="text-xs text-base-content/60 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Blood group */}
                  <td>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-error/10 text-error font-bold text-sm">
                      {user.bloodGroup}
                    </span>
                  </td>

                  {/* Location */}
                  <td>
                    <div className="flex items-start gap-1.5 text-sm">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-base-content/40" />
                      <div>
                        <p className="font-medium leading-tight">
                          {user.district}
                        </p>
                        <p className="text-xs text-base-content/50 leading-tight">
                          {user.division}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td>
                    <div className="flex items-center gap-1.5 text-sm text-base-content/80">
                      <Phone className="w-3.5 h-3.5 text-base-content/40" />
                      {user.phone}
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <RoleBadge role={user.role} />
                  </td>

                  {/* Status */}
                  <td>
                    <StatusBadge activeStutus={user.activeStutus} />
                  </td>

                  {/* Joined */}
                  <td className="text-sm text-base-content/70">
                    {formatDate(user.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="text-right pr-4">
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-sm btn-circle"
                        aria-label="Open actions menu"
                      >
                        <EllipsisVertical size={18} />
                      </div>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu z-20 rounded-box w-52 border border-base-300 bg-base-100 p-2 shadow-lg"
                      >
                        <li>
                          <button onClick={() => handleView(user)}>
                            <Eye size={16} />
                            View Details
                          </button>
                        </li>
                        <li>
                          <button onClick={() => handleEdit(user)}>
                            <Pencil size={16} />
                            Edit User
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-error"
                            onClick={() => setDeleteTarget(user)}
                          >
                            <Trash2 size={16} />
                            Delete User
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {userList.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Droplets className="w-10 h-10 text-base-content/20 mb-2" />
              <p className="text-base-content/60 font-medium">
                No users found
              </p>
              <p className="text-sm text-base-content/40 mt-1">
                New registrations will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      <UserViewModal
        user={selectedUser}
        isOpen={isViewOpen}
        onClose={closeAllModals}
        onEdit={handleEditFromView}
      />

      {/* Edit Modal */}
      <UserEditModal
        user={selectedUser}
        isOpen={isEditOpen}
        onClose={closeAllModals}
        onUpdated={handleUpdated}
      />

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="modal modal-open">
          <div className="modal-box max-w-sm">
            <h3 className="font-bold text-lg text-base-content">
              Delete user?
            </h3>
            <p className="py-3 text-sm text-base-content/70">
              This will permanently remove{" "}
              <span className="font-semibold text-base-content">
                {deleteTarget.fullName || deleteTarget.name}
              </span>{" "}
              from the system. This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error text-white"
                onClick={confirmDelete}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-black/40"
            onClick={() => setDeleteTarget(null)}
          />
        </div>
      )}
    </div>
  );
}