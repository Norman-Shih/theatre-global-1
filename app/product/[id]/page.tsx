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

const productDetails = {
  "tokyo-02": {
    identity: "For staying with one thing.",
    confirmation: "This is an easy one to trust.",
    lowRisk: "You'll understand it quickly.",
    feelingLines: [
      "Starts close and clear",
      "Holds your attention",
      "Leaves before it lingers",
    ],
    selfMatch: [
      "You want to stay in control",
      "You don't want distraction",
      "You need clarity without pressure",
    ],
    texture: "Clean / Tight",
    finish: "Short",
  },
  "bali-01": {
    identity: "For going inward without effort.",
    confirmation: "This is an easy one to trust.",
    lowRisk: "You'll understand it quickly.",
    feelingLines: [
      "Opens slowly",
      "Pulls you inward",
      "Stays after the middle",
    ],
    selfMatch: [
      "You want to go deeper, not faster",
      "You want less surface noise",
      "You want something that stays with you",
    ],
    texture: "Round / Close",
    finish: "Long",
  },
  "seoul-03": {
    identity: "For finding momentum without force.",
    confirmation: "This is an easy one to trust.",
    lowRisk: "You'll understand it quickly.",
    feelingLines: [
      "Arrives bright",
      "Moves you forward",
      "Finishes clean",
    ],
    selfMatch: [
      "You want movement without heaviness",
      "You want energy that stays readable",
      "You want a lighter kind of focus",
    ],
    texture: "Bright / Quick",
    finish: "Clean",
  },
  "taipei-01": {
    identity: "For keeping the edges soft.",
    confirmation: "This is an easy one to trust.",
    lowRisk: "You'll understand it quickly.",
    feelingLines: [
      "Starts gently",
      "Stays open through the middle",
      "Leaves the room quiet",
    ],
    selfMatch: [
      "You want less edge in the day",
      "You want ease without blur",
      "You want something open, not demanding",
    ],
    texture: "Round / Light",
    finish: "Quiet",
  },
  "sydney-04": {
    identity: "For wanting something that holds.",
    confirmation: "This is an easy one to trust.",
    lowRisk: "You'll understand it quickly.",
    feelingLines: [
      "Lands with weight",
      "Stays compact through the middle",
      "Keeps its shape at the end",
    ],
    selfMatch: [
      "You want something that holds its ground",
      "You want more presence, not more noise",
      "You want weight that stays composed",
    ],
    texture: "Compact / Heavy",
    finish: "Long",
  },
  "bangkok-02": {
    identity: "For quick lift without drag.",
    confirmation: "This is an easy one to trust.",
    lowRisk: "You'll understand it quickly.",
    feelingLines: [
      "Rises quickly",
      "Keeps things moving",
      "Leaves clean and fast",
    ],
    selfMatch: [
      "You want momentum without weight",
      "You don't want to linger too long",
      "You want a faster, cleaner shift",
    ],
    texture: "Quick / Light",
    finish: "Short",
  },
} as const

const intensityLabel = (intensity: number) => {
  if (intensity <= 1) return "Light"
  if (intensity === 2) return "Light / Medium"
  if (intensity === 3) return "Medium"
  if (intensity === 4) return "Medium / Full"
  return "Full"
}

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

  const details = productDetails[product.id]

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-black sm:py-20">
      <div className="mx-auto flex max-w-[640px] flex-col items-center space-y-16">
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

          <p className="text-lg text-black/70">{details.identity}</p>
        </header>

        <section className="w-full space-y-5 text-center">
          {details.feelingLines.map((line) => (
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
            This fits when
          </p>

          <ul className="space-y-2 text-lg leading-snug">
            {details.selfMatch.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="w-full space-y-4 text-center">
          <p className="text-base text-black/70">{details.confirmation}</p>

          <button
            type="button"
            className="w-full rounded-full border border-black bg-black px-6 py-4 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
          >
            Start with this
          </button>

          <p className="text-sm text-black/45">{details.lowRisk}</p>
        </div>

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
