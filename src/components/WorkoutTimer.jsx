
import { useEffect, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Clock3,
  Flame,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";

export default function WorkoutTimer({ workout, onClose, onComplete }) {
  const totalSeconds = workout.duration * 60;

  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running || finished) return;

    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          setFinished(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, finished]);

  const elapsedSeconds = totalSeconds - remaining;
  const progress = (elapsedSeconds / totalSeconds) * 100;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const completeWorkout = () => {
    const seconds = finished ? totalSeconds : elapsedSeconds;

    onComplete({
      workoutId: workout.id,
      workoutTitle: workout.title,
      durationMinutes: Math.max(1, Math.round(seconds / 60)),
      actualSeconds: seconds,
      calories: Math.round(
        workout.calories * (seconds / totalSeconds)
      ),
      completedAt: new Date().toISOString(),
    });
  };

  const resetTimer = () => {
    setRunning(false);
    setFinished(false);
    setRemaining(totalSeconds);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="workout-timer-title"
        className="my-auto w-full max-w-lg animate-fade-in rounded-3xl border border-white/10 bg-[#121512] p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-lime-400">
              <Activity size={17} />
              WORKOUT IN PROGRESS
            </p>

            <h2
              id="workout-timer-title"
              className="mt-3 font-display text-2xl font-bold text-white"
            >
              {finished ? "Session complete!" : workout.title}
            </h2>

            <p className="mt-2 text-sm text-white/50">
              {finished
                ? "Great work. Save your session to your progress."
                : `${workout.level} · ${workout.duration} minutes`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close workout timer"
            className="rounded-xl border border-white/10 p-2 text-white/60 transition hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {finished ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-400/10 text-lime-400">
              <CheckCircle2 size={42} />
            </div>

            <p className="mt-5 text-5xl font-bold text-white">
              {workout.duration}
              <span className="ml-2 text-lg font-medium text-white/40">
                min
              </span>
            </p>

            <p className="mt-3 text-white/50">
              Estimated calories: {workout.calories} kcal
            </p>

            <button
              type="button"
              onClick={completeWorkout}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-4 font-semibold text-black transition hover:bg-lime-300"
            >
              <CheckCircle2 size={19} />
              Save completed workout
            </button>
          </div>
        ) : (
          <>
            <div className="my-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400">
                <Clock3 size={32} />
              </div>

              <p className="font-display text-6xl font-bold tabular-nums tracking-tight text-white sm:text-7xl">
                {formatTime(remaining)}
              </p>

              <p className="mt-3 text-sm text-white/45">
                {running
                  ? "Stay focused. You've got this!"
                  : elapsedSeconds > 0
                    ? "Paused — resume when you're ready"
                    : "Ready when you are"}
              </p>

              <div
                className="mt-7 h-2 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Workout time elapsed"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className="h-full rounded-full bg-lime-400 transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex justify-between text-xs text-white/40">
                <span>{formatTime(elapsedSeconds)} elapsed</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={resetTimer}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3.5 text-sm font-medium text-white/75 transition hover:bg-white/[0.05]"
              >
                <RotateCcw size={17} />
                Reset
              </button>

              <button
                type="button"
                onClick={() => setRunning((value) => !value)}
                className="flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-4 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-300"
              >
                {running ? <Pause size={17} /> : <Play size={17} />}
                {running ? "Pause" : "Start / Resume"}
              </button>
            </div>

            <button
              type="button"
              onClick={completeWorkout}
              disabled={elapsedSeconds === 0}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-lime-400/20 px-4 py-3.5 text-sm font-semibold text-lime-400 transition hover:bg-lime-400/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Flame size={17} />
              Finish workout early
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-white/35">
              Estimated calories are based on the workout's sample value and
              elapsed time.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
