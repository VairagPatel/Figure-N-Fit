import { useEffect, useMemo, useRef, useState } from "react";

type Period = "daily" | "weekly" | "monthly";
type Plan = { period: Period; data: any };

function cx(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/* ------- reduced motion ------- */
function usePRM() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const h = () => setPref(!!m?.matches);
    h();
    m?.addEventListener?.("change", h);
    return () => m?.removeEventListener?.("change", h);
  }, []);
  return pref;
}

/* ------- mic level (WebAudio) ------- */
function useMicLevel(enabled: boolean) {
  const [level, setLevel] = useState(0); // 0..1
  useEffect(() => {
    if (!enabled) return;
    let raf = 0,
      ctx: AudioContext | undefined,
      src: MediaStreamAudioSourceNode | undefined,
      analyser: AnalyserNode | undefined,
      stream: MediaStream | undefined;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        src = ctx.createMediaStreamSource(stream);
        analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        src.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const loop = () => {
          analyser!.getByteFrequencyData(data);
          const slice = data.slice(2, 24);
          const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
          setLevel(Math.min(1, avg / 140)); // slightly more reactive
          raf = requestAnimationFrame(loop);
        };
        loop();
      } catch (e) {
        console.warn("Mic error", e);
      }
    })();
    return () => {
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      ctx?.close();
    };
  }, [enabled]);
  return level;
}

/* ------- speech to text (Web Speech API) ------- */
function useSpeech(listening: boolean, onTranscript: (t: string) => void) {
  useEffect(() => {
    if (!listening) return;
    const SR: any =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      console.warn("SpeechRecognition not supported");
      return;
    }
    const rec = new SR();
    rec.lang = "en-IN";
    rec.interimResults = true;
    rec.continuous = true;
    let full = "";
    rec.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const tr = e.results[i][0].transcript;
        if (e.results[i].isFinal) full += tr + " ";
        else interim += tr;
      }
      onTranscript((full + interim).trim());
    };
    rec.onerror = (e: any) => console.warn("SR err", e);
    rec.start();
    return () => {
      try {
        rec.stop();
      } catch {}
    };
  }, [listening, onTranscript]);
}

/* ------- MOCK: build a plan if no backend -------- */
function buildMockPlan(prompt: string, period: Period): Plan {
  const baseMeals = [
    { time: "7:30 AM", meal: "Warm water + lemon", kcal: 10, notes: "Hydrate" },
    { time: "8:30 AM", meal: "Oats + curd + nuts", kcal: 380, notes: "Protein + fiber" },
    { time: "12:45 PM", meal: "2 roti + dal + salad", kcal: 520, notes: "Balanced plate" },
    { time: "4:30 PM", meal: "Fruit + buttermilk", kcal: 180, notes: "Light carbs" },
    { time: "8:00 PM", meal: "Grilled paneer + veggies", kcal: 460, notes: "High protein" },
  ];
  if (period === "daily") return { period, data: baseMeals };
  if (period === "weekly") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return {
      period,
      data: days.map((d, i) => ({
        day: d,
        meals: baseMeals.map((m, mi) => ({
          ...m,
          meal: mi % 2 ? m.meal.replace("paneer", "chana") : m.meal,
        })),
      })),
    };
  }
  // monthly (4 weeks)
  return {
    period,
    data: Array.from({ length: 4 }).map((_, w) => ({
      week: w + 1,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    })),
  };
}

