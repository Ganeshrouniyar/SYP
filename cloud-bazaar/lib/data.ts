// Mock data for the application

// Update the featured products with more descriptive data
export const featuredProducts = [
  {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.5,
    seller: "AudioTech",
    description:
      "Experience premium sound quality with our wireless noise cancelling headphones. Perfect for travel, work, or relaxation. A top-tier electronics product for audio enthusiasts.",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    rating: 4.2,
    seller: "TechGear",
    description:
      "Stay connected and track your fitness with this premium smartwatch featuring heart rate monitoring and GPS. An essential electronics wearable for the modern lifestyle.",
  },
  {
    id: "3",
    name: "Laptop Backpack",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wJTIwYmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    seller: "TravelPro",
    description:
      "Durable and water-resistant backpack with padded compartments for your laptop and other essentials. A stylish and practical fashion accessory for students and professionals.",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.3,
    seller: "SoundWave",
    description:
      "Portable Bluetooth speaker with 20 hours of battery life and waterproof design for outdoor adventures. A must-have electronics device for music lovers.",
  },
]

export const categories = [
  {
    id: "1",
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
    count: 1240,
  },
  {
    id: "2",
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D",
    count: 840,
  },
  {
    id: "3",
    name: "Home & Kitchen",
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQF60EVqiwSSIQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1695632118691?e=2147483647&v=beta&t=eIX-3pzPFQaO7rT-c_jZligmQy9hUrt0XU-vfRisof0",
    count: 1120,
  },
  {
    id: "4",
    name: "Books",
    image:
      "https://thumbs.dreamstime.com/b/vieux-livre-avec-lettres-volantes-et-lumi%C3%A8re-magique-sur-le-fond-de-la-biblioth%C3%A8que-livres-anciens-comme-symbole-connaissance-218640948.jpg",
    count: 2340,
  },
  {
    id: "5",
    name: "Sports & Outdoors",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnRzfGVufDB8fDB8fHww",
    count: 950,
  },
  {
    id: "6",
    name: "Beauty & Personal Care",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    count: 780,
  },
  {
    id: "7",
    name: "Toys & Games",
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG95c3xlbnwwfHwwfHx8MA%3D",
    count: 620,
  },
  {
    id: "8",
    name: "Health & Wellness",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    count: 890,
  },
]

