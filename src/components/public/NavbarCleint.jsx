"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Droplet, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function NavbarCleint({ user }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-md border-b border-gray-200" : "bg-white/95 border-b border-transparent "}`}>

            <nav className="container-app flex items-center justify-between h-20 w-10/12 mx-auto">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                        <Droplet className="h-5 w-5" fill="white" strokeWidth={0} />
                    </span>
                    <span className="font-display text-xl font-bold text-gray-900">Blood<span className="text-primary">Link</span></span>
                </Link>

                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors relative group">
                            {link.label}
                            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    {user && <Link href={`/dashboard/${user?.role}`} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors relative group">Dashboard<span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" /></Link>}
                </div>

                {!user ? (
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="btn btn-ghost rounded-xl px-5 text-gray-700 hover:bg-gray-100 transition-all"
                        >
                            Log In
                        </Link>

                        <Link
                            href="/register"
                            className="btn rounded-xl px-6 bg-primary hover:bg-red-700 text-white border-none shadow-lg hover:shadow-xl transition-all"
                        >
                            Become a Donor
                        </Link>
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center gap-4">
                        {/* User Info */}
                        <div className="flex items-center gap-3 rounded-2xl px-3 py-2 ">
                            <div className="leading-tight">
                                <h4 className="font-semibold text-gray-800">
                                    {user.name}
                                </h4>

                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-primary font-medium">
                                        {user.bloodGroup}
                                    </span>

                                    <span
                                        className={`badge badge-sm ${user.activeStutus
                                                ? "badge-success text-white"
                                                : "badge-error text-white"
                                            }`}
                                    >
                                        {user.activeStutus ? "Available" : "Unavailable"}
                                    </span>
                                </div>
                            </div>
<Link href={`/dashboard/${user?.role}`}>
                            <img
                            
                                src={user.image}
                                alt={user.name}
                                className="w-11 h-11 rounded-full object-cover border-2 border-primary cursor-pointer"
                            />
                            </Link>
                        </div>
                    </div>
                )}

                <button className="lg:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            <div className={`lg:hidden overflow-hidden transition-all duration-300  ${open ? "max-h-96 border-t border-gray-200" : "max-h-0"}`}>
                <div className="container-app py-4 flex flex-col gap-1 w-10/12 mx-auto">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="py-3 text-sm font-medium text-gray-700 hover:text-primary border-b border-gray-100 last:border-0" onClick={() => setOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex gap-3 pt-4">
                        <Link href="/login" className="btn btn-ghost rounded-xl flex-1 text-white/90 bg-black">Log in</Link>
                        <Link href="/register" className="btn rounded-xl flex-1 bg-primary hover:bg-red-700 text-white border-none">Become a donor</Link>
                    </div>
                </div>
            </div>

        </header>
    );
}
