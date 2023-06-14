import axios from 'axios'
import { endpoints } from './endpoints.api'
import { CreateProduct } from '@/types/Product'

export const addProduct = async (body: CreateProduct) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  }

  const response = await axios.post(endpoints.products.addProducts, body, config)
  return response.data
}

export const deleteProduct = async (id: number) => {
  const response = await axios.delete(endpoints.products.deleteProducts(id))
  return response.data
}