import type { Transaction } from "@/lib/payment-context"

// Function to export transactions to CSV
export function exportTransactionsToCSV(transactions: Transaction[]) {
  // Define CSV headers
  const headers = [
    "Transaction ID",
    "User ID",
    "User Name",
    "User Email",
    "Amount",
    "Date",
    "Status",
    "Items",
    "Shipping Address",
    "Payment Method",
  ]

  // Format transaction data for CSV
  const rows = transactions.map((transaction) => {
    const itemsString = transaction.items.map((item) => `${item.name} (${item.quantity} x $${item.price})`).join("; ")

    const shippingAddress = `${transaction.shippingAddress.name}, ${transaction.shippingAddress.street}, ${transaction.shippingAddress.city}, ${transaction.shippingAddress.state} ${transaction.shippingAddress.zip}, ${transaction.shippingAddress.country}`

    const paymentMethod = `${transaction.paymentMethod.type}${transaction.paymentMethod.lastFour ? ` (**** ${transaction.paymentMethod.lastFour})` : ""}`

    return [
      transaction.id,
      transaction.userId,
      transaction.userName,
      transaction.userEmail,
      transaction.amount.toFixed(2),
      new Date(transaction.date).toISOString(),
      transaction.status,
      itemsString,
      shippingAddress,
      paymentMethod,
    ]
  })

  // Combine headers and rows
  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

  // Create a Blob and download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  // Create a link and trigger download
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `transactions_${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function to export products to CSV
export function exportProductsToCSV(products: any[]) {
  // Define CSV headers
  const headers = ["Product ID", "Name", "Price", "Rating", "Seller", "Description", "Image URL"]

  // Format product data for CSV
  const rows = products.map((product) => {
    return [
      product.id,
      product.name,
      product.price.toFixed(2),
      product.rating.toFixed(1),
      product.seller,
      product.description || "",
      product.image || "",
    ]
  })

  // Combine headers and rows
  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

  // Create a Blob and download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  // Create a link and trigger download
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `products_${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function to export users to CSV
export function exportUsersToCSV(users: any[]) {
  // Define CSV headers
  const headers = ["User ID", "Name", "Email", "Role", "Orders Count"]

  // Format user data for CSV
  const rows = users.map((user) => {
    return [user.id, user.name, user.email, user.role || "buyer", user.orders || 0]
  })

  // Combine headers and rows
  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

  // Create a Blob and download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  // Create a link and trigger download
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `users_${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

