import Link from "next/link"
import { ChevronRight, FileText, Shield, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SellerPoliciesPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Seller Policies</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Seller Policies & Guidelines</h1>
          <p className="text-muted-foreground mb-6">
            Learn about our policies and guidelines to ensure a successful selling experience.
          </p>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Policy Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Product Policies</h3>
          <p className="text-muted-foreground">
            Guidelines for listing and selling products on our platform.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Seller Standards</h3>
          <p className="text-muted-foreground">
            Requirements for maintaining seller status and performance metrics.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Prohibited Items</h3>
          <p className="text-muted-foreground">
            List of items that cannot be sold on our platform.
          </p>
        </div>
      </div>

      {/* Policy Details */}
      <div className="space-y-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Product Listing Policies</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Product Information</h3>
                <p className="text-muted-foreground">
                  All product listings must include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2">
                  <li>Accurate product descriptions</li>
                  <li>High-quality images</li>
                  <li>Correct pricing information</li>
                  <li>Shipping details</li>
                  <li>Return policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Seller Performance Standards</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Required Metrics</h3>
                <p className="text-muted-foreground">
                  Sellers must maintain:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2">
                  <li>90% or higher order fulfillment rate</li>
                  <li>4.5/5 or higher customer rating</li>
                  <li>Response time under 24 hours</li>
                  <li>Accurate inventory management</li>
                  <li>On-time shipping</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Prohibited Items</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Restricted Products</h3>
                <p className="text-muted-foreground">
                  The following items are prohibited:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2">
                  <li>Illegal or regulated substances</li>
                  <li>Counterfeit or unauthorized items</li>
                  <li>Hazardous materials</li>
                  <li>Weapons or ammunition</li>
                  <li>Adult content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Pricing and Promotion Policies</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Pricing Guidelines</h3>
                <p className="text-muted-foreground">
                  Sellers must follow these pricing rules:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2">
                  <li>Competitive market pricing</li>
                  <li>No price gouging</li>
                  <li>Clear pricing display</li>
                  <li>Accurate shipping costs</li>
                  <li>No hidden fees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Customer Service Requirements</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Service Standards</h3>
                <p className="text-muted-foreground">
                  Sellers must provide:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2">
                  <li>Prompt response to inquiries</li>
                  <li>Professional communication</li>
                  <li>Fair return policies</li>
                  <li>Order tracking information</li>
                  <li>Quality customer support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Selling?</h2>
        <p className="text-muted-foreground mb-6">
          Review our policies and start your selling journey today.
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