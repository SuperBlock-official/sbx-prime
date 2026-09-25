import PushNotification from "./PushNotification";
import { Fx } from "./ui";
import marketplace from "../assets/mockups/app-marketplace.png";
import portfolio from "../assets/mockups/app-portfolio.png";
import invest from "../assets/mockups/app-invest.png";
import kyc from "../assets/mockups/app-kyc.png";
import rental from "../assets/mockups/app-rental.png";
import secondary from "../assets/mockups/app-secondary.png";
import ai from "../assets/mockups/app-ai.png";
import londonDetail from "../assets/mockups/app-london-detail.png";
import dashboard from "../assets/mockups/web-dashboard.png";
import webRental from "../assets/mockups/web-rental.png";
import webSecondary from "../assets/mockups/web-secondary.png";

/* All imagery uses the real SBX Prime app mockups (mockups-v2 exports, transparent PNGs). */

/* ---- Hero: two app screens + floating payout notification (enlarged) ---- */
/* Rent is distributed for the previous completed month — keep the demo current. */
function lastRentMonth() {
 const d = new Date();
 d.setDate(1);
 d.setMonth(d.getMonth() - 1);
 return d.toLocaleString("en-GB", { month: "long", year: "numeric" });
}

export function DualPhoneHero() {
 return (
 <div className="relative mx-auto flex max-w-lg items-center justify-center">
 <img src={marketplace} alt="SBX Prime app, marketplace of tokenized properties"
 className="float-slow w-[56%] max-w-[300px]" loading="eager" />
 <img src={portfolio} alt="SBX Prime app, investor portfolio and rental income"
 className="float-slower z-10 -ml-[14%] w-[58%] max-w-[312px]" loading="eager" />
 <div className="absolute -top-2 left-1/2 z-20 w-[min(90%,320px)] -translate-x-1/2 sm:top-2">
 <PushNotification body={`You've been paid 1,050 USDC rental income for ${lastRentMonth()}`} time="now" delay={700} />
 </div>
 </div>
 );
}

/* ---- Three-phone flow: Discover → Verify → Invest (enlarged) ---- */
export function PhoneFan() {
 const steps = [
 [marketplace, "Discover", "Browse institutional-grade assets, standardised to 1 sq ft."],
 [kyc, "Verify", "Complete KYC once, your wallet is credentialed on-chain."],
 [invest, "Invest", "Pledge by dollar amount or square feet, and confirm."],
 ];
 return (
 <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
 {steps.map(([img, label, body], i) => (
 <figure key={label} className={i === 1 ? "z-10 sm:-mb-4" : "opacity-95"}>
 <img src={img} alt={`SBX Prime app, ${label}`}
 className={`mx-auto w-[240px] ${i === 1 ? "sm:w-[280px]" : "sm:w-[250px]"}`} loading="lazy" />
 <figcaption className="-mt-2 text-center">
 <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">{i + 1} · {label}</p>
 <p className="mx-auto mt-1.5 max-w-[210px] text-xs leading-relaxed text-ink/55">{body}</p>
 </figcaption>
 </figure>
 ))}
 </div>
 );
}

/* ---- Mobile app showcase: a horizontally-scrollable row of feature screens ---- */
export function AppShowcase() {
 const screens = [
 [portfolio, "Portfolio", "Value, yield and rent at a glance."],
 [rental, "Rental income", "Monthly USDC, paid automatically."],
 [secondary, "Secondary market", "List and sell your square feet."],
 [ai, "Prime AI", "Ask anything about your holdings."],
 [marketplace, "Marketplace", "Every tokenized building in one place."],
 [invest, "Invest", "Pledge by dollars or square feet."],
 ];
 return (
 <div className="relative">
 {/* edge-to-edge horizontal scroller with snap; scrolls left↔right */}
 <div className="sbx-scroll -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:gap-6 sm:px-8">
 {screens.map(([img, label, body], i) => (
 <Fx key={label} delay={i * 70} scale className="shrink-0 snap-center">
 <figure className="group w-[210px] text-center sm:w-[236px]">
 <img src={img} alt={`SBX Prime app, ${label}`}
 className="mx-auto w-full transition-transform duration-300 group-hover:-translate-y-1.5" loading="lazy" draggable="false" />
 <figcaption className="-mt-1">
 <p className="font-display text-sm font-bold text-ink">{label}</p>
 <p className="mx-auto mt-1 max-w-[200px] text-xs leading-relaxed text-ink/55">{body}</p>
 </figcaption>
 </figure>
 </Fx>
 ))}
 {/* trailing spacer so the last card can center-snap */}
 <div aria-hidden="true" className="shrink-0 basis-1 sm:basis-4" />
 </div>
 {/* soft fade hint on the right edge */}
 <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
 </div>
 );
}

/* ---- Web dashboard mockup (hero) ---- */
export function DashboardMockup() {
 return (
 <img src={dashboard}
 alt="SBX Prime web dashboard, portfolio value, allocation, holdings, rental income and DAO proposals"
 className="w-full" loading="lazy" />
 );
}

/* ---- Web app showcase: dashboard + rental + secondary ---- */
export function WebShowcase() {
 const shots = [
 [webRental, "Rental income", "Every distribution, itemised by property and paid in USDC."],
 [webSecondary, "Secondary market", "List holdings and accept offers, priced per square foot."],
 ];
 return (
 <div className="grid gap-6 lg:grid-cols-2">
 {shots.map(([img, label, body], i) => (
 <Fx key={label} delay={i * 100} scale>
 <figure>
 <img src={img} alt={`SBX Prime web app, ${label}`} className="w-full" loading="lazy" />
 <figcaption className="mt-2 px-2">
 <p className="font-display text-base font-bold text-ink">{label}</p>
 <p className="mt-1 text-sm leading-relaxed text-ink/55">{body}</p>
 </figcaption>
 </figure>
 </Fx>
 ))}
 </div>
 );
}

/* ---- Single floating phone (for the London asset page) ---- */
export function PhoneFloat({ variant = "london", className = "" }) {
 const src = variant === "london" ? londonDetail : marketplace;
 return <img src={src} alt="SBX Prime app, property detail" className={className} loading="lazy" />;
}
