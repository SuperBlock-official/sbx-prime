import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import { Fx, SectionHead } from "../components/ui";
import LaptopFrame from "../dashboard/LaptopFrame";
import DashboardApp from "../dashboard/DashboardApp";

/* The investor console, shown as a live, navigable app inside a laptop.
   Figures are computed from the real London assets (see dashboard/usePortfolio). */
export default function Dashboard() {
  return (
    <>
      <Seo
        title="Your Dashboard | SBX Prime"
        description="Track portfolio value, monthly USDC rent, holdings, DAO governance and compliance — the full SBX Prime investor console."
        path="/dashboard"
      />
      <section className="relative overflow-hidden border-b border-hairline">
        <NodeBackground opacity={0.25} />
        <div className="shell relative py-12 lg:py-16">
          <SectionHead
            center
            eyebrow="The investor console"
            title="Your whole portfolio, in one place."
            lede="Value, monthly rent, holdings, secondary market, DAO governance and compliance — navigate the full SBX Prime app."
          />
          <Fx scale delay={120} className="mt-10">
            <LaptopFrame>
              <DashboardApp />
            </LaptopFrame>
          </Fx>
          <p className="mt-6 text-center text-[12px] text-ink/40">
            Demo portfolio · figures computed from the real Central London assets.
          </p>
        </div>
      </section>
    </>
  );
}
