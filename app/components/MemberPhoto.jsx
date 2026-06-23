import { useState } from 'react'
import { divisions } from '../data/divisions'

const COLOR_BY_DIV = Object.fromEntries(divisions.map((d) => [d.id, d.color]))

function initialsOf(name) {
  return name
    .replace(/ /g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/**
 * A member portrait. Renders a real photo (as a division-coloured duotone)
 * when `member.photo` exists, otherwise a designed duotone placeholder labelled
 * with the assistant's lab code. Pass `bare` to drop the tag + caption scrim.
 */
export default function MemberPhoto({ member, colorOverride, duotone = true, className = '', idCode, bare = false }) {
  const [failed, setFailed] = useState(false)
  const color = colorOverride || COLOR_BY_DIV[member.divisionId] || '#2D5BFF'
  const hasPhoto = member.photo && !failed
  const label = member.code || initialsOf(member.name)
  const tag = idCode || member.code || initialsOf(member.name)

  return (
    <div className={`relative overflow-hidden bg-[var(--surface-2)] ${className}`}>
      {hasPhoto ? (
        <>
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={duotone ? { filter: 'grayscale(1) contrast(1.05)', mixBlendMode: 'luminosity' } : undefined}
          />
          {duotone && (
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-0"
              style={{ background: color, mixBlendMode: 'multiply' }}
            />
          )}
        </>
      ) : (
        <Placeholder label={label} color={color} />
      )}

      {!bare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{ background: 'linear-gradient(to top, rgba(8,10,15,0.82), transparent)' }}
        />
      )}
      {!bare && hasPhoto && (
        <span className="absolute left-3 top-3 z-10 font-mono text-[9px] tracking-[0.18em] text-white/85">
          {tag}
        </span>
      )}
    </div>
  )
}

function Placeholder({ label, color }) {
  const gid = `g-${label}-${color.slice(1)}`
  const fontSize = label.length > 3 ? 92 : 116
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="60%" stopColor={color} stopOpacity="0.65" />
          <stop offset="100%" stopColor="#080A0F" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${gid})`} />
      {/* faint silhouette */}
      <g fill="#ffffff" opacity="0.12">
        <circle cx="200" cy="205" r="74" />
        <path d="M84 470c0-74 52-128 116-128s116 54 116 128z" />
      </g>
      {/* big mono lab code */}
      <text
        x="28"
        y="452"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize={fontSize}
        fontWeight="600"
        fill="#ffffff"
        opacity="0.92"
      >
        {label}
      </text>
    </svg>
  )
}
