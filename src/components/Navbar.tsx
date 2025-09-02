import { NavLink } from "react-router-dom";
import { useEffect, useId, useState } from "react";
import { BotMessageSquare } from "lucide-react"; // AI chat icon
import Logo from "./Logo";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheetId = useId();
  const { enabled, toggle } = useDarkMode();

  // close on ESC for accessibility
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Programs" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/blog", label: "Blog" },
    { to: "/locations", label: "Locations" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b transition
        ${scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-white/70 backdrop-blur"}
        motion-reduce:transition-none motion-safe:animate-fade-in`}
    >
      <div className="container h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `group relative px-2 py-2 text-sm font-medium transition
                 ${isActive ? "text-brand-700" : "text-gray-700 hover:text-brand-700"}`
              }
            >
              <span className="relative z-10">{n.label}</span>
              {/* underline sweep */}
              <span
                className="pointer-events-none absolute left-2 right-2 bottom-[6px] h-0.5 origin-left scale-x-0 rounded bg-brand-400 transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden
              />
              {/* active dot */}
              <span
                className={`pointer-events-none absolute left-1/2 -bottom-[6px] h-1 w-1 -translate-x-1/2 rounded-full bg-brand-600 transition-opacity ${location.pathname === n.to ? "opacity-100" : "opacity-0"}`}
                aria-hidden
              />
            </NavLink>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
  onClick={toggle}
  className="rounded-full p-2 border hover:bg-gray-100 dark:hover:bg-gray-800"
  aria-label="Toggle Dark Mode"
>
  {enabled ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
</button>
          {/* 🚀 New Assistant Button */}
          <NavLink
            to="/assistant"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white bg-brand-400 hover:bg-brand-500
                       shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-300
                       transition motion-safe:hover:scale-105"
          >
            <BotMessageSquare className="h-4 w-4" />
            Assistant
          </NavLink>

          {/* Existing Book button */}
          <NavLink
            to="/book-appointment"
            className="rounded-full px-4 py-2 text-white bg-gradient-to-r from-brand-500 to-brand-600
                       shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-300
                       motion-safe:hover:animate-pulse-soft"
          >
            Book
          </NavLink>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative h-10 w-10 grid place-items-center rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-300"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls={sheetId}
        >
          {/* 3 lines → X animation */}
          <span
            className={`block h-0.5 w-6 bg-gray-900 transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-900 transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-900 transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        id={sheetId}
        className={`md:hidden border-t bg-white overflow-hidden ${
          open ? "motion-safe:animate-slide-down" : "hidden"
        }`}
      >
        <nav className="container py-3 grid gap-2">
          {links.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-2 py-2 rounded text-sm font-medium transition
                 ${isActive ? "bg-brand-50 text-brand-700" : "text-gray-800 hover:bg-brand-50"}`
              }
            >
              {n.label}
            </NavLink>
          ))}

          {/* Assistant button mobile */}
          <NavLink
            to="/assistant"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-full bg-brand-400 hover:bg-brand-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            <BotMessageSquare className="h-4 w-4" />
            Assistant
          </NavLink>

          {/* Book button mobile */}
          <NavLink
            to="/book-appointment"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center rounded-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            Book Appointment
          </NavLink>
        </nav>
      </div>
    </header>
  );
}