import appicon from "../assets/images/sbx-appicon.svg";

/** iOS-style notification: app icon left (vertically centred), frosted glassmorphism.
    Reused across major sections as a proof point. */
export default function PushNotification({
  title = "SBX Prime",
  body = "You've been paid 1,050 USDC rental income for January 2025",
  time = "now",
  delay = 400,
  className = "",
}) {
  return (
    <div
      className={`notif-pop flex w-full max-w-sm items-center gap-3 rounded-[20px] border border-white/60 bg-white/45 p-3 shadow-[0_20px_50px_-18px_rgba(15,45,32,.4)] backdrop-blur-2xl backdrop-saturate-150 ${className}`}
      style={{ "--notif-delay": `${delay}ms` }}
      role="status"
    >
      <img src={appicon} alt="" className="h-11 w-11" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-display text-[13px] font-bold text-ink">{title}</p>
          <span className="shrink-0 text-[11px] text-ink/50">{time}</span>
        </div>
        <p className="mt-0.5 text-[12.5px] leading-snug text-ink/80">{body}</p>
      </div>
    </div>
  );
}
