import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_API_URL;

async function authHeaders(): Promise<HeadersInit> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function submitReview(cvText: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(await authHeaders()),
  };
  const res = await fetch(`${API_URL}/api/review`, {
    method: "POST",
    headers,
    body: JSON.stringify({ cvText }),
  });
  return res.json();
}

export async function listReviews() {
  const res = await fetch(`${API_URL}/api/reviews`, {
    headers: await authHeaders(),
  });
  return res.json();
}

export async function getReview(id: string) {
  const res = await fetch(`${API_URL}/api/reviews/${id}`, {
    headers: await authHeaders(),
  });
  return res.json();
}

export async function deleteReview(id: string) {
  const res = await fetch(`${API_URL}/api/reviews/${id}`, {
    method: "DELETE",
    headers: await authHeaders(),
  });
  return res.json();
}