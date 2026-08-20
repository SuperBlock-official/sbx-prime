/* Lightweight inline-SVG charts for the dashboard — no chart library. */

const SEG_COLORS = ["#1FB462", "#25A9E0", "#35DFA9", "#0F8746", "#7BD0F0"];

export function AreaChart({ series, cur = "£" }) {
  const W = 640, H = 220, padX = 8, padY = 16;
  const maxV = Math.max(...series.map((d) => d.value)) * 1.05;
  const maxR = Math.max(...series.map((d) => d.rent)) * 1.1 || 1;
  const x = (i) => padX + (i * (W - padX * 2)) / (series.length - 1);
  const yV = (v) => H - padY - (v / maxV) * (H - padY * 2);
  const yR = (v) => H - padY - (v / maxR) * (H - padY * 2) * 0.5; // rent uses lower half

  const valuePts = series.map((d, i) => `${x(i)},${yV(d.value)}`).join(" ");
  const rentPts = series.map((d, i) => `${x(i)},${yR(d.rent)}`).join(" ");
  const areaPath = `M${x(0)},${H - padY} L${valuePts.replace(/ /g, " L")} L${x(series.length - 1)},${H - padY} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full" role="img" aria-label="Portfolio value versus rent collected">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1FB462" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1FB462" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={padX} x2={W - padX} y1={padY + g * (H - padY * 2)} y2={padY + g * (H - padY * 2)} stroke="#E7F1EB" strokeWidth="1" />
      ))}
      <path d={areaPath} fill="url(#areaFill)" />
      <polyline points={valuePts} fill="none" stroke="#1FB462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={rentPts} fill="none" stroke="#25A9E0" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
      {series.map((d, i) => (i % 2 === 0 ? (
        <text key={d.m} x={x(i)} y={H + 12} textAnchor="middle" fontSize="11" fill="#0F1F17" opacity="0.4" fontFamily="system-ui">{d.m}</text>
      ) : null))}
    </svg>
  );
}

export function Donut({ data, centerTop, centerSub }) {
  const size = 168, stroke = 22, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let acc = 0;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-40 w-40 shrink-0 -rotate-90" role="img" aria-label="Allocation by submarket">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF5F1" strokeWidth={stroke} />
        {data.map((d, i) => {
          const frac = d.value / total;
          const seg = (
            <circle
              key={d.label}
              cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={SEG_COLORS[i % SEG_COLORS.length]} strokeWidth={stroke}
              strokeDasharray={`${frac * c} ${c - frac * c}`}
              strokeDashoffset={-acc * c}
              strokeLinecap="butt"
            />
          );
          acc += frac;
          return seg;
        })}
      </svg>
      <div className="flex-1">
        <div className="mb-3">
          <p className="font-display text-2xl font-extrabold leading-none text-ink">{centerTop}</p>
          <p className="text-[12px] text-ink/45">{centerSub}</p>
        </div>
        <ul className="space-y-1.5">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center justify-between text-[13px]">
              <span className="flex items-center gap-2 text-ink/70">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: SEG_COLORS[i % SEG_COLORS.length] }} />
                {d.label}
              </span>
              <span className="font-bold text-ink">{d.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
