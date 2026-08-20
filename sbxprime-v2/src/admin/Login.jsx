import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../lib/adminApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await adminApi.login(form.email, form.password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-mist/40 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-hairline bg-white p-8 shadow-[0_24px_60px_-40px_rgba(15,45,32,.4)]">
        <p className="font-display text-lg font-extrabold text-ink">
          SBX Prime <span className="text-brand-dark">Admin</span>
        </p>
        <p className="mt-1 text-[13px] text-ink/50">Sign in to manage assets and view pledges.</p>

        {error && (
          <p className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</p>
        )}

        <label className="mt-6 block text-[12px] font-bold uppercase tracking-wide text-ink/50">Email</label>
        <input
          type="email"
          autoComplete="username"
          className="field mt-1.5"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label className="mt-4 block text-[12px] font-bold uppercase tracking-wide text-ink/50">Password</label>
        <input
          type="password"
          autoComplete="current-password"
          className="field mt-1.5"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full justify-center disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
