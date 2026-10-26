
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Workouts from "./components/Workouts";
import Progress from "./components/Progress";
import BMICalculator from "./components/BMICalculator";
import Nutrition from "./components/Nutrition";
import Goals from "./components/Goals";
import Footer from "./components/Footer";
import WorkoutTimer from "./components/WorkoutTimer";
import Preloader from "./components/Preloader";
import ScrollAnimations from "./components/ScrollAnimations";

const STORAGE_KEY = "fittrackWorkoutSessions";

function loadSessions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState(loadSessions);
  const [activeWorkout, setActiveWorkout] = useState(null);

  // Save completed workout sessions.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {
      // Keep the app usable if browser storage is unavailable.
    }
  }, [sessions]);

  // Prevent scrolling while the preloader is visible.
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  // Track workouts completed at least once.
  const completedWorkouts = [
    ...new Set(sessions.map((session) => session.workoutId)),
  ];

  // Open the workout timer.
  const startWorkout = (workout) => {
    setActiveWorkout(workout);
  };

  // Save a completed workout.
  const saveWorkout = (session) => {
    const savedSession = {
      ...session,
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
    };

    setSessions((current) => [savedSession, ...current]);
    setActiveWorkout(null);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#0b0d0c] text-[#f5f7f3]">
      {/* Global scroll reveal animations */}
      <ScrollAnimations />

      {/* Animated opening screen */}
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      {/* Main website */}
      <Navbar />

      <main className="pt-[72px]">
        {/* Hero */}
        <Hero />

        {/* Dashboard */}
        <div id="dashboard" className="scroll-mt-24">
          <Dashboard
            completedWorkouts={completedWorkouts}
            sessions={sessions}
          />
        </div>

        {/* Workouts and interactive timer */}
        <div id="workouts" className="scroll-mt-24">
          <Workouts
            completedWorkouts={completedWorkouts}
            onStartWorkout={startWorkout}
          />
        </div>

        {/* Progress charts */}
        <div id="progress" className="scroll-mt-24">
          <Progress
            completedWorkouts={completedWorkouts}
            sessions={sessions}
          />
        </div>

        {/* BMI calculator */}
        <div id="bmi" className="scroll-mt-24">
          <BMICalculator />
        </div>

        {/* Nutrition */}
        <div id="nutrition" className="scroll-mt-24">
          <Nutrition />
        </div>

        {/* Fitness goals */}
        <div id="goals" className="scroll-mt-24">
          <Goals />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Workout timer modal */}
      {activeWorkout && (
        <WorkoutTimer
          key={activeWorkout.id}
          workout={activeWorkout}
          onClose={() => setActiveWorkout(null)}
          onComplete={saveWorkout}
        />
      )}
    </div>
  );
}
