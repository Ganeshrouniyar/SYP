"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import ProductCard from "@/components/product-card"
import { allProducts, categories } from "@/lib/data"

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)
  const { id } = resolvedParams

  const [category, setCategory] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    // Find the category
    const foundCategory = categories.find((c) => c.id === id)
    setCategory(foundCategory)

    // Filter products by category
    // Filter products by category
    const categoryProducts = allProducts.filter((product) => product.category === id)
    setProducts(categoryProducts)
  }, [id])

  if (!category) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p className="mb-6">The category you're looking for doesn't exist.</p>
        <Link href="/products">
          <Button>Browse All Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/products" className="text-muted-foreground hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">{category.name}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground">Browse our selection of {category.name.toLowerCase()} products.</p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">We couldn't find any products in this category.</p>
          <Link href="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

