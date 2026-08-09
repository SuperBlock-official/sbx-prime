import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import PushNotification from "../components/PushNotification";
import { Fx } from "../components/ui";
import { Icon } from "../components/icons";
import { createAccount, verifyTwoFactor, submitKyc } from "../lib/api";

const STEPS = ["Account", "Two-factor", "Identity", "Review"];

/* Front-end scaffold for signup → 2FA → KYC. No backend yet; submissions are
   stubbed in lib/api.js (TODO: wire to superblock.ai). Verification is manual. */
function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[13px] font-bold text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-ink/45">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-2 focus:ring-brand/25";

export default function Verify() {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [docs, setDocs] = useState({ id: null, address: null });
  const codeRefs = useRef([]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));

  async function submitAccount(e) {
    e.preventDefault();
    setBusy(true);
    await createAccount({ name: form.name, email: form.email });
    setBusy(false);
    next();
  }

  async function submit2fa(e) {
    e.preventDefault();
    setBusy(true);
    await verifyTwoFactor({ code: code.join("") });
    setBusy(false);
    next();
  }

  async function submitDocs(e) {
    e.preventDefault();
    setBusy(true);
    await submitKyc({
      email: form.email,
      documents: [
        { label: "Government ID", name: docs.id?.name },
        { label: "Proof of address", name: docs.address?.name },
      ],
    });
    setBusy(false);
    next();
  }

  const onCode = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const nextCode = [...code];
    nextCode[i] = v;
    setCode(nextCode);
    if (v && i < 5) codeRefs.current[i + 1]?.focus();
  };

  return (
    <>
      <Seo
        title="Verify your account | SBX Prime"
        description="Create your SBX Prime account, set up two-factor authentication, and complete identity verification to unlock the full investor data room."
        path="/verify"
      />

      <section className="relative overflow-hidden">
        <NodeBackground opacity={0.28} />
        <div className="shell relative grid gap-10 py-14 lg:grid-cols-[0.95fr_1.1fr] lg:py-16">
          {/* ---------- left rail ---------- */}
          <div>
            <Fx>
              <span className="badge-live">Investor verification</span>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] sm:text-[2.75rem]">
                Unlock the full <span className="text-brand">data room</span>.
              </h1>
              <p className="lede">
                Verified investors get the complete institutional data room for every asset —
                independent valuations, leases, title and token terms. It takes a few minutes.
              </p>
            </Fx>

            {/* stepper */}
            <Fx delay={100} className="mt-10 space-y-4">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-4">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition ${
                      i < step
                        ? "bg-brand text-white"
                        : i === step
                        ? "border-2 border-brand bg-brand/10 text-brand-dark"
                        : "border border-hairline bg-white text-ink/35"
                    }`}
                  >
                    {i < step ? (
                      <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className={`font-display text-sm font-bold ${i <= step ? "text-ink" : "text-ink/40"}`}>{label}</span>
                </div>
              ))}
            </Fx>

            <Fx delay={160} className="mt-10 hidden max-w-sm lg:block">
              <PushNotification body="Your verification is in review. We'll email you within one business day." time="now" delay={600} />
            </Fx>
          </div>

          {/* ---------- form card ---------- */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Fx delay={80}>
              <div className="card-dark p-7 sm:p-8">
                {/* Step 0 — account */}
                {step === 0 && (
                  <form onSubmit={submitAccount} className="space-y-5">
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-ink">Create your account</h2>
                      <p className="mt-1 text-sm text-ink/55">Start with your name and a work or personal email.</p>
                    </div>
                    <Field label="Full name">
                      <input required value={form.name} onChange={set("name")} className={inputCls} placeholder="Jordan Ellis" autoComplete="name" />
                    </Field>
                    <Field label="Email address">
                      <input required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@company.com" autoComplete="email" />
                    </Field>
                    <Field label="Password" hint="At least 8 characters.">
                      <input required type="password" minLength={8} value={form.password} onChange={set("password")} className={inputCls} placeholder="••••••••" autoComplete="new-password" />
                    </Field>
                    <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">
                      {busy ? "Creating account…" : "Create account"}
                    </button>
                    <p className="text-center text-[11px] text-ink/45">
                      Already have an account? <span className="font-semibold text-brand-dark">Sign in</span>
                    </p>
                  </form>
                )}

                {/* Step 1 — 2FA */}
                {step === 1 && (
                  <form onSubmit={submit2fa} className="space-y-5">
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-ink">Set up two-factor</h2>
                      <p className="mt-1 text-sm text-ink/55">Scan the code with an authenticator app (Google Authenticator, 1Password, Authy), then enter the 6-digit code.</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="grid h-40 w-40 place-items-center rounded-2xl border border-hairline bg-mist/70">
                        {/* placeholder QR — real otpauth URI comes from the backend */}
                        <div className="grid grid-cols-5 gap-1.5">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <span key={i} className={`h-3.5 w-3.5 rounded-[3px] ${[0,1,3,4,6,9,10,12,14,15,18,20,21,24].includes(i) ? "bg-ink" : "bg-transparent"}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="mb-2 block text-center font-display text-[13px] font-bold text-ink">Enter your 6-digit code</span>
                      <div className="flex justify-center gap-2">
                        {code.map((c, i) => (
                          <input
                            key={i}
                            ref={(el) => (codeRefs.current[i] = el)}
                            value={c}
                            onChange={(e) => onCode(i, e.target.value)}
                            inputMode="numeric"
                            maxLength={1}
                            className="h-12 w-11 rounded-xl border border-hairline bg-white text-center font-display text-lg font-bold text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
                          />
                        ))}
                      </div>
                    </div>
                    <button type="submit" disabled={busy || code.join("").length < 6} className="btn-primary w-full justify-center disabled:opacity-50">
                      {busy ? "Verifying…" : "Verify & continue"}
                    </button>
                  </form>
                )}

                {/* Step 2 — KYC */}
                {step === 2 && (
                  <form onSubmit={submitDocs} className="space-y-5">
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-ink">Verify your identity</h2>
                      <p className="mt-1 text-sm text-ink/55">Upload a government ID and a recent proof of address. Reviewed by our team, usually within one business day.</p>
                    </div>
                    <Upload label="Government ID" hint="Passport or driving licence" file={docs.id} onFile={(f) => setDocs((d) => ({ ...d, id: f }))} />
                    <Upload label="Proof of address" hint="Utility bill or bank statement, last 3 months" file={docs.address} onFile={(f) => setDocs((d) => ({ ...d, address: f }))} />
                    <button type="submit" disabled={busy || !docs.id || !docs.address} className="btn-primary w-full justify-center disabled:opacity-50">
                      {busy ? "Submitting…" : "Submit for review"}
                    </button>
                    <p className="text-[11px] leading-relaxed text-ink/45">
                      Your documents are used only to verify your identity for regulatory purposes. We never share them.
                    </p>
                  </form>
                )}

                {/* Step 3 — done */}
                {step === 3 && (
                  <div className="space-y-5 text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand/12 text-brand-dark">
                      <Icon name="check" className="h-[30px] w-[30px]" strokeWidth={2.2} />
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-extrabold text-ink">You're all set</h2>
                      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
                        Your verification is in review. We'll email <b className="text-ink">{form.email || "you"}</b> within one business day, and the full data room unlocks automatically once approved.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
                      <Link to="/invest" className="btn-primary">Browse the marketplace</Link>
                      <Link to="/dashboard" className="btn-ghost">Go to your dashboard</Link>
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-4 text-center text-[11px] text-ink/40">
                Front-end preview. Verification is handled by our team; no funds move and no documents are stored yet.
              </p>
            </Fx>
          </div>
        </div>
      </section>
    </>
  );
}

function Upload({ label, hint, file, onFile }) {
  const ref = useRef(null);
  return (
    <div>
      <span className="mb-1.5 block font-display text-[13px] font-bold text-ink">{label}</span>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={`flex w-full items-center gap-3 rounded-xl border border-dashed px-4 py-4 text-left transition ${
          file ? "border-brand/50 bg-brand/[0.05]" : "border-hairline bg-mist/50 hover:border-brand/40"
        }`}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand-dark">
          {file ? (
            <Icon name="check" className="h-[18px] w-[18px]" strokeWidth={2.2} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 16V4M7 9l5-5 5 5M4 20h16" /></svg>
          )}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-sm font-bold text-ink">{file ? file.name : "Choose a file"}</span>
          <span className="block text-[11px] text-ink/45">{file ? "Ready to submit" : hint}</span>
        </span>
      </button>
      <input ref={ref} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => onFile(e.target.files?.[0] || null)} />
    </div>
  );
}
