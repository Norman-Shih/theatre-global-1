import Link from "next/link"

export type CoffeeProduct = {
  id: string
  name: string
  state: "Focus" | "Lift" | "Deep" | "Soft" | "Dense"
  feeling: string
  intensity: number
  price: number
}

type ProductCardProps = {
  id: CoffeeProduct["id"]
  name: CoffeeProduct["name"]
  state: string
  feeling: CoffeeProduct["feeling"]
  intensity: CoffeeProduct["intensity"]
  price: CoffeeProduct["price"]
}

const clampIntensity = (value: number) => Math.min(5, Math.max(1, value))
const intensityStops = [3, 23, 50, 77, 97]
const stateSignatures: Record<CoffeeProduct["state"], string> = {
  Focus: "Precise, controlled, clear in its intent.",
  Lift: "Bright, open, quietly in motion.",
  Deep: "Immersive, inward, slow to let go.",
  Soft: "Gentle, open, light on its feet.",
  Dense: "Grounded, weighted, deliberate in pace.",
}

const formatFeeling = (feeling: string) => {
  const normalized = feeling.trim().replace(/\s+/g, " ").replace(/[.]+$/g, "")
  return normalized.length > 80
    ? `${normalized.slice(0, 77).trimEnd()}...`
    : `${normalized}.`
}

export function ProductCard({
  id,
  name,
  state,
  feeling,
  intensity: rawIntensity,
  price,
}: ProductCardProps) {
  const intensity = clampIntensity(rawIntensity)
  const dotPosition = intensityStops[intensity - 1]
  const stateSignature =
    stateSignatures[state as CoffeeProduct["state"]] ?? "Quietly distinct in character."

  return (
    <Link
      href={`/product/${id}`}
      aria-label={`View ${name}`}
      className="group block h-full rounded-[28px] border border-stone-200/80 bg-[#f7f2ea] p-7 text-stone-900 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-stone-300 hover:shadow-[0_18px_45px_rgba(31,24,18,0.08)] sm:p-8"
    >
      <div className="flex h-full flex-col">
        <div className="min-h-[9.5rem] space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif text-3xl leading-none tracking-[0.08em] text-stone-950 sm:text-[2.15rem]">
              {name}
            </h3>

            <p className="text-[1.2rem] font-semibold uppercase leading-none tracking-[0.16em] text-stone-900 sm:text-[1.35rem]">
              {state}
            </p>
          </div>

          <p className="truncate text-sm font-light leading-[1.15] text-stone-600/80 transition-colors duration-300 group-hover:text-stone-700 sm:text-[0.96rem]">
            {formatFeeling(feeling)}
          </p>

          <p
            className="truncate text-[0.84rem] leading-[1.15] text-stone-600/75 transition-colors duration-300 group-hover:text-stone-700"
          >
            {stateSignature}
          </p>
        </div>

        <div className="mt-auto space-y-8 pt-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[0.66rem] uppercase tracking-[0.2em] text-stone-500/65">
              <span>Light</span>
              <span>Heavy</span>
            </div>

            <div className="relative h-5">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-stone-300" />
              <div
                className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-stone-900 bg-[#f7f2ea] shadow-[0_0_0_3px_rgba(247,242,234,0.95)]"
                style={{ left: `calc(${dotPosition}% - 0.4375rem)` }}
              />
            </div>
          </div>

          <div>
            <p className="font-serif text-2xl leading-none text-stone-950">
              ${price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
