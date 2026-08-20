import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminApi } from "../lib/adminApi";

const NAV = [
  ["Assets", "/admin"],
  ["Pledges", "/admin/pledges"],
  ["Leads", "/admin/leads"],
];

export default function AdminLayout() {
  const [state, setState] = useState({ loading: true, email: null });
  const navigate = useNavigate();

  useEffect(() => {
    adminApi
      .me()
      .then((r) => setState({ loading: false, email: r.admin.email }))
      .catch(() => navigate("/admin/login", { replace: true }));
  }, [navigate]);

  const logout = async () => {
    await adminApi.logout().catch(() => {});
    navigate("/admin/login", { replace: true });
  };

  if (state.loading) {
    return <div className="grid min-h-screen place-items-center bg-mist/40 text-ink/50">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-mist/40">
      <header className="sticky top-0 z-20 border-b border-hairline bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-6">
            <span className="font-display text-sm font-extrabold tracking-tight text-ink">
              SBX Prime <span className="text-brand-dark">Admin</span>
            </span>
            <nav className="flex items-center gap-1">
              {NAV.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/admin"}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-1.5 font-display text-[13px] font-bold transition-colors ${
                      isActive ? "bg-brand/10 text-brand-dark" : "text-ink/60 hover:text-ink"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[12px] text-ink/45 sm:inline">{state.email}</span>
            <button onClick={logout} className="rounded-lg border border-hairline px-3 py-1.5 font-display text-[13px] font-bold text-ink/60 transition hover:text-ink">
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
