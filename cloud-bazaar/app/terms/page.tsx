import Link from "next/link"
import { ChevronRight, FileText, Scale, AlertCircle, ArrowRight } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Terms of Service</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-6">
            Please read these terms carefully before using our platform.
          </p>
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Terms Sections */}
      <div className="space-y-8">
        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Cloud Bazaar, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our platform.
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Scale className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">2. User Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Account Security</h3>
                  <p className="text-muted-foreground">
                    Users are responsible for:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Maintaining the confidentiality of their account</li>
                    <li>All activities under their account</li>
                    <li>Notifying us of any security breaches</li>
                    <li>Keeping their contact information up to date</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Platform Usage</h3>
                  <p className="text-muted-foreground">
                    Users must not:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Violate any laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Engage in fraudulent activities</li>
                    <li>Interfere with platform operations</li>
                    <li>Harass or abuse other users</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">3. Seller Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Product Listings</h3>
                  <p className="text-muted-foreground">
                    Sellers must ensure:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Accurate product descriptions</li>
                    <li>High-quality product images</li>
                    <li>Fair and competitive pricing</li>
                    <li>Compliance with all applicable laws</li>
                    <li>Proper inventory management</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Fulfillment</h3>
                  <p className="text-muted-foreground">
                    Sellers are responsible for:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Timely order processing</li>
                    <li>Accurate shipping information</li>
                    <li>Quality product packaging</li>
                    <li>Handling returns and refunds</li>
                    <li>Customer service and support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Scale className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on Cloud Bazaar, including but not limited to text, graphics, logos, images, and software, is the property of Cloud Bazaar or its content suppliers and is protected by intellectual property laws.
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Cloud Bazaar shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform.
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will notify users of any material changes through the platform or via email.
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Scale className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these terms, please contact us at:
              </p>
              <div className="mt-4">
                <p className="font-medium">Email:</p>
                <p className="text-muted-foreground">legal@cloudbazaar.com</p>
              </div>
              <div className="mt-2">
                <p className="font-medium">Address:</p>
                <p className="text-muted-foreground">
                  123 Legal Street<br />
                  Terms City, TC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 