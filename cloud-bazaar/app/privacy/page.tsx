import Link from "next/link"
import { ChevronRight, Shield, Lock, Eye, FileText } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Privacy Policy</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">
            Learn how we collect, use, and protect your personal information.
          </p>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8">
        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Lock className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p className="text-muted-foreground">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Name and contact information</li>
                    <li>Account credentials</li>
                    <li>Payment information</li>
                    <li>Shipping addresses</li>
                    <li>Order history</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Automatically Collected Information</h3>
                  <p className="text-muted-foreground">
                    We automatically collect certain information when you use our platform:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Device information</li>
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Usage data</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Eye className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Primary Uses</h3>
                  <p className="text-muted-foreground">
                    We use your information to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Process your orders and payments</li>
                    <li>Communicate with you about your orders</li>
                    <li>Provide customer support</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Improve our services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Data Sharing</h3>
                  <p className="text-muted-foreground">
                    We may share your information with:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Service providers and partners</li>
                    <li>Payment processors</li>
                    <li>Shipping carriers</li>
                    <li>Law enforcement when required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Security Measures</h3>
                  <p className="text-muted-foreground">
                    We implement various security measures to protect your information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Encryption of sensitive data</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and authentication</li>
                    <li>Secure data storage</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Your Rights</h3>
                  <p className="text-muted-foreground">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Export your data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our privacy policy or how we handle your data, please contact us at:
              </p>
              <div className="mt-4">
                <p className="font-medium">Email:</p>
                <p className="text-muted-foreground">privacy@cloudbazaar.com</p>
              </div>
              <div className="mt-2">
                <p className="font-medium">Address:</p>
                <p className="text-muted-foreground">
                  123 Privacy Street<br />
                  Data Protection City, DP 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 