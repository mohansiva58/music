import { ARTIST } from "../lib/content";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/5 bg-[#050505] px-6 py-12 md:px-12"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2B365] text-xs font-bold text-black">
            S
          </span>
          <div>
            <div className="font-display text-sm font-medium text-white">
              {ARTIST.brand}
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              by {ARTIST.name}
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} {ARTIST.brand}. Every song written from
          scratch.
        </p>
      </div>
    </footer>
  );
}
