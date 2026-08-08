import { useLocation } from "react-router-dom";
import Seo from "../lib/Seo";
import { Fx } from "../components/ui";

/* Minimal legal pages (privacy / terms). Placeholder copy to be replaced by
   counsel-reviewed text before launch. Rendered from one component by slug. */
const DOCS = {
  privacy: {
    title: "Privacy Policy",
    updated: "August 2026",
    intro:
      "This policy explains what SBX Prime collects, why, and how we handle it. It is a working draft and will be finalised with legal counsel before launch.",
    sections: [
      ["What we collect", "Contact details you submit (name, email, country), pledge and interest details, and, at verification, identity and source-of-funds documents. We also collect basic analytics with your consent."],
      ["How we use it", "To operate the platform, process pledges and verification, meet regulatory obligations, and improve the product. We do not sell your personal data."],
      ["Cookies & analytics", "Essential cookies run the site. Optional analytics load only after you accept them in the cookie banner. You can change your choice at any time."],
      ["Data storage", "Personal data is held with reputable processors and, where applicable, our tokenization partner. Identity documents are used solely for verification."],
      ["Your rights", "You can request access, correction, or deletion of your personal data, subject to legal retention requirements. Contact hello@sbxprime.com."],
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "August 2026",
    intro:
      "These terms govern your use of the SBX Prime website. They are a working draft and will be finalised with legal counsel before launch. Nothing here is an offer of securities or investment advice.",
    sections: [
      ["Eligibility", "The current launch is offered under Regulation S to investors outside the US, UK, and Europe. Eligibility is self-certified at pledge and verified at onboarding."],
      ["Pledges", "A pledge reserves allocation only. It is non-binding, no funds move at pledge, and KYC and settlement happen at closing. Allocation is not guaranteed."],
      ["No advice", "Information on this site is provided for general information only and is not investment, legal, or tax advice. Capital is at risk and past performance is not a guide to future returns."],
      ["Forward-looking items", "Figures are indicative and subject to independent valuation. The secondary market, liquidity pools, and $SBX are roadmap items subject to regulatory approval."],
      ["Contact", "Questions about these terms can be sent to hello@sbxprime.com."],
    ],
  },
};

export default function Legal() {
  const doc = useLocation().pathname.replace("/", "");
  const d = DOCS[doc] || DOCS.privacy;

  return (
    <>
      <Seo title={`${d.title} | SBX Prime`} description={d.intro} path={`/${doc || "privacy"}`} />
      <section className="py-14 lg:py-16">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <Fx>
            <p className="eyebrow">Legal</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-ink sm:text-5xl">{d.title}</h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-ink/40">Last updated {d.updated}</p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/65">{d.intro}</p>
          </Fx>
          <div className="mt-10 space-y-8">
            {d.sections.map(([h, b], i) => (
              <Fx as="section" key={h} delay={i * 60}>
                <h2 className="font-display text-lg font-extrabold text-ink">{h}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{b}</p>
              </Fx>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
