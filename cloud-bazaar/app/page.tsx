"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search, ArrowRight, Book, Tv, Shirt, Utensils, Star, Truck, Shield, Clock } from "lucide-react"
import ProductCard from "@/components/product-card"
import CategoryCard from "@/components/category-card"
import { featuredProducts, categories, allProducts } from "@/lib/data"

export default function Home() {
  const [displayProducts, setDisplayProducts] = useState(featuredProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Function to handle search
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  // Load more products when "View All" is clicked
  const loadAllProducts = () => {
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setDisplayProducts(allProducts.slice(0, 8))
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container relative px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                  Welcome to Cloud Bazaar
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Your one-stop marketplace for all your shopping needs. Find the best products from trusted sellers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="gap-1.5">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/seller/register">
                  <Button size="lg" variant="outline">
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl shadow-2xl">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5612AQFwtboy0RllCQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709552807854?e=2147483647&v=beta&t=eMjzSz0rCcIJEdD4xAFIqVY2fsuU1itl69pQwUpSMTA"
                  alt="Hero Image"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 md:px-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Search for products, brands, and categories..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Featured Categories Section with Icons */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Featured Categories</h2>
              <Link href="/products" className="text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {/* Electronics */}
              <Link
                href="/categories/1"
                className="group flex flex-col items-center p-4 border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Tv className="h-8 w-8 text-primary" />
                </div>
                <span className="text-center font-medium">Electronics</span>
              </Link>

              {/* Fashion */}
              <Link
                href="/categories/2"
                className="group flex flex-col items-center p-4 border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Shirt className="h-8 w-8 text-primary" />
                </div>
                <span className="text-center font-medium">Fashion</span>
              </Link>

              {/* Home & Kitchen */}
              <Link
                href="/categories/3"
                className="group flex flex-col items-center p-4 border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Utensils className="h-8 w-8 text-primary" />
                </div>
                <span className="text-center font-medium">Home & Kitchen</span>
              </Link>

              {/* Books */}
              <Link
                href="/categories/4"
                className="group flex flex-col items-center p-4 border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Book className="h-8 w-8 text-primary" />
                </div>
                <span className="text-center font-medium">Books</span>
              </Link>

              {/* View All */}
              <Link
                href="/products"
                className="group flex flex-col items-center p-4 border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
                <span className="text-center font-medium">View All</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
              <Link href="/products" className="text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
              <Button
                variant="link"
                className="flex items-center gap-1"
                onClick={loadAllProducts}
                disabled={isLoading || displayProducts.length > featuredProducts.length}
              >
                {isLoading ? "Loading..." : "View All"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {displayProducts.length > featuredProducts.length && (
              <div className="text-center mt-6">
                <Link href="/products">
                  <Button>Browse All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Why Choose Cloud Bazaar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
              <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">Millions of products from trusted sellers worldwide.</p>
            </div>
            <div className="group flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
              <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Quality Products</h3>
              <p className="text-muted-foreground">Verified sellers and quality-checked products.</p>
            </div>
            <div className="group flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
              <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and reliable shipping to your doorstep.</p>
            </div>
            <div className="group flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
              <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Secure Shopping</h3>
              <p className="text-muted-foreground">Safe and protected online transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest products, deals, and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

