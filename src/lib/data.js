// Hardcoded, static data only. No API, no backend, no auth.
// This file is the single source of truth for every "design only" page.

export const siteStats = [
  { label: "Units donated", value: "48,210", note: "since launch" },
  { label: "Active donors", value: "12,904", note: "verified profiles" },
  { label: "Lives touched", value: "3× per unit", note: "average impact" },
  { label: "Response time", value: "under 2 hrs", note: "for urgent requests" },
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const divisions  = [
  "Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal", "Rangpur", "Mymensingh",
];

export const districts = {
  Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  Chattogram: ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
  Khulna: ["Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  Rajshahi: ["Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Rajshahi", "Sirajganj"],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
  Barishal: ["Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
};

export const benefits = [
  { icon: "HeartPulse", title: "One unit, three lives", desc: "A single donation separates into red cells, plasma and platelets — each going to a different patient in need." },
  { icon: "ShieldCheck", title: "Screened & verified", desc: "Every donor profile is checked against eligibility criteria before appearing in a search result." },
  { icon: "Clock", title: "Built for urgency", desc: "Critical requests are boosted to nearby, eligible donors first — matched by blood group and distance." },
  { icon: "Users", title: "A standing community", desc: "Donors get reminders the moment they're eligible again, roughly every 90 days." },
];

export const donationProcess = [
  { step: "Register", desc: "Create a donor profile with your blood group, district and upazila.", icon: "UserPlus" },
  { step: "Get matched", desc: "We surface you when a nearby request matches your blood group.", icon: "Search" },
  { step: "Screening", desc: "A quick health check confirms you're fit to donate that day.", icon: "ClipboardCheck" },
  { step: "Donate", desc: "The donation itself takes about 10 minutes, start to finish.", icon: "Droplet" },
  { step: "Recover & track", desc: "Rest for 15 minutes, then track your impact from your dashboard.", icon: "Activity" },
];

export const urgentRequests = [
  { id: 1, patient: "Rafiul Islam", bloodGroup: "O-", hospital: "Dhaka Medical College Hospital", district: "Dhaka", unitsNeeded: 3, urgency: "Critical", date: "Today, 4:00 PM" },
  { id: 2, patient: "Nusrat Jahan", bloodGroup: "AB+", hospital: "Chittagong General Hospital", district: "Chattogram", unitsNeeded: 1, urgency: "High", date: "Tomorrow, 9:00 AM" },
  { id: 3, patient: "Karim Hasan", bloodGroup: "B+", hospital: "Rajshahi Medical College", district: "Rajshahi", unitsNeeded: 2, urgency: "High", date: "Today, 8:30 PM" },
  { id: 4, patient: "Sadia Afrin", bloodGroup: "A-", hospital: "Sylhet MAG Osmani Hospital", district: "Sylhet", unitsNeeded: 2, urgency: "Critical", date: "Today, 6:00 PM" },
  { id: 5, patient: "Jahid Hossain", bloodGroup: "O+", hospital: "United Hospital", district: "Dhaka", unitsNeeded: 1, urgency: "Standard", date: "20 Jul, 10:00 AM" },
  { id: 6, patient: "Tania Sultana", bloodGroup: "AB-", hospital: "Evercare Hospital", district: "Dhaka", unitsNeeded: 2, urgency: "High", date: "21 Jul, 2:00 PM" },
];

export const featuredDonors = [
  { id: 1, name: "Tanvir Ahmed", bloodGroup: "O+", district: "Dhaka", donations: 14, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 2, name: "Farzana Yasmin", bloodGroup: "A+", district: "Khulna", donations: 9, avatar: "https://i.pravatar.cc/150?img=32" },
  { id: 3, name: "Imran Kabir", bloodGroup: "B-", district: "Sylhet", donations: 21, avatar: "https://i.pravatar.cc/150?img=51" },
  { id: 4, name: "Mitu Chowdhury", bloodGroup: "AB+", district: "Rajshahi", donations: 6, avatar: "https://i.pravatar.cc/150?img=45" },
];

export const testimonials = [
  { id: 1, name: "Shirin Akter", role: "Recipient's family", quote: "We found a matching O- donor in under an hour. That response time is the whole reason my father is here today.", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 2, name: "Mahmudul Hasan", role: "Donor, 11 donations", quote: "The reminder every 90 days is what keeps me consistent. I stopped tracking it myself and just trust the app.", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 3, name: "Dr. Nazia Rahman", role: "Hematologist, DMCH", quote: "Having verified, searchable donor pools by district has genuinely shortened our sourcing time for rare types.", avatar: "https://i.pravatar.cc/150?img=25" },
];

export const faqs = [
  { q: "Who can donate blood?", a: "Most healthy adults aged 18–60, weighing over 50kg, can donate every 90 days. A short screening confirms eligibility on the day." },
  { q: "Is donating painful?", a: "You'll feel a brief pinch during needle insertion. The draw itself takes about 10 minutes and most donors feel completely normal afterward." },
  { q: "How is my data used?", a: "Your profile is only shown to verified requesters searching for your blood group and district — never sold or shared beyond the platform." },
  { q: "Can I donate if I'm on medication?", a: "It depends on the medication. The screening nurse will review your history and confirm on the spot." },
  { q: "How often will I be contacted?", a: "Only when a nearby request matches your blood group, plus a gentle reminder once you're eligible again." },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Donation Requests", href: "/donation-requests" },
  { label: "Search Donors", href: "/search" },
  { label: "Funding", href: "/funding" },
];

// ---------- Role-based dashboard menus ----------
export const adminMenus = [
  { section: null, items: [
    { label: "Overview", href: "/dashboard/admin", icon: "LayoutDashboard" },
    { label: "All Users", href: "/dashboard/admin/all-users", icon: "Users" },
    { label: "All Requests", href: "/dashboard/admin/all-blood-donation-request", icon: "Database" },
    { label: "Create Request", href: "/dashboard/admin/create-donation-request", icon: "PlusCircle" },
    { label: "My Requests", href: "/dashboard/admin/my-donation-requests", icon: "ClipboardList" },
    { label: "Profile", href: "/dashboard/admin/profile", icon: "UserCircle" },
  ]},
];

export const donorMenus = [
  { section: null, items: [
    { label: "Overview", href: "/dashboard/donor", icon: "LayoutDashboard" },
    { label: "Profile", href: "/dashboard/donor/profile", icon: "UserCircle" },
    { label: "My Requests", href: "/dashboard/donor/my-donation-requests", icon: "ClipboardList" },
    { label: "Create Request", href: "/dashboard/donor/create-donation-request", icon: "PlusCircle" },
    { label: "Funding", href: "/dashboard/donor/funding", icon: "HandCoins" },
  ]},
];

export const volunteerMenus = [
  { section: null, items: [
    { label: "Overview", href: "/dashboard/volunteer", icon: "LayoutDashboard" },
    { label: "All Requests", href: "/dashboard/volunteer/all-blood-donation-request", icon: "Database" },
    { label: "Profile", href: "/dashboard/volunteer/profile", icon: "UserCircle" },
    { label: "Create Request", href: "/dashboard/volunteer/create-donation-request", icon: "PlusCircle" },
    { label: "My Requests", href: "/dashboard/volunteer/my-donation-requests", icon: "ClipboardList" },
  ]},
];

export function getMenus(role) {
  if (role === "admin") return adminMenus;
  if (role === "volunteer") return volunteerMenus;
  return donorMenus;
}

export function getRoleTitle(role) {
  if (role === "admin") return "Welcome back, Admin";
  if (role === "volunteer") return "Welcome back, Volunteer";
  return "Welcome back, Donor";
}

// ---------- Dashboard data ----------
export const dashboardStats = [
  { label: "Total donations", value: "14", icon: "Droplet", trend: "+2 this year", tone: "primary" },
  { label: "Lives impacted", value: "42", icon: "HeartPulse", trend: "3 per unit", tone: "success" },
  { label: "Open requests", value: "3", icon: "ClipboardList", trend: "1 critical", tone: "warning" },
  { label: "Next eligible", value: "12 days", icon: "CalendarClock", trend: "on track", tone: "info" },
];

export const adminStats = [
  { label: "Total users", value: "12,904", icon: "Users", trend: "+312 this month", tone: "primary" },
  { label: "Total requests", value: "1,208", icon: "Database", trend: "84 pending", tone: "warning" },
  { label: "Funds raised", value: "৳8.4L", icon: "HandCoins", trend: "this quarter", tone: "success" },
  { label: "Verified donors", value: "9,741", icon: "ShieldCheck", trend: "76% of base", tone: "info" },
];

export const volunteerStats = [
  { label: "Assigned tasks", value: "6", icon: "ClipboardList", trend: "2 due today", tone: "primary" },
  { label: "Requests verified", value: "38", icon: "ShieldCheck", trend: "this month", tone: "success" },
  { label: "Nearby urgent", value: "4", icon: "MapPin", trend: "within 5km", tone: "warning" },
  { label: "Hours logged", value: "56", icon: "Clock", trend: "this quarter", tone: "info" },
];

export const myRequests = [
  { id: "REQ-1042", patient: "Rafiul Islam", bloodGroup: "O-", hospital: "Dhaka Medical College", date: "16 Jul 2026", status: "Pending" },
  { id: "REQ-1039", patient: "Amina Khatun", bloodGroup: "B+", hospital: "Square Hospital", date: "10 Jul 2026", status: "Fulfilled" },
  { id: "REQ-1031", patient: "Jahid Hossain", bloodGroup: "A+", hospital: "United Hospital", date: "02 Jul 2026", status: "In Progress" },
  { id: "REQ-1022", patient: "Tania Sultana", bloodGroup: "AB-", hospital: "Evercare Hospital", date: "22 Jun 2026", status: "Cancelled" },
];

export const allRequests = [
  { id: "REQ-1042", patient: "Rafiul Islam", bloodGroup: "O-", hospital: "Dhaka Medical College", district: "Dhaka", date: "16 Jul 2026", status: "Pending" },
  { id: "REQ-1041", patient: "Nusrat Jahan", bloodGroup: "AB+", hospital: "Chittagong General", district: "Chattogram", date: "15 Jul 2026", status: "In Progress" },
  { id: "REQ-1039", patient: "Amina Khatun", bloodGroup: "B+", hospital: "Square Hospital", district: "Dhaka", date: "10 Jul 2026", status: "Fulfilled" },
  { id: "REQ-1035", patient: "Karim Hasan", bloodGroup: "B+", hospital: "Rajshahi Medical", district: "Rajshahi", date: "08 Jul 2026", status: "Fulfilled" },
  { id: "REQ-1031", patient: "Jahid Hossain", bloodGroup: "A+", hospital: "United Hospital", district: "Dhaka", date: "02 Jul 2026", status: "In Progress" },
  { id: "REQ-1022", patient: "Tania Sultana", bloodGroup: "AB-", hospital: "Evercare Hospital", district: "Dhaka", date: "22 Jun 2026", status: "Cancelled" },
];

export const allUsers = [
  { id: 1, name: "Tanvir Ahmed", email: "tanvir@example.com", bloodGroup: "O+", district: "Dhaka", role: "Donor", status: "Active", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 2, name: "Farzana Yasmin", email: "farzana@example.com", bloodGroup: "A+", district: "Khulna", role: "Volunteer", status: "Active", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: 3, name: "Imran Kabir", email: "imran@example.com", bloodGroup: "B-", district: "Sylhet", role: "Donor", status: "Blocked", avatar: "https://i.pravatar.cc/150?img=51" },
  { id: 4, name: "Mitu Chowdhury", email: "mitu@example.com", bloodGroup: "AB+", district: "Rajshahi", role: "Donor", status: "Active", avatar: "https://i.pravatar.cc/150?img=45" },
  { id: 5, name: "Rafiul Islam", email: "rafiul@example.com", bloodGroup: "O-", district: "Dhaka", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/150?img=8" },
];

export const chartMonthly = [
  { month: "Feb", units: 28 }, { month: "Mar", units: 34 }, { month: "Apr", units: 41 },
  { month: "May", units: 38 }, { month: "Jun", units: 52 }, { month: "Jul", units: 47 },
];

export const notifications = [
  { id: 1, text: "New O- request 2.4km from you", time: "12m ago", tone: "primary" },
  { id: 2, text: "You're eligible to donate again", time: "2h ago", tone: "success" },
  { id: 3, text: "Your request REQ-1042 was viewed by 3 donors", time: "5h ago", tone: "info" },
];

export const activityTimeline = [
  { id: 1, text: "Donated 1 unit at Dhaka Medical College", time: "3 days ago", icon: "Droplet" },
  { id: 2, text: "Updated profile district to Dhaka", time: "1 week ago", icon: "UserCircle" },
  { id: 3, text: "Responded to request REQ-1031", time: "2 weeks ago", icon: "HeartPulse" },
  { id: 4, text: "Joined BloodLink", time: "8 months ago", icon: "Sparkles" },
];

export const campaigns = [
  { id: 1, 
    title: "Emergency Blood Bank — Dhaka", 
    raised: 420000, 
    goal: 600000, 
    supporters: 812, 
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop" },
    
  { id: 2, title: "Rural Mobile Donation Camps", raised: 185000, goal: 350000, supporters: 340, image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Thalassemia Patient Support Fund", raised: 610000, goal: 800000, supporters: 1204, image: "https://images.unsplash.com/photo-1600959907703-125ba1374a12?q=80&w=800&auto=format&fit=crop" },
];

export const myFunding = [
  { id: "FND-221", campaign: "Emergency Blood Bank — Dhaka", amount: "৳1,500", date: "12 Jul 2026", status: "Completed" },
  { id: "FND-198", campaign: "Thalassemia Patient Support Fund", amount: "৳2,000", date: "28 Jun 2026", status: "Completed" },
  { id: "FND-172", campaign: "Rural Mobile Donation Camps", amount: "৳500", date: "05 Jun 2026", status: "Completed" },
];

export const contentItems = [
  { id: 1, type: "Testimonial", title: "Shirin Akter's story", status: "Published", updated: "2 days ago" },
  { id: 2, type: "FAQ", title: "Can I donate if I'm on medication?", status: "Published", updated: "1 week ago" },
  { id: 3, type: "Blog", title: "Why platelet donation matters", status: "Draft", updated: "3 days ago" },
  { id: 4, type: "Announcement", title: "New Rajshahi donation camp", status: "Published", updated: "5 hours ago" },
];

export const volunteerTasks = [
  { id: "TSK-08", task: "Verify donor eligibility — REQ-1042", district: "Dhaka", due: "Today, 5:00 PM", status: "Pending" },
  { id: "TSK-07", task: "Coordinate pickup — REQ-1035", district: "Rajshahi", due: "Tomorrow", status: "In Progress" },
  { id: "TSK-05", task: "Follow up with hospital — REQ-1031", district: "Dhaka", due: "18 Jul 2026", status: "Completed" },
];
