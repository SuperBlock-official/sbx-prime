import { useLocation } from "react-router-dom";
import Seo from "../lib/Seo";
import { Fx } from "../components/ui";

/* Privacy / Terms. Working-draft legal copy reflecting the offshore, not-a-
   security structure — must be reviewed and finalised by qualified counsel
   before launch. Rendered from one component by slug. */
const DOCS = {
  privacy: {
    title: "Privacy Policy",
    updated: "September 2026",
    intro:
      "This policy explains what personal data SBX Prime collects, why, and how we handle and protect it. SBX Prime is operated by SUPERBLOCK and its affiliates through an offshore structure. This is a working draft; it will be finalised with qualified legal counsel before launch.",
    sections: [
      ["Who we are", "“SBX Prime”, “we” and “us” refer to the SBX Prime platform, operated by SUPERBLOCK and its affiliates through an offshore structure. We are the controller of the personal data described here. You can reach us at hello@sbxprime.com or 85 Great Portland Street, First Floor, London W1W 7LT, United Kingdom."],
      ["Information we collect", "Details you provide: name, email, country of residence, and pledge or interest details. At verification (KYC): identity documents, date of birth, address, and source-of-funds information. If you connect a wallet, your public wallet address. Automatically: basic device, log and usage data, and analytics where you have consented."],
      ["How we use it", "To operate the platform and your account; to process pledges, verification and settlement; to comply with anti-money-laundering (AML), know-your-customer (KYC), sanctions and other legal obligations; to communicate with you; to prevent fraud and abuse; and to improve the product. We rely on your consent, the performance of a contract, our legitimate interests, and legal obligations as appropriate. We do not sell your personal data."],
      ["Cookies & analytics", "Essential cookies are required to run the site. Optional analytics (Google Analytics) load only after you accept them in the cookie banner, and you can change your choice at any time. See the banner controls for details."],
      ["Sharing & processors", "We share personal data only with service providers acting on our instructions — hosting and infrastructure, email delivery, identity-verification (KYC) providers, our tokenization partner, and analytics — and with regulators, auditors or authorities where we are legally required to. We do not sell personal data or share it for third-party marketing."],
      ["International transfers", "As an offshore-structured platform, your data may be processed in jurisdictions other than your own. Where we transfer personal data internationally we use appropriate safeguards consistent with applicable data-protection law."],
      ["Data retention", "We keep personal data only as long as necessary for the purposes above, and for the periods required by AML and other laws (identity and transaction records are typically retained for several years after your relationship with us ends)."],
      ["Security", "We use encryption in transit, access controls and reputable processors to protect your data. No method of transmission or storage is completely secure, and we cannot guarantee absolute security."],
      ["Your rights", "Subject to applicable law and our legal retention obligations, you may request access to, correction of, or deletion of your personal data, object to or restrict certain processing, request portability, and withdraw consent. To exercise these rights, contact hello@sbxprime.com."],
      ["Children", "SBX Prime is not directed to anyone under 18, and we do not knowingly collect their data."],
      ["Changes & contact", "We may update this policy and will change the date above when we do. Questions or requests: hello@sbxprime.com."],
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "September 2026",
    intro:
      "These terms govern your use of the SBX Prime website and platform, operated by SUPERBLOCK and its affiliates through an offshore structure. This is a working draft and will be finalised with qualified legal counsel before launch. Nothing on this site is an offer of securities or investment, legal or tax advice.",
    sections: [
      ["Acceptance", "By accessing or using this website you agree to these terms. If you do not agree, do not use the site."],
      ["About SBX Prime & the structure", "SBX Prime enables direct fractional ownership of commercial real estate. Each property is held in its own single-asset special-purpose vehicle (SPV) and represented by ERC-3643 tokens, where one token equals one square foot and one SPV share. The platform is offered through an offshore structure; the tokens are not offered or sold as securities in the jurisdictions in which they are made available, and availability is restricted accordingly."],
      ["Eligibility & restricted persons", "The platform is offered only to eligible persons outside the United States, the United Kingdom, and Europe (EEA/EU), and outside any other restricted jurisdiction. Eligibility is self-certified when you pledge and verified at onboarding through KYC, AML, sanctions and source-of-funds checks. We may refuse or withdraw access at our discretion."],
      ["Pledges", "A pledge reserves allocation only. It is non-binding, no funds move when you pledge, and KYC and settlement happen at closing. Allocation is not guaranteed and may be scaled back."],
      ["Ownership, income & tokens", "Ownership is held through the relevant SPV. Where distributions are made, net rental income is paid pro-rata in USDC to verified holders, and the on-chain register mirrors the SPV shareholder register. Transfers settle only between verified, eligible holders as enforced by the token contract."],
      ["Risk", "Capital is at risk. Real estate is illiquid, property values and rents can fall as well as rise, and you may not get back the amount invested. Forward-looking figures are indicative, based on third-party market forecasts, and are not guaranteed. Past performance is not a guide to future returns."],
      ["No advice", "Information on this site is provided for general information only and is not investment, legal, accounting or tax advice. You should obtain your own independent advice before making any decision."],
      ["Forward-looking & roadmap items", "The secondary marketplace, instant-liquidity pools, $SBX staking and additional markets are roadmap items, subject to regulatory approval and change, and nothing here is an offer of $SBX."],
      ["Acceptable use", "You may not use the site unlawfully, misrepresent your eligibility or identity, attempt to circumvent access or eligibility controls, or scrape, disrupt or abuse the platform."],
      ["Intellectual property", "The site, its content, brand and design are owned by SUPERBLOCK and its affiliates and may not be copied or reused without permission."],
      ["Limitation of liability", "To the maximum extent permitted by law, SBX Prime, SUPERBLOCK and their affiliates are not liable for indirect or consequential loss, or for loss arising from your use of, or reliance on, the site."],
      ["Governing law", "These terms are governed by the laws of the jurisdiction in which the SBX Prime offering entity is established. The specific governing jurisdiction and dispute-resolution process are set out in the offering documents provided to verified investors."],
      ["Changes & contact", "We may update these terms and will change the date above when we do. Questions: hello@sbxprime.com."],
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
