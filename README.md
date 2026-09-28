# AI CV Reviewer

Paste your CV, get honest AI-powered feedback in seconds. A full-stack
application that scores your CV and gives you specific, actionable
suggestions for improvement.

## Stack

- **Frontend:** React + TypeScript + Vite + React Router (deployed on Netlify)
- **Backend:** Node.js + Express + TypeScript
- **Database & Auth:** Supabase (Postgres + Row Level Security)
- **AI:** Groq API (Llama / GPT-OSS models)

## What it does

1. User signs up and logs in
2. Pastes their CV into a text field
3. The backend sends the CV to Groq's LLM with a structured prompt
4. The AI returns JSON with:
   - A score (0–100)
   - A summary
   - 3–5 strengths
   - 3–5 weaknesses
   - 3–5 concrete suggestions
5. The review is saved to Supabase and shown to the user
6. The user can view past reviews and delete them

## Project structure
