/** The brand's node-network motif as an ambient background texture. */
export default function NodeBackground({ opacity = 0.35, className = "" }) {
 return (
 <div className={`node-bg ${className}`} aria-hidden="true" style={{ opacity }}>
 <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800">
 <defs>
 <radialGradient id="nodeFade" cx="50%" cy="35%" r="75%">
 <stop offset="0%" stopColor="white" stopOpacity="1" />
 <stop offset="100%" stopColor="white" stopOpacity="0" />
 </radialGradient>
 <mask id="nodeMask">
 <rect width="1200" height="800" fill="url(#nodeFade)" />
 </mask>
 </defs>
 <g mask="url(#nodeMask)" stroke="#09C85A" strokeOpacity="0.35" strokeWidth="1.1" fill="none">
 <path d="M120 180 L310 90 L520 200 L700 80 L940 190 L1120 110" />
 <path d="M60 420 L260 330 L470 430 L680 320 L900 430 L1130 340" />
 <path d="M180 660 L390 560 L600 670 L820 560 L1040 660" />
 <path d="M310 90 L260 330 M520 200 L470 430 M700 80 L680 320 M940 190 L900 430" />
 <path d="M260 330 L390 560 M470 430 L600 670 M680 320 L820 560 M900 430 L1040 660" />
 <g fill="#09C85A" stroke="none" fillOpacity="0.8">
 {[
 [120, 180], [310, 90], [520, 200], [700, 80], [940, 190], [1120, 110],
 [60, 420], [260, 330], [470, 430], [680, 320], [900, 430], [1130, 340],
 [180, 660], [390, 560], [600, 670], [820, 560], [1040, 660],
 ].map(([x, y], i) => (
 <circle key={i} cx={x} cy={y} r="4" />
 ))}
 </g>
 <g fill="none" stroke="#09C85A" strokeOpacity="0.6">
 {[
 [310, 90], [470, 430], [820, 560], [1120, 110], [60, 420],
 ].map(([x, y], i) => (
 <circle key={i} cx={x} cy={y} r="9" />
 ))}
 </g>
 </g>
 </svg>
 </div>
 );
}
