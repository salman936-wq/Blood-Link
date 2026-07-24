"use client";

import { useMemo } from "react";
import {
  Users,
  HeartPulse,
  Wallet,
  Activity,
  Clock,
  UserRound,
  Droplet,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  CalendarDays,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
// Signature accent: "blood-red" family, paired with a deep clinical navy for
// grounding and a warm amber for urgency/attention states. Status colors map
// 1:1 to DaisyUI semantic tokens so the dashboard stays dark-mode correct.

const BLOOD_GROUP_COLORS = [
  "#C81D3D", // blood red
  "#9F1239", // deep rose
  "#D97706", // amber
  "#0F766E", // teal
  "#1E3A8A", // indigo
  "#6D28D9", // violet
];

const STATUS_META = {
  pending: { label: "Pending", badge: "badge-warning", bar: "#D97706" },
  inprogress: { label: "In Progress", badge: "badge-info", bar: "#0369A1" },
  completed: { label: "Completed", badge: "badge-success", bar: "#16A34A" },
  cancelled: { label: "Cancelled", badge: "badge-error", bar: "#C81D3D" },
};

const URGENCY_META = {
  high: { label: "High", className: "badge-error" },
  medium: { label: "Medium", className: "badge-warning" },
  low: { label: "Low", className: "badge-success" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const getInitials = (name) =>
  (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const formatMoney = (amount) =>
  `৳${(Number(amount) || 0).toLocaleString("en-US")}`;

const formatDate = (value) => {
  const d = value ? new Date(value) : null;
  if (!d || isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

function Avatar({ name, image, size = "w-12", tone = "bg-primary" }) {
  if (image) {
    return (
      <div className="avatar">
        <div className={`${size} rounded-full ring-1 ring-base-300`}>
          <img src={image} alt={name || "avatar"} />
        </div>
      </div>
    );
  }
  return (
    <div className="avatar placeholder">
      <div className={`${size} rounded-full ${tone} text-white`}>
        <span className="text-sm font-semibold">{getInitials(name)}</span>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sublabel, gradient, toalUser }) {
  return (
    <div
      className={`rounded-3xl p-6 text-white shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${gradient}`}
    >
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-white/15 p-2.5">
          <Icon size={22} strokeWidth={2.2} />
        </div>
        <span className="text-xs font-medium uppercase tracking-wide opacity-80">
          {label}
        </span>
      </div>
      <h3 className="mt-6 text-3xl font-black tracking-tight">{value}</h3>
      <p className="mt-1 text-sm opacity-80">{sublabel}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AdminDesignComponent = ({
  adminPersonalInfo,
  paymentsData = [],
  users = [],
  blodReq = [],
  toalUserAdmin, 
  totalDatasAdmin,
}) => {
  const safeUsers = Array.isArray(users) ? users : [];
  const safeRequests = Array.isArray(blodReq) ? blodReq : [];
  const safePayments = Array.isArray(paymentsData) ? paymentsData : [];

  // ---- Core counts -------------------------------------------------------
  const totalUsers = safeUsers.length;
  const totalDonors = safeUsers.filter((u) => u?.role === "donor").length;
  const totalAdmins = safeUsers.filter((u) => u?.role === "admin").length;
  const totalBloodRequest = safeRequests.length;

  const totalRevenue = useMemo(
    () => safePayments.reduce((sum, p) => sum + (Number(p?.amount) || 0), 0),
    [safePayments]
  );

  const statusCounts = useMemo(() => {
    const counts = { pending: 0, inprogress: 0, completed: 0, cancelled: 0 };
    safeRequests.forEach((r) => {
      const key = r?.status?.toLowerCase();
      if (key && counts[key] !== undefined) counts[key] += 1;
    });
    return counts;
  }, [safeRequests]);

  // ---- Chart data (all derived from real props, nothing hardcoded) ------
  const monthlyDonationChart = useMemo(() => {
    const buckets = new Map();
    [...safePayments]
      .filter((p) => p?.date && !isNaN(new Date(p.date).getTime()))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach((p) => {
        const d = new Date(p.date);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        const label = d.toLocaleString("en-US", { month: "short" });
        if (!buckets.has(key)) buckets.set(key, { month: label, amount: 0 });
        buckets.get(key).amount += Number(p.amount) || 0;
      });
    return Array.from(buckets.values());
  }, [safePayments]);

  const requestStatusChart = useMemo(
    () =>
      Object.entries(STATUS_META).map(([key, meta]) => ({
        name: meta.label,
        value: statusCounts[key] || 0,
        fill: meta.bar,
      })),
    [statusCounts]
  );

  const bloodGroupChart = useMemo(() => {
    const counts = {};
    safeUsers
      .filter((u) => u?.role === "donor")
      .forEach((u) => {
        const bg = u?.bloodGroup || "Unknown";
        counts[bg] = (counts[bg] || 0) + 1;
      });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [safeUsers]);

  // ---- Lists --------------------------------------------------------------
  const recentRequests = useMemo(
    () =>
      [...safeRequests]
        .sort(
          (a, b) =>
            new Date(b?.requiredDateTime || 0) -
            new Date(a?.requiredDateTime || 0)
        )
        .slice(0, 6),
    [safeRequests]
  );

  const latestPayments = useMemo(
    () =>
      [...safePayments]
        .sort((a, b) => new Date(b?.date || 0) - new Date(a?.date || 0))
        .slice(0, 5),
    [safePayments]
  );

  const recentDonors = useMemo(
    () =>
      [...safeUsers]
        .filter((u) => u?.role === "donor")
        .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
        .slice(0, 4),
    [safeUsers]
  );

  const donationGoalPct = Math.min(
    100,
    Math.round((totalRevenue / Math.max(totalRevenue, 50000)) * 100)
  );
  const completionPct = totalBloodRequest
    ? Math.round((statusCounts.completed / totalBloodRequest) * 100)
    : 0;
  const activeUserPct = totalUsers
    ? Math.round(
        (safeUsers.filter((u) => u?.activeStutus !== "inactive").length /
          totalUsers) *
          100
      )
    : 0;

  return (
    <div className="flex flex-col gap-8 md:p-8 bg-base-200/40">
      {/* ================= Welcome ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1d3f7f] via-[#12389f] to-[#1d4bc8] p-8 text-white shadow-xl">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,100 120,100 150,40 180,160 210,20 240,100 800,100"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Avatar
              name={adminPersonalInfo?.name}
              image={adminPersonalInfo?.image}
              size="w-16"
              tone="bg-white/20"
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-wide opacity-80">
                {getGreeting()} 👋
              </p>
              <h1 className="text-3xl font-black tracking-tight">
                {adminPersonalInfo?.name || "Admin"}
              </h1>
              <p className="mt-1 text-sm opacity-80 capitalize">
                {adminPersonalInfo?.role || "Administrator"}
                {adminPersonalInfo?.division
                  ? ` · ${adminPersonalInfo.division}`
                  : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start rounded-2xl bg-white/10 px-4 py-2 text-right md:self-auto">
            <CalendarDays size={18} />
            <div>
              <p className="text-sm font-semibold">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-xs opacity-70">BloodLink Admin Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Stat Cards ================= */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          icon={Users}
          label="Users"
          value={toalUserAdmin}
          sublabel="Registered users"
          gradient="bg-gradient-to-br from-[#c81d3d] to-[#9f1239]"
        />
        <StatCard
          icon={Activity}
          label="Donors"
          value={totalDonors}
          sublabel="Available donors"
          gradient="bg-gradient-to-br from-[#0f766e] to-[#115e59]"
        />
        <StatCard
          icon={UserRound}
          label="Admins"
          value={totalAdmins}
          sublabel="System admins"
          gradient="bg-gradient-to-br from-[#1e3a8a] to-[#1e293b]"
        />
        <StatCard
          icon={HeartPulse}
          label="Requests"
          value={totalDatasAdmin}
          sublabel="Blood requests"
          gradient="bg-gradient-to-br from-[#d97706] to-[#b45309]"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={statusCounts.completed}
          sublabel="Requests fulfilled"
          gradient="bg-gradient-to-br from-[#16a34a] to-[#166534]"
        />
        <StatCard
          icon={Wallet}
          label="Revenue"
          value={formatMoney(totalRevenue)}
          sublabel="Total donations"
          gradient="bg-gradient-to-br from-[#6d28d9] to-[#4c1d95]"
        />
      </div>

      {/* ================= Charts ================= */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-base-100 p-6 shadow-lg lg:col-span-2">
          <h2 className="text-xl font-bold">Monthly Donations</h2>
          <p className="text-sm text-base-content/50">
            Total donation amount collected per month
          </p>
          <div className="mt-4 h-[300px]">
            {monthlyDonationChart.length > 0 ? (
              <ResponsiveContainer>
                <AreaChart data={monthlyDonationChart}>
                  <defs>
                    <linearGradient id="donationFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c81d3d" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#c81d3d" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} width={40} />
                  <Tooltip formatter={(v) => formatMoney(v)} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#c81d3d"
                    strokeWidth={2.5}
                    fill="url(#donationFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState label="No donation history yet" />
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-base-100 p-6 shadow-lg">
          <h2 className="text-xl font-bold">Blood Group Mix</h2>
          <p className="text-sm text-base-content/50">Donor distribution</p>
          <div className="mt-4 h-[300px]">
            {bloodGroupChart.length > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={bloodGroupChart}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={2}
                  >
                    {bloodGroupChart.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={BLOOD_GROUP_COLORS[index % BLOOD_GROUP_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState label="No donors yet" />
            )}
          </div>
        </div>
      </div>

      {/* ================= Requests + Payments ================= */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-base-100 p-6 shadow-lg lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Blood Requests</h2>
            <button className="btn btn-sm btn-outline btn-error rounded-xl">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-base-content/50">
                  <th>Patient</th>
                  <th>Hospital</th>
                  <th>Group</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Required</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-base-content/50">
                      No blood requests yet
                    </td>
                  </tr>
                )}
                {recentRequests.map((item) => {
                  const statusKey = item?.status?.toLowerCase();
                  const status = STATUS_META[statusKey] || {
                    label: item?.status || "Unknown",
                    badge: "badge-ghost",
                  };
                  const urgencyKey = item?.urgency?.toLowerCase();
                  const urgency = URGENCY_META[urgencyKey];
                  return (
                    <tr key={item?._id} className="hover">
                      <td className="font-semibold">{item?.patientName || "—"}</td>
                      <td className="text-sm">{item?.hospitalName || "—"}</td>
                      <td>
                        <span className="badge badge-ghost gap-1">
                          <Droplet size={12} /> {item?.bloodGroup || "—"}
                        </span>
                      </td>
                      <td>
                        {urgency ? (
                          <span className={`badge ${urgency.className}`}>
                            {urgency.label}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>
                        <span className={`badge ${status.badge}`}>{status.label}</span>
                      </td>
                      <td className="text-sm">{formatDate(item?.requiredDateTime)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-base-100 p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Latest Payments</h2>
            <Clock className="text-primary" size={20} />
          </div>
          <div className="space-y-3">
            {latestPayments.length === 0 && (
              <p className="py-8 text-center text-base-content/50">
                No payments yet
              </p>
            )}
            {latestPayments.map((payment, index) => (
              <div
                key={payment?.transactionId || index}
                className="flex items-center justify-between rounded-2xl bg-base-200/60 p-3 transition-colors hover:bg-base-300/60"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={payment?.name} image={payment?.image} size="w-10" />
                  <div>
                    <h3 className="text-sm font-semibold">
                      {payment?.name || "Anonymous"}
                    </h3>
                    <p className="text-xs text-base-content/50">
                      {payment?.transactionId || "—"} · {formatDate(payment?.date)}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-bold text-success">
                  {formatMoney(payment?.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= Quick Actions ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <button className="btn h-24 rounded-3xl border-none bg-gradient-to-br from-[#c81d3d] to-[#9f1239] text-white shadow-md hover:shadow-lg">
          <UserRound size={18} /> Manage Users
        </button>
        <button className="btn h-24 rounded-3xl border-none bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-md hover:shadow-lg">
          <HeartPulse size={18} /> Blood Requests
        </button>
        <button className="btn h-24 rounded-3xl border-none bg-gradient-to-br from-[#0f766e] to-[#115e59] text-white shadow-md hover:shadow-lg">
          <Wallet size={18} /> Payments
        </button>
        <button className="btn h-24 rounded-3xl border-none bg-gradient-to-br from-[#1e3a8a] to-[#1e293b] text-white shadow-md hover:shadow-lg">
          <Activity size={18} /> View Reports
        </button>
      </div>

      {/* ================= Recent Donors ================= */}
      <div className="rounded-3xl bg-base-100 p-6 shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Donors</h2>
          <span className="badge badge-error badge-outline">{totalDonors} donors</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recentDonors.length === 0 && (
            <p className="col-span-full py-6 text-center text-base-content/50">
              No donors yet
            </p>
          )}
          {recentDonors.map((user) => (
            <div
              key={user?._id}
              className="rounded-2xl border border-base-300 p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <Avatar name={user?.name} image={user?.image} size="w-12" />
                <div>
                  <h3 className="font-semibold">{user?.name || user?.fullName || "—"}</h3>
                  <p className="flex items-center gap-1 text-xs text-base-content/50">
                    <Droplet size={12} /> {user?.bloodGroup || "—"}
                  </p>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1 text-xs text-base-content/50">
                <MapPin size={12} /> {user?.district || "—"}, {user?.division || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Today's Summary ================= */}
      <div className="rounded-3xl bg-base-100 p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-bold">Today's Summary</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Wallet size={14} /> Donation goal
              </span>
              <span className="font-semibold">{donationGoalPct}%</span>
            </div>
            <progress
              className="progress progress-error w-full"
              value={donationGoalPct}
              max={100}
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Requests fulfilled
              </span>
              <span className="font-semibold">{completionPct}%</span>
            </div>
            <progress
              className="progress progress-success w-full"
              value={completionPct}
              max={100}
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <AlertTriangle size={14} /> Active users
              </span>
              <span className="font-semibold">{activeUserPct}%</span>
            </div>
            <progress
              className="progress progress-warning w-full"
              value={activeUserPct}
              max={100}
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <SummaryPill
            icon={HeartPulse}
            label="Completed"
            value={statusCounts.completed}
          />
          <SummaryPill icon={Clock} label="Pending" value={statusCounts.pending} />
          <SummaryPill
            icon={XCircle}
            label="Cancelled"
            value={statusCounts.cancelled}
          />
          <SummaryPill icon={Wallet} label="Donations" value={formatMoney(totalRevenue)} />
        </div>
      </div>

    </div>
  );
};

function EmptyState({ label }) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-base-content/40">
      {label}
    </div>
  );
}

function SummaryPill({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-base-200/60 p-4 text-center">
      <Icon size={16} className="text-base-content/50" />
      <span className="text-lg font-bold">{value}</span>
      <span className="text-xs text-base-content/50">{label}</span>
    </div>
  );
}

function FooterStat({ value, label }) {
  return (
    <div>
      <h2 className="text-4xl font-black">{value}</h2>
      <p className="mt-1 text-sm opacity-80">{label}</p>
    </div>
  );
}

export default AdminDesignComponent;