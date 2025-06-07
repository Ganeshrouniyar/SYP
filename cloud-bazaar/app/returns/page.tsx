import Link from "next/link"
import { ChevronRight, Package, Clock, ArrowRight } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Returns & Refunds</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Returns & Refunds</h1>
          <p className="text-muted-foreground mb-6">
            We want you to be completely satisfied with your purchase. Learn about our return policy and process.
          </p>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">30-Day Return Window</span>
          </div>
        </div>
      </div>

      {/* Return Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-primary">1</span>
          </div>
          <h3 className="font-semibold mb-2">Initiate Return</h3>
          <p className="text-muted-foreground">
            Log into your account and select the item you want to return. Choose your reason and submit the return request.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-primary">2</span>
          </div>
          <h3 className="font-semibold mb-2">Pack & Ship</h3>
          <p className="text-muted-foreground">
            Pack your item securely in its original packaging. Print the return shipping label and send it back to us.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-primary">3</span>
          </div>
          <h3 className="font-semibold mb-2">Refund Process</h3>
          <p className="text-muted-foreground">
            Once we receive and inspect your return, we'll process your refund within 5-7 business days.
          </p>
        </div>
      </div>

      {/* Return Policy */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Return Policy</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Eligibility</h3>
            <p className="text-muted-foreground">
              Items must be returned within 30 days of delivery. The item must be unused, in its original packaging, 
              and include all accessories and documentation.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Non-Returnable Items</h3>
            <p className="text-muted-foreground">
              Some items are not eligible for return, including personalized items, perishable goods, 
              and items marked as "Final Sale."
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Shipping Costs</h3>
            <p className="text-muted-foreground">
              Return shipping is free for most items. You'll receive a prepaid shipping label via email 
              after initiating your return.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Refund Timeline</h3>
            <p className="text-muted-foreground">
              Refunds are typically processed within 5-7 business days after we receive and inspect your return. 
              The refund will be issued to your original payment method.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Return an Item?</h2>
        <p className="text-muted-foreground mb-6">
          Log into your account to start the return process.
        </p>
        <Link href="/account/orders">
          <Button className="gap-2">
            Go to My Orders <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
} 