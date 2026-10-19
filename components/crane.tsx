interface CraneProps {
  className?: string
  /** Cor principal da estrutura */
  color?: string
  /** Cor da carga suspensa */
  loadColor?: string
}

/** Grua torre em SVG com o gancho e a carga a balançar — elemento decorativo temático. */
export function Crane({ className = "", color = "#fe9445", loadColor = "#e6b23a" }: CraneProps) {
  return (
    <svg viewBox="0 0 320 360" className={className} fill="none" aria-hidden="true">
      {/* Torre (treliça) */}
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <line x1="92" y1="60" x2="92" y2="356" />
        <line x1="118" y1="60" x2="118" y2="356" />
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i}>
            <line x1="92" y1={80 + i * 23} x2="118" y2={80 + i * 23} />
            <line x1="92" y1={80 + i * 23} x2="118" y2={103 + i * 23} />
          </g>
        ))}
        <line x1="70" y1="356" x2="140" y2="356" strokeWidth="5" />
      </g>

      {/* Cabine */}
      <rect x="86" y="52" width="38" height="24" rx="3" fill={color} />
      <rect x="92" y="57" width="12" height="9" rx="1.5" fill="#141414" opacity="0.6" />

      {/* Lança e contra-lança */}
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <line x1="20" y1="48" x2="310" y2="48" />
        <line x1="20" y1="34" x2="300" y2="34" />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={20 + i * 20} y1="34" x2={40 + i * 20} y2="48" />
        ))}
        {/* Mastro e tirantes */}
        <line x1="105" y1="34" x2="105" y2="4" />
        <line x1="105" y1="4" x2="300" y2="34" strokeWidth="1.5" />
        <line x1="105" y1="4" x2="20" y2="34" strokeWidth="1.5" />
      </g>
      {/* Contrapeso */}
      <rect x="22" y="50" width="34" height="20" rx="2" fill={color} opacity="0.85" />

      {/* Carro, cabo e carga a balançar */}
      <g style={{ transformOrigin: "250px 50px", animation: "crane-swing 4s ease-in-out infinite" }}>
        <rect x="241" y="47" width="18" height="7" rx="1.5" fill={color} />
        <line x1="250" y1="54" x2="250" y2="190" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M244 190 h12 l-2 8 a6 6 0 1 1 -8 0z" fill={color} />
        {/* Cabos da carga */}
        <line x1="250" y1="200" x2="222" y2="222" stroke={color} strokeWidth="1.2" />
        <line x1="250" y1="200" x2="278" y2="222" stroke={color} strokeWidth="1.2" />
        {/* Palete de blocos */}
        <g>
          {[0, 1, 2].map((col) =>
            [0, 1].map((row) => (
              <rect
                key={`${col}-${row}`}
                x={220 + col * 20}
                y={222 + row * 13}
                width="18"
                height="11"
                rx="1.5"
                fill={loadColor}
                stroke="#141414"
                strokeOpacity="0.25"
              />
            )),
          )}
          <rect x="216" y="248" width="68" height="5" rx="1" fill={color} />
        </g>
      </g>
    </svg>
  )
}