/* ------- call your AI backend (replace URL/key) ------- */
async function fetchAiPlan(
  prompt: string,
  period: Period,
  signal?: AbortSignal
): Promise<Plan> {
  try {
    const res = await fetch("/api/ai/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, period }),
      signal,
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return buildMockPlan(prompt, period);
  }
}

/* ------- helpers: export/share/tts ------- */
function planToCsv(plan?: Plan) {
  if (!plan) return "";
  if (plan.period === "daily") {
    const rows = [["Time", "Meal", "kcal", "Notes"], ...plan.data.map((r: any) => [r.time, r.meal, r.kcal, r.notes])];
    return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  }
  if (plan.period === "weekly") {
    const lines = ["Day,Time,Meal,kcal,Notes"];
    plan.data.forEach((d: any) =>
      d.meals.forEach((m: any) => lines.push([d.day, m.time, m.meal, m.kcal, m.notes].join(",")))
    );
    return lines.join("\n");
  }
  // monthly
  const lines = ["Week,Day"];
  plan.data.forEach((w: any) => w.days.forEach((d: string) => lines.push([w.week, d].join(","))));
  return lines.join("\n");
}

function download(filename: string, content: string, mime = "text/csv") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function copyText(text: string) {
  return navigator.clipboard?.writeText(text);
}

function ttsSpeak(text: string) {
  const s = window.speechSynthesis;
  if (!s) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-IN";
  u.rate = 1;
  s.cancel();
  s.speak(u);
}

export default function DietVoiceAssistant() {
  const prm = usePRM();
  const [listening, setListening] = useState(false);
  const [period, setPeriod] = useState<Period>("daily");
  const [prompt, setPrompt] = useState("Create a 1800 kcal vegetarian fat-loss plan with Indian meals.");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | undefined>(() => {
    try {
      const raw = localStorage.getItem("fnf:lastPlan");
      return raw ? (JSON.parse(raw) as Plan) : undefined;
    } catch {
      return undefined;
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [tts, setTts] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const level = useMicLevel(listening && !prm);
  useSpeech(listening && !prm, setTranscript);

  const effectivePrompt = transcript || prompt;

  useEffect(() => {
    if (!plan) return;
    try {
      localStorage.setItem("fnf:lastPlan", JSON.stringify(plan));
    } catch {}
  }, [plan]);

  async function generate() {
    setError(null);
    setLoading(true);
    setListening(false); // stop mic while generating
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const p = await fetchAiPlan(effectivePrompt.trim(), period, ctrl.signal);
      setPlan(p);
      if (tts && p?.period === "daily") {
        const summary = p.data.map((m: any) => `${m.time}: ${m.meal}`).join(". ");
        ttsSpeak(`Here is your daily plan. ${summary}`);
      }
    } catch (e: any) {
      setError(e?.message || "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  }

  /* ---- sizes for the mic animation ---- */
  const ringScale = useMemo(() => (prm ? 1 : 1 + level * 0.45), [level, prm]);
  const coreScale = useMemo(() => (prm ? 1 : 1 + level * 0.25), [level, prm]);

  /* ---- share text for WhatsApp/email ---- */
  const shareText = useMemo(() => {
    if (!plan) return "";
    if (plan.period === "daily") {
      const lines = plan.data.map((r: any) => `${r.time} — ${r.meal} (${r.kcal} kcal) ${r.notes ? "• " + r.notes : ""}`);
      return `Diet Plan (${plan.period}):\n` + lines.join("\n");
    }
    if (plan.period === "weekly") {
      const parts: string[] = [];
      plan.data.forEach((d: any) => {
        parts.push(`\n${d.day}:`);
        d.meals.forEach((m: any) => parts.push(`  ${m.time} — ${m.meal} (${m.kcal} kcal)`));
      });
      return `Diet Plan (weekly):` + parts.join("\n");
    }
    return `Diet Plan (monthly): Weeks 1–4 with day markers.`;
  }, [plan]);

  return (
    <section className="container py-12 md:py-16">
      {/* Header */}
      <div className="text-center">
        <p className="text-brand-600">AI Voice Assistant</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-700 mt-1">Ask your diet coach</h2>
        <p className="text-gray-700 mt-2">
          Speak or type your goal. Get a clear, table-formatted plan — daily, weekly or monthly.
        </p>
      </div>

      {/* Canvas */}
      <div className="mt-8 grid lg:grid-cols-[420px_1fr] gap-8 items-start">
        {/* Left: Mic + controls */}
        <div className="rounded-2xl border bg-white p-6 shadow-soft motion-safe:animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Mode</div>
            <div className="flex gap-2">
              {(["daily", "weekly", "monthly"] as Period[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setPeriod(v)}
                  className={cx(
                    "px-3 py-1.5 rounded-full border text-sm",
                    period === v ? "bg-brand-500 text-white border-brand-500" : "hover:bg-brand-50"
                  )}
                >
                  {v[0].toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Siri-like mic */}
          <div className="relative mt-6 grid place-items-center">
            <div className="relative h-48 w-48">
              {/* soft gradient disc */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, rgba(140,198,62,0.35), rgba(79,133,33,0.65))",
                  transform: `scale(${coreScale})`,
                  transition: "transform 100ms linear",
                }}
              />
              {/* rotating sweep */}
              <div className="absolute inset-0 rounded-full border border-white/40 backdrop-blur-sm pointer-events-none animate-sweep" />
              {/* pulsing ring */}
              {listening && <div className="absolute inset-0 rounded-full ring-2 ring-brand-500 animate-ring-pulse" />}
              {/* concentric ring */}
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="h-40 w-40 rounded-full border border-white/30"
                  style={{ transform: `scale(${ringScale})`, transition: "transform 90ms linear" }}
                />
              </div>
              {/* equalizer bars */}
              {!prm && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex gap-1 h-10 items-end">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 bg-white/70 origin-bottom animate-eq"
                        style={{ animationDelay: `${i * 0.08}s`, height: `${30 + level * 40}px` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* mic button */}
              <button
                onClick={() => setListening((v) => !v)}
                className={cx(
                  "absolute inset-0 m-auto h-14 w-14 grid place-items-center rounded-full shadow-soft border focus:outline-none focus:ring-2 focus:ring-brand-300",
                  listening ? "bg-brand-600 text-white border-brand-600" : "bg-white text-brand-700 hover:bg-brand-50"
                )}
                aria-pressed={listening}
                aria-label={listening ? "Stop listening" : "Start listening"}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V20H8v2h8v-2h-3v-2.08A7 7 0 0 0 19 11h-2Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Prompt input */}
          <div className="mt-6">
            <label className="text-sm text-gray-600">Your request</label>
            <textarea
              className="mt-1 w-full rounded-xl border px-4 py-3 min-h-28 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="E.g. 1800 kcal veg plan, no mushrooms, easy prep, include curd."
              value={transcript || prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setTranscript("");
              }}
            />
            {/* toggles */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={tts} onChange={(e) => setTts(e.target.checked)} />
                Read aloud summary
              </label>
              <span className="text-xs text-gray-500">Mic {listening ? "ON" : "OFF"}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={generate}
                className="relative rounded-full bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 disabled:opacity-50"
                disabled={loading}
              >
                <span className="relative z-10">{loading ? "Generating…" : "Generate plan"}</span>
                {!loading && (
                  <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)] motion-safe:animate-shimmer" />
                )}
              </button>
              <button
                onClick={() => {
                  setTranscript("");
                  setPrompt("");
                }}
                className="rounded-full border hover:bg-brand-50 px-5 py-2.5"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Tips */}
          <ul className="mt-4 text-xs text-gray-500 list-disc pl-5">
            <li>Say: “Weekly diabetic-friendly plan, 1500 kcal, Gujarati veg.”</li>
            <li>Use “Monthly” to get a high-level calendar grid.</li>
          </ul>
        </div>

        {/* Right: Output */}
        <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-soft motion-safe:animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-brand-700">Your plan</h3>
            <span className="text-sm text-gray-500">{period.toUpperCase()}</span>
          </div>

          {/* Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="text-sm rounded-full border px-3 py-1.5 hover:bg-brand-50"
              onClick={() => plan && copyText(shareText)}
              disabled={!plan}
              title="Copy text"
            >
              Copy
            </button>
            <button
              className="text-sm rounded-full border px-3 py-1.5 hover:bg-brand-50"
              onClick={() => plan && download(`diet-${plan.period}.csv`, planToCsv(plan))}
              disabled={!plan}
              title="Export CSV"
            >
              Export CSV
            </button>
            <button
              className="text-sm rounded-full border px-3 py-1.5 hover:bg-brand-50"
              onClick={() => window.print()}
              title="Print"
            >
              Print
            </button>
            <a
              className={cx(
                "text-sm rounded-full border px-3 py-1.5 hover:bg-brand-50",
                !plan && "pointer-events-none opacity-50"
              )}
              href={plan ? `https://wa.me/9913348004?text=${encodeURIComponent(shareText)}` : undefined}
              target="_blank"
              rel="noreferrer"
              title="Share to WhatsApp"
            >
              Share (WA)
            </a>
            <a
              className={cx(
                "text-sm rounded-full border px-3 py-1.5 hover:bg-brand-50",
                !plan && "pointer-events-none opacity-50"
              )}
              href={plan ? `mailto:?subject=Diet Plan&body=${encodeURIComponent(shareText)}` : undefined}
              title="Share via email"
            >
              Share (Email)
            </a>
            <button
              className="text-sm rounded-full border px-3 py-1.5 hover:bg-brand-50"
              onClick={() => plan && localStorage.setItem("fnf:lastPlan", JSON.stringify(plan))}
              disabled={!plan}
              title="Save to dashboard"
            >
              Save
            </button>
          </div>

          {!plan && (
            <div className="mt-6 text-gray-600">
              Ask something like:
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {[
                  "Daily 1800 kcal vegetarian fat-loss plan",
                  "Weekly PCOS plan, high protein, curd allowed",
                  "Monthly plan with 4-week rotation, easy prep",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setPrompt(s);
                      setTranscript("");
                    }}
                    className="text-left rounded-xl border px-4 py-3 hover:bg-brand-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">{error}</div>}

          {plan?.period === "daily" && (
            <div className="mt-6 overflow-x-auto -mx-2 md:mx-0">
              <table className="min-w-[640px] w-full border">
                <thead className="bg-brand-50">
                  <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left">
                    <th>Time</th>
                    <th>Meal</th>
                    <th>kcal</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-brand-50/40">
                  {plan.data.map((r: any, i: number) => (
                    <tr key={i} className="[&>td]:px-3 [&>td]:py-2 border-t">
                      <td>{r.time}</td>
                      <td>{r.meal}</td>
                      <td>{r.kcal}</td>
                      <td>{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {plan?.period === "weekly" && (
            <div className="mt-6 space-y-4">
              {plan.data.map((day: any) => (
                <details key={day.day} className="rounded-xl border">
                  <summary className="cursor-pointer px-4 py-2 font-semibold text-brand-700">{day.day}</summary>
                  <div className="px-4 pb-3">
                    <ul className="mt-2 grid gap-2">
                      {day.meals.map((m: any, i: number) => (
                        <li key={i} className="rounded-lg border px-3 py-2 flex justify-between gap-2">
                          <span className="font-medium">{m.time}</span>
                          <span className="text-gray-700 flex-1">{m.meal}</span>
                          <span className="text-sm text-gray-500">{m.kcal} kcal</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          )}

          {plan?.period === "monthly" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {plan.data.map((w: any) => (
                <div key={w.week} className="rounded-2xl border p-4">
                  <div className="font-semibold text-brand-700">Week {w.week}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {w.days.map((d: string) => (
                      <span key={d} className="text-sm px-2 py-1 rounded-full border bg-brand-50">
                        {d}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Rotate proteins (paneer/chana/egg or tofu), add seasonal veggies, keep 8–10k steps/day.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
