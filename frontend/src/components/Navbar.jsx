import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { waLink, ARTIST } from "../lib/content";

const links = [
  { label: "Songs", href: "#songs" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 md:px-8 ${
          scrolled ? "glass-strong mx-4" : ""
        }`}
      >
        <a
          href="#top"
          data-testid="navbar-brand"
          className="flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2B365] text-xs font-bold text-black">
            S
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              {ARTIST.brand}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              by {ARTIST.name.split(" ")[0]}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm text-zinc-300 transition-colors hover:text-[#E2B365]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="navbar-whatsapp-cta"
          className="hidden rounded-full bg-[#E2B365] px-5 py-2 text-sm font-medium text-black glow-btn md:block"
        >
          Request a song
        </a>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="glass-strong mx-4 mt-3 rounded-2xl p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-zinc-200"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="mobile-whatsapp-cta"
              className="mt-2 rounded-full bg-[#E2B365] px-5 py-3 text-center text-sm font-medium text-black"
            >
              Request a song on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
