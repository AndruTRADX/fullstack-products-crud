'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoints } from '@/libs/endpoints.api' 
import { Product } from '@/types/Product'
import Form from '@/components/Form'

export default function Edit({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product>()
  const id =  params.id

  useEffect(() => {
    if (!id) return

    const getProduct = async () => {
      const response = await axios.get(endpoints.products.getProduct(id))
      console.log(id, response.data)
      setProduct(response.data)
    }
    getProduct()
  }, [id])

  return (
    <Form product={product} />
  )
}