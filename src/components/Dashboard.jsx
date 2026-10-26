
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Flame,
  Footprints,
  HeartPulse,
  Timer,
  Zap,
} from "lucide-react";

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function Dashboard({ completedWorkouts = [], sessions = [] }) {
  const totalCalories = sessions.reduce(
    (sum, session) => sum + session.calories,
    0
  );

  const totalMinutes = Math.round(
    sessions.reduce(
      (sum, session) =>
        sum + (session.actualSeconds ?? session.durationMinutes * 60),
      0
    ) / 60
  );

  const today = new Date().toDateString();

  const todaySessions = sessions.filter(
    (session) => new Date(session.completedAt).toDateString() === today
  );

  const todayMinutes = Math.round(
    todaySessions.reduce(
      (sum, session) =>
        sum + (session.actualSeconds ?? session.durationMinutes * 60),
      0
    ) / 60
  );

  const stats = [
    {
      label: "Calories burned",
      value: totalCalories.toLocaleString(),
      unit: "kcal",
      note: "Saved workout sessions",
      icon: Flame,
      color: "text-orange-400",
      background: "bg-orange-400/10",
    },
    {
      label: "Workout duration",
      value: totalMinutes,
      unit: "min",
      note: "Total completed time",
      icon: Timer,
      color: "text-cyan-400",
      background: "bg-cyan-400/10",
    },
    {
      label: "Sessions completed",
      value: sessions.length,
      unit: "total",
      note: `${completedWorkouts.length} workout types tried`,
      icon: HeartPulse,
      color: "text-rose-400",
      background: "bg-rose-400/10",
    },
    {
      label: "Today's activity",
      value: todayMinutes,
      unit: "min",
      note: `${todaySessions.length} sessions today`,
      icon: Zap,
      color: "text-lime-400",
      background: "bg-lime-400/10",
    },
  ];

  return (
    <section className="section-wrap py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-lime-400">
              YOUR OVERVIEW
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Fitness dashboard<span className="text-lime-400">.</span>
            </h2>
            <p className="mt-3 text-sm text-white/50">
              Your saved activity at a glance.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/60">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            Live from your sessions
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="glass-card rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-lime-400/20"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.background} ${stat.color}`}
                  >
                    <Icon size={22} />
                  </span>
                  <ArrowUpRight size={18} className="text-white/30" />
                </div>

                <p className="mt-5 text-sm text-white/50">{stat.label}</p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/40">{stat.unit}</span>
                </div>

                <p className="mt-2 text-xs text-white/35">{stat.note}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">All-time activity</p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  Keep showing up.
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                <Activity size={24} />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Footprints className="text-lime-400" size={21} />
                <p className="mt-4 text-2xl font-bold">{sessions.length}</p>
                <p className="mt-1 text-xs text-white/45">
                  Saved sessions
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Flame className="text-orange-400" size={21} />
                <p className="mt-4 text-2xl font-bold">
                  {totalCalories.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-white/45">
                  Estimated kcal
                </p>
              </div>
            </div>

            <a
              href="#workouts"
              className="mt-6 flex items-center justify-between rounded-xl bg-lime-400 px-5 py-4 text-sm font-semibold text-black transition hover:bg-lime-300"
            >
              Start your next workout
              <ArrowUpRight size={19} />
            </a>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold">
                  Recent workouts
                </h3>
                <p className="mt-1 text-sm text-white/45">
                  Your latest completed sessions
                </p>
              </div>
              <CheckCircle2 className="shrink-0 text-lime-400" size={22} />
            </div>

            {sessions.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 text-center">
                <Activity size={30} className="text-white/30" />
                <p className="mt-4 font-semibold">Your journey starts here</p>
                <p className="mt-2 text-sm leading-6 text-white/45">
                  Complete your first timed workout and it will appear here.
                </p>
              </div>
            ) : (
              <div className="max-h-[320px] space-y-3 overflow-y-auto pr-1">
                {sessions.slice(0, 8).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                      <CheckCircle2 size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {session.workoutTitle}
                      </p>
                      <p className="mt-1 text-xs text-white/45">
                        {formatDate(session.completedAt)}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold">
                        {session.durationMinutes} min
                      </p>
                      <p className="mt-1 text-xs text-lime-400">
                        {session.calories} kcal
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="mt-5 text-xs leading-5 text-white/35">
          Workout history is stored in this browser on this device. Calorie
          values are estimates, not measurements from a fitness device.
        </p>
      </div>
    </section>
  );
}
