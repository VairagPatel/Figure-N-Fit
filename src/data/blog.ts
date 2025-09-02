// src/data/blog.ts
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;          // ISO
  author: string;
  cover: string;
  category: "Diet" | "Fitness" | "Gym" | "Weight Loss" | "Recipes" | "Mindful Eating";
  tags: string[];
  content: string;       // HTML
  featured?: boolean;
  views?: number;
};

export const POSTS: BlogPost[] = [
  {
    slug: "balanced-diet-plate",
    title: "How to Build a Balanced Diet Plate",
    excerpt: "A simple visual rule to hit protein, carbs, fats, and fiber every meal.",
    date: "2025-06-10",
    author: "Figure ‘n Fit Team",
    cover: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
    category: "Diet",
    tags: ["macros", "meal-planning", "nutrition"],
    featured: true,
    views: 1890,
    content: `
      <h2>The 1/2–1/4–1/4 Plate</h2>
      <p>Half veggies & fruit, quarter protein, quarter carbs. Add a thumb of healthy fats.</p>
      <ul><li>Protein: eggs, paneer, chicken, tofu</li><li>Carbs: rice, roti, millets</li><li>Fats: ghee, olive oil, nuts</li></ul>
    `,
  },
  {
    slug: "beginner-gym-plan-3x",
    title: "Beginner 3-Day Gym Plan (Push/Pull/Legs)",
    excerpt: "A simple split that builds strength without frying your recovery.",
    date: "2025-05-28",
    author: "Coach Team",
    cover: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop",
    category: "Gym",
    tags: ["beginner", "programming", "strength"],
    views: 2310,
    content: `
      <h2>Structure</h2>
      <p>Day 1: Push · Day 2: Pull · Day 3: Legs. Keep 6–12 reps, 2–3 RIR, progress weekly.</p>
    `,
  },
  {
    slug: "fat-loss-mistakes",
    title: "7 Fat-Loss Mistakes Sabotaging Your Progress",
    excerpt: "From liquid calories to weekend binges—fix these and the scale will move.",
    date: "2025-08-01",
    author: "Figure ‘n Fit Team",
    cover: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    category: "Weight Loss",
    tags: ["calories", "habits", "mindset"],
    featured: true,
    views: 4021,
    content: `
      <ol>
        <li>Drinking calories</li><li>Guessing portions</li><li>Under-protein</li>
        <li>Sleep &lt; 7h</li><li>Weekend wipe-outs</li><li>No step goal</li>
      </ol>
    `,
  },
  {
    slug: "protein-for-vegetarians",
    title: "High-Protein Diet for Vegetarians",
    excerpt: "Yes—you can hit 1.6–2.2 g/kg with Indian staples.",
    date: "2025-07-12",
    author: "Dt. Team",
    cover: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
    category: "Diet",
    tags: ["protein", "vegetarian", "indian"],
    views: 1180,
    content: `<p>Paneer, curd, lentils, soy. Spread protein across 3–5 meals for better MPS.</p>`,
  },
  {
    slug: "home-workout-no-equipment",
    title: "30-Minute No-Equipment Home Workout",
    excerpt: "Full-body circuit you can do anywhere.",
    date: "2025-04-10",
    author: "Coach Team",
    cover: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1200&auto=format&fit=crop",
    category: "Fitness",
    tags: ["home", "workout", "conditioning"],
    views: 980,
    content: `<p>3 rounds: 10 pushups, 15 air squats, 10 rows, 20 mountain climbers, 30s plank. Rest 90s.</p>`,
  },
  {
    slug: "mindful-eating-101",
    title: "Mindful Eating 101",
    excerpt: "Slow down, notice, enjoy—so you naturally eat the right amount.",
    date: "2025-03-05",
    author: "Figure ‘n Fit Team",
    cover: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    category: "Mindful Eating",
    tags: ["habits", "mindfulness"],
    views: 720,
    content: `<p>Use hunger/fullness scores (1–10), remove distractions, savor each bite.</p>`,
  },
  {
    slug: "gym-warmup",
    title: "Smart Gym Warm-Up in 7 Minutes",
    excerpt: "Raise temp, mobilize, potentiate—then lift.",
    date: "2025-06-02",
    author: "Coach Team",
    cover: "https://images.unsplash.com/photo-1502810190503-8303352d45b9?q=80&w=1200&auto=format&fit=crop",
    category: "Gym",
    tags: ["warmup", "mobility"],
    views: 610,
    content: `<p>5 min easy cardio → dynamic mobility → 2 ramp-up sets for first lift.</p>`,
  },
  {
    slug: "step-goals",
    title: "Why 8–10k Steps Work for Fat Loss",
    excerpt: "NEAT is your quiet calorie burner.",
    date: "2025-07-02",
    author: "Figure ‘n Fit Team",
    cover: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?q=80&w=1200&auto=format&fit=crop",
    category: "Weight Loss",
    tags: ["NEAT", "cardio"],
    views: 760,
    content: `<p>Daily steps raise expenditure without big appetite spikes—stack with protein & sleep.</p>`,
  },
  {
    slug: "preworkout-meals",
    title: "Pre-Workout Meals That Actually Help",
    excerpt: "Fuel right: carbs + a little protein, easy on fat & fiber.",
    date: "2025-08-10",
    author: "Dt. Team",
    cover: "https://images.unsplash.com/photo-1547241850-3f84c6f1b781?q=80&w=1200&auto=format&fit=crop",
    category: "Gym",
    tags: ["preworkout", "fueling"],
    views: 310,
    content: `<p>Examples: banana + curd, toast + PB, poha + whey (if tolerated).</p>`,
  },
  {
    slug: "diet-myths-india",
    title: "5 Diet Myths in India (Busted)",
    excerpt: "Rice at night, ghee is bad, fruit makes you fat—nope.",
    date: "2025-08-03",
    author: "Dt. Team",
    cover: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
    category: "Diet",
    tags: ["myths", "india"],
    views: 520,
    content: `<p>Portion and pattern beat single-food rules. Context matters.</p>`,
  },
];

export const CATEGORIES = [
  "Diet",
  "Fitness",
  "Gym",
  "Weight Loss",
  "Recipes",
  "Mindful Eating",
] as const;

export const ALL_TAGS = Array.from(new Set(POSTS.flatMap((p) => p.tags))).sort();
