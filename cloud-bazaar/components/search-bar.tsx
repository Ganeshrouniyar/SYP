"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { allProducts } from "@/lib/data"
import { categories } from "@/lib/data"

export default function SearchBar({
  initialQuery = "",
  className = "",
  onSearch,
}: {
  initialQuery?: string
  className?: string
  onSearch?: (query: string) => void
}) {
  const [query, setQuery] = useState(initialQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Improve the search suggestions and search functionality
  // Generate suggestions based on query
  useEffect(() => {
    if (query.length > 1) {
      // Get unique product names and categories for suggestions
      const productNames = allProducts.map((product) => product.name)
      const categoryNames = categories.map((category) => category.name)
      const sellerNames = [...new Set(allProducts.map((product) => product.seller))]

      // Extract keywords from product descriptions
      const descriptionKeywords = allProducts
        .filter((product) => product.description)
        .flatMap((product) => {
          const description = product.description || ""
          return description
            .toLowerCase()
            .split(/\s+/)
            .filter((word) => word.length > 4) // Only meaningful words
            .map((word) => word.replace(/[^\w]/g, "")) // Remove non-word characters
        })
        .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
        .filter((word) => word.length > 0)

      // Combine all possible suggestion sources
      const allSources = [...productNames, ...categoryNames, ...sellerNames, ...descriptionKeywords]

      // Filter for matches and limit to 5 results
      const queryLower = query.toLowerCase()
      const filtered = allSources
        .filter((item) => item.toLowerCase().includes(queryLower))
        // Remove duplicates
        .filter((item, index, self) => self.indexOf(item) === index)
        // Sort by relevance (items that start with the query come first)
        .sort((a, b) => {
          const aStartsWith = a.toLowerCase().startsWith(queryLower) ? 0 : 1
          const bStartsWith = b.toLowerCase().startsWith(queryLower) ? 0 : 1
          if (aStartsWith !== bStartsWith) return aStartsWith - bStartsWith
          // Secondary sort by length (shorter items first)
          return a.length - b.length
        })
        .slice(0, 5)

      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  // Enhance the handleSearch function
  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery)
      } else {
        // Check if the search query matches a category name
        const matchedCategory = categories.find((category) => category.name.toLowerCase() === searchQuery.toLowerCase())

        if (matchedCategory) {
          // If it matches a category, redirect to that category page
          router.push(`/categories/${matchedCategory.id}`)
        } else {
          // Otherwise, search for products
          router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
        }
      }
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search products..."
          className="pl-10 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          onFocus={() => {
            if (query.length > 1 && suggestions.length > 0) {
              setShowSuggestions(true)
            }
          }}
        />
        {query && (
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setQuery("")}>
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Search suggestions */}
      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-muted cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

