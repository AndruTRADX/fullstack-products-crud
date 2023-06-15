'use client'
import { TableCellsIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [haveAcount, setHaveAcount] = useState<boolean>(true)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [show, setShow] = useState(false)
  const [showNewUser, setShowNewuser] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  
  const router = useRouter()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const auth = useAuth()

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
  
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const name = nameRef.current?.value

    if (haveAcount && email && password) {
      auth?.signIn(email, password).then(() => {
        setIsLogged(true)
        setShow(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }).catch(() => {
        setIsLogged(false)
        setShow(true)
      })
    } else if (!haveAcount && email && password && name) {
      auth?.signUp(email, password, name).then(() => {
        setShowNewuser(true)
        setIsCreated(true)
        setTimeout(() => {
          setIsCreated(false)
          setShowNewuser(false)
          setHaveAcount(true)
        }, 3000)
      }).catch(() => {
        setShowNewuser(true)
        setIsCreated(false)
      })
    } 
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center dark:bg-gray-900">
          <TableCellsIcon className="w-10 h-10 text-purple-600 " />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
            {
              haveAcount
              ? 'Sign in to your account'
              : 'Create your account'
            }
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>

          {
            haveAcount
            ? ''
            : <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="username"
                    type="text"
                    autoComplete="text"
                    ref={nameRef}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-slate-800 dark:bg-gray-800 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            }
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-slate-800 dark:bg-gray-800 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Password
                </label>
                <div className="text-sm text-gray-900 dark:text-gray-200">
                  {
                    haveAcount
                    ? 'You do not have an account? '
                    : 'Do you already have an account? '
                  }
                  <div 
                    onClick={() => {
                      setHaveAcount(!haveAcount) 
                      setShow(false)
                    }} 
                    className="font-semibold text-purple-600 hover:underline hover:text-purple-500 cursor-pointer inline"
                  >
                  {
                    haveAcount
                    ? 'Sign up'
                    : 'Sign in'
                  }
                  
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-800 dark:text-gray-300 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                {
                  haveAcount
                  ? 'Sing in'
                  : 'Sing up'
                }
              </button>
            </div>
          </form>
        {
          show
            ? 
              isLogged
                ? <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 text-sm text-blue-600 rounded-md my-8 p-4" role="alert">
                    <span className="font-bold">Loggin successfull</span> redirecting to the dashboard...
                  </div>

                : <div className="bg-red-50 dark:bg-red-900 border border-red-200  text-sm text-red-600 rounded-md my-8 p-4" role="alert">
                    <span className="font-bold">Unauthorized</span> invalid username or password.
                  </div>
            : ''
        }

        {
          showNewUser
            ? 
              isCreated
                ? <div className="bg-blue-50 border dark:bg-blue-900 border-blue-200 text-sm text-blue-600 rounded-md my-8 p-4" role="alert">
                    <span className="font-bold">User created successfull</span> now login in 3 seconds...
                  </div>

                : <div className="bg-red-50 border dark:bg-red-900 border-red-200 text-sm text-red-600 rounded-md my-8 p-4" role="alert">
                    <span className="font-bold">Failed</span> Something went wrong, try again.
                  </div>
            : ''
        }
        </div>
      </div>
    </>
  )
}