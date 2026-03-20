import { notFound } from "next/navigation"

const products = [
  {
    id: "tokyo-02",
    name: "TOKYO 02",
    state: "Focus",
    feeling: "Starts clear, stays tight, fades quickly.",
    intensity: 3,
    price: 18,
  },
  {
    id: "bali-01",
    name: "BALI 01",
    state: "Deep",
    feeling: "Slow entry, expands gently, lingers.",
    intensity: 4,
    price: 20,
  },
  {
    id: "seoul-03",
    name: "SEOUL 03",
    state: "Lift",
    feeling: "Bright upfront, lifts fast, clean finish.",
    intensity: 2,
    price: 17,
  },
  {
    id: "taipei-01",
    name: "TAIPEI 01",
    state: "Soft",
    feeling: "Gentle start, round body, quiet finish.",
    intensity: 2,
    price: 19,
  },
  {
    id: "sydney-04",
    name: "SYDNEY 04",
    state: "Dense",
    feeling: "Heavy entry, compact, holds presence.",
    intensity: 5,
    price: 22,
  },
  {
    id: "bangkok-02",
    name: "BANGKOK 02",
    state: "Lift",
    feeling: "Quick rise, energetic, disappears fast.",
    intensity: 3,
    price: 18,
  },
] as const

const decisionSupport = {
  Focus: {
    bestWhen: ["Working", "Reading", "Early hours"],
    texture: "Clean / Tight",
    finish: "Short",
  },
  Lift: {
    bestWhen: ["Starting out", "Open afternoons", "Moving quickly"],
    texture: "Bright / Quick",
    finish: "Clean",
  },
  Deep: {
    bestWhen: ["Quiet nights", "Slow reading", "Settling in"],
    texture: "Round / Close",
    finish: "Long",
  },
  Soft: {
    bestWhen: ["Unhurried mornings", "Long conversations", "Slower light"],
    texture: "Round / Light",
    finish: "Quiet",
  },
  Dense: {
    bestWhen: ["Deep work", "After dark", "Cold starts"],
    texture: "Compact / Heavy",
    finish: "Long",
  },
} as const

const intensityLabel = (intensity: number) => {
  if (intensity <= 1) return "Light"
  if (intensity === 2) return "Light / Medium"
  if (intensity === 3) return "Medium"
  if (intensity === 4) return "Medium / Full"
  return "Full"
}

const feelingLines = (feeling: string) =>
  feeling
    .replace(/\.$/, "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 3)

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find((entry) => entry.id === id)

  if (!product) {
    notFound()
  }

  const details = decisionSupport[product.state]

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-black sm:py-20">
      <div className="mx-auto flex max-w-[700px] flex-col items-center space-y-16">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-black/45">
            Selected for how you want to feel
          </p>

          <h1 className="font-serif text-4xl leading-tight tracking-[0.06em] sm:text-5xl">
            {product.name}{" "}
            <span className="font-sans text-[0.7em] font-semibold uppercase tracking-[0.16em]">
              - {product.state}
            </span>
          </h1>
        </header>

        <section className="w-full space-y-5 text-center">
          {feelingLines(product.feeling).map((line) => (
            <p
              key={line}
              className="text-2xl leading-tight text-black/88 sm:text-[2rem]"
            >
              {line}
            </p>
          ))}
        </section>

        <section className="w-full space-y-4 border-y border-black/10 py-8 text-center">
          <p className="text-sm uppercase tracking-[0.18em] text-black/45">
            Best when
          </p>

          <ul className="space-y-2 text-lg leading-snug">
            {details.bestWhen.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          className="w-full rounded-full border border-black bg-black px-6 py-4 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
        >
          Start with this
        </button>

        <section className="w-full space-y-4">
          <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm sm:text-base">
            <span className="text-black/45">State</span>
            <span>{product.state}</span>

            <span className="text-black/45">Intensity</span>
            <span>{intensityLabel(product.intensity)}</span>

            <span className="text-black/45">Texture</span>
            <span>{details.texture}</span>

            <span className="text-black/45">Finish</span>
            <span>{details.finish}</span>
          </div>
        </section>

        <details className="w-full border-t border-black/10 pt-6">
          <summary className="cursor-pointer list-none text-sm uppercase tracking-[0.18em] text-black/55">
            Tech info
          </summary>

          <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm sm:text-base">
            <span className="text-black/45">Origin</span>
            <span>Ethiopia</span>

            <span className="text-black/45">Process</span>
            <span>Washed</span>

            <span className="text-black/45">Roast</span>
            <span>Light</span>
          </div>
        </details>
      </div>
    </main>
  )
}
