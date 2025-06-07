"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import SellerLayout from "@/components/seller-layout"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { allProducts } from "@/lib/data"

export default function NewProduct() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    comparePrice: "",
    cost: "",
    sku: "",
    barcode: "",
    quantity: "",
    lowStock: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    shippingClass: "",
    status: "draft",
  })

  const handleAddImage = () => {
    // In a real app, this would handle file uploads
    // For this demo, we'll just add a placeholder
    setImages([...images, "/placeholder.svg?height=200&width=200"])
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create new product with unique ID
    const newId = (Math.max(...allProducts.map((p) => Number.parseInt(p.id))) + 1).toString()
    const newProduct = {
      id: newId,
      name: formData.name,
      price: Number(formData.price),
      image: images[0] || "/placeholder.svg",
      rating: 4.0,
      seller: user?.name || "Unknown Seller",
      description: formData.description,
      category: formData.category,
    }

    // Add to allProducts array
    allProducts.push(newProduct)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Product created",
        description: "Your product has been created successfully.",
      })
      router.push("/seller/dashboard/products")
    }, 1500)
  }

  return (
    <SellerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/seller/dashboard/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Enter the basic information about your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" required value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter product description" className="min-h-32" required value={formData.description} onChange={handleInputChange} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleSelectChange(value, "category")}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Electronics</SelectItem>
                          <SelectItem value="2">Fashion</SelectItem>
                          <SelectItem value="3">Home & Kitchen</SelectItem>
                          <SelectItem value="4">Books</SelectItem>
                          <SelectItem value="5">Sports & Outdoors</SelectItem>
                          <SelectItem value="6">Beauty & Personal Care</SelectItem>
                          <SelectItem value="7">Toys & Games</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input id="brand" placeholder="Enter brand name" value={formData.brand} onChange={handleInputChange} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                  <CardDescription>Set your product's price and manage inventory.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" type="number" min="0" step="0.01" placeholder="0.00" required value={formData.price} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compare-price">Compare at Price ($)</Label>
                      <Input id="compare-price" type="number" min="0" step="0.01" placeholder="0.00" value={formData.comparePrice} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cost">Cost per item ($)</Label>
                      <Input id="cost" type="number" min="0" step="0.01" placeholder="0.00" value={formData.cost} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                      <Input id="sku" placeholder="Enter SKU" value={formData.sku} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                      <Input id="barcode" placeholder="Enter barcode" value={formData.barcode} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" min="0" placeholder="0" required value={formData.quantity} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="low-stock">Low stock alert</Label>
                      <Input id="low-stock" type="number" min="0" placeholder="0" value={formData.lowStock} onChange={handleInputChange} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping</CardTitle>
                  <CardDescription>Configure shipping details for your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" type="number" min="0" step="0.01" placeholder="0.00" value={formData.weight} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="length">Length (cm)</Label>
                      <Input id="length" type="number" min="0" step="0.1" placeholder="0.0" value={formData.length} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (cm)</Label>
                      <Input id="width" type="number" min="0" step="0.1" placeholder="0.0" value={formData.width} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input id="height" type="number" min="0" step="0.1" placeholder="0.0" value={formData.height} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="shipping-class">Shipping Class</Label>
                      <Select value={formData.shippingClass} onValueChange={(value) => handleSelectChange(value, "shippingClass")}>
                        <SelectTrigger id="shipping-class">
                          <SelectValue placeholder="Select shipping class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="express">Express</SelectItem>
                          <SelectItem value="free">Free Shipping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Add up to 8 images for your product.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {images.length < 8 && (
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="flex flex-col items-center justify-center w-full aspect-square rounded-md border border-dashed hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Upload Image</span>
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                  <CardDescription>Organize your product with tags.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                      <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                        electronics
                        <button type="button">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                        headphones
                        <button type="button">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Input
                          id="tags"
                          placeholder="Add tag"
                          className="h-8 min-w-[100px] w-auto border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                        />
                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                  <CardDescription>Control the visibility of your product.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange(value, "status")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline" type="button" asChild>
              <Link href="/seller/dashboard/products">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </SellerLayout>
  )
}

