import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Get honest feedback on your CV — in seconds</h1>
        <p>
          Paste your CV and get an AI-powered review with a score, strengths,
          weaknesses, and concrete suggestions for improvement.
        </p>
        <div className="hero-buttons">
          <Link to="/signup" className="btn btn-primary">Try it free</Link>
          <Link to="/login" className="btn btn-secondary">Log in</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>📊 Score</h3>
          <p>Get a 0–100 score so you know where you stand.</p>
        </div>
        <div className="feature">
          <h3>💪 Strengths</h3>
          <p>See what your CV already does well.</p>
        </div>
        <div className="feature">
          <h3>🎯 Suggestions</h3>
          <p>Get concrete, actionable fixes — not generic advice.</p>
        </div>
      </section>
    </div>
  );
}