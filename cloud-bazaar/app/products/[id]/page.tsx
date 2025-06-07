"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Check,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { productDetails, allProducts } from "@/lib/data"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)
  const { id } = resolvedParams

  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll use the mock data
    setIsLoading(true)

    setTimeout(() => {
      const foundProduct = productDetails[id as keyof typeof productDetails]

      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        // Fallback to basic product info if detailed info not available
        const basicProduct = allProducts.find((p) => p.id === id)
        if (basicProduct) {
          setProduct({
            ...basicProduct,
            reviewCount: Math.floor(Math.random() * 100) + 10,
            stock: Math.floor(Math.random() * 50) + 5,
            description: basicProduct.description || "No detailed description available for this product.",
            features: ["Quality materials", "Durable construction", "Modern design"],
            specifications: {
              Brand: basicProduct.seller,
              Model: `${basicProduct.seller}-${basicProduct.id}`,
              Color: "Various",
              Weight: "Standard",
              Warranty: "1 year manufacturer warranty",
            },
            images: [basicProduct.image, basicProduct.image, basicProduct.image],
            seller: {
              name: basicProduct.seller,
              rating: basicProduct.rating,
              products: Math.floor(Math.random() * 50) + 5,
            },
            relatedProducts: allProducts
              .filter((p) => p.id !== id)
              .slice(0, 4)
              .map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.image,
                rating: p.rating,
              })),
          })
        }
      }

      setIsLoading(false)
    }, 500)
  }, [id])

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images?.[0] || product.image,
      seller: product.seller?.name || "Unknown Seller",
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Navigate to cart page
    window.location.href = "/cart"
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-lg aspect-square"></div>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-md w-20 h-20"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
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
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="w-full aspect-square object-contain"
            />
          </div>
          <div className="flex gap-4 overflow-auto pb-2">
            {(product.images || [product.image]).map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border rounded-md overflow-hidden flex-shrink-0 ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < product.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-green-600 font-medium">In Stock ({product.stock})</span>
            </div>
            <div className="flex items-center mt-4">
              <Link href={`/seller/${product.seller?.name}`} className="text-sm text-primary hover:underline">
                {product.seller?.name}
              </Link>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                  {product.discount}% OFF
                </Badge>
              </>
            )}
          </div>

          <div className="space-y-4 border-t border-b py-6">
            <div className="flex items-center gap-4">
              <Label htmlFor="quantity" className="font-medium">
                Quantity:
              </Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  className="h-8 w-14 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 gap-2" size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button className="flex-1" size="lg" variant="secondary" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="gap-2" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">1 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-6">
          <div className="space-y-4">
            <p>{product.description}</p>
            <h3 className="text-lg font-semibold mt-4">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-6">
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                    <td className="px-4 py-3 font-medium">{key}</td>
                    <td className="px-4 py-3">{value as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-5xl font-bold">{product.rating}</div>
                <div className="flex justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{product.reviewCount} reviews</div>
              </div>
              <div className="flex-1">
                {/* Rating bars would go here */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">5 stars</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full w-[70%]" />
                    </div>
                    <span className="text-sm text-muted-foreground">70%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">4 stars</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full w-[20%]" />
                    </div>
                    <span className="text-sm text-muted-foreground">20%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">3 stars</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full w-[5%]" />
                    </div>
                    <span className="text-sm text-muted-foreground">5%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">2 stars</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full w-[3%]" />
                    </div>
                    <span className="text-sm text-muted-foreground">3%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">1 star</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full w-[2%]" />
                    </div>
                    <span className="text-sm text-muted-foreground">2%</span>
                  </div>
                </div>
              </div>
              <div>
                <Button>Write a Review</Button>
              </div>
            </div>

            {/* Review form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" className="text-gray-300 hover:text-yellow-400">
                          <Star className="w-6 h-6" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Review Title</Label>
                    <Input id="title" placeholder="Summarize your experience" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review">Review</Label>
                    <Textarea id="review" placeholder="Share your experience with this product" rows={4} />
                  </div>
                  <Button type="submit">Submit Review</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedProduct: any) => (
            <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(relatedProduct.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">({relatedProduct.rating})</span>
                    </div>
                    <div className="font-semibold mt-2">${relatedProduct.price.toFixed(2)}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

