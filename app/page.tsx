import ProductCard from "@/components/ProductCard"

const products = [
  {
    id: "tokyo-02",
    name: "TOKYO 02",
    state: "Focus",
    feeling: "Starts clear, stays tight, fades quickly.",
    intensity: 3,
    price: 18
  },
  {
    id: "bali-01",
    name: "BALI 01",
    state: "Deep",
    feeling: "Slow entry, expands gently, lingers.",
    intensity: 4,
    price: 20
  },
  {
    id: "seoul-03",
    name: "SEOUL 03",
    state: "Lift",
    feeling: "Bright upfront, lifts fast, clean finish.",
    intensity: 2,
    price: 17
  },
  {
    id: "taipei-01",
    name: "TAIPEI 01",
    state: "Soft",
    feeling: "Gentle start, round body, quiet finish.",
    intensity: 2,
    price: 19
  },
  {
    id: "sydney-04",
    name: "SYDNEY 04",
    state: "Dense",
    feeling: "Heavy entry, compact, holds presence.",
    intensity: 5,
    price: 22
  },
  {
    id: "bangkok-02",
    name: "BANGKOK 02",
    state: "Lift",
    feeling: "Quick rise, energetic, disappears fast.",
    intensity: 3,
    price: 18
  }
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-20">

      <div className="max-w-5xl mx-auto mb-16">
        <p className="text-sm opacity-50 tracking-wide">
          Coffee, chosen for how you want to feel.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

    </main>
  )
}
