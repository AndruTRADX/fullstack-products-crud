'use client'
import Table from '../../components/Table'
import { useState } from 'react'
import { useFetch } from '@/hooks/useFecth'
import { endpoints } from '@/libs/endpoints.api'
import Paginate from '@/components/Pagination'
import Header from '@/components/Header'
import { Product } from '@/types/Product'
import Modal from '@/common/Modal'
import Form from '@/components/Form'
import { useAlert } from '@/hooks/useAlert'
import Alert from '@/common/Alert'

export default function Dasboard() {
  const [offsetProducts, setOffsetProducts] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const { alert, setAlert, toggleAlert } = useAlert()

  const productLimit = 10
  const products: Product[] = useFetch(endpoints.products.getProducts(productLimit, offsetProducts))
  const totalProducts = useFetch(endpoints.products.getProducts(0, 0)).length

  // const categoryNames = products?.map((product) => product.category.name)

  // const reducer = (acumulatorObject: { [x: string]: number }, current: string | number) => {
  //     if  ( acumulatorObject[current] ) {
  //       acumulatorObject[current] += 1
  //     } else {
  //       acumulatorObject[current] = 1
  //     }
  //     return acumulatorObject
  // }
  // const categoryOccurence = categoryNames.reduce(reducer, {})

  // const data = {
  //   datasets: [
  //     {
  //       label: 'Categories',
  //       data: categoryOccurence,
  //       borderWidth: 2,
  //       backgroundColor: ['#dc2626', '#4b5563', '#16a34a', '#ca8a04', '#2563eb'],
  //     },
  //   ],
  // }

  return (
    <>
      <Header openModal={openModal} setOpenModal={setOpenModal} />
      <Alert alert={alert} handleClose={toggleAlert} />
      {/* <Chart chartData={data} /> */}
      <Table products={products} />
      {
        totalProducts > 0 && 
        <Paginate totalItems={totalProducts} itemsPerPage={productLimit} setOffset={setOffsetProducts} neighbours={3} />
      }
      <Modal open={openModal} setOpen={setOpenModal}>
        <Form setOpen={setOpenModal} setAlert={setAlert} />
      </Modal>
    </>
  )
}