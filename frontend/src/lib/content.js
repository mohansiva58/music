// Steps for the process section (theme: gold/amber/dark)
export const PROCESS_STEPS = [
  {
    label: "Your story",
    color: "#FFD700", // gold
    description: "Our process begins with understanding you. We dive deep into your memories, emotions, and the unique narrative you want to express in song. This initial consultation forms the heart of your composition.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    title: "1. Sharing Your Story",
  },
  {
    label: "The writing",
    color: "#FFB300", // amber
    description: "Our lyricists and composers transform your narrative into compelling words and melodies, capturing your story in a unique musical form.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    title: "Step 2: The Writing",
  },
  {
    label: "The music",
    color: "#222326", // dark
    description: "We compose and arrange the music, ensuring every note and instrument reflects your story and emotions.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    title: "Step 3: The Music",
  },
  {
    label: "The reaction",
    color: "#FFD700",
    description: "You listen to your custom song for the first time, experiencing your story in a new, unforgettable way.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Step 4: The Reaction",
  },
  {
    label: "Your turn",
    color: "#FFB300",
    description: "Share your song with loved ones, celebrate your moments, and cherish your story forever.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    title: "Step 5: Your Turn",
  },
];
// Shared constants for the landing page
export const WHATSAPP_NUMBER = "919999999999"; // placeholder
export const WHATSAPP_MSG = encodeURIComponent(
  "Hi, I want to order a personalized song for a special occasion."
);
export const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${msg ? encodeURIComponent(msg) : WHATSAPP_MSG}`;

export const ARTIST = {
  name: "Sujay",
  brand: "Soulnote",
  tagline: "Songwriter · Producer · Storyteller",
};

export const SONGS = [
  {
    id: 1,
    title: "Letters to Tomorrow",
    occasion: "Anniversary Love Song",
    cover: "content.png",
    audio: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    duration: "2:48",
  },
  {
    id: 2,
    title: "Birthday Dust & Sunlight",
    occasion: "Birthday Surprise Song",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=crop&w=900&q=85",
    audio: "https://cdn.pixabay.com/audio/2022/10/25/audio_51f0c2bd1e.mp3",
    duration: "3:12",
  },
  {
    id: 3,
    title: "The First Dance",
    occasion: "Wedding Story Song",
    cover:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?crop=entropy&cs=tinysrgb&fit=crop&w=900&q=85",
    audio: "https://cdn.pixabay.com/audio/2022/11/22/audio_120b085609.mp3",
    duration: "3:40",
  },
  {
    id: 4,
    title: "Miles Between Us",
    occasion: "Long-Distance Relationship",
    cover:
      "https://images.unsplash.com/photo-1516280906200-dfcb5f7c8cb1?crop=entropy&cs=tinysrgb&fit=crop&w=900&q=85",
    audio: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    duration: "3:05",
  },
  {
    id: 5,
    title: "For The Ones Who Stayed",
    occasion: "Friendship Tribute",
    cover:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?crop=entropy&cs=tinysrgb&fit=crop&w=900&q=85",
    audio: "https://cdn.pixabay.com/audio/2022/10/25/audio_51f0c2bd1e.mp3",
    duration: "2:54",
  },
  {
    id: 6,
    title: "Rise Again",
    occasion: "Self-Motivation Anthem",
    cover:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?crop=entropy&cs=tinysrgb&fit=crop&w=900&q=85",
    audio: "https://cdn.pixabay.com/audio/2022/11/22/audio_120b085609.mp3",
    duration: "3:18",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya & Arjun",
    location: "Mumbai · Anniversary",
    quote:
      "He cried the moment the chorus hit. It was like our entire love story was condensed into three minutes. Easily the best gift I have ever given.",
    initials: "PA",
  },
  {
    id: 2,
    name: "Rohan Desai",
    location: "Bengaluru · Proposal",
    quote:
      "I proposed with this song playing in the background. She said yes before the first verse ended. Worth every rupee, and then some.",
    initials: "RD",
  },
  {
    id: 3,
    name: "The Kapoor Family",
    location: "Delhi · Dad's 60th",
    quote:
      "Dad does not cry. He cried. Mom cried. Everyone cried. And then we played it on loop for the rest of the evening. Thank you, Aarav.",
    initials: "KF",
  },
  {
    id: 4,
    name: "Ananya S.",
    location: "Pune · Best Friend's Wedding",
    quote:
      "I wanted something she would remember forever. She told me she still plays it every Sunday morning. That is the kind of magic this is.",
    initials: "AS",
  },
  {
    id: 5,
    name: "Karan M.",
    location: "Hyderabad · Self Gift",
    quote:
      "I got a song written about my own journey. Hearing a stranger capture my story so precisely was surreal. It sits on my daily playlist now.",
    initials: "KM",
  },
];

export const FAQS = [
  {
    q: "How do I order a personalized song?",
    a: "Tap any WhatsApp button on this page. Share your story, occasion, and the people involved. Within a few hours, you'll get pricing, timeline, and a creative direction.",
  },
  {
    q: "What information do I need to share?",
    a: "The occasion, the names of the people involved, key memories or inside jokes, the tone you want (romantic, uplifting, nostalgic), and any specific lines or words that mean something to you.",
  },
  {
    q: "How long does it take to deliver?",
    a: "Standard delivery is 7–14 days depending on complexity. Rush delivery is available on request for an additional fee — we have turned around songs in 48 hours for proposals and surprise gifts.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes. Every package includes a set number of revisions. You review the lyrics first, then a rough draft, and finally the studio-produced version before we call it final.",
  },
  {
    q: "What does a song cost?",
    a: "Custom songs start at ₹2,999. Final price depends on the length of the song, the number of instruments, vocal quality, and whether you want a studio-produced master. Exact quotes are shared over WhatsApp.",
  },
  {
    q: "Do I own the song after delivery?",
    a: "Yes. You receive a high-quality master file with full personal-use rights. Commercial licensing is available on request.",
  },
];

export const PRICING = [
  {
    name: "Basic",
    price: "₹2,999",
    tagline: "A personal song, beautifully written.",
    features: [
      "Custom lyrics from your story",
      "Acoustic production",
      "Up to 2:30 minutes",
      "1 round of revisions",
      "High-quality MP3 delivery",
    ],
    featured: false,
  },
  {
    name: "Premium",
    price: "₹5,999",
    tagline: "The one most people choose.",
    features: [
      "Custom lyrics + melody design",
      "Multi-instrument arrangement",
      "Up to 3:30 minutes",
      "2 rounds of revisions",
      "Studio-mixed WAV + MP3",
      "Lyric video on request",
    ],
    featured: true,
  },
  {
    name: "Studio",
    price: "₹11,999",
    tagline: "Full cinematic production.",
    features: [
      "Everything in Premium",
      "Full band-style production",
      "Professional mastering",
      "Unlimited revisions",
      "Dolby-grade stereo master",
      "Commercial usage rights",
    ],
    featured: false,
  },
];