// Add more descriptive data to products to improve search and category matching
export const allProducts = [
  {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.5,
    seller: "AudioTech",
    description:
      "Experience premium sound quality with our wireless noise cancelling headphones. Perfect for travel, work, or relaxation. A top-tier electronics product for audio enthusiasts.",
    category: "1",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    rating: 4.2,
    seller: "TechGear",
    description:
      "Stay connected and track your fitness with this premium smartwatch featuring heart rate monitoring and GPS. An essential electronics wearable for the modern lifestyle.",
    category: "1",
  },
  {
    id: "3",
    name: "Laptop Backpack",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wJTIwYmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    seller: "TravelPro",
    description:
      "Durable and water-resistant backpack with padded compartments for your laptop and other essentials. A stylish and practical fashion accessory for students and professionals.",
    category: "2",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.3,
    seller: "SoundWave",
    description:
      "Portable Bluetooth speaker with 20 hours of battery life and waterproof design for outdoor adventures. A must-have electronics device for music lovers.",
    category: "1",
  },
  {
    id: "5",
    name: "Digital Camera",
    price: 449.99,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.6,
    seller: "PhotoPro",
    description:
      "Capture stunning photos and videos with this high-resolution digital camera with advanced features. Perfect for photography enthusiasts and professionals alike. This electronics device offers exceptional image quality.",
    category: "1",
  },
  {
    id: "6",
    name: "Coffee Maker",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D",
    rating: 4.4,
    seller: "HomeEssentials",
    description:
      "Brew perfect coffee every morning with this programmable coffee maker with thermal carafe. An essential kitchen appliance for coffee lovers.",
    category: "3",
  },
  {
    id: "7",
    name: "Yoga Mat",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    seller: "FitLife",
    description:
      "Non-slip, eco-friendly yoga mat perfect for all types of yoga and fitness routines. A must-have fitness accessory for your home workout space.",
    category: "5",
  },
  {
    id: "8",
    name: "Mechanical Keyboard",
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww",
    rating: 4.5,
    seller: "TechGear",
    description:
      "Responsive mechanical keyboard with customizable RGB lighting for gaming and typing. A premium electronics accessory for your computer setup.",
    category: "1",
  },
  // Home & Kitchen Products
  {
    id: "9",
    name: "Stand Mixer",
    price: 249.99,
    image:
      "https://m.media-amazon.com/images/I/41dYS3bbVeL._SX300_SY300_QL70_FMwebp_.jpg",
    rating: 4.9,
    seller: "HomeEssentials",
    description:
      "Professional-grade stand mixer perfect for baking enthusiasts. This kitchen appliance makes mixing, kneading, and whipping effortless.",
    category: "3",
  },
  {
    id: "10",
    name: "Non-Stick Cookware Set",
    price: 129.99,
    image:
      "https://skcookware.com/cdn/shop/files/glaxyy.png?v=1722786644",
    rating: 4.7,
    seller: "KitchenPro",
    description:
      "Complete 10-piece non-stick cookware set for your kitchen. Includes pots, pans, and lids with heat-resistant handles. Essential for any home cook.",
    category: "3",
  },
  {
    id: "11",
    name: "Smart Home Thermostat",
    price: 179.99,
    image:
      "https://m.media-amazon.com/images/I/51U1jXuTPVL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    rating: 4.6,
    seller: "SmartHome",
    description:
      "Energy-saving smart thermostat that learns your preferences and adjusts automatically. Control your home temperature from anywhere with the mobile app.",
    category: "3",
  },
  {
    id: "12",
    name: "Blender",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxlbmRlcnxlbnwwfHwwfHx8MA%3D",
    rating: 4.5,
    seller: "KitchenPro",
    description:
      "High-powered blender for smoothies, soups, and more. Features multiple speed settings and a pulse function. A versatile kitchen appliance for everyday use.",
    category: "3",
  },
  {
    id: "13",
    name: "Bedding Set",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVkZGluZ3xlbnwwfHwwfHx8MA%3D",
    rating: 4.8,
    seller: "HomeComfort",
    description:
      "Luxurious 100% cotton bedding set including duvet cover, fitted sheet, and pillowcases. Available in various colors to match your home decor.",
    category: "3",
  },
  {
    id: "14",
    name: "Air Purifier",
    price: 149.99,
    image:
      "https://m.media-amazon.com/images/I/71ipnrfS-1L._SX679_.jpg",
    rating: 4.7,
    seller: "CleanAir",
    description:
      "HEPA air purifier that removes 99.97% of allergens, dust, and pollutants. Perfect for bedrooms, living rooms, and home offices. Breathe cleaner air at home.",
    category: "3",
  },

  // Books
  {
    id: "15",
    name: "The Midnight Library",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    seller: "BookWorld",
    description:
      "A novel about regret, hope, and second chances. Between life and death there is a library, and within that library, the shelves go on forever.",
    category: "4",
  },
  {
    id: "16",
    name: "Atomic Habits",
    price: 16.99,
    image:
      "https://images.unsplash.com/photo-1598618253208-d75408cee680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXRvbWljJTIwaGFiaXRzfGVufDB8fDB8fHww",
    rating: 4.9,
    seller: "BookWorld",
    description:
      "An easy and proven way to build good habits and break bad ones. A practical guide to transform your life with tiny changes in behavior.",
    category: "4",
  },
  {
    id: "17",
    name: "The Psychology of Money",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uZXl8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    seller: "FinancialBooks",
    description:
      "Timeless lessons on wealth, greed, and happiness. Learn how to better manage money and make smarter financial decisions.",
    category: "4",
  },
  {
    id: "18",
    name: "Educated: A Memoir",
    price: 13.99,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D",
    rating: 4.8,
    seller: "BookWorld",
    description:
      "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    category: "4",
  },
  {
    id: "19",
    name: "The Silent Patient",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D",
    rating: 4.6,
    seller: "MysteryBooks",
    description:
      "A psychological thriller about a woman's act of violence against her husband, and the therapist obsessed with uncovering her motive.",
    category: "4",
  },
  {
    id: "20",
    name: "Sapiens: A Brief History of Humankind",
    price: 18.99,
    image:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhpc3RvcnklMjBib29rfGVufDB8fDB8fHww",
    rating: 4.8,
    seller: "EducationalBooks",
    description:
      "A groundbreaking narrative of humanity's creation and evolution that explores how biology and history have defined us.",
    category: "4",
  },

  // More Electronics
  {
    id: "21",
    name: "Wireless Earbuds",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D",
    rating: 4.5,
    seller: "AudioTech",
    description:
      "True wireless earbuds with noise isolation and touch controls. Perfect for workouts and commuting with 24-hour battery life.",
    category: "1",
  },
  {
    id: "22",
    name: "4K Smart TV",
    price: 599.99,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D",
    rating: 4.7,
    seller: "ElectroVision",
    description:
      "55-inch 4K Ultra HD Smart TV with built-in streaming apps and voice control. Experience stunning picture quality and smart features.",
    category: "1",
  },

  // Fashion
  {
    id: "23",
    name: "Leather Wallet",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D",
    rating: 4.6,
    seller: "LeatherCraft",
    description:
      "Genuine leather wallet with multiple card slots and RFID protection. Slim design fits comfortably in your pocket.",
    category: "2",
  },
  {
    id: "24",
    name: "Casual Sneakers",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
    rating: 4.5,
    seller: "UrbanStyle",
    description:
      "Comfortable and stylish casual sneakers for everyday wear. Available in multiple colors to match any outfit.",
    category: "2",
  },

  // Sports & Outdoors
  {
    id: "25",
    name: "Fitness Tracker",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
    rating: 4.4,
    seller: "FitTech",
    description:
      "Track your steps, heart rate, sleep, and more with this waterproof fitness tracker. Sync with your smartphone for detailed health insights.",
    category: "5",
  },
  {
    id: "26",
    name: "Camping Tent",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZyUyMHRlbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    seller: "OutdoorLife",
    description:
      "Waterproof 4-person camping tent that sets up in minutes. Perfect for family camping trips and outdoor adventures.",
    category: "5",
  },

  // Beauty & Personal Care
  {
    id: "27",
    name: "Skincare Set",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpbmNhcmV8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    seller: "GlowBeauty",
    description:
      "Complete skincare set including cleanser, toner, serum, and moisturizer. Made with natural ingredients for all skin types.",
    category: "6",
  },
  {
    id: "28",
    name: "Hair Dryer",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpciUyMGRyeWVyfGVufDB8fDB8fHww",
    rating: 4.5,
    seller: "BeautyTech",
    description:
      "Professional-grade hair dryer with multiple heat and speed settings. Includes concentrator and diffuser attachments.",
    category: "6",
  },

  // Toys & Games
  {
    id: "29",
    name: "Board Game Collection",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9hcmQlMjBnYW1lfGVufDB8fDB8fHww",
    rating: 4.7,
    seller: "GameMaster",
    description: "Set of 5 classic board games for family game night. Includes chess, checkers, backgammon, and more.",
    category: "7",
  },
  {
    id: "30",
    name: "Remote Control Car",
    price: 45.99,
    image:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVtb3RlJTIwY29udHJvbCUyMGNhcnxlbnwwfHwwfHx8MA%3D",
    rating: 4.6,
    seller: "ToyWorld",
    description:
      "High-speed remote control car with rechargeable battery. Can perform stunts and tricks on various terrains.",
    category: "7",
  },

  // Health & Wellness
  {
    id: "31",
    name: "Digital Scale",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlnaXRhbCUyMHNjYWxlfGVufDB8fDB8fHww",
    rating: 4.5,
    seller: "HealthTech",
    description:
      "Accurate digital scale with body composition analysis. Track weight, BMI, body fat percentage, and more.",
    category: "8",
  },
  {
    id: "32",
    name: "Essential Oil Diffuser",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2lsJTIwZGlmZnVzZXJ8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    seller: "WellnessLife",
    description:
      "Ultrasonic essential oil diffuser with 7 LED light colors. Creates a relaxing atmosphere with your favorite essential oils.",
    category: "8",
  },
]

