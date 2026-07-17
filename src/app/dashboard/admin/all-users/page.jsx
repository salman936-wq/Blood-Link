import { Search, Filter, UserPlus } from "lucide-react";
import UserCard from "@/components/dashboard/UserCard";
import { allUsers } from "@/lib/data";

export default function AllUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 w-full sm:w-80">
          <Search className="h-4 w-4 text-gray-400" />
          <input placeholder="Search users..." className="w-full bg-transparent text-sm focus:outline-none" />
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline rounded-xl border-gray-300 text-gray-600 gap-2">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="btn rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-md gap-2">
            <UserPlus className="h-4 w-4" /> Add user
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allUsers.map((u) => <UserCard key={u.id} user={u} />)}
      </div>
    </div>
  );
}
