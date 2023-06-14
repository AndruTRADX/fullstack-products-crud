import { Category } from './Category'

export interface Product {
  creationAt: Date
  description: string 
  id: number
  images: string[]
  price: number
  title: string
  updatedAt: Date
  category: Category
}

export interface CreateProduct {
  title: string
  description: string
  price: number
  images: string[]
  categoryId: number
}
