import { useState } from "react";
import { Icon } from "../components/icons";
import mark from "../assets/images/sbx-mark-round.svg";
import wordmark from "../assets/images/sbx-logo.svg";
import { usePortfolio } from "./usePortfolio";
import {
  Overview, Marketplace, Portfolio, SecondaryMarket, DaoVoting,
  RentalIncome, PrimeAI, Wallet, Kyc, Documents, ComingSoon,
} from "./sections";

const NAV = [
  ["overview", "Dashboard", "grid"],
  ["marketplace", "Marketplace", "building"],
  ["portfolio", "Portfolio", "pie"],
  ["secondary", "Secondary Market", "swap"],
  ["dao", "DAO Voting", "vote", "3"],
  ["rent", "Rental Income", "coins"],
  ["ai", "Prime AI", "spark"],
  ["wallet", "Wallet", "wallet"],
  ["kyc", "KYC & Compliance", "shield"],
  ["documents", "Documents", "doc"],
  ["trade", "Trade", "chart", null, "soon"],
];

const TITLES = {
  overview: ["Good morning, Alex.", "Here's your portfolio."],
  marketplace: ["Marketplace", "Live Central London assets."],
  portfolio: ["Portfolio", "Everything you hold."],
  secondary: ["Secondary Market", "Trade tokens with verified investors."],
  dao: ["DAO Voting", "Decisions you help make."],
  rent: ["Rental Income", "Your monthly USDC distributions."],
  ai: ["Prime AI", "Ask anything about your portfolio."],
  wallet: ["Wallet", "Balances and settlement."],
  kyc: ["KYC & Compliance", "Your verification status."],
  documents: ["Documents", "Statements, reports and terms."],
  trade: ["Trade", "Coming soon."],
};

export default function DashboardApp() {
  const [section, setSection] = useState("overview");
  const p = usePortfolio();
  const [title, sub] = TITLES[section] || ["", ""];

  return (
    <div className="flex h-full min-w-[880px] bg-[#F4F9F6] font-sans text-ink">
      {/* sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-hairline bg-white">
        <div className="px-6 py-5">
          <img src={wordmark} alt="SBX Prime" className="h-7 w-auto" />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {NAV.map(([key, label, icon, badge, soon]) => {
            const active = section === key;
            return (
              <button
                key={key}
                onClick={() => !soon && setSection(key)}
                disabled={!!soon}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-semibold transition ${
                  active ? "bg-brand text-white shadow-sm" : soon ? "text-ink/30" : "text-ink/60 hover:bg-brand/[0.06] hover:text-ink"
                }`}
              >
                <Icon name={icon} className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
                <span className="flex-1">{label}</span>
                {badge && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#e8583f] px-1 text-[11px] font-bold text-white">{badge}</span>}
                {soon && <span className="rounded-full bg-ink/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink/40">Soon</span>}
              </button>
            );
          })}
        </nav>
        <div className="m-3 flex items-center gap-3 rounded-xl border border-hairline p-3">
          <img src={mark} alt="" className="h-9 w-9" />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-ink">Alex Martin</p>
            <p className="font-mono text-[10.5px] text-brand-dark">Verified · KYC</p>
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-hairline bg-[#F4F9F6] px-6 py-4">
          <h1 className="font-display text-[22px] font-extrabold tracking-tight text-ink">
            {title} <span className="text-[15px] font-semibold text-ink/45">{sub}</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-hairline bg-white px-3.5 py-2 text-[13px] text-ink/40 lg:flex">
              <Icon name="search" className="h-4 w-4" />
              <span>Search properties…</span>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-brand/30 bg-brand/5">
              <img src={mark} alt="" className="h-6 w-6" />
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {section === "overview" && <Overview p={p} onNavigate={setSection} />}
          {section === "marketplace" && <Marketplace />}
          {section === "portfolio" && <Portfolio p={p} />}
          {section === "secondary" && <SecondaryMarket p={p} />}
          {section === "dao" && <DaoVoting />}
          {section === "rent" && <RentalIncome p={p} />}
          {section === "ai" && <PrimeAI p={p} />}
          {section === "wallet" && <Wallet p={p} />}
          {section === "kyc" && <Kyc />}
          {section === "documents" && <Documents />}
          {section === "trade" && <ComingSoon />}
        </main>
      </div>
    </div>
  );
}
