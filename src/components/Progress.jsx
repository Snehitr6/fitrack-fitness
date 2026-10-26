
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Flame,
  Timer,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function dayKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function formatMinutes(seconds) {
  return Math.round(seconds / 60);
}

function sessionSeconds(session) {
  return session.actualSeconds ?? session.durationMinutes * 60;
}

export default function Progress({ completedWorkouts = [], sessions = [] }) {
  const [period, setPeriod] = useState("Week");

  const chartData = useMemo(() => {
    const today = new Date();
    const points = [];

    if (period === "Week") {
      for (let offset = 6; offset >= 0; offset--) {
        const date = new Date(today);
        date.setHours(0, 0, 0, 0);
        date.setDate(today.getDate() - offset);

        const daySessions = sessions.filter(
          (session) => dayKey(new Date(session.completedAt)) === dayKey(date)
        );

        points.push({
          day: date.toLocaleDateString(undefined, { weekday: "short" }),
          minutes: daySessions.reduce(
            (sum, session) => sum + formatMinutes(sessionSeconds(session)),
            0
          ),
          calories: daySessions.reduce(
            (sum, session) => sum + session.calories,
            0
          ),
        });
      }
    } else {
      for (let week = 3; week >= 0; week--) {
        const end = new Date(today);
        end.setHours(23, 59, 59, 999);
        end.setDate(today.getDate() - week * 7);

        const start = new Date(end);
        start.setHours(0, 0, 0, 0);
        start.setDate(end.getDate() - 6);

        const weekSessions = sessions.filter((session) => {
          const date = new Date(session.completedAt);
          return date >= start && date <= end;
        });

        points.push({
          day: `Week ${4 - week}`,
          minutes: weekSessions.reduce(
            (sum, session) => sum + formatMinutes(sessionSeconds(session)),
            0
          ),
          calories: weekSessions.reduce(
            (sum, session) => sum + session.calories,
            0
          ),
        });
      }
    }

    return points;
  }, [period, sessions]);

  const totalMinutes = sessions.reduce(
    (sum, session) => sum + formatMinutes(sessionSeconds(session)),
    0
  );

  const totalCalories = sessions.reduce(
    (sum, session) => sum + session.calories,
    0
  );

  const stats = [
    {
      label: "Workout time",
      value: totalMinutes,
      unit: "mins",
      icon: Timer,
      note: "Across saved sessions",
    },
    {
      label: "Calories burned",
      value: totalCalories.toLocaleString(),
      unit: "kcal",
      icon: Flame,
      note: "Estimated total",
    },
    {
      label: "Completed sessions",
      value: sessions.length,
      unit: "sessions",
      icon: CheckCircle2,
      note: `${completedWorkouts.length} workout types tried`,
    },
  ];

  return (
    <section id="progress" className="section-wrap py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-lime-400">
              <Activity size={17} />
              Your journey
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Progress that <span className="text-white/40">motivates.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Your chart updates automatically as you save workout sessions.
            </p>
          </div>

          <div className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.03] p-1">
            {["Week", "Month"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPeriod(item)}
                className={`rounded-lg px-5 py-2 text-sm transition ${
                  period === item
                    ? "bg-lime-400 font-semibold text-black"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-lime-400/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                    <Icon size={21} />
                  </div>
                  <ArrowUpRight size={18} className="text-white/30" />
                </div>

                <p className="mt-5 text-sm text-white/50">{stat.label}</p>

                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="font-display text-3xl font-bold">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/40">{stat.unit}</span>
                </div>

                <p className="mt-2 text-xs text-white/35">{stat.note}</p>
              </div>
            );
          })}
        </div>

        <div className="glass-card rounded-3xl p-5 sm:p-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold">
                Activity overview
              </h3>
              <p className="mt-2 text-sm text-white/45">
                Workout minutes per {period === "Week" ? "day" : "week"}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-lime-400/10 px-3 py-2 text-xs font-medium text-lime-400">
              <CalendarDays size={15} />
              {period === "Week" ? "Last 7 days" : "Last 4 weeks"}
            </div>
          </div>

          {sessions.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400">
                <Activity size={27} />
              </div>
              <h4 className="mt-5 font-semibold">Your progress starts today</h4>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">
                Complete a timed workout to see your real activity in this
                chart.
              </p>
              <a
                href="#workouts"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime-400 hover:text-lime-300"
              >
                Choose a workout <ArrowUpRight size={17} />
              </a>
            </div>
          ) : (
            <div className="h-[280px] w-full sm:h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="progressFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#a3e635"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#a3e635"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="rgba(255,255,255,0.07)"
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888d87", fontSize: 12 }}
                    dy={10}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888d87", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#171a17",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "12px",
                      color: "#f5f7f3",
                    }}
                    labelStyle={{ color: "#a3e635", marginBottom: 5 }}
                    formatter={(value) => [`${value} min`, "Workout time"]}
                  />

                  <Area
                    type="monotone"
                    dataKey="minutes"
                    stroke="#a3e635"
                    strokeWidth={3}
                    fill="url(#progressFill)"
                    activeDot={{
                      r: 6,
                      fill: "#a3e635",
                      stroke: "#0b0d0c",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-5 text-sm text-white/45">
            <Flame size={17} className="text-lime-400" />
            Session totals: {totalMinutes} minutes ·{" "}
            {totalCalories.toLocaleString()} estimated kcal
          </div>
        </div>
      </div>
    </section>
  );
}
