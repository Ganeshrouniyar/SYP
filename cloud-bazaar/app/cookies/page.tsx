import Link from "next/link"
import { ChevronRight, Cookie, Shield, Settings, FileText } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Cookie Policy</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-6">
            Learn about how we use cookies and similar technologies on our platform.
          </p>
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8">
        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Cookie className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies are necessary for the website to function properly:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Authentication cookies</li>
                    <li>Security cookies</li>
                    <li>Session management</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Functional Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies enable enhanced functionality:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Language preferences</li>
                    <li>Region settings</li>
                    <li>User preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies help us understand how visitors use our site:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Page views</li>
                    <li>Time spent on site</li>
                    <li>User behavior</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies are used to deliver personalized advertisements:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Targeted ads</li>
                    <li>Social media integration</li>
                    <li>Marketing preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Settings className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Browser Settings</h3>
                  <p className="text-muted-foreground">
                    You can control cookies through your browser settings:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Block all cookies</li>
                    <li>Delete existing cookies</li>
                    <li>Set cookie preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Cookie Consent</h3>
                  <p className="text-muted-foreground">
                    When you first visit our site, you'll be presented with a cookie consent banner where you can:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2">
                    <li>Accept all cookies</li>
                    <li>Customize cookie preferences</li>
                    <li>Reject non-essential cookies</li>
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
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground">
                We use services from third parties that may also set cookies on your device:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                <li>Google Analytics</li>
                <li>Social media platforms</li>
                <li>Payment processors</li>
                <li>Advertising networks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our cookie policy, please contact us at:
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