// Update the allProducts array to ensure all products have proper descriptive data for search and categorization
// Add more descriptive keywords to each product to improve searchability

// For example, for the Wireless Earbuds (ID: 21), enhance the description:
const product21 = allProducts.find((p) => p.id === "21")
if (product21) {
  product21.description =
    "True wireless earbuds with noise isolation and touch controls. Perfect for workouts and commuting with 24-hour battery life. These premium audio electronics provide crystal clear sound quality."
}

// For the 4K Smart TV (ID: 22), enhance the description:
const product22 = allProducts.find((p) => p.id === "22")
if (product22) {
  product22.description =
    "55-inch 4K Ultra HD Smart TV with built-in streaming apps and voice control. Experience stunning picture quality and smart features. A premium electronics product for your home entertainment."
}

// For the Leather Wallet (ID: 23), enhance the description:
const product23 = allProducts.find((p) => p.id === "23")
if (product23) {
  product23.description =
    "Genuine leather wallet with multiple card slots and RFID protection. Slim design fits comfortably in your pocket. A stylish fashion accessory for everyday use."
}

// For the Casual Sneakers (ID: 24), enhance the description:
const product24 = allProducts.find((p) => p.id === "24")
if (product24) {
  product24.description =
    "Comfortable and stylish casual sneakers for everyday wear. Available in multiple colors to match any outfit. These fashion footwear items are perfect for casual and active lifestyles."
}

