'use client'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, TableCellsIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'About', href: '#', current: false },
  { name: 'Too Much', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  const auth = useAuth()

  const user = {
    name: auth?.user?.name || 'Please log in',
    email: auth?.user?.email || 'email@eample.com',
    imageUrl: auth?.user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  }

  return (
    <Disclosure as="nav" className="w-full fixed backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b dark:border-slate-700  z-10 border-slate-300">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <TableCellsIcon
                    className="h-8 text-slate-200"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'text-slate-300 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-slate-200">{user.name}</div>
                    <div className="text-sm text-slate-300">{user.email}</div>
                  </div>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-slate-800">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="rounded-full" src={user.imageUrl} alt={user.imageUrl}
                        width={40}
                        height={40}
                        style={{ objectFit: 'cover', width: '40px', height: '40px' }}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    {
                      auth?.user
                      ? <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900 ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-slate-100' : '', 'block px-4 py-2 text-sm text-slate-700')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-slate-100' : '', 'block px-4 py-2 text-sm text-slate-700')}
                              onClick={() => auth.signOut()}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    : <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900 ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              className={classNames(active ? 'bg-slate-100' : '', 'block px-4 py-2 text-sm text-slate-700')}
                            >
                              Log in
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    }
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}