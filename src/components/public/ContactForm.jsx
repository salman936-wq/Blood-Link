"use client";
import { Send, Mail, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-gray-200 bg-white shadow-lg p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="form-control w-full">
          <span className="text-sm font-medium text-gray-700 mb-1.5 block">Full name</span>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-primary transition-colors">
            <User className="h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Your name" className="input w-full p-0 focus:outline-none bg-transparent pl-2" />
          </div>
        </label>
        <label className="form-control w-full">
          <span className="text-sm font-medium text-gray-700 mb-1.5 block">Email address</span>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-primary transition-colors">
            <Mail className="h-4 w-4 text-gray-400" />
            <input type="email" placeholder="you@example.com" className="input w-full p-0 focus:outline-none bg-transparent pl-2" />
          </div>
        </label>
      </div>
      <label className="form-control w-full">
        <span className="text-sm font-medium text-gray-700 mb-1.5 block">Message</span>
        <div className="flex items-start gap-2 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-primary transition-colors">
          <MessageSquare className="h-4 w-4 text-gray-400 mt-1" />
          <textarea rows={4} placeholder="How can we help?" className="textarea w-full p-0 focus:outline-none bg-transparent resize-none pt-0.5 pl-2" />
        </div>
      </label>
      <button type="submit" className="btn w-full sm:w-auto rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-md gap-2 mt-4">
        <Send className="h-4 w-4" />
        Send message
      </button>
    </form>
  );
}
