'use client'
import Nav from '../../components/Nav'
import Table, { Product } from '../../components/Table'
import { useState } from 'react'
import { useFetch } from '@/hooks/useFecth'
import { endpoints } from '@/libs/endpoints.api'
import Paginate from '@/components/Pagination'
import { Chart } from '@/common/Chart'

export default function Dasboard() {
  const [offsetProducts, setOffsetProducts] = useState(0);
  const productLimit = 5

  const products: Product[] = useFetch(endpoints.products.getProducts(productLimit, offsetProducts))
  const totalProducts = useFetch(endpoints.products.getProducts(0, 0)).length

  const categoryNames = products?.map((product) => product.category.name);

  const reducer = (acumulatorObject: { [x: string]: number }, current: string | number) => {
      if  ( acumulatorObject[current] ) {
        acumulatorObject[current] += 1
      } else {
        acumulatorObject[current] = 1
      }
      return acumulatorObject
  }
  const categoryOccurence = categoryNames.reduce(reducer, {})

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: categoryOccurence,
        borderWidth: 2,
        backgroundColor: ['#dc2626', '#4b5563', '#16a34a', '#ca8a04', '#2563eb'],
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Nav />
      <div className="flex flex-col max-w-7xl p-4 gap-8 pt-28">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-purple-600">Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Manage your products</h1>
            </div>
          </div>
        </div>
        <Chart chartData={data} />
        <Table products={products} />
        {
          totalProducts > 0 && 
          <Paginate totalItems={totalProducts} itemsPerPage={productLimit} setOffset={setOffsetProducts} neighbours={3} />
        }
      </div>
    </div>
  )
}