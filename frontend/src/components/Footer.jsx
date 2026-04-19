import { ARTIST } from "../lib/content";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/8 bg-[#080202] px-6 py-12 md:px-10"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white">
            S
          </span>
          <div>
            <div className="font-display text-sm font-black text-white">
              {ARTIST.brand.toUpperCase()}
            </div>
            <div className="font-archivo text-[10px] uppercase tracking-[0.25em] text-white/50">
              by {ARTIST.name}
            </div>
          </div>
        </div>

        <p className="font-archivo text-xs text-white/50">
          © {new Date().getFullYear()} {ARTIST.brand}. Every song written from
          scratch.
        </p>
      </div>
    </footer>
  );
}
