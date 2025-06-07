import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { PaymentProvider } from "@/lib/payment-context"
import { MessageProvider } from "@/lib/message-context"
import { NotificationProvider } from "@/lib/notification-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cloud Bazaar - Your One-Stop Shop",
  description: "Shop the latest trends and best deals at Cloud Bazaar",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <MessageProvider>
                <PaymentProvider>
                  <NotificationProvider>
                    <div className="flex flex-col min-h-screen">
                      <Header />
                      <main className="flex-grow">{children}</main>
                      <Footer />
                    </div>
                  </NotificationProvider>
                </PaymentProvider>
              </MessageProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'