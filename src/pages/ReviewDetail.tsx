import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getReview, deleteReview } from "../api";

export default function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) getReview(id).then((res) => {
      setReview(res.review);
      setLoading(false);
    });
  }, [id]);

  async function handleDelete() {
    if (!id) return;
    if (!confirm("Delete this review?")) return;
    await deleteReview(id);
    navigate("/dashboard");
  }

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!review) return <div className="container"><p>Review not found.</p></div>;

  return (
    <div className="container">
      <Link to="/dashboard" className="back-link">← Back to dashboard</Link>

      <div className="review-header">
        <div className={`big-score score-${Math.floor(review.score / 20)}`}>
          {review.score}
        </div>
        <div>
          <h1>CV Review</h1>
          <p className="muted">
            {new Date(review.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <section className="card">
        <h2>Summary</h2>
        <p>{review.summary}</p>
      </section>

      <section className="card">
        <h2>Strengths</h2>
        <ul>
          {review.strengths.map((s: string, i: number) => (
            <li key={i}>✅ {s}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Weaknesses</h2>
        <ul>
          {review.weaknesses.map((w: string, i: number) => (
            <li key={i}>⚠️ {w}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Suggestions</h2>
        <ul>
          {review.suggestions.map((s: string, i: number) => (
            <li key={i}>💡 {s}</li>
          ))}
        </ul>
      </section>

      <button onClick={handleDelete} className="btn btn-danger">
        Delete this review
      </button>
    </div>
  );
}