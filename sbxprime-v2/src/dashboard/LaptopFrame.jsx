/* A CSS laptop mockup: dark bezel screen + a wider base with a hinge notch.
   The app lives inside the screen and scrolls internally. */
export default function LaptopFrame({ children }) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* screen */}
      <div className="relative rounded-[20px] border-[12px] border-b-[10px] border-ink bg-ink shadow-[0_50px_120px_-40px_rgba(15,31,23,.55)]">
        <span className="absolute left-1/2 top-[3px] h-1 w-1 -translate-x-1/2 rounded-full bg-white/25" />
        <div className="overflow-hidden rounded-[9px] bg-white">
          <div className="h-[560px] overflow-x-auto sm:h-[620px]">{children}</div>
        </div>
      </div>
      {/* base / hinge */}
      <div className="relative mx-auto -mt-[1px] h-3.5 w-[108%] max-w-none -translate-x-[3.7%] rounded-b-[14px] bg-gradient-to-b from-[#d5ded9] to-[#a7b6ae]">
        <span className="absolute left-1/2 top-0 h-1.5 w-28 -translate-x-1/2 rounded-b-[8px] bg-[#849690]" />
      </div>
    </div>
  );
}
