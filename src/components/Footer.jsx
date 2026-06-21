export default function Footer() {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border)] pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-12">
          <div className="flex flex-col gap-4 max-w-xs">
            <img src="/logo.png" alt="MBC Lab" className="h-10 w-auto" />
            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
              Multimedia, Big Data &amp; Cyber Security Laboratory — Telkom University.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm text-[var(--text-primary)] mb-4 tracking-wide">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="font-body text-sm text-[var(--text-secondary)]">
                  contact@mbclaboratory.com
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-[var(--text-secondary)]">
                  Telkom University, Bandung
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} MBC Lab · Telkom University. All rights reserved.
          </p>
          <p className="font-body text-xs text-[var(--text-muted)]">
            Built with React + Vite + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
