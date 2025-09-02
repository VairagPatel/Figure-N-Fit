// src/components/NutrientCalculator.tsx
import { useEffect, useMemo, useState } from "react";

type Goal = "loss" | "maintain" | "gain";
type Sex = "male" | "female";
type Activity = "sedentary" | "light" | "moderate" | "active" | "very";

const ACTIVITY_FACTORS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very: 1.9,
};

function round(n: number, d = 0) {
  const m = Math.pow(10, d);
  return Math.round(n * m) / m;
}

export default function NutrientCalculator() {
  // basic inputs
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<number>(24);
  const [height, setHeight] = useState<number>(170); // cm
  const [weight, setWeight] = useState<number>(70); // kg
  const [activity, setActivity] = useState<Activity>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  // advanced
  const [proteinPerKg, setProteinPerKg] = useState<number>(1.6);
  const [fatPct, setFatPct] = useState<number>(30); // % of calories
  const [indianVeg, setIndianVeg] = useState<boolean>(true);

  // persist last values
  useEffect(() => {
    try {
      localStorage.setItem(
        "fnf:nutrientCalc",
        JSON.stringify({ sex, age, height, weight, activity, goal, proteinPerKg, fatPct, indianVeg })
      );
    } catch {}
  }, [sex, age, height, weight, activity, goal, proteinPerKg, fatPct, indianVeg]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fnf:nutrientCalc");
      if (raw) {
        const s = JSON.parse(raw);
        setSex(s.sex ?? "male");
        setAge(s.age ?? 24);
        setHeight(s.height ?? 170);
        setWeight(s.weight ?? 70);
        setActivity(s.activity ?? "moderate");
        setGoal(s.goal ?? "maintain");
        setProteinPerKg(s.proteinPerKg ?? 1.6);
        setFatPct(s.fatPct ?? 30);
        setIndianVeg(s.indianVeg ?? true);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // calculations
  const bmr = useMemo(() => {
    // Mifflin–St Jeor
    const s = sex === "male" ? 5 : -161;
    return 10 * weight + 6.25 * height - 5 * age + s;
  }, [sex, age, height, weight]);

  const tdee = useMemo(() => bmr * ACTIVITY_FACTORS[activity], [bmr, activity]);

  const targetCalories = useMemo(() => {
    if (goal === "loss") return tdee - 400;     // modest deficit
    if (goal === "gain") return tdee + 300;     // gentle surplus
    return tdee;
  }, [tdee, goal]);

  const macros = useMemo(() => {
    const proteinGrams = Math.max(1.2, proteinPerKg) * weight; // g
    const proteinKcal = proteinGrams * 4;

    const fatKcal = (Math.min(Math.max(fatPct, 20), 40) / 100) * targetCalories;
    const fatGrams = fatKcal / 9;

    const carbsKcal = Math.max(targetCalories - (proteinKcal + fatKcal), 0);
    const carbsGrams = carbsKcal / 4;

    const pct = (x: number) => (targetCalories ? Math.round((x / targetCalories) * 100) : 0);
    return {
      proteinGrams: round(proteinGrams, 0),
      fatGrams: round(fatGrams, 0),
      carbsGrams: round(carbsGrams, 0),
      proteinPct: pct(proteinKcal),
      fatPct: pct(fatKcal),
      carbsPct: pct(carbsKcal),
    };
  }, [weight, proteinPerKg, fatPct, targetCalories]);

  // suggested meal split (4 meals)
  const meals = useMemo(() => {
    const { proteinGrams, carbsGrams, fatGrams } = macros;
    const split = [0.30, 0.35, 0.15, 0.20]; // breakfast, lunch, snack, dinner
    return split.map((f) => ({
      p: round(proteinGrams * f, 0),
      c: round(carbsGrams * f, 0),
      fa: round(fatGrams * f, 0),
      kcal: round(targetCalories * f, 0),
    }));
  }, [macros, targetCalories]);

  // quick veg options (simple hints, front-end only)
  const vegHints = indianVeg
    ? [
        "Breakfast: Oats + curd + nuts / Poha + sprouts",
        "Lunch: 2 roti + dal + sabzi + salad",
        "Snack: Fruit + buttermilk / chana chaat",
        "Dinner: Paneer/tofu + veggies / khichdi + salad",
      ]
    : [
        "Breakfast: Eggs + toast + fruit",
        "Lunch: Rice + chicken + veggies",
        "Snack: Yogurt + nuts",
        "Dinner: Fish/chicken + veggies + roti",
      ];

  return (
    <section className="mt-8 rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-700 p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-extrabold text-brand-700">Nutrient Calculator</h3>
        <span className="text-sm text-gray-500">BMR → TDEE → Calories & Macros</span>
      </div>

      {/* inputs */}
      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid gap-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">Sex</label>
          <select className="border rounded-xl px-3 py-2 dark:bg-gray-900 dark:border-gray-700" value={sex} onChange={(e)=>setSex(e.target.value as Sex)}>
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Age</label>
          <input type="number" className="border rounded-xl px-3 py-2 dark:bg-gray-900 dark:border-gray-700" value={age} onChange={(e)=>setAge(+e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Height (cm)</label>
          <input type="number" className="border rounded-xl px-3 py-2 dark:bg-gray-900 dark:border-gray-700" value={height} onChange={(e)=>setHeight(+e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Weight (kg)</label>
          <input type="number" className="border rounded-xl px-3 py-2 dark:bg-gray-900 dark:border-gray-700" value={weight} onChange={(e)=>setWeight(+e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Activity</label>
          <select className="border rounded-xl px-3 py-2 dark:bg-gray-900 dark:border-gray-700" value={activity} onChange={(e)=>setActivity(e.target.value as Activity)}>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light (1–3x/wk)</option>
            <option value="moderate">Moderate (3–5x/wk)</option>
            <option value="active">Active (6–7x/wk)</option>
            <option value="very">Very Active</option>
          </select>
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Goal</label>
          <div className="flex gap-2">
            {(["loss","maintain","gain"] as Goal[]).map(g=>(
              <button key={g}
                onClick={()=>setGoal(g)}
                className={`px-3 py-2 rounded-full border text-sm ${goal===g ? "bg-brand-600 text-white border-brand-600" : "hover:bg-brand-50 dark:hover:bg-gray-800"}`}>
                {g[0].toUpperCase()+g.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* advanced */}
      <details className="mt-4 rounded-xl border px-4 py-3 dark:border-gray-700">
        <summary className="cursor-pointer font-semibold text-brand-700">Advanced options</summary>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div>
            <label className="text-sm">Protein (g/kg)</label>
            <input type="number" step="0.1" className="w-full border rounded-xl px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
              value={proteinPerKg} onChange={(e)=>setProteinPerKg(+e.target.value || 1.6)} />
          </div>
          <div>
            <label className="text-sm">Fat % of calories</label>
            <input type="number" className="w-full border rounded-xl px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
              value={fatPct} onChange={(e)=>setFatPct(+e.target.value || 30)} />
          </div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={indianVeg} onChange={(e)=>setIndianVeg(e.target.checked)} />
            Indian veg suggestions
          </label>
        </div>
      </details>

      {/* results */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* summary cards */}
        <div className="grid gap-3">
          <div className="rounded-xl border p-4 bg-brand-50/40 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300">BMR</div>
            <div className="text-2xl font-extrabold text-brand-700">{round(bmr, 0)} kcal</div>
          </div>
          <div className="rounded-xl border p-4 bg-brand-50/40 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300">TDEE</div>
            <div className="text-2xl font-extrabold text-brand-700">{round(tdee, 0)} kcal</div>
          </div>
          <div className="rounded-xl border p-4 bg-brand-50/40 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300">Target Calories ({goal})</div>
            <div className="text-2xl font-extrabold text-brand-700">{round(targetCalories, 0)} kcal</div>
          </div>
        </div>

        {/* macro table */}
        <div className="rounded-xl border p-4 dark:border-gray-700">
          <div className="font-semibold text-brand-700">Daily Macros</div>
          <table className="mt-2 w-full border">
            <thead className="bg-brand-50 dark:bg-gray-800">
              <tr className="[&>th]:p-2 text-left">
                <th>Macro</th><th>Grams</th><th>%</th>
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-brand-50/40 dark:[&>tr:nth-child(odd)]:bg-gray-900 dark:[&>tr:nth-child(even)]:bg-gray-800">
              <tr className="[&>td]:p-2 border-t"><td>Protein</td><td>{macros.proteinGrams} g</td><td>{macros.proteinPct}%</td></tr>
              <tr className="[&>td]:p-2 border-t"><td>Carbs</td><td>{macros.carbsGrams} g</td><td>{macros.carbsPct}%</td></tr>
              <tr className="[&>td]:p-2 border-t"><td>Fat</td><td>{macros.fatGrams} g</td><td>{macros.fatPct}%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* meal split */}
      <div className="mt-5 rounded-xl border p-4 dark:border-gray-700">
        <div className="font-semibold text-brand-700">Split across meals</div>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {["Breakfast","Lunch","Snack","Dinner"].map((name, i)=>(
            <div key={name} className="rounded-lg border p-3 bg-white dark:bg-gray-900 dark:border-gray-700">
              <div className="font-medium">{name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {meals[i].kcal} kcal • P {meals[i].p}g • C {meals[i].c}g • F {meals[i].fa}g
              </div>
              <div className="text-xs text-gray-500 mt-1">{vegHints[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
