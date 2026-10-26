
import { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Footprints,
  Flame,
  Heart,
  Trophy,
  Zap,
} from "lucide-react";

const initialGoals = [
  {
    id: 1,
    title: "Walk 10,000 steps",
    description: "Keep moving throughout your day.",
    category: "DAILY ACTIVITY",
    icon: Footprints,
    color: "text-[#c1f36b]",
    bg: "bg-[#c1f36b]/10",
    progress: 68,
  },
  {
    id: 2,
    title: "Burn 500 calories",
    description: "Build a consistent movement routine.",
    category: "CALORIE GOAL",
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    progress: 82,
  },
  {
    id: 3,
    title: "Complete 4 workouts",
    description: "Make time for movement this week.",
    category: "WEEKLY FITNESS",
    icon: Trophy,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    progress: 50,
  },
  {
    id: 4,
    title: "Stay hydrated",
    description: "Remember to drink water regularly.",
    category: "DAILY WELLNESS",
    icon: Heart,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    progress: 75,
  },
];

export default function Goals() {
  const [goals, setGoals] = useState(initialGoals);

  const toggleGoal = (id) => {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: goal.progress >= 100 ? 0 : 100,
            }
          : goal
      )
    );
  };

  const completed = goals.filter((goal) => goal.progress >= 100).length;

  const overall = Math.round(
    goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length
  );

  return (
    <section id="goals" className="section-wrap py-20 sm:py-24">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-bold tracking-[0.22em] text-[#c1f36b]">
            MAKE IT HAPPEN
          </p>

          <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
            Goals that move you<span className="text-[#c1f36b]">.</span>
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-400">
            Build healthy habits one small win at a time.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c1f36b]/10 text-[#c1f36b]">
            <Trophy size={22} />
          </div>

          <div>
            <p className="font-display text-xl font-bold">
              {completed}/{goals.length}
            </p>
            <p className="text-xs text-gray-500">Goals completed</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-3xl border border-[#c1f36b]/15 bg-[#c1f36b]/[0.04] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-gray-400">
              Your overall goal progress
            </p>
            <p className="font-display mt-2 text-3xl font-bold">
              {overall}
              <span className="ml-1 text-base text-gray-500">%</span>
            </p>
          </div>

          <Zap size={28} className="text-[#c1f36b]" />
        </div>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-[#c1f36b] transition-all duration-700"
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          const done = goal.progress >= 100;

          return (
            <article
              key={goal.id}
              className="glass-card animate-fade-up rounded-3xl p-5 transition hover:border-white/15 sm:p-6"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${goal.bg} ${goal.color}`}
                >
                  <Icon size={23} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-gray-500">
                    {goal.category}
                  </p>

                  <h3 className="font-display mt-2 text-lg font-bold">
                    {goal.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    {goal.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleGoal(goal.id)}
                  aria-label={`${done ? "Reset" : "Complete"} ${goal.title}`}
                  aria-pressed={done}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                    done
                      ? "border-[#c1f36b] bg-[#c1f36b] text-[#10130d]"
                      : "border-white/15 text-gray-400 hover:border-[#c1f36b] hover:text-[#c1f36b]"
                  }`}
                >
                  {done ? <Check size={18} /> : <CheckCircle2 size={18} />}
                </button>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Completion</span>
                  <span
                    className={
                      done
                        ? "font-bold text-[#c1f36b]"
                        : "font-semibold text-gray-300"
                    }
                  >
                    {goal.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full bg-[#c1f36b] transition-all duration-700"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-7">
        <div>
          <p className="font-display text-xl font-bold">
            Ready for your next win?
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Pick a workout and keep building your routine.
          </p>
        </div>

        <a
          href="#workouts"
          className="inline-flex items-center gap-2 rounded-full bg-[#c1f36b] px-5 py-3.5 text-sm font-bold text-[#10130d] transition hover:bg-[#d3ff8d]"
        >
          Explore workouts <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
