'use client'
import { deleteProduct } from '@/libs/product.api'
import { Product } from '@/types/Product'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  products: Product[]
}

export default function Table(props: Props) {
  const { products: productsResponse } = props 
  const [products, setProducts] = useState<Product[]>([])

  useEffect(()  => {
    setProducts(productsResponse)
  }, [productsResponse, products])

  const handleDelete = (id: number, productIndex: number) => {
    setProducts(products.splice(productIndex, 1))
    deleteProduct(id)
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product, index) => (
                    <tr key={`Product-item-${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image 
                              className="rounded-full" src={product.images[1]} alt={product.title}
                              width={40}
                              height={40}
                              loading="lazy"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {product.category?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        
                        <PencilSquareIcon 
                          className="text-purple-600 hover:text-purple-800 hover:underline cursor-pointer inline " 
                          width={20} 
                          height={20}
                        />
                        
                        <TrashIcon 
                          className="ml-6 text-red-600 hover:text-red-800 hover:underline cursor-pointer inline" 
                          width={20} 
                          height={20}
                          aria-hidden="true"
                          onClick={() => handleDelete(product.id, index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}