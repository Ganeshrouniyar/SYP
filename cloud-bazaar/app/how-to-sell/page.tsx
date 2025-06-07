import Link from "next/link"
import { ChevronRight, Store, FileText, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HowToSellPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">How to Sell</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Start Selling on Cloud Bazaar</h1>
          <p className="text-muted-foreground mb-6">
            Learn how to become a successful seller on our platform and reach millions of customers.
          </p>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Join Our Growing Seller Community</span>
          </div>
        </div>
      </div>

      {/* Getting Started Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-primary">1</span>
          </div>
          <h3 className="font-semibold mb-2">Create Your Account</h3>
          <p className="text-muted-foreground">
            Sign up for a seller account and complete your profile with business information.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-primary">2</span>
          </div>
          <h3 className="font-semibold mb-2">List Your Products</h3>
          <p className="text-muted-foreground">
            Add your products with detailed descriptions, high-quality images, and competitive pricing.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-primary">3</span>
          </div>
          <h3 className="font-semibold mb-2">Start Selling</h3>
          <p className="text-muted-foreground">
            Receive orders, process payments, and ship products to your customers.
          </p>
        </div>
      </div>

      {/* Seller Requirements */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Seller Requirements</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Business Information</h3>
            <p className="text-muted-foreground">
              You'll need to provide:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2">
              <li>Valid business registration</li>
              <li>Tax identification number</li>
              <li>Bank account details</li>
              <li>Contact information</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Product Requirements</h3>
            <p className="text-muted-foreground">
              Your products must meet:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2">
              <li>Quality standards</li>
              <li>Safety regulations</li>
              <li>Intellectual property rights</li>
              <li>Platform guidelines</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold">Best Practices for Success</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Product Presentation</h3>
                <p className="text-muted-foreground">
                  Use high-quality images and detailed descriptions to showcase your products effectively.
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Customer Service</h3>
                <p className="text-muted-foreground">
                  Respond promptly to customer inquiries and maintain high satisfaction ratings.
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Pricing Strategy</h3>
                <p className="text-muted-foreground">
                  Set competitive prices while maintaining healthy profit margins.
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Inventory Management</h3>
                <p className="text-muted-foreground">
                  Keep accurate inventory records and update product availability regularly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Selling?</h2>
        <p className="text-muted-foreground mb-6">
          Create your seller account and join our marketplace today.
        </p>
        <Link href="/seller/register">
          <Button className="gap-2">
            Become a Seller <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
} 