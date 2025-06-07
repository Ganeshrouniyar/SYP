import Link from "next/link"
import { ChevronRight, CreditCard, Calculator, Percent, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SellerFeesPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Seller Fees</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Seller Fees & Pricing</h1>
          <p className="text-muted-foreground mb-6">
            Understand our fee structure and pricing model to maximize your profits.
          </p>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Transparent Fee Structure</span>
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Percent className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Platform Fee</h3>
          <p className="text-muted-foreground mb-4">
            10% of the total sale price
          </p>
          <div className="text-sm text-muted-foreground">
            Applied to all successful transactions
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Payment Processing</h3>
          <p className="text-muted-foreground mb-4">
            2.9% + $0.30 per transaction
          </p>
          <div className="text-sm text-muted-foreground">
            Standard payment processing fee
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Subscription Plans</h3>
          <p className="text-muted-foreground mb-4">
            Starting from $29/month
          </p>
          <div className="text-sm text-muted-foreground">
            Optional premium features
          </div>
        </div>
      </div>

      {/* Fee Details */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Fee Breakdown</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Platform Fees</h3>
            <p className="text-muted-foreground">
              Our platform fee structure includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2">
              <li>10% commission on product sales</li>
              <li>No listing fees for basic products</li>
              <li>Premium listing options available</li>
              <li>Volume discounts for high-volume sellers</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Payment Processing</h3>
            <p className="text-muted-foreground">
              Payment processing fees include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2">
              <li>2.9% + $0.30 per transaction</li>
              <li>Secure payment processing</li>
              <li>Multiple payment method support</li>
              <li>Automated payouts</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Subscription Benefits</h3>
            <p className="text-muted-foreground">
              Premium subscription includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2">
              <li>Reduced platform fees</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
              <li>Marketing tools</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Fee Calculator */}
      <div className="mt-12 bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Fee Calculator</h2>
        <p className="text-muted-foreground mb-6">
          Calculate your potential fees and earnings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Product Price</span>
              <span className="font-semibold">$100.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Platform Fee (10%)</span>
              <span className="font-semibold">$10.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment Processing</span>
              <span className="font-semibold">$3.20</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Your Earnings</span>
                <span className="font-semibold text-primary">$86.80</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-4">Try Different Prices</h3>
            <p className="text-muted-foreground">
              Use our interactive calculator to see how different prices affect your earnings.
            </p>
            <Button className="mt-4 w-full gap-2">
              Open Calculator <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Selling?</h2>
        <p className="text-muted-foreground mb-6">
          Create your seller account and start earning today.
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