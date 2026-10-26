
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Flame,
  Play,
  Sparkles,
  Users,
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=90";

const gymImage =
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=90";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100vh-72px)] w-full items-center overflow-hidden bg-[#090c09]"
    >
      {/* Full-screen gym background */}
      <div className="absolute inset-0 -z-30">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover object-center opacity-35"
          fetchPriority="high"
        />
      </div>

      {/* Dark overlays for text readability */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#090c09] via-[#090c09]/90 to-[#090c09]/45" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#090c09] via-transparent to-[#090c09]/40" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-96 w-96 rounded-full bg-lime-400/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-[120px]" />

      <div className="grid w-full grid-cols-1 items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:px-8 xl:px-10 2xl:px-12">
        {/* Left content */}
        <div className="relative z-10 animate-fade-up">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime-400/25 bg-lime-400/[0.08] px-4 py-2.5 text-sm font-medium text-lime-300 shadow-lg shadow-black/10 backdrop-blur-xl">
            <Sparkles size={16} />
            Your fitness journey starts here
          </div>

          <h1 className="font-display max-w-3xl text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-8xl">
            Build your
            <span className="block">stronger</span>
            <span className="block text-lime-400">self.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
            Track your workouts, understand your progress, and build healthier
            habits with your personal fitness dashboard.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#workouts"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-lime-400 px-6 py-4 font-semibold text-black shadow-lg shadow-lime-400/10 transition duration-300 hover:-translate-y-1 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/20"
            >
              Explore workouts
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#dashboard"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-6 py-4 font-medium text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:bg-white/10"
            >
              <Play size={17} className="text-lime-400" />
              View dashboard
            </a>
          </div>

          {/* Trust / activity stats */}
          <div className="mt-12 grid max-w-2xl grid-cols-3 divide-x divide-white/15 border-t border-white/10 pt-7">
            <div className="pr-3 sm:pr-6">
              <div className="flex items-center gap-2">
                <Flame size={20} className="text-orange-400" />
                <span className="font-display text-xl font-bold text-white sm:text-2xl">
                  450+
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/50 sm:text-sm">
                Workout routines
              </p>
            </div>

            <div className="px-3 sm:px-6">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-lime-400" />
                <span className="font-display text-xl font-bold text-white sm:text-2xl">
                  10K+
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/50 sm:text-sm">
                Active users
              </p>
            </div>

            <div className="pl-3 sm:pl-6">
              <div className="flex items-center gap-2">
                <BarChart3 size={20} className="text-cyan-400" />
                <span className="font-display text-xl font-bold text-white sm:text-2xl">
                  95%
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/50 sm:text-sm">
                Goal achievement
              </p>
            </div>
          </div>
        </div>

        {/* Right featured workout card */}
        <div className="relative mx-auto w-full max-w-2xl animate-fade-in lg:ml-auto">
          {/* Glow behind card */}
          <div className="absolute -inset-5 rounded-[2.5rem] bg-lime-400/[0.08] blur-3xl" />

          <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.06] p-2 shadow-2xl shadow-black/40 backdrop-blur-md transition duration-500 hover:border-lime-400/30">
            <div className="relative min-h-[390px] overflow-hidden rounded-[1.5rem] sm:min-h-[500px] lg:min-h-[540px]">
              <img
                src={gymImage}
                alt="Athlete training in a modern gym"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />

              {/* Featured label */}
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white backdrop-blur-xl sm:left-7 sm:top-7">
                FEATURED TRAINING
              </div>

              {/* Main card content */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-lime-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
                  MAKE EVERY DAY COUNT
                </div>

                <h2 className="font-display max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Progress over perfection.
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/65 sm:text-base">
                  Every rep, every step, every day brings you closer to your
                  strongest self.
                </p>

                <a
                  href="#progress"
                  aria-label="Explore your progress"
                  className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime-400 text-black transition duration-300 hover:rotate-45 hover:scale-110 hover:bg-lime-300"
                >
                  <ArrowUpRight size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Floating consistency card */}
          <div className="absolute -left-2 top-12 flex max-w-[245px] items-center gap-3 rounded-2xl border border-white/10 bg-[#151815]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:-left-7 sm:top-16 sm:gap-4 sm:p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-400/15 text-lime-400">
              <Play size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Stay consistent</p>
              <p className="mt-1 text-xs text-white/50">
                One workout at a time
              </p>
            </div>
          </div>

          {/* Floating motivation card */}
          <div className="absolute -bottom-5 right-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151815]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:-right-5 sm:gap-4 sm:p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400/15 text-lime-400">
              <ArrowDown size={21} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Keep moving</p>
              <p className="mt-1 text-xs text-white/50">Small steps matter</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
