"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, Heart, LogOut, ChevronRight, Search, X, ShoppingCart, Trash2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

// Mock wishlist data
const initialWishlistItems = [
  {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.5,
    seller: "AudioTech",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    rating: 4.2,
    seller: "TechGear",
    inStock: true,
  },
  {
    id: "5",
    name: "Digital Camera",
    price: 449.99,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.6,
    seller: "PhotoPro",
    inStock: false,
  },
  {
    id: "7",
    name: "Yoga Mat",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    seller: "FitLife",
    inStock: true,
  },
]

export default function WishlistPage() {
  const { user, logout } = useAuth()
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  // Redirect if not logged in
  if (!user) {
    router.push("/auth/login")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    })
  }

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      seller: item.seller,
    })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleMoveAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock)

    inStockItems.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        seller: item.seller,
      })
    })

    toast({
      title: "Items added to cart",
      description: `${inStockItems.length} items have been added to your cart.`,
    })
  }

  // Filter wishlist items based on search term
  const filteredItems = wishlistItems.filter(
    (item) =>
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">My Wishlist</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <nav className="space-y-1">
                <Link href="/account" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                  <User className="h-5 w-5" />
                  <span>Account Details</span>
                </Link>
                <Link href="/orders" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 p-2 rounded-md bg-primary/10 text-primary font-medium"
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-muted text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>
                  {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
                </CardDescription>
              </div>
              {wishlistItems.length > 0 && (
                <Button onClick={handleMoveAllToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add All to Cart
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {/* Search */}
              {wishlistItems.length > 0 && (
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search wishlist..."
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
              )}

              {/* Wishlist Items */}
              {filteredItems.length > 0 ? (
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <Link href={`/products/${item.id}`} className="font-medium hover:text-primary">
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">Sold by: {item.seller}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(item.rating)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : i < item.rating
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
                            <span className="text-xs text-muted-foreground ml-1">({item.rating})</span>
                          </div>
                          <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>
                          {!item.inStock && <p className="text-sm text-red-500 mt-1">Out of stock</p>}
                        </div>
                        <div className="flex flex-col gap-2 sm:items-end">
                          <Button onClick={() => handleAddToCart(item)} disabled={!item.inStock} className="gap-2">
                            <ShoppingCart className="h-4 w-4" /> Add to Cart
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1"
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "No items match your search criteria" : "Save items you're interested in for later"}
                  </p>
                  {searchTerm ? (
                    <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
                  ) : (
                    <Link href="/products">
                      <Button>Start Shopping</Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

