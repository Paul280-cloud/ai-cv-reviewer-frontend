import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Logging in...");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);

    navigate("/dashboard");
  }

  return (
    <div className="container form-container">
      <h1>Log in</h1>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Log in</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <p>No account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}