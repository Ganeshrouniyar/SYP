import Link from "next/link"
import { ChevronRight, Truck, Clock, MapPin, Package } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Shipping Information</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Shipping Information</h1>
          <p className="text-muted-foreground mb-6">
            Learn about our shipping methods, delivery times, and tracking options.
          </p>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Fast & Reliable Shipping</span>
          </div>
        </div>
      </div>

      {/* Shipping Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Standard Shipping</h3>
          <p className="text-muted-foreground mb-4">
            Free shipping on orders over $50. Delivery within 5-7 business days.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>5-7 business days</span>
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Express Shipping</h3>
          <p className="text-muted-foreground mb-4">
            Fast delivery for urgent orders. Available for most locations.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>2-3 business days</span>
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Local Pickup</h3>
          <p className="text-muted-foreground mb-4">
            Pick up your order from our local stores. Free of charge.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Same day available</span>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Shipping Details</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Order Processing</h3>
            <p className="text-muted-foreground">
              Orders are typically processed within 24-48 hours of placement. You'll receive a confirmation email 
              with tracking information once your order ships.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Tracking Orders</h3>
            <p className="text-muted-foreground">
              Track your order status through your account dashboard or using the tracking number provided 
              in your shipping confirmation email.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">International Shipping</h3>
            <p className="text-muted-foreground">
              We ship to most countries worldwide. International shipping costs and delivery times vary by location. 
              Customs duties and taxes may apply.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Shipping Restrictions</h3>
            <p className="text-muted-foreground">
              Some items may have shipping restrictions due to size, weight, or regulatory requirements. 
              These restrictions will be noted on the product page.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">How do I track my order?</h3>
            <p className="text-muted-foreground">
              You can track your order by logging into your account and visiting the Orders section, 
              or by using the tracking number from your shipping confirmation email.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">What happens if my package is lost?</h3>
            <p className="text-muted-foreground">
              If your package is lost during shipping, please contact our customer service team. 
              We'll help you track down your package or arrange for a replacement.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Can I change my shipping address?</h3>
            <p className="text-muted-foreground">
              You can change your shipping address before your order ships. Once shipped, 
              address changes may not be possible. Contact customer service for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 