// For the Board Game Collection (ID: 29), enhance the description:
const product29 = allProducts.find((p) => p.id === "29")
if (product29) {
  product29.description =
    "Set of 5 classic board games for family game night. Includes chess, checkers, backgammon, and more. These toys and games are perfect for family entertainment and developing strategic thinking."
}

// For the Remote Control Car (ID: 30), enhance the description:
const product30 = allProducts.find((p) => p.id === "30")
if (product30) {
  product30.description =
    "High-speed remote control car with rechargeable battery. Can perform stunts and tricks on various terrains. An exciting toy for children and adults alike."
}

export const productDetails = {
  "1": {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    price: 129.99,
    originalPrice: 199.99,
    discount: 35,
    rating: 4.5,
    reviewCount: 128,
    stock: 45,
    description:
      "Experience premium sound quality with our wireless noise cancelling headphones. Perfect for travel, work, or relaxation, these headphones deliver crisp highs, deep bass, and 30 hours of battery life.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Comfortable over-ear design",
      "Foldable design for easy storage",
    ],
    specifications: {
      Brand: "AudioTech",
      Model: "AT-NC100",
      Color: "Matte Black",
      Connectivity: "Bluetooth 5.0, 3.5mm audio jack",
      "Battery Life": "Up to 30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Warranty: "1 year manufacturer warranty",
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
    ],
    seller: {
      name: "AudioTech Official Store",
      rating: 4.8,
      products: 45,
    },
    relatedProducts: [
      {
        id: "2",
        name: "Smart Watch",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
        rating: 4.2,
      },
      {
        id: "4",
        name: "Bluetooth Speaker",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D",
        rating: 4.3,
      },
      {
        id: "8",
        name: "Mechanical Keyboard",
        price: 119.99,
        image:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww",
        rating: 4.5,
      },
      {
        id: "5",
        name: "Digital Camera",
        price: 449.99,
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D",
        rating: 4.6,
      },
    ],
  },
  "2": {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.2,
    reviewCount: 86,
    stock: 32,
    description:
      "Stay connected and track your fitness with this premium smartwatch featuring heart rate monitoring, GPS, and a variety of health tracking features. With a sleek design and long battery life, it's perfect for everyday use.",
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant (50m)",
      "Sleep tracking",
      "Smartphone notifications",
      "7-day battery life",
    ],
    specifications: {
      Brand: "TechGear",
      Model: "TG-SW200",
      Color: "Silver",
      Display: "1.4-inch AMOLED",
      "Battery Life": "Up to 7 days",
      "Charging Time": "1.5 hours",
      Weight: "45g",
      Warranty: "1 year manufacturer warranty",
    },
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    ],
    seller: {
      name: "TechGear Official",
      rating: 4.6,
      products: 38,
    },
    relatedProducts: [
      {
        id: "1",
        name: "Wireless Noise Cancelling Headphones",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.5,
      },
      {
        id: "4",
        name: "Bluetooth Speaker",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D",
        rating: 4.3,
      },
      {
        id: "7",
        name: "Yoga Mat",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D",
        rating: 4.8,
      },
      {
        id: "5",
        name: "Digital Camera",
        price: 449.99,
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D",
        rating: 4.6,
      },
    ],
  },
  "9": {
    id: "9",
    name: "Stand Mixer",
    price: 249.99,
    image:
      "https://m.media-amazon.com/images/I/41dYS3bbVeL._SX300_SY300_QL70_FMwebp_.jpg",
    rating: 4.9,
    seller: "HomeEssentials",
    description:
      "Professional-grade stand mixer perfect for baking enthusiasts. This kitchen appliance makes mixing, kneading, and whipping effortless.",
    category: "3",
  },
  "15": {
    id: "15",
    name: "The Midnight Library",
    price: 14.99,
    originalPrice: 19.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 215,
    stock: 50,
    description:
      "A novel about regret, hope, and second chances. Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    features: [
      "Bestselling novel",
      "Hardcover edition",
      "Award-winning author",
      "Thought-provoking story",
      "International bestseller",
    ],
    specifications: {
      Author: "Matt Haig",
      Publisher: "BookWorld Publishing",
      Language: "English",
      Paperback: "304 pages",
      ISBN: "978-0525559474",
      Dimensions: "5.5 x 0.8 x 8.2 inches",
      Weight: "12 ounces",
    },
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhpc3RvcnklMjBib29rfGVufDB8fDB8fHww",
    ],
    seller: {
      name: "BookWorld",
      rating: 4.9,
      products: 1240,
    },
    relatedProducts: [
      {
        id: "16",
        name: "Atomic Habits",
        price: 16.99,
        image:
          "https://images.unsplash.com/photo-1598618253208-d75408cee680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXRvbWljJTIwaGFiaXRzfGVufDB8fDB8fHww",
        rating: 4.9,
      },
      {
        id: "17",
        name: "The Psychology of Money",
        price: 15.99,
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uZXl8ZW58MHx8MHx8fDA%3D",
        rating: 4.7,
      },
      {
        id: "18",
        name: "Educated: A Memoir",
        price: 13.99,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D",
        rating: 4.8,
      },
    ],
  },
}

