"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Filter, X, ChevronRight, SlidersHorizontal, Clock } from "lucide-react"
import ProductCard from "@/components/product-card"
import { allProducts, categories } from "@/lib/data"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

// Create new arrivals data with release dates and some discounts
const newArrivalsProducts = [...allProducts]
  .map((product) => {
    // Generate a random date within the last 30 days
    const daysAgo = Math.floor(Math.random() * 30) + 1
    const releaseDate = new Date()
    releaseDate.setDate(releaseDate.getDate() - daysAgo)

    // Give some products a discount (30% of products)
    const hasDiscount = Math.random() > 0.7
    let discountedProduct = { ...product, releaseDate }

    if (hasDiscount) {
      const discountPercent = Math.floor(Math.random() * 26) + 10 // 10% to 35%
      const originalPrice = product.price
      const discountedPrice = originalPrice * (1 - discountPercent / 100)

      discountedProduct = {
        ...discountedProduct,
        originalPrice,
        price: Number.parseFloat(discountedPrice.toFixed(2)),
        discount: discountPercent,
      }
    }

    return discountedProduct
  })
  // Sort by release date (newest first)
  .sort((a, b) => (b.releaseDate as Date).getTime() - (a.releaseDate as Date).getTime())

export default function NewArrivalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState("newest")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [dayRange, setDayRange] = useState([0, 30])
  const [filteredProducts, setFilteredProducts] = useState(newArrivalsProducts)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Format date as "X days ago"
  const formatDaysAgo = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`
  }

  // Apply filters and sorting
  useEffect(() => {
    let result = [...newArrivalsProducts]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply category filter
    if (selectedCategory) {
      const category = categories.find((c) => c.id === selectedCategory)
      if (category) {
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes(category.name.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(category.name.toLowerCase())),
        )
      }
    }

    // Apply price range filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply day range filter
    const now = new Date()
    result = result.filter((product) => {
      const releaseDate = product.releaseDate as Date
      const diffTime = Math.abs(now.getTime() - releaseDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays >= dayRange[0] && diffDays <= dayRange[1]
    })

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => (b.releaseDate as Date).getTime() - (a.releaseDate as Date).getTime())
        break
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "discount":
        result.sort((a, b) => ((b as any).discount || 0) - ((a as any).discount || 0))
        break
      default:
        // Default to newest
        result.sort((a, b) => (b.releaseDate as Date).getTime() - (a.releaseDate as Date).getTime())
        break
    }

    setFilteredProducts(result)
  }, [searchTerm, selectedCategory, sortOption, priceRange, dayRange])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSortOption("newest")
    setPriceRange([0, 500])
    setDayRange([0, 30])
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">New Arrivals</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200 mb-4">
            Just Landed
          </Badge>
          <h1 className="text-3xl font-bold mb-4">New Arrivals</h1>
          <p className="text-muted-foreground mb-6">
            Discover our latest products that just hit the shelves. Stay ahead of the curve with the newest trends and
            innovations.
          </p>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Updated daily with fresh inventory</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                Clear All
              </Button>
            </div>

            <div className="space-y-4">
              <Accordion type="single" collapsible defaultValue="date">
                <AccordionItem value="date">
                  <AccordionTrigger className="text-sm font-medium">Arrival Date</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <Slider
                        defaultValue={[0, 30]}
                        min={0}
                        max={30}
                        step={1}
                        value={dayRange}
                        onValueChange={setDayRange}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last {dayRange[0]} days</span>
                        <span className="text-sm">Last {dayRange[1]} days</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="category">
                  <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`category-${category.id}`}
                            name="category"
                            checked={selectedCategory === category.id}
                            onChange={() => setSelectedCategory(category.id)}
                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                            {category.name}
                          </label>
                        </div>
                      ))}
                      {selectedCategory && (
                        <div className="pt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCategory(null)}
                            className="h-7 px-2 text-xs"
                          >
                            Clear Selection
                          </Button>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <Slider
                        defaultValue={[0, 500]}
                        max={500}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">${priceRange[0]}</span>
                        <span className="text-sm">${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search new arrivals..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="discount">Biggest Discount</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden gap-2">
                    <Filter className="h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <Accordion type="single" collapsible defaultValue="date">
                      <AccordionItem value="date">
                        <AccordionTrigger className="text-sm font-medium">Arrival Date</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <Slider
                              defaultValue={[0, 30]}
                              min={0}
                              max={30}
                              step={1}
                              value={dayRange}
                              onValueChange={setDayRange}
                            />
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Last {dayRange[0]} days</span>
                              <span className="text-sm">Last {dayRange[1]} days</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="category">
                        <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-1">
                            {categories.map((category) => (
                              <div key={category.id} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id={`mobile-category-${category.id}`}
                                  name="mobile-category"
                                  checked={selectedCategory === category.id}
                                  onChange={() => setSelectedCategory(category.id)}
                                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                />
                                <label htmlFor={`mobile-category-${category.id}`} className="text-sm cursor-pointer">
                                  {category.name}
                                </label>
                              </div>
                            ))}
                            {selectedCategory && (
                              <div className="pt-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedCategory(null)}
                                  className="h-7 px-2 text-xs"
                                >
                                  Clear Selection
                                </Button>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="price">
                        <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <Slider
                              defaultValue={[0, 500]}
                              max={500}
                              step={10}
                              value={priceRange}
                              onValueChange={setPriceRange}
                            />
                            <div className="flex items-center justify-between">
                              <span className="text-sm">${priceRange[0]}</span>
                              <span className="text-sm">${priceRange[1]}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <SheetFooter>
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="flex-1" onClick={clearFilters}>
                        Clear All
                      </Button>
                      <Button className="flex-1" onClick={() => setIsMobileFilterOpen(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory || dayRange[0] > 0 || dayRange[1] < 30 || priceRange[0] > 0 || priceRange[1] < 500) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                  Category: {categories.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory(null)}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {(dayRange[0] > 0 || dayRange[1] < 30) && (
                <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                  Arrival: Last {dayRange[0]} - {dayRange[1]} days
                  <button onClick={() => setDayRange([0, 30])}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {(priceRange[0] > 0 || priceRange[1] < 500) && (
                <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <button onClick={() => setPriceRange([0, 500])}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              <button className="text-sm text-primary hover:underline" onClick={clearFilters}>
                Clear All
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative">
                  <Badge className="absolute top-2 right-2 z-10 bg-green-500 text-white">NEW</Badge>
                  <div className="absolute bottom-2 left-2 z-10 bg-gray-800/70 text-white text-xs px-2 py-1 rounded-md">
                    {formatDaysAgo(product.releaseDate as Date)}
                  </div>
                  <ProductCard
                    product={{
                      ...product,
                      originalPrice: (product as any).originalPrice,
                      discount: (product as any).discount,
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <SlidersHorizontal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

