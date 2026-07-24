import Hero from "@/components/public/Hero";
import FeatureCard from "@/components/public/FeatureCard";
import BloodCard from "@/components/public/BloodCard";
import SectionTitle from "@/components/common/SectionTitle";
import ContactForm from "@/components/public/ContactForm";
import PulseDivider from "@/components/public/PulseDivider";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight, Mail } from "lucide-react";
import { benefits, donationProcess, urgentRequests, featuredDonors, testimonials, faqs } from "@/lib/data";
import { getSessionInServer } from "@/lib/api/core/session";
import { getAllPendingBlodRequest } from "@/lib/api/getDatas/getBlodDonetion";

export default async function HomePage() {

  const user = await getSessionInServer();
  const queryString = "";
  const {datas, totalPage} = await getAllPendingBlodRequest(queryString)

  return (
    <>
      <Hero user={user}/>

      {/* Why Donate */}
      <section className="section bg-white mb-32">
        <div className="container-app">
          <SectionTitle
            eyebrow="Why donate"
            title="Small act, outsized impact"
            desc="Blood can't be manufactured — it only comes from people willing to give it."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => <FeatureCard key={b.title} {...b} />)}
          </div>
        </div>
      </section>

      <PulseDivider />

      {/* Donation Process Timeline */}
      <section className="section bg-gray-50/60">
        <div className="container-app">
          <SectionTitle eyebrow="The process" title="From sign-up to donation, five short steps" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {donationProcess.map((p, i) => {
              const Icon = Icons[p.icon] || Icons.Circle;
              return (
                <div
                  key={p.step}
                  className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 pt-10"
                >
                  <span className="absolute top-0 left-3 font-display text-6xl font-bold text-red-50 select-none leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative font-display font-semibold text-gray-900 mb-2">{p.step}</h3>
                  <p className="relative text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Urgent Requests */}
      <section className="section bg-white my-32">
        <div className="container-app">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
            <SectionTitle
              eyebrow="Right now"
              title="Urgent donation requests"
              align="left"
              className="mb-0"
            />
            <Link
              href="/donation-requests"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary shrink-0"
            >
              View all requests <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {datas.slice(0, 4).map((r) => <BloodCard key={r._id} request={r} userRole={user?.role}/>)}
          </div>
        </div>
      </section>


      {/* Impact Numbers */}
      <section className="section relative overflow-hidden my-32">
        <svg className="absolute inset-x-0 bottom-0 w-[1400px] max-w-none opacity-10 pointer-events-none" viewBox="0 0 1400 200">
          <path d="M0 100 L500 100 L560 40 L620 160 L680 100 L1400 100" fill="none" stroke="white" strokeWidth="3" />
        </svg>
        <div className="container-app relative text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-black mb-12 sm:mb-14  mx-auto">
            Numbers that only move because people show up
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "48,210", label: "Units donated" },
              { value: "12,904", label: "Verified donors" },
              { value: "1,208", label: "Requests fulfilled" },
              { value: "64", label: "Districts covered" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl sm:text-5xl font-bold text-primary">{s.value}</p>
                <p className="text-black/50 text-sm mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container-app">
          <SectionTitle eyebrow="Voices" title="Stories from the network" />
          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-8 flex flex-col h-full">
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section my-32">
        <div className="container-app max-w-3xl mx-auto">
          <SectionTitle eyebrow="Questions" title="Frequently asked questions" />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer font-display font-semibold text-gray-900">
                  <span>{f.q}</span>
                  <Icons.ChevronDown className="h-5 w-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="text-sm text-gray-500 leading-relaxed mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Newsletter */}
      <section className="section bg-white mb-32">
        <div className="container-app grid lg:grid-cols-2 gap-10 lg:gap-12">
          <div>
            <SectionTitle eyebrow="Get in touch" title="Questions, partnerships, press" align="left" className="mb-8" />
            <ContactForm />
          </div>
          <div className="rounded-2xl bg-gray-900 text-white p-8 sm:p-10 flex flex-col justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-6 shrink-0">
              <Mail className="h-5.5 w-5.5" />
            </span>
            <h3 className="font-display text-2xl font-bold mb-3">Stay in the loop</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Monthly digest of urgent request trends, new donation camps, and donor milestones. No spam.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 min-w-0 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none"
              />
              <button type="submit" className="btn rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-md shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}