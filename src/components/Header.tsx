'use client'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function Header(props: Props) {
  const { openModal, setOpenModal } = props

  return (
    <div className="lg:flex lg:items-center lg:justify-between">

      <div className="min-w-0 flex-1">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-purple-600">Dashboard</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Manage your products</h1>
              </div>
            </div>
          </div>
      </div>

      <div className="mt-5 flex lg:ml-4 lg:mt-0">

        <span className="sm:ml-3">
          <button
            onClick={() => setOpenModal(!openModal)}
            type="button"
            className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            <PlusCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Product
          </button>
        </span>

      </div>
    </div>
  )
}