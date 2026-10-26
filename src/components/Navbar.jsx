
import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Workouts", href: "#workouts" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "Progress", href: "#progress" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#0b0d0c]/90 backdrop-blur-xl">
      <nav className="flex h-[72px] w-full items-center justify-between px-5 sm:px-8 lg:px-10 2xl:px-14">
        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          aria-label="FitTrack home"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-black transition duration-300 group-hover:rotate-6">
            <Activity size={23} strokeWidth={2.5} />
          </span>

          <span className="font-display text-xl font-bold tracking-tight">
            Fit<span className="text-lime-400">Track</span>
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-white/60 transition-colors duration-200 hover:text-lime-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop button */}
        <a
          href="#goals"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300 lg:inline-flex"
        >
          Set your goals
          <ArrowUpRight size={17} />
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white transition hover:border-lime-400/40 hover:text-lime-400 lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`grid overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "grid-rows-[1fr] border-t border-white/[0.07] opacity-100"
            : "grid-rows-[0fr] border-t border-transparent opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-1 px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 text-sm text-white/65 transition-colors duration-200 hover:bg-white/[0.05] hover:text-lime-400"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#goals"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-4 py-3 font-semibold text-black transition hover:bg-lime-300"
            >
              Set your goals
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
