import { divisions } from '../data/divisions'

// A running "signal" ticker — the five divisions as a repeating spectrum strip.
export default function SignalBand() {
  const track = [...divisions, ...divisions, ...divisions, ...divisions]

  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] spectrum-bg" />

      <div className="flex select-none py-5">
        <div className="marquee-track flex w-max shrink-0 items-center hover:[animation-play-state:paused]">
          {track.map((d, i) => (
            <span key={`${d.id}-${i}`} className="flex items-center">
              <span className="mx-6 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
                {d.name}
              </span>
            </span>
          ))}
          {/* duplicate set for a seamless -50% loop */}
          {track.map((d, i) => (
            <span key={`dup-${d.id}-${i}`} aria-hidden="true" className="flex items-center">
              <span className="mx-6 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
                {d.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
