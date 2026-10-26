
import { useState } from "react";
import { Activity, ArrowRight, Calculator, RotateCcw } from "lucide-react";

function getCategory(bmi) {
  if (bmi < 18.5) {
    return {
      label: "Underweight",
      color: "text-sky-400",
      description: "Consider discussing your nutritional needs with a healthcare professional.",
    };
  }

  if (bmi < 25) {
    return {
      label: "Healthy weight range",
      color: "text-[#c1f36b]",
      description: "Your BMI is within the usual healthy adult reference range.",
    };
  }

  if (bmi < 30) {
    return {
      label: "Overweight",
      color: "text-orange-400",
      description: "Consider discussing your health goals with a healthcare professional.",
    };
  }

  return {
    label: "Obesity range",
    color: "text-rose-400",
    description: "A healthcare professional can help you understand your individual health needs.",
  };
}

export default function BMICalculator() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("68");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function calculateBMI(event) {
    event.preventDefault();

    const h = Number(height);
    const w = Number(weight);

    if (
      !height.trim() ||
      !weight.trim() ||
      !Number.isFinite(h) ||
      !Number.isFinite(w) ||
      h < 50 ||
      h > 280 ||
      w < 10 ||
      w > 500
    ) {
      setError("Enter a height between 50–280 cm and weight between 10–500 kg.");
      setResult(null);
      return;
    }

    const bmi = w / ((h / 100) ** 2);

    setResult({
      value: bmi.toFixed(1),
      ...getCategory(bmi),
    });
    setError("");
  }

  function resetCalculator() {
    setHeight("170");
    setWeight("68");
    setResult(null);
    setError("");
  }

  return (
    <section
      id="bmi"
      className="border-y border-white/[0.05] bg-[#101310] py-20 sm:py-24"
    >
      <div className="section-wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-xs font-bold tracking-[0.22em] text-[#c1f36b]">
            KNOW YOUR NUMBERS
          </p>

          <h2 className="font-display mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Understand your
            <br />
            <span className="text-[#c1f36b]">body better.</span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400">
            Calculate your Body Mass Index using your height and weight.
            Use BMI as a general adult screening measure, not as a diagnosis.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
              <Activity size={22} className="text-[#c1f36b]" />
              <p className="mt-4 text-sm font-semibold">Track your habits</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Movement, nutrition, and consistency all matter.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
              <Calculator size={22} className="text-sky-400" />
              <p className="mt-4 text-sm font-semibold">Instant calculation</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Calculate BMI using metric measurements.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-9">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c1f36b]/10 text-[#c1f36b]">
              <Calculator size={24} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">
                BMI calculator
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Metric units · kg and cm
              </p>
            </div>
          </div>

          <form onSubmit={calculateBMI} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="height"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                min="50"
                max="280"
                step="0.1"
                required
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                placeholder="e.g. 170"
                className="w-full rounded-xl border border-white/10 bg-[#0b0d0c] px-4 py-4 text-white outline-none transition focus:border-[#c1f36b]/60"
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                min="10"
                max="500"
                step="0.1"
                required
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder="e.g. 68"
                className="w-full rounded-xl border border-white/10 bg-[#0b0d0c] px-4 py-4 text-white outline-none transition focus:border-[#c1f36b]/60"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-rose-400">
                {error}
              </p>
            )}

            {result && (
              <div
                aria-live="polite"
                className="animate-fade-up rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
              >
                <p className="text-xs text-gray-400">Your BMI result</p>

                <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                  <p className="font-display text-5xl font-bold">
                    {result.value}
                  </p>
                  <span className={`text-sm font-bold ${result.color}`}>
                    {result.label}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-6 text-gray-400">
                  {result.description}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#c1f36b] px-5 py-4 font-bold text-[#10130d] transition hover:bg-[#d3ff8d]"
              >
                Calculate BMI <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={resetCalculator}
                aria-label="Reset BMI calculator"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:bg-white/[0.05]"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </form>

          <p className="mt-5 text-[11px] leading-5 text-gray-500">
            BMI is a general screening measure and may not reflect individual
            health accurately in every case.
          </p>
        </div>
      </div>
    </section>
  );
}
