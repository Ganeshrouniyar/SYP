import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    image: string
    count: number
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={category.image || "/placeholder.svg"} 
            alt={category.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-1">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.count} products</p>
        </CardContent>
      </Card>
    </Link>
  )
}

