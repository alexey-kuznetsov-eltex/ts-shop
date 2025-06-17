export type Product = {
  id: string
  title: string
  category: string
  price: number
  description: string
  images: string[]
}

export type ProductApiResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type Category = {
  slug: string
  name: string
  url: string
}