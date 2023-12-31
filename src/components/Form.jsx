'use client'
import { addProduct, updateProduct } from '@/libs/product.api'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { endpoints } from '@/libs/endpoints.api'

export default function Form(props) {
  const formRef = useRef(null)
  const { setOpen, setAlert, id } = props
  const [product, setProduct] = useState()

  useEffect(() => {
    if (!id) return

    const getProduct = async () => {
      const response = await axios.get(endpoints.products.getProduct(id))
      console.log(id, response.data)
      setProduct(response.data)
    }
    getProduct()
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(formRef.current)
    const data = {
      title: formData.get('title'),
      description: formData.get('title'),
      price: parseInt(formData.get('price')),
      images: [formData.get('images')?.name || 'funny-cat.jpg'],
      categoryId: parseInt(formData.get('category')),
    }

    if (product) {
      updateProduct(product.id, data)
        .then((res) => {
          setOpen((prev) => !prev)
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (setAlert && setOpen) {
      addProduct(data)
        .then(() => {
          setAlert({
            active: true,
            message: 'Product added successfully',
            autoClose: true,
            type: 'success',
          })
          setOpen(false)
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: error.message,
            autoClose: true,
            type: 'error',
          })
        })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="dark:bg-gray-900 rounded-lg">
      <div className="overflow-hidden dark:bg-gray-900">
        <div className="px-4 py-5 bg-white dark:bg-gray-900 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title
              </label>
              <input
                defaultValue={product?.title}
                type="text"
                name="title"
                id="title"
                className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-300"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Price
              </label>
              <input
                defaultValue={product?.price}
                type="number"
                name="price"
                id="price"
                className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-300"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Category
              </label>
              <select
                defaultValue={product?.category?.id}
                id="category"
                name="category"
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:text-gray-300"
              >
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Toys</option>
                <option value="5">Others</option>
              </select>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                defaultValue={product?.description}
                name="description"
                id="description"
                autoComplete="description"
                rows={3}
                className="form-textarea block w-full mt-1 focus:ring-purple-500 focus:border-purple-500 shadow-sm sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md dark:text-gray-300"
              />
            </div>
            <div className="col-span-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cover photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white dark:bg-gray-900 rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <span>Upload a file</span>
                        <input
                          defaultValue={product?.images[0]}
                          id="images"
                          name="images"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Save product
          </button>
        </div>
      </div>
    </form>
  )
}