// Mock data for seller dashboard
export const sellerStats = [
  {
    title: "Total Sales",
    value: "$12,345.67",
    change: "+12.5%",
    icon: "DollarSign",
    trend: "up",
  },
  {
    title: "Orders",
    value: "156",
    change: "+8.2%",
    icon: "ShoppingBag",
    trend: "up",
  },
  {
    title: "Products",
    value: "48",
    change: "+4",
    icon: "Package",
    trend: "up",
  },
  {
    title: "Customers",
    value: "2,345",
    change: "+15.3%",
    icon: "Users",
    trend: "up",
  },
]

export const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-03-15",
    status: "Delivered",
    total: "$129.99",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-03-14",
    status: "Processing",
    total: "$79.50",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-03-13",
    status: "Shipped",
    total: "$249.99",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-03-12",
    status: "Delivered",
    total: "$59.99",
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: "2023-03-11",
    status: "Cancelled",
    total: "$189.99",
  },
]

export const sellerProducts = [
  {
    id: "PROD-001",
    name: "Wireless Headphones",
    price: "$129.99",
    stock: 45,
    category: "Electronics",
    status: "Active",
  },
  {
    id: "PROD-002",
    name: "Smart Watch",
    price: "$199.99",
    stock: 28,
    category: "Electronics",
    status: "Active",
  },
  {
    id: "PROD-003",
    name: "Laptop Backpack",
    price: "$59.99",
    stock: 12,
    category: "Accessories",
    status: "Active",
  },
  {
    id: "PROD-004",
    name: "Bluetooth Speaker",
    price: "$79.99",
    stock: 0,
    category: "Electronics",
    status: "Out of Stock",
  },
  {
    id: "PROD-005",
    name: "Fitness Tracker",
    price: "$89.99",
    stock: 5,
    category: "Electronics",
    status: "Low Stock",
  },
]

