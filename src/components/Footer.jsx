
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";

// Social icons using inline SVG — no extra icon package required.
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 13.9 4.9 22H1.8l7.3-8.4L1.2 2h6.5l4.5 7.5L18.9 2Zm-1.1 17.8h1.7L6.7 4.1H4.9l12.9 15.7Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[19px] w-[19px]">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Workouts", href: "#workouts" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Progress", href: "#progress" },
];

const resources = [
  { label: "BMI Calculator", href: "#bmi" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "Fitness Goals", href: "#goals" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: InstagramIcon,
  },
  {
    label: "X",
    href: "https://x.com/",
    Icon: XIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    Icon: YouTubeIcon,
  },
];

const linkClass =
  "text-sm text-gray-400 transition-colors duration-200 hover:text-[#c1f36b]";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.07] bg-[#080a08]">
      <div className="section-wrap py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1.1fr] lg:gap-8">
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c1f36b] text-[#10130d]">
                <Activity size={23} strokeWidth={2.6} />
              </span>
              <span className="font-display text-2xl font-bold">
                fit<span className="text-[#c1f36b]">track</span>.
              </span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
              Your personal fitness companion. Move with purpose, nourish
              your body, and celebrate every step forward.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition duration-200 hover:-translate-y-1 hover:border-[#c1f36b]/40 hover:bg-[#c1f36b]/10 hover:text-[#c1f36b]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-base font-bold">Explore</h3>
            <ul className="mt-5 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-bold">Resources</h3>
            <ul className="mt-5 space-y-4">
              {resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-bold">Get in touch</h3>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Have feedback or questions about the FitTrack demo?
              We'd love to hear from you.
            </p>

            <div className="mt-5 space-y-4">
              <a
                href="mailto:hello@fittrack.com"
                className="flex items-center gap-3 break-all text-sm text-gray-400 transition hover:text-[#c1f36b]"
              >
                <Mail size={17} className="shrink-0 text-[#c1f36b]" />
                hello@fittrack.com
              </a>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size={17} className="shrink-0 text-[#c1f36b]" />
                Bengaluru, India
              </div>
            </div>

            <a
              href="mailto:hello@fittrack.com?subject=FitTrack%20Feedback"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#c1f36b] transition hover:gap-3"
            >
              Send feedback <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} FitTrack. Built for your next level.
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 transition hover:text-[#c1f36b]"
          >
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
