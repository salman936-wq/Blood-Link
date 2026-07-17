import Link from "next/link";
import { Droplet, SquareFunction, X, Film, Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-app pt-20 pb-10 w-10/12 mx-auto">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Droplet className="h-5 w-5" fill="white" strokeWidth={0} />
              </span>
              <span className="font-display text-xl font-bold text-white">Blood<span className="text-red-400">Link</span></span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              A verified network connecting willing donors to patients who need blood, fast.
            </p>
            <div className="flex gap-3 mt-6">
              {[SquareFunction, X, Film].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 hover:border-primary hover:bg-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:text-red-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-red-400 transition-colors">About us</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Privacy policy</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Terms of service</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-400 shrink-0" /> Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-red-400 shrink-0" /> +880 1234-567890</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-red-400 shrink-0" /> hello@bloodlink.org</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 BloodLink. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Droplet className="h-3.5 w-3.5 text-red-500" fill="currentColor" strokeWidth={0} /> for every donor who shows up.
          </p>
        </div>
      </div>
    </footer>
  );
}
