import { Headphones, Mic2, Music2, Radio, Star, Heart } from "lucide-react";

const items = [
  { icon: Music2, label: "150+ Songs Created" },
  { icon: Heart, label: "Personalized for every occasion" },
  { icon: Star, label: "5.0 Average Rating" },
  { icon: Radio, label: "Studio-Grade Production" },
  { icon: Mic2, label: "Original Lyrics, Every Time" },
  { icon: Headphones, label: "Trusted by Real Customers" },
];

export default function SocialProof() {
  return (
    <section
      data-testid="social-proof"
      className="relative overflow-hidden border-y border-white/5 bg-[#0a0a0a] py-6"
    >
      <div className="marquee-track flex w-max items-center gap-14 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-500"
            >
              <Icon className="h-4 w-4 text-[#E2B365]" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
