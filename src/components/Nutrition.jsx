import { useState } from "react";
import {
  Check,
  ChevronRight,
  Clock3,
  Flame,
  Leaf,
  Utensils,
} from "lucide-react";

const meals = [
  {
    id: 1,
    name: "Breakfast",
    time: "8:00 AM",
    title: "Avocado toast & eggs",
    calories: 420,
    protein: 24,
    carbs: 38,
    fat: 19,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Lunch",
    time: "1:00 PM",
    title: "Healthy grain bowl",
    calories: 560,
    protein: 32,
    carbs: 64,
    fat: 18,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Dinner",
    time: "7:00 PM",
    title: "Fresh greens & quinoa",
    calories: 480,
    protein: 28,
    carbs: 52,
    fat: 16,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Nutrition() {
  const [loggedMeals, setLoggedMeals] = useState([]);
  const [dailyTarget, setDailyTarget] = useState("2200");

  const consumedCalories = meals
    .filter((meal) => loggedMeals.includes(meal.id))
    .reduce((total, meal) => total + meal.calories, 0);

  const target = Math.max(1, Number(dailyTarget) || 2200);
  const progress = Math.min(100, (consumedCalories / target) * 100);

  const toggleMeal = (id) => {
    setLoggedMeals((current) =>
      current.includes(id)
        ? current.filter((mealId) => mealId !== id)
        : [...current, id]
    );
  };

  return (
    <section id="nutrition" className="section-wrap py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-lime-400">
              <Leaf size={17} />
              Fuel your body
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Nutrition <span className="text-white/40">matters.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Keep track of your daily meals and make healthier choices,
              one plate at a time.
            </p>
          </div>

          <a
            href="#goals"
            className="inline-flex items-center gap-2 text-sm font-semibold text-lime-400 transition hover:gap-3"
          >
            View your goals <ChevronRight size={18} />
          </a>
        </div>

        {/* Calorie summary */}
        <div className="mb-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">Daily calorie intake</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold">
                    {consumedCalories.toLocaleString()}
                  </span>
                  <span className="text-sm text-white/40">
                    / {target.toLocaleString()} kcal
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-400">
                <Flame size={23} />
              </div>
            </div>

            <div className="mt-7 h-2.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-lime-400 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between gap-3 text-xs text-white/45">
              <span>{Math.round(progress)}% of daily target</span>
              <span>
                {Math.max(0, target - consumedCalories).toLocaleString()} kcal
                remaining
              </span>
            </div>
          </div>

          <div className="glass-card flex flex-col justify-center rounded-3xl p-6 sm:p-8">
            <label
              htmlFor="daily-calorie-target"
              className="text-sm text-white/50"
            >
              Your daily calorie target
            </label>

            <div className="mt-3 flex gap-3">
              <input
                id="daily-calorie-target"
                type="number"
                min="500"
                max="10000"
                value={dailyTarget}
                onChange={(event) => setDailyTarget(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-lime-400/50"
                aria-label="Daily calorie target"
              />

              <div className="flex items-center rounded-xl bg-lime-400/10 px-4 text-sm font-semibold text-lime-400">
                kcal
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-white/40">
              Set a target that suits your needs. Individual calorie
              requirements vary.
            </p>
          </div>
        </div>

        {/* Meal cards */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold">Today's meals</h3>
          <span className="text-sm text-white/40">
            {loggedMeals.length} of {meals.length} logged
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {meals.map((meal) => {
            const isLogged = loggedMeals.includes(meal.id);

            return (
              <article
                key={meal.id}
                className="glass-card group overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-lime-400/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    <Clock3 className="mr-1.5 inline-block" size={13} />
                    {meal.time}
                  </span>

                  {isLogged && (
                    <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-lime-400 px-3 py-1.5 text-xs font-semibold text-black">
                      <Check size={14} /> Logged
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-widest text-lime-400">
                    {meal.name}
                  </p>

                  <h4 className="mt-2 font-display text-lg font-semibold">
                    {meal.title}
                  </h4>

                  <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
                    <Flame size={16} className="text-orange-400" />
                    <span>{meal.calories} kcal</span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-white/[0.04] p-3">
                      <p className="text-xs text-white/40">Protein</p>
                      <p className="mt-1 font-semibold">{meal.protein}g</p>
                    </div>

                    <div className="rounded-xl bg-white/[0.04] p-3">
                      <p className="text-xs text-white/40">Carbs</p>
                      <p className="mt-1 font-semibold">{meal.carbs}g</p>
                    </div>

                    <div className="rounded-xl bg-white/[0.04] p-3">
                      <p className="text-xs text-white/40">Fat</p>
                      <p className="mt-1 font-semibold">{meal.fat}g</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleMeal(meal.id)}
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition duration-300 ${
                      isLogged
                        ? "border border-lime-400/25 bg-lime-400/10 text-lime-400 hover:bg-red-400/10 hover:text-red-300"
                        : "bg-lime-400 text-black hover:bg-lime-300"
                    }`}
                  >
                    {isLogged ? (
                      <>
                        <Check size={17} /> Meal logged · Undo
                      </>
                    ) : (
                      <>
                        <Utensils size={17} /> Log this meal
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-5 text-white/35">
          Sample meals and calorie values are illustrative. Logging a meal
          updates this page's current session only.
        </p>
      </div>
    </section>
  );
}
