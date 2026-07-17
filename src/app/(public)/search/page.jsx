import SearchForm from "@/components/public/SearchForm";
import SectionTitle from "@/components/common/SectionTitle";
import { featuredDonors } from "@/lib/data";
import { MapPin, Droplet, MessageCircle } from "lucide-react";

export default function SearchDonorsPage() {
  return (
    <section className="section bg-white my-10">
      <div className="container-app">
        <SectionTitle eyebrow="Search" title="Find a donor near you" desc="Filter by blood group and district to see eligible, verified donors." />
        <div className="mb-14">
          <SearchForm />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDonors.map((d) => (
            <div key={d.id} className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <img src={d.avatar} alt={d.name} className="h-16 w-16 rounded-2xl object-cover mb-4" />
              <h3 className="font-display font-semibold text-gray-900">{d.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 mb-4">
                <MapPin className="h-3.5 w-3.5" /> {d.district}
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-primary text-xs font-semibold px-3 py-1.5">
                  <Droplet className="h-3.5 w-3.5" /> {d.bloodGroup}
                </span>
                <button className="p-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary text-gray-400 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
