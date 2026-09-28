import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Creating account...");

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);

    setMsg("Account created. Redirecting...");
    setTimeout(() => navigate("/dashboard"), 800);
  }

  return (
    <div className="container form-container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <button type="submit" className="btn btn-primary">Create account</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}