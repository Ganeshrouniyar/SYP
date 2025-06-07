"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Filter, X, ChevronRight, SlidersHorizontal, TrendingUp } from "lucide-react"
import ProductCard from "@/components/product-card"
import { allProducts, categories } from "@/lib/data"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

// Create bestsellers data by sorting products by rating and adding sales data
const bestsellersProducts = [...allProducts]
  .sort((a, b) => b.rating - a.rating)
  .map((product) => {
    // Generate random sales data
    const sales = Math.floor(Math.random() * 500) + 50
    return {
      ...product,
      sales,
    }
  })

export default function BestsellersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState("popularity")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [filteredProducts, setFilteredProducts] = useState(bestsellersProducts)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Apply filters and sorting
  useEffect(() => {
    let result = [...bestsellersProducts]

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

    // Apply rating filter
    if (selectedRatings.length > 0) {
      result = result.filter((product) => selectedRatings.includes(Math.floor(product.rating)))
    }

    // Apply sorting
    switch (sortOption) {
      case "popularity":
        result.sort((a, b) => (b as any).sales - (a as any).sales)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      default:
        // Default to popularity
        result.sort((a, b) => (b as any).sales - (a as any).sales)
        break
    }

    setFilteredProducts(result)
  }, [searchTerm, selectedCategory, sortOption, priceRange, selectedRatings])

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSortOption("popularity")
    setPriceRange([0, 500])
    setSelectedRatings([])
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Best Sellers</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Our Best Sellers</h1>
          <p className="text-muted-foreground mb-6">
            Discover our most popular products loved by thousands of customers. Quality, value, and satisfaction
            guaranteed.
          </p>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Curated based on customer ratings and sales</span>
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
              <Accordion type="single" collapsible defaultValue="category">
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

                <AccordionItem value="rating">
                  <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={selectedRatings.includes(rating)}
                            onCheckedChange={() => handleRatingChange(rating)}
                          />
                          <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                            {rating}+ Stars
                          </Label>
                        </div>
                      ))}
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
                placeholder="Search best sellers..."
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
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
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
                    <Accordion type="single" collapsible defaultValue="category">
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

                      <AccordionItem value="rating">
                        <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-1">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-rating-${rating}`}
                                  checked={selectedRatings.includes(rating)}
                                  onCheckedChange={() => handleRatingChange(rating)}
                                />
                                <Label
                                  htmlFor={`mobile-rating-${rating}`}
                                  className="text-sm cursor-pointer flex items-center"
                                >
                                  {rating}+ Stars
                                </Label>
                              </div>
                            ))}
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
          {(selectedCategory || selectedRatings.length > 0 || priceRange[0] > 0 || priceRange[1] < 500) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                  Category: {categories.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory(null)}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {selectedRatings.length > 0 && (
                <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                  Rating: {selectedRatings.sort().join(", ")}+ Stars
                  <button onClick={() => setSelectedRatings([])}>
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
                  {sortOption === "popularity" && (
                    <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {(product as any).sales} sold
                    </div>
                  )}
                  <ProductCard product={product} />
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

