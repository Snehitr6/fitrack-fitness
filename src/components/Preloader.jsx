import { useEffect, useState } from "react";
import {
  Activity,
  Dumbbell,
  Flame,
  HeartPulse,
  TrendingUp,
} from "lucide-react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((value) => Math.min(value + 2, 100));
    }, 55);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress !== 100) return;

    const timer = setTimeout(() => onComplete?.(), 700);
    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  return (
    <div className="ft-intro">
      <div className="ft-intro-photo" />

      <div className="ft-intro-overlay" />

      <div className="ft-intro-content">
        <div className="ft-intro-brand">
          <div className="ft-intro-logo">
            <Activity size={34} />
          </div>

          <span className="ft-intro-brand-name">
            Fit<span>Track</span>
          </span>
        </div>

        <p className="ft-intro-tagline">
          TRACK <span>•</span> TRAIN <span>•</span> TRANSFORM
        </p>

        <div className="ft-intro-line" />

        <h1 className="ft-intro-heading">
          BUILD YOUR
          <br />
          STRONGER
          <br />
          <span>SELF.</span>
        </h1>

        <p className="ft-intro-description">
          Your training. Your progress. Your next level.
          <br />
          Every rep takes you closer to your strongest self.
        </p>

        <div className="ft-intro-features">
          {[
            { Icon: Dumbbell, label: "WORKOUTS" },
            { Icon: TrendingUp, label: "PROGRESS" },
            { Icon: HeartPulse, label: "WELLNESS" },
            { Icon: Flame, label: "RESULTS" },
          ].map(({ Icon, label }) => (
            <div className="ft-intro-feature" key={label}>
              <div className="ft-intro-feature-icon">
                <Icon size={23} />
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="ft-intro-loading">
          <div className="ft-intro-loading-label">
            <span>PREPARING YOUR WORKOUT</span>
            <strong>{progress}%</strong>
          </div>

          <div className="ft-intro-progress-track">
            <div
              className="ft-intro-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="ft-intro-footer">
            DISCIPLINE BUILDS FREEDOM.
          </p>
        </div>
      </div>
    </div>
  );
}