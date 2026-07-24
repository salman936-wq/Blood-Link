"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
    X,
    User,
    Mail,
    Phone,
    Shield,
    Droplets,
    MapPin,
    CheckCircle,
} from "lucide-react";
import { bloodGroups, districts, divisions } from "@/lib/data";
import { updateUserRequest } from "@/lib/api/action/editUserAdmin";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";





export default function UserEditModal({user, isOpen, onClose, onUpdated }) {


    const { register, handleSubmit, watch, reset, setValue } = useForm();
    const router = useRouter();

    const selectedDivision = watch("division");
    const selectedDistrict = watch("district");
    const isActive = watch("activeStutus");

    // Prefill the form whenever a new user is selected for editing.
    useEffect(() => {
        if (isOpen && user) {
            reset({
                _id: user._id,
                name: user.fullName || user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                bloodGroup: user.bloodGroup || "A+",
                division: user.division || divisions[0],
                district: user.district || "",
                role: user?.role || "donor",
                activeStutus: Boolean(user.activeStutus),
            });
        }
    }, [isOpen, user, reset]);

    const districtOptions = useMemo(
        () => districts[selectedDivision] || [],
        [selectedDivision]
    );

    // Keep district valid whenever division changes.
    useEffect(() => {
        if (
            districtOptions.length > 0 &&
            !districtOptions.includes(selectedDistrict)
        ) {
            setValue("district", districtOptions[0]);
        }
    }, [districtOptions, selectedDistrict, setValue]);



    const onSubmit = async (formData) => {
        const { _id, ...updatedUser } = { ...user, ...formData, };
        const res = await updateUserRequest(user._id, updatedUser);

        if (res.error) {
            return toast.error(`${res.error.message}`)
            onClose();
        }

        if (res.matchedCount > 0) {
            toast.success('User updated successfully')
            router.refresh();
        }

        onClose();
    };



    if (!isOpen || !user) return null;

    const displayName = user.fullName || user.name;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-4xl rounded-2xl border border-base-300 bg-base-100 shadow-2xl max-h-[95vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-base-300 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold">Edit User</h2>
                        <p className="text-sm text-base-content/70">
                            Update user information and permissions
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-circle btn-ghost"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-1 flex-col overflow-hidden"
                >
                    <div className="flex-1 overflow-y-auto p-6">
                        {/* Avatar */}
                        <div className="mb-8 flex flex-col items-center">
                            <div className="avatar">
                                <div className="w-28 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                                    <img src={user.image} alt={displayName} />
                                </div>
                            </div>

                            <h3 className="mt-4 text-lg font-semibold">{displayName}</h3>
                            <p className="text-sm text-base-content/60">{user.email}</p>
                        </div>

                        {/* Form fields */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {/* Full Name */}
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <User size={16} />
                                        Full Name
                                    </span>
                                </div>
                                <input
                                    {...register("name", { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </label>

                            {/* Email */}
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <Mail size={16} />
                                        Email
                                    </span>
                                </div>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </label>

                            {/* Phone */}
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <Phone size={16} />
                                        Phone
                                    </span>
                                </div>
                                <input
                                    {...register("phone", { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </label>

                            {/* Blood Group */}
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <Droplets size={16} />
                                        Blood Group
                                    </span>
                                </div>
                                <select
                                    {...register("bloodGroup")}
                                    className="select select-bordered w-full"
                                >
                                    {bloodGroups.map((group) => (
                                        <option key={group} value={group}>
                                            {group}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Division */}
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <MapPin size={16} />
                                        Division
                                    </span>
                                </div>
                                <select
                                    {...register("division")}
                                    className="select select-bordered w-full"
                                >
                                    {divisions.map((division) => (
                                        <option key={division} value={division}>
                                            {division}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* District */}
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <MapPin size={16} />
                                        District
                                    </span>
                                </div>
                                <select
                                    {...register("district")}
                                    className="select select-bordered w-full"
                                >
                                    {districtOptions.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Role */}
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <Shield size={16} />
                                        Role
                                    </span>
                                </div>
                                <select
                                    {...register("role")}
                                    className="select select-bordered w-full"
                                >
                                    <option value="donor">donor</option>
                                    <option value="volunteer">volunteer</option>
                                    <option value="admin">admin</option>
                                </select>
                            </label>

                            {/* Status */}
                            <div className="flex items-center justify-between rounded-xl border border-base-300 p-4">
                                <div>
                                    <h4 className="flex items-center gap-2 font-medium">
                                        <CheckCircle size={16} />
                                        Account Status
                                    </h4>
                                    <p className="text-sm text-base-content/60">
                                        {isActive ? "Active" : "Blocked"}
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    {...register("activeStutus")}
                                    className="toggle toggle-success toggle-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-base-300 px-6 py-4">
                        <button type="button" onClick={onClose} className="btn btn-ghost">
                            Cancel
                        </button>

                        <button type="submit" className="btn btn-primary">
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}