export type Service = {
  slug: string;
  title: string;
  category: "Therapeutic/Clinical" | "Lifestyle Management" | "Sports Nutrition";
  heroImage: string;        // banner image
  thumb: string;            // card image
  idealFor: string;
  features: string[];
  extras?: string[];
  description: string[];
};

export const SERVICES: Service[] = [
  /* --- Therapeutic / Clinical --- */
  {
    slug: "go-fat",
    title: "Go Fat",
    category: "Therapeutic/Clinical",
    heroImage:
      "https://images.unsplash.com/photo-1594384856780-1fc3dd3d9d42?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1523906630133-f6934a1ab3ee?q=80&w=800&auto=format&fit=crop",
    idealFor:
      "Anyone looking for losing fat, healthy body & wants gorgeous figure.",
    features: [
      "Personalized diet plans.",
      "Most comfortable diet plan as per your routine/schedule.",
      "Every 10 days call support for diet follow up.",
      "No crash diet.",
      "No medicine/shake/artificial powder for fat loss.",
      "Lifestyle changes as needed.",
      "Weekly weight follow-up.",
    ],
    extras: ["Healthy diet tips", "Healthy diet recipes", "Physical activity guidelines"],
    description: [
      "Are you worrying about an extra fat deposition in your body?",
      "We’ll guide sustainable fat loss with balanced macro distribution and mindful eating so you don’t rebound.",
    ],
  },
  {
    slug: "defeat-hypertension",
    title: "Defeat Hypertension",
    category: "Therapeutic/Clinical",
    heroImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=800&auto=format&fit=crop",
    idealFor: "High BP management via sodium-aware, potassium-rich diets.",
    features: [
      "DASH-style meal patterns.",
      "Grocery & label-reading guidance.",
      "Electrolyte balance focus.",
      "Stepwise salt reduction.",
      "Weekly BP tracking guidance.",
    ],
    description: [
      "Tailored plans to support blood pressure control with practical food swaps and meal timing.",
    ],
  },
  {
    slug: "thyroid-care",
    title: "Thyroid Care",
    category: "Therapeutic/Clinical",
    heroImage:
      "https://images.unsplash.com/photo-1542736667-069246bdbc74?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=800&auto=format&fit=crop",
    idealFor: "Hypo/Hyper-thyroid support with nutrient timing.",
    features: [
      "Iodine/selenium/iron aware planning.",
      "Goitrogen management (cook/rotate).",
      "Protein-forward satiety.",
      "Energy balance for weight regulation.",
    ],
    description: [
      "Symptom-aware nutrition with labs-aligned adjustments.",
    ],
  },
  {
    slug: "stay-healthy",
    title: "Stay Healthy",
    category: "Therapeutic/Clinical",
    heroImage:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=800&auto=format&fit=crop",
    idealFor: "General wellness & prevention.",
    features: [
      "Balanced macros & variety.",
      "Seasonal meal rotations.",
      "Habit building & checklists.",
    ],
    description: [
      "We build a simple, enjoyable routine you can actually follow long term.",
    ],
  },
  {
    slug: "gut-nourishment",
    title: "Gut Nourishment",
    category: "Therapeutic/Clinical",
    heroImage:
      "https://images.unsplash.com/photo-1526312426976-593c2b999067?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop",
    idealFor:
      "Constipation, gastric issues, indigestion or food intolerance.",
    features: [
      "Fiber & hydration plan.",
      "Elimination/reintroduction protocol.",
      "Pro/prebiotic food lists.",
      "Trigger tracking & logs.",
    ],
    description: [
      "Soothe your gut with gradual, data-driven changes and supportive recipes.",
    ],
  },
  {
    slug: "fight-pcod",
    title: "Fight PCOD",
    category: "Therapeutic/Clinical",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    idealFor: "PCOS/PCOD symptom management.",
    features: [
      "Insulin-sensitive meal timing.",
      "Low-GI carb patterns.",
      "Protein & omega-3 emphasis.",
      "Cycle-aware adjustments.",
    ],
    description: [
      "Reduce symptoms with consistent nutrition and lifestyle nudges.",
    ],
  },

  /* --- Lifestyle Management --- */
  {
    slug: "weight-gain",
    title: "Weight Gain",
    category: "Lifestyle Management",
    heroImage:
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1547241850-3f84c6f1b781?q=80&w=800&auto=format&fit=crop",
    idealFor: "Lean mass gain with minimal fat.",
    features: [
      "Calorie surplus planning.",
      "Protein target & distribution.",
      "Smart snacks & shakes (whole-food).",
    ],
    description: [
      "Gain steadily with performance-focused meals and training-friendly timing.",
    ],
  },
  {
    slug: "mumma-to-be",
    title: "Mumma To be",
    category: "Lifestyle Management",
    heroImage:
      "https://images.unsplash.com/photo-1555252333-9d5f0c31f0f5?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1543385426-1f673fb9fb93?q=80&w=800&auto=format&fit=crop",
    idealFor: "Healthy pregnancy nutrition by trimester.",
    features: [
      "Trimester-wise needs.",
      "Nausea & appetite management.",
      "Iron/folate/calcium coverage.",
    ],
    description: [
      "Safe, balanced plans supporting mother and baby.",
    ],
  },
  {
    slug: "wedding-bells",
    title: "Wedding Bells",
    category: "Lifestyle Management",
    heroImage:
      "https://images.unsplash.com/photo-1505150892987-424388e07805?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1524222841350-3e5a6e89fb36?q=80&w=800&auto=format&fit=crop",
    idealFor: "Time-bound body recomposition before the big day.",
    features: [
      "Timeline-based milestones.",
      "Skin & hair supporting nutrients.",
      "Bloat management tactics.",
    ],
    description: ["Look and feel great with practical routines."],
  },
  {
    slug: "kids-care-diet",
    title: "Kids care diet",
    category: "Lifestyle Management",
    heroImage:
      "https://images.unsplash.com/photo-1524594154908-edd0039181a7?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=800&auto=format&fit=crop",
    idealFor: "Growth, immunity & picky eating.",
    features: [
      "Age-appropriate portions.",
      "Fun, colorful plates.",
      "School tiffin ideas.",
    ],
    description: ["Build lifelong habits with family-friendly menus."],
  },
  {
    slug: "detox",
    title: "Detox",
    category: "Lifestyle Management",
    heroImage:
      "https://images.unsplash.com/photo-1524594154908-edd0039181a7?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    idealFor: "Short programs to reset mind & body.",
    features: ["Whole-food meals", "Hydration plan", "Caffeine wean (optional)"],
    description: ["Gentle reset with nutrient-dense foods."],
  },

  /* --- Sports --- */
  {
    slug: "sports-nutrition",
    title: "Sports Nutrition",
    category: "Sports Nutrition",
    heroImage:
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1600&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1502810190503-8303352d45b9?q=80&w=800&auto=format&fit=crop",
    idealFor: "Athletes and active individuals seeking performance.",
    features: [
      "Training-day vs rest-day splits.",
      "Pre/intra/post fueling.",
      "Electrolytes & recovery.",
    ],
    description: ["Periodized fueling aligned to your sport."],
  },
];

export const CATEGORIES = [
  "Therapeutic/Clinical",
  "Lifestyle Management",
  "Sports Nutrition",
] as const;
