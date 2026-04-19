import { motion } from "framer-motion";
import { waLink } from "../lib/content";

export default function FinalCTA() {
  return (
    <section
      data-testid="final-cta-section"
      className="relative overflow-hidden px-6 py-28 md:px-12 md:py-40"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1556296569-44d434fb28d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMHN0dWRpbyUyMG5lb24lMjBkYXJrfGVufDB8fHx8MTc3NjU3MzQ4OXww&ixlib=rb-4.1.0&q=85"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/70 to-[#050505]" />
        <div className="absolute inset-0 radial-gold" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#E2B365]">
          Your turn
        </span>
        <h2
          className="font-display mt-5 text-4xl font-medium leading-[1.05] tracking-tighter text-white md:text-6xl lg:text-7xl"
          data-testid="final-cta-headline"
        >
          Let's turn your story into{" "}
          <span className="font-script text-gold-gradient">
            something unforgettable.
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base text-zinc-300 md:text-lg">
          One message is all it takes. Share the occasion, the person, the
          emotion — and I'll take it from there.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="final-cta-whatsapp"
            className="glow-btn inline-flex items-center gap-3 rounded-full bg-[#E2B365] px-8 py-4 text-sm font-semibold text-black md:text-base"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden
            >
              <path d="M12.04 2.003a9.97 9.97 0 0 0-8.52 15.12l-1.5 5.47 5.62-1.47a9.97 9.97 0 1 0 4.4-19.12Zm5.8 14.2c-.25.7-1.44 1.33-2 1.4-.52.06-1.17.09-1.88-.12-.44-.14-1-.33-1.73-.65-3.05-1.32-5.04-4.39-5.19-4.59-.15-.2-1.24-1.65-1.24-3.15s.78-2.23 1.06-2.54c.28-.31.61-.39.81-.39.2 0 .41.002.59.01.19.007.44-.07.69.52.25.6.84 2.07.92 2.22.08.15.13.32.03.52-.1.2-.15.31-.3.48-.15.17-.32.38-.46.51-.15.14-.31.3-.13.6.18.31.79 1.3 1.7 2.11 1.17 1.03 2.16 1.35 2.47 1.5.31.15.49.13.67-.08.18-.2.77-.89.98-1.19.2-.31.41-.25.69-.15.28.1 1.77.84 2.07 1 .3.15.49.23.56.36.08.13.08.77-.16 1.47Z"></path>
            </svg>
            Request your song on WhatsApp
          </a>
          <a
            href="#songs"
            className="text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline"
            data-testid="final-cta-listen"
          >
            Or listen to songs first →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
