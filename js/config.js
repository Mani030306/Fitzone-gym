/**
 * FITZONE GYM — Central Business Configuration
 * ==============================================
 * This is the single source of truth for all business information.
 * Update this file to change any business details across the entire website.
 *
 * IMPORTANT: Do NOT hardcode business data anywhere else in the codebase.
 * All components read from this config object.
 */

const FITZONE = {
  // ─── Business Identity ────────────────────────────────────────────────────
  name: "Fitzone Gym",
  tamilName: "ஃட்சோன் ஜிம்",
  tagline: "Train Hard. Get Stronger. Become Better.",
  shortDescription:
    "Build strength, improve fitness and train in a clean, motivating environment with modern equipment and personalized guidance.",

  // ─── Contact ──────────────────────────────────────────────────────────────
  phone: "09500884448",
  phoneDisplay: "095008 84448",
  phoneTel: "tel:09500884448",

  // ─── WhatsApp ─────────────────────────────────────────────────────────────
  // Set enabled: true once the gym owner confirms this number is WhatsApp-enabled.
  whatsapp: {
    enabled: true,
    number: "919500884448", // country code (91) + number without leading 0
    message:
      "Hi Fitzone Gym, I would like to know more about your membership and training options.",
  },

  // ─── Address ──────────────────────────────────────────────────────────────
  address: {
    line1: "17, Ganapathy Nagar",
    line2: "Opposite to Sathya Stadium",
    line3: "MC Road",
    city: "Thanjavur",
    state: "Tamil Nadu",
    pincode: "613007",
    country: "India",
    landmark: "Opposite Sathya Stadium, MC Road",
    full: "17, Ganapathy Nagar, Opposite to Sathya Stadium, MC Road, Thanjavur, Tamil Nadu 613007",
  },

  // ─── Location ─────────────────────────────────────────────────────────────
  geo: {
    lat: 10.7765748,
    lng: 79.1277952,
    plusCode: "Q4GH+J4, Thanjavur, Tamil Nadu",
  },
  mapsUrl: "https://maps.app.goo.gl/DPrLkLXLbBjwnA3cA",

  // ─── Google Business ──────────────────────────────────────────────────────
  rating: 4.9,
  reviewCount: 449,
  // Update googleReviewsUrl to the gym's actual Google Business Profile URL
  googleReviewsUrl: "https://maps.app.goo.gl/DPrLkLXLbBjwnA3cA",

  // ─── Opening Hours ────────────────────────────────────────────────────────
  // Leave empty until confirmed by the gym owner. The hours section will be
  // hidden automatically when this object has no entries.
  // Format example once confirmed:
  // hours: {
  //   monday: { open: "06:00", close: "22:00", closed: false },
  //   tuesday: { open: "06:00", close: "22:00", closed: false },
  //   ...
  //   sunday: { open: "07:00", close: "12:00", closed: false },
  // }
  hours: {},

  // ─── Social Media ─────────────────────────────────────────────────────────
  // Leave empty until official links are confirmed. Social icons are hidden
  // automatically when URLs are not provided.
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  // ─── Training Programs ────────────────────────────────────────────────────
  // Editable list — remove any category not actually offered by the gym.
  programs: [
    {
      id: "strength",
      title: "Strength Training",
      description:
        "Build functional strength with free weights, barbells, and resistance equipment under attentive guidance.",
      icon: "dumbbell",
    },
    {
      id: "weight-management",
      title: "Weight Management",
      description:
        "Structured training guidance to support your weight management goals in a supportive environment.",
      icon: "scale",
    },
    {
      id: "muscle-building",
      title: "Muscle Building",
      description:
        "Progressive resistance training with personalized guidance focused on muscle development.",
      icon: "arm",
    },
    {
      id: "general-fitness",
      title: "General Fitness",
      description:
        "Improve overall fitness, stamina, and wellbeing with a well-rounded workout approach.",
      icon: "heart",
    },
    {
      id: "personal-training",
      title: "Personalized Training",
      description:
        "Individual workout plans tailored to your specific goals, fitness level, and requirements.",
      icon: "person",
    },
    {
      id: "conditioning",
      title: "Conditioning",
      description:
        "Build endurance, improve cardiovascular fitness, and enhance overall physical conditioning.",
      icon: "lightning",
    },
  ],

  // ─── Facilities ───────────────────────────────────────────────────────────
  // Editable list — confirm each item with actual gym photos before display.
  facilities: [
    {
      id: "weights",
      label: "Weights & Barbells",
      image: "assets/images/equipment.jpg",
      alt: "Modern weight equipment at Fitzone Gym Thanjavur",
    },
    {
      id: "gym-floor",
      label: "Gym Floor",
      image: "assets/images/about-gym.jpg",
      alt: "Clean well-maintained gym floor at Fitzone Gym Thanjavur",
    },
    {
      id: "strength-area",
      label: "Strength Area",
      image: "assets/images/gallery-strength.jpg",
      alt: "Strength training area at Fitzone Gym Thanjavur",
    },
    {
      id: "cardio",
      label: "Cardio",
      image: "assets/images/cardio.jpg",
      alt: "Cardio equipment at Fitzone Gym Thanjavur",
    },
    {
      id: "training-space",
      label: "Training Space",
      image: "assets/images/gallery-workout.jpg",
      alt: "Open training space at Fitzone Gym Thanjavur",
    },
    {
      id: "interior",
      label: "Interior",
      image: "assets/images/gallery-interior.jpg",
      alt: "Modern gym interior at Fitzone Gym Thanjavur",
    },
  ],

  // ─── Gallery ──────────────────────────────────────────────────────────────
  // Replace with actual gym photos supplied by the gym owner.
  gallery: [
    {
      id: "g1",
      src: "assets/images/hero-bg.jpg",
      alt: "Fitzone Gym interior — premium equipment",
      category: "gym",
    },
    {
      id: "g2",
      src: "assets/images/about-gym.jpg",
      alt: "Fitzone Gym floor — clean and well-maintained",
      category: "interior",
    },
    {
      id: "g3",
      src: "assets/images/equipment.jpg",
      alt: "Modern gym equipment at Fitzone Gym",
      category: "equipment",
    },
    {
      id: "g4",
      src: "assets/images/training.jpg",
      alt: "Personal training session at Fitzone Gym",
      category: "training",
    },
    {
      id: "g5",
      src: "assets/images/gallery-strength.jpg",
      alt: "Strength training area at Fitzone Gym",
      category: "gym",
    },
    {
      id: "g6",
      src: "assets/images/gallery-dumbbells.jpg",
      alt: "Dumbbells at Fitzone Gym Thanjavur",
      category: "equipment",
    },
    {
      id: "g7",
      src: "assets/images/gallery-interior.jpg",
      alt: "Fitzone Gym interior — cable machines and mirrors",
      category: "interior",
    },
    {
      id: "g8",
      src: "assets/images/gallery-workout.jpg",
      alt: "Open workout space at Fitzone Gym",
      category: "training",
    },
    {
      id: "g9",
      src: "assets/images/cardio.jpg",
      alt: "Cardio section at Fitzone Gym",
      category: "equipment",
    },
  ],

  // ─── Membership ───────────────────────────────────────────────────────────
  // Prices and packages are deliberately not specified here.
  // Update once confirmed by the gym owner.
  membership: {
    showPrices: false,
    ctaText: "Contact Fitzone Gym to learn about membership options, training, timings and availability.",
    enquiryNote: "Get in touch and we'll guide you to the right membership for your goals.",
  },

  // ─── SEO / Meta ───────────────────────────────────────────────────────────
  seo: {
    title: "Fitzone Gym Thanjavur | Modern Fitness Gym in Thanjavur, Tamil Nadu",
    description:
      "Fitzone Gym, Thanjavur — a modern, clean fitness gym opposite Sathya Stadium, MC Road. Modern equipment, personalized training guidance, and supportive trainers. 4.9★ on Google (449 reviews). Enquire now.",
    keywords:
      "Fitzone Gym Thanjavur, gym in Thanjavur, gym Thanjavur Tamil Nadu, fitness gym Thanjavur, gym near Sathya Stadium, gym Ganapathy Nagar Thanjavur, fitness centre Thanjavur, workout gym Thanjavur, ஃட்சோன் ஜிம்",
    canonicalUrl: "https://fitzonegym.in/", // Update with actual domain
    ogImage: "assets/images/hero-bg.jpg",
  },
};

// ─── Computed Helpers ──────────────────────────────────────────────────────────
FITZONE.whatsappUrl = FITZONE.whatsapp.enabled
  ? `https://wa.me/${FITZONE.whatsapp.number}?text=${encodeURIComponent(FITZONE.whatsapp.message)}`
  : null;

FITZONE.hasHours = Object.keys(FITZONE.hours).length > 0;
FITZONE.hasSocial =
  FITZONE.social.instagram || FITZONE.social.facebook || FITZONE.social.youtube;

// Export for module environments (future use)
if (typeof module !== "undefined" && module.exports) {
  module.exports = FITZONE;
}
