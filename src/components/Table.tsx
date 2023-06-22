'use client'
import Modal from '@/common/Modal'
import { deleteProduct } from '@/libs/product.api'
import { Product } from '@/types/Product'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Form from './Form'

interface Props {
  products: Product[]
}

export default function Table(props: Props) {
  const { products: productsResponse } = props 
  const [products, setProducts] = useState<Product[]>([])
  const [id, setId] = useState<number>()
  const [openModal, setOpenModal] = useState(false)

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
            <div className="shadow-gray-300 dark:shadow-gray-700 overflow-hidden border border-gray-200 dark:border-gray-700 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {products?.map((product, index) => (
                    <tr key={`Product-item-${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image 
                              className="rounded-full" src={product.images[1] ? product.images[1] : 'https://picsum.photos/200' } alt={product.title}
                              width={40}
                              height={40}
                              loading="lazy"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-300">{product.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 dark:bg-purple-600 text-purple-800 dark:text-white">
                          {product.category?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <>
                          <PencilSquareIcon 
                            className="text-purple-500 hover:text-purple-700 hover:underline cursor-pointer inline " 
                            width={20} 
                            height={20}
                            onClick={() => {
                              setId(product.id)
                              setOpenModal(true)
                            }}
                          />
                        </>
                        
                        <TrashIcon 
                          className="ml-6 text-red-500 hover:text-red-700 hover:underline cursor-pointer inline" 
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

      <Modal open={openModal} setOpen={setOpenModal}>
        <Form open={openModal} setOpen={setOpenModal} id={id} />
      </Modal>
    </>
  )
}