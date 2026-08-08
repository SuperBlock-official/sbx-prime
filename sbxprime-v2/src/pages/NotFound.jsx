import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import NodeBackground from "../components/NodeBackground";
import { Fx } from "../components/ui";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | SBX Prime" description="The page you're looking for doesn't exist." path="/404" />
      <section className="relative overflow-hidden">
        <NodeBackground opacity={0.3} />
        <div className="shell relative grid min-h-[70vh] place-items-center py-16 text-center">
          <Fx>
            <p className="eyebrow mx-auto">Error 404</p>
            <h1 className="mt-4 font-display text-6xl font-extrabold text-ink sm:text-7xl">
              This floor doesn't <span className="text-brand">exist</span>.
            </h1>
            <p className="lede mx-auto">
              The page you're looking for has moved or was never built. Let's get you back to the good stuff.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/" className="btn-primary">Back to home</Link>
              <Link to="/invest" className="btn-ghost">Browse the marketplace</Link>
            </div>
          </Fx>
        </div>
      </section>
    </>
  );
}
