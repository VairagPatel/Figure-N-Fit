import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <NavLink
      to="/"
      aria-label="Figure ‘n Fit Home"
      className={`relative flex items-center gap-2 ${className} motion-safe:animate-fade-in-down`}
    >
      {/* Logo image */}
      <img
        src={logo}
        alt="Figure ‘n Fit"
        className="h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />

      {/* Glow pulse on hover */}
      <span className="absolute inset-0 rounded-lg ring-0 ring-brand-400/50 transition-all duration-500 group-hover:ring-4 group-hover:animate-pulse-soft pointer-events-none" />
    </NavLink>
  );
}
