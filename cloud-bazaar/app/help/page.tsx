import Link from "next/link"
import { ChevronRight, HelpCircle, Mail, Phone, MessageSquare } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Help Center</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
          <p className="text-muted-foreground mb-6">
            Find answers to common questions and get support for your shopping experience.
          </p>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">24/7 Customer Support Available</span>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-lg text-center">
          <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-muted-foreground mb-4">support@cloudbazaar.com</p>
          <Link href="/contact" className="text-primary hover:underline">
            Send us an email
          </Link>
        </div>
        <div className="p-6 border rounded-lg text-center">
          <Phone className="h-8 w-8 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Phone Support</h3>
          <p className="text-muted-foreground mb-4">1-800-123-4567</p>
          <Link href="/contact" className="text-primary hover:underline">
            Call us now
          </Link>
        </div>
        <div className="p-6 border rounded-lg text-center">
          <MessageSquare className="h-8 w-8 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-muted-foreground mb-4">Available 24/7</p>
          <Link href="/contact" className="text-primary hover:underline">
            Start chat
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">How do I track my order?</h3>
            <p className="text-muted-foreground">
              You can track your order by logging into your account and visiting the Orders section. 
              Each order will have a tracking number that you can use to monitor its status.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers. 
              Some payment methods may vary by region.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">How do I return an item?</h3>
            <p className="text-muted-foreground">
              To return an item, please visit our Returns page and follow the instructions. 
              You'll need to provide your order number and reason for return.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">What is your shipping policy?</h3>
            <p className="text-muted-foreground">
              We offer various shipping options including standard, express, and free shipping 
              for orders over a certain amount. Delivery times vary by location and shipping method.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 