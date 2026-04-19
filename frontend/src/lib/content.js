// Shared constants for the landing page
export const WHATSAPP_NUMBER = "919999999999"; // placeholder
export const WHATSAPP_MSG = encodeURIComponent(
  "Hi, I want to order a personalized song for a special occasion."
);
export const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${msg ? encodeURIComponent(msg) : WHATSAPP_MSG}`;

export const ARTIST = {
  name: "Aarav Mehra",
  brand: "Soulnote",
  tagline: "Songwriter · Producer · Storyteller",
};

export const SONGS = [
  {
    id: 1,
    title: "Letters to Tomorrow",
    occasion: "Anniversary Love Song",
    cover:
      "https://images.unsplash.com/photo-1769431904780-62d87d1b90b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGNpbmVtYXRpYyUyMHZpbnlsJTIwcmVjb3JkJTIwcm9tYW50aWN8ZW58MHx8fHwxNzc2NTczNDg0fDA&ixlib=rb-4.1.0&q=85",
    audio: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    duration: "2:48",
  },
  {
    id: 2,
    title: "Birthday Dust & Sunlight",
    occasion: "Birthday Surprise Song",
    cover:
      "https://images.pexels.com/photos/7605539/pexels-photo-7605539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    audio: "https://cdn.pixabay.com/audio/2022/10/25/audio_51f0c2bd1e.mp3",
    duration: "3:12",
  },
  {
    id: 3,
    title: "The First Dance",
    occasion: "Wedding Story Song",
    cover:
      "https://images.unsplash.com/photo-1769431904976-36e4d1df9a6c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNpbmVtYXRpYyUyMHZpbnlsJTIwcmVjb3JkJTIwcm9tYW50aWN8ZW58MHx8fHwxNzc2NTczNDg0fDA&ixlib=rb-4.1.0&q=85",
    audio: "https://cdn.pixabay.com/audio/2022/11/22/audio_120b085609.mp3",
    duration: "3:40",
  },
  {
    id: 4,
    title: "Miles Between Us",
    occasion: "Long-Distance Relationship",
    cover:
      "https://images.pexels.com/photos/7605490/pexels-photo-7605490.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    audio: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    duration: "3:05",
  },
  {
    id: 5,
    title: "For The Ones Who Stayed",
    occasion: "Friendship Tribute",
    cover:
      "https://images.unsplash.com/photo-1666209932583-9eec57930e23?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGNpbmVtYXRpYyUyMHZpbnlsJTIwcmVjb3JkJTIwcm9tYW50aWN8ZW58MHx8fHwxNzc2NTczNDg0fDA&ixlib=rb-4.1.0&q=85",
    audio: "https://cdn.pixabay.com/audio/2022/10/25/audio_51f0c2bd1e.mp3",
    duration: "2:54",
  },
  {
    id: 6,
    title: "Rise Again",
    occasion: "Self-Motivation Anthem",
    cover:
      "https://images.unsplash.com/photo-1590347830191-399f8397e2db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHw0fHxtdXNpYyUyMHN0dWRpbyUyMG5lb24lMjBkYXJrfGVufDB8fHx8MTc3NjU3MzQ4OXww&ixlib=rb-4.1.0&q=85",
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
