"use client";

import { User, Mail, Lock, ImagePlus, MapPin } from "lucide-react";
import Select from "@/components/common/Select";
import { bloodGroups, divisions, districts } from "@/lib/data";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { authenticator } from "@/lib/api/extra/register";
import { upload } from "@imagekit/next";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const RegisterForm = () => {
    const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting }, } = useForm();
    const [preview, setPreview] = useState("");
    const fileInputRef = useRef(null);
    const router = useRouter();

    // Watch values for UI updates (like dependent selects and active radio)
    const division = watch("division");
    const bloodGroup = watch("bloodGroup");

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        try {
            const auth = await authenticator();
            const response = await upload({
                file,
                fileName: `avatar-${Date.now()}`,
                publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
                signature: auth.signature,
                expire: auth.expire,
                token: auth.token,
            });

            // Set the URL in form state
            setValue("avatar", response.url);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    // avatar
    // bloodGroup
    // district
    // division
    // email
    // fullName
    // password


    const onSubmit = async (data) => {
        try {
            const { data: res, error } = await authClient.signUp.email({
                name: data.fullName,
                email: data.email,
                password: data.password,
                image: data.avatar,
                callbackURL: "/",
                bloodGroup: data.bloodGroup,
                division: data.division,
                district: data.district,
                activeStutus: true,
                role: "donor"
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            if (res?.user) {
                toast.success("Register successful");
                reset();
                router.push("/dashboard/donor"); // নিচে দেখো
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center shrink-0">
                    {preview ? (
                        <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                        <ImagePlus className="h-6 w-6 text-gray-400" />
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="btn btn-outline rounded-xl border-gray-300 text-gray-600 btn-sm"
                >
                    Upload Avatar
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImage} />
            </div>

            {/* Form Fields */}
            <label className="form-control w-full">
                <span className="text-sm font-medium text-gray-700 mb-1.5 block">Full name</span>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-3 focus-within:border-primary">
                    <User className="h-4 w-4 text-gray-400" />
                    <input {...register("fullName", { required: true })} type="text" placeholder="Your name" className="w-full bg-transparent text-sm focus:outline-none" />
                </div>
            </label>

            <label className="form-control w-full">
                <span className="text-sm font-medium text-gray-700 mb-1.5 block">Email address</span>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-3 focus-within:border-primary">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <input {...register("email", { required: true })} type="email" placeholder="you@example.com" className="w-full bg-transparent text-sm focus:outline-none" />
                </div>
            </label>

            {/* Blood Group */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Blood Group</label>
                <div className="grid grid-cols-8 gap-2">
                    {bloodGroups.map((group) => (
                        <label key={group} className={`cursor-pointer rounded-full border flex justify-center py-2 text-sm transition ${bloodGroup === group ? "bg-primary text-white" : "border-gray-300"}`}>
                            <input {...register("bloodGroup")} type="radio" value={group} className="hidden" />
                            {group}
                        </label>
                    ))}
                </div>
            </div>

            {/* Selects */}
            <div className="grid grid-cols-2 gap-4">
                <Select
                    label="Division"
                    icon={MapPin}
                    options={divisions}
                    {...register("division", { onChange: () => setValue("district", "") })}
                />
                <Select
                    label="District"
                    icon={MapPin}
                    options={division ? districts[division] : []}
                    {...register("district")}
                    disabled={!division}
                />
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-2 gap-4">
                <label className="form-control w-full">
                    <span className="text-sm font-medium text-gray-700 mb-1.5 block">Password</span>
                    <input {...register("password")} type="password" className="w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm" />
                </label>
                <label className="form-control w-full">
                    <span className="text-sm font-medium text-gray-700 mb-1.5 block">Confirm</span>
                    <input type="password" className="w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm" />
                </label>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full rounded-xl bg-primary text-white border-none h-12"
            >
                {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
                {isSubmitting ? "Creating account..." : "Create account"}
            </button>
        </form>
    );
};

export default RegisterForm;