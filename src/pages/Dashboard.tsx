import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { submitReview, listReviews } from "../api";

export default function Dashboard() {
  const [cvText, setCvText] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function loadReviews() {
    const res = await listReviews();
    if (res.reviews) setReviews(res.reviews);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/login");
      else loadReviews();
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cvText.trim().length < 50) {
      return setMsg("Please paste a CV with at least 50 characters.");
    }

    setLoading(true);
    setMsg("Analyzing your CV... this takes a few seconds.");

    const res = await submitReview(cvText);
    setLoading(false);

    if (res.error) {
      setMsg(res.error);
    } else {
      setMsg("Review complete!");
      setCvText("");
      loadReviews();
      navigate(`/reviews/${res.review.id}`);
    }
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <section className="card">
        <h2>Review a new CV</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Paste your CV here (text only — copy from Word, Google Docs, or PDF)"
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            rows={12}
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Analyzing..." : "Get my review"}
          </button>
        </form>
        {msg && <p className="msg">{msg}</p>}
      </section>

      <section className="card">
        <h2>Your reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Paste a CV above to get started.</p>
        ) : (
          <ul className="review-list">
            {reviews.map((r) => (
              <li key={r.id}>
                <Link to={`/reviews/${r.id}`}>
                  <span className={`score score-${Math.floor(r.score / 20)}`}>
                    {r.score}
                  </span>
                  <span className="review-summary">{r.summary}</span>
                  <span className="review-date">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}