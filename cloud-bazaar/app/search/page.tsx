"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, SlidersHorizontal } from "lucide-react"
import ProductCard from "@/components/product-card"
import { allProducts, categories } from "@/lib/data"
import SearchBar from "@/components/search-bar"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // If there's a query parameter, redirect to products page
    if (query) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
      return
    }

    // Otherwise, show recent/popular products
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Get a diverse selection of products from different categories
      const diverseProducts = []
      const categoryIds = ["1", "2", "3", "4", "5", "6", "7", "8"]

      // Get 1-2 products from each category
      categoryIds.forEach((catId) => {
        const categoryProducts = allProducts.filter((product) => {
          const category = categories.find((c) => c.id === catId)
          if (!category) return false

          return (
            product.name.toLowerCase().includes(category.name.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(category.name.toLowerCase()))
          )
        })

        if (categoryProducts.length > 0) {
          // Get up to 2 random products from this category
          const randomProducts = categoryProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.min(2, categoryProducts.length))

          diverseProducts.push(...randomProducts)
        }
      })

      // If we don't have enough products, add some random ones
      if (diverseProducts.length < 8) {
        const remainingProducts = allProducts
          .filter((p) => !diverseProducts.some((dp) => dp.id === p.id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 8 - diverseProducts.length)

        diverseProducts.push(...remainingProducts)
      }

      setSearchResults(diverseProducts)
      setIsLoading(false)
    }, 500)
  }, [query, router])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Search</span>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Products</h1>
        <SearchBar onSearch={handleSearch} className="mb-4" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-md mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Popular Products</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <SlidersHorizontal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try searching for something else</p>
              <Link href="/products">
                <Button>Browse All Products</Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}

