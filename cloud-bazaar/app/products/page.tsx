"use client"

// Update the imports to include pagination components
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Filter, X, ChevronRight, SlidersHorizontal, ChevronUp } from "lucide-react"
import ProductCard from "@/components/product-card"
import { allProducts, categories } from "@/lib/data"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Import the SearchBar component
import SearchBar from "@/components/search-bar"
import { useCart } from "@/lib/cart-context"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const initialSearchTerm = searchParams.get("search") || ""
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [sortOption, setSortOption] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedSellers, setSelectedSellers] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const productsPerPage = 12
  const { addItem } = useCart()

  // Get unique sellers from all products
  const uniqueSellers = Array.from(new Set(allProducts.map((product) => product.seller)))

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allProducts]

    // Apply search filter with improved logic
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase()
      const searchWords = searchTermLower.split(/\s+/).filter((word) => word.length > 1)

      result = result.filter((product) => {
        // Check product name
        const nameMatch = product.name.toLowerCase().includes(searchTermLower)

        // Check product description if it exists
        const descriptionMatch = product.description
          ? product.description.toLowerCase().includes(searchTermLower)
          : false

        // Check seller name
        const sellerMatch = product.seller.toLowerCase().includes(searchTermLower)

        // Check category relevance
        const categoryMatch = categories.some(
          (category) =>
            category.name.toLowerCase().includes(searchTermLower) &&
            (product.name.toLowerCase().includes(category.name.toLowerCase()) ||
              (product.description && product.description.toLowerCase().includes(category.name.toLowerCase()))),
        )

        // Check for individual word matches (for multi-word searches)
        const wordMatches =
          searchWords.length > 0 &&
          searchWords.some(
            (word) =>
              product.name.toLowerCase().includes(word) ||
              (product.description && product.description.toLowerCase().includes(word)) ||
              product.seller.toLowerCase().includes(word),
          )

        return nameMatch || descriptionMatch || sellerMatch || categoryMatch || wordMatches
      })
    }

    // Apply category filter
    if (selectedCategory) {
      const categoryId = selectedCategory
      const category = categories.find((c) => c.id === categoryId)
      if (category) {
        result = result.filter((product) => product.category === category.id)
      }
    }

    // Apply price range filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply rating filter
    if (selectedRatings.length > 0) {
      result = result.filter((product) => selectedRatings.includes(Math.floor(product.rating)))
    }

    // Apply seller filter
    if (selectedSellers.length > 0) {
      result = result.filter((product) => selectedSellers.includes(product.seller))
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // In a real app, you would sort by date
        // For this demo, we'll just use the reverse of the current order
        result.reverse()
        break
      default:
        // "featured" - no specific sorting
        break
    }

    setFilteredProducts(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCategory, sortOption, priceRange, selectedRatings, selectedSellers, searchParams])

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const handleSellerChange = (seller: string) => {
    setSelectedSellers((prev) => (prev.includes(seller) ? prev.filter((s) => s !== seller) : [...prev, seller]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSortOption("featured")
    setPriceRange([0, 500])
    setSelectedRatings([])
    setSelectedSellers([])
  }

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Generate page numbers for pagination
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">All Products</span>
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
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategory === category.id}
                            onCheckedChange={() =>
                              setSelectedCategory(selectedCategory === category.id ? null : category.id)
                            }
                          />
                          <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                            {category.name}
                          </Label>
                        </div>
                      ))}
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

                <AccordionItem value="seller">
                  <AccordionTrigger className="text-sm font-medium">Sellers</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1 max-h-40 overflow-y-auto">
                      {uniqueSellers.map((seller) => (
                        <div key={seller} className="flex items-center space-x-2">
                          <Checkbox
                            id={`seller-${seller}`}
                            checked={selectedSellers.includes(seller)}
                            onCheckedChange={() => handleSellerChange(seller)}
                          />
                          <Label htmlFor={`seller-${seller}`} className="text-sm cursor-pointer">
                            {seller}
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
            {/* Replace the search input with the SearchBar component */}
            <div className="flex-1">
              <SearchBar initialQuery={searchTerm} onSearch={(query) => setSearchTerm(query)} />
            </div>

            <div className="flex gap-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-none h-10 w-10"
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-grid-2x2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 12h18" />
                    <path d="M12 3v18" />
                  </svg>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-none h-10 w-10"
                  onClick={() => setViewMode("list")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-list"
                  >
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3.01" y1="6" y2="6" />
                    <line x1="3" x2="3.01" y1="12" y2="12" />
                    <line x1="3" x2="3.01" y1="18" y2="18" />
                  </svg>
                </Button>
              </div>

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
                                <Checkbox
                                  id={`mobile-category-${category.id}`}
                                  checked={selectedCategory === category.id}
                                  onCheckedChange={() =>
                                    setSelectedCategory(selectedCategory === category.id ? null : category.id)
                                  }
                                />
                                <Label htmlFor={`mobile-category-${category.id}`} className="text-sm cursor-pointer">
                                  {category.name}
                                </Label>
                              </div>
                            ))}
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

                      <AccordionItem value="seller">
                        <AccordionTrigger className="text-sm font-medium">Sellers</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-1 max-h-40 overflow-y-auto">
                            {uniqueSellers.map((seller) => (
                              <div key={seller} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-seller-${seller}`}
                                  checked={selectedSellers.includes(seller)}
                                  onCheckedChange={() => handleSellerChange(seller)}
                                />
                                <Label htmlFor={`mobile-seller-${seller}`} className="text-sm cursor-pointer">
                                  {seller}
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
          {(selectedCategory ||
            selectedRatings.length > 0 ||
            selectedSellers.length > 0 ||
            priceRange[0] > 0 ||
            priceRange[1] < 500) && (
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

              {selectedSellers.length > 0 && (
                <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                  Sellers: {selectedSellers.length} selected
                  <button onClick={() => setSelectedSellers([])}>
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
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Products Grid or List */}
          {filteredProducts.length > 0 ? (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentProducts.map((product) => (
                    <div key={product.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                      <Link href={`/products/${product.id}`} className="sm:w-48 h-48 overflow-hidden rounded-md">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1">{product.seller}</div>
                          <Link href={`/products/${product.id}`} className="hover:underline">
                            <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                          </Link>
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : i < product.rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                  />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">({product.rating})</span>
                          </div>
                          {product.description && (
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                          )}
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <div className="font-semibold text-lg">
                            ${product.price.toFixed(2)}
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={() => {
                              addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                                image: product.image,
                                seller: product.seller,
                              })
                            }}
                            className="gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-shopping-cart"
                            >
                              <circle cx="8" cy="21" r="1" />
                              <circle cx="19" cy="21" r="1" />
                              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {pageNumbers.map((number) => {
                      // Show first page, last page, and pages around current page
                      if (
                        number === 1 ||
                        number === totalPages ||
                        (number >= currentPage - 1 && number <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={number}>
                            <PaginationLink isActive={currentPage === number} onClick={() => setCurrentPage(number)}>
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      }

                      // Show ellipsis for skipped pages
                      if (
                        (number === 2 && currentPage > 3) ||
                        (number === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={number}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )
                      }

                      return null
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <SlidersHorizontal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}

          {/* Back to top button */}
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 rounded-full shadow-md"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

