
import {
  Activity,
  ArrowRight,
  Check,
  Dumbbell,
  Flame,
  Heart,
  Timer,
  Zap,
} from "lucide-react";

const workouts = [
  {
    id: 1,
    title: "Cardio Burn",
    category: "CARDIO",
    description: "Boost your endurance and get your heart pumping.",
    duration: 25,
    calories: 220,
    level: "Beginner",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    title: "Strength Builder",
    category: "STRENGTH",
    description: "Build strength with a focused full-body session.",
    duration: 40,
    calories: 320,
    level: "Intermediate",
    icon: Dumbbell,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    title: "Mindful Flow",
    category: "YOGA",
    description: "Improve flexibility, balance, and recovery.",
    duration: 20,
    calories: 120,
    level: "Beginner",
    icon: Activity,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    title: "HIIT Challenge",
    category: "HIIT",
    description: "A powerful interval workout for your whole body.",
    duration: 30,
    calories: 350,
    level: "Advanced",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Workouts({
  completedWorkouts = [],
  onStartWorkout = () => {},
}) {
  return (
    <section id="workouts" className="section-wrap py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-lime-400">
              <Dumbbell size={17} />
              Find your strength
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Move with <span className="text-white/40">purpose.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Choose a workout, start your timer, and celebrate every step
              forward.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/50">
            <Activity size={17} className="text-lime-400" />
            {completedWorkouts.length} of {workouts.length} workout types completed
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {workouts.map((workout) => {
            const Icon = workout.icon;
            const hasCompleted = completedWorkouts.includes(workout.id);

            return (
              <article
                key={workout.id}
                className="glass-card group overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-lime-400/25"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={workout.image}
                    alt={workout.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-white backdrop-blur-md">
                    {workout.category}
                  </span>

                  <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-black">
                    <Icon size={22} />
                  </div>

                  {hasCompleted && (
                    <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-lime-400 px-3 py-1.5 text-xs font-semibold text-black">
                      <Check size={14} />
                      Completed before
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-xs text-white/45">
                      {workout.level}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        workout.level === "Beginner"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : workout.level === "Intermediate"
                            ? "bg-amber-400/10 text-amber-300"
                            : "bg-rose-400/10 text-rose-300"
                      }`}
                    >
                      {workout.level}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold">
                    {workout.title}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-white/45">
                    {workout.description}
                  </p>

                  <div className="mt-5 flex items-center gap-4 border-t border-white/[0.07] pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-white/55">
                      <Timer size={15} className="text-lime-400" />
                      {workout.duration} min
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-white/55">
                      <Flame size={15} className="text-orange-400" />
                      {workout.calories} kcal
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartWorkout(workout)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 px-4 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-lime-300"
                  >
                    {hasCompleted ? "Train again" : "Start workout"}
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
