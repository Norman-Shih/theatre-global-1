import { CoffeeProduct, ProductCard } from "./ProductCard"

const products: CoffeeProduct[] = [
  {
    id: "tokyo-02",
    name: "TOKYO 02",
    state: "Focus",
    feeling: "Clean, forward, stays with you just enough.",
    intensity: 3,
    price: 18,
  },
  {
    id: "bali-01",
    name: "BALI 01",
    state: "Deep",
    feeling: "Slow, warm, slightly enveloping.",
    intensity: 4,
    price: 20,
  },
]

export function ProductCardExample() {
  return (
    <section className="bg-[#efe7db] px-6 py-12 sm:px-10 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}

export default ProductCardExample
