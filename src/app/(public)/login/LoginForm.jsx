"use client";

import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client"; // আপনার auth-client ফাইলের পাথ
import { toast } from "react-toastify";

const LoginForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { isSubmitting } 
  } = useForm();

  const onSubmit = async (data) => {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.remember,
      callbackURL: "/", 
    }, {
      onRequest: () => {
        // লোডিং শুরু হলে এখানে কাজ করতে পারেন
      },
      onSuccess: () => {
        toast.success("Login Successful!");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Something went wrong");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Email Address
        </label>
        <div className="flex h-12 items-center gap-3 rounded-xl border border-base-300 px-4 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
          <Mail className="h-5 w-5 text-gray-400" />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="you@example.com"
            className="w-full bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>
        <div className="flex h-12 items-center gap-3 rounded-xl border border-base-300 px-4 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
          <Lock className="h-5 w-5 text-gray-400" />
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="••••••••"
            className="w-full bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Remember */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            {...register("remember")}
            type="checkbox"
            className="checkbox checkbox-sm checkbox-primary"
          />
          <span>Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="font-medium text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn h-12 w-full rounded-xl border-0 bg-primary text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl disabled:opacity-50"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;