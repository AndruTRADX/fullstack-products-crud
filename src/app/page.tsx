import Link from 'next/link'

const Index = ():JSX.Element => {
  return (
    <div className="relative isolate px-6 lg:px-8 lg:pb-20 flex flex-col justify-center items-center min-h-screen bg-gray-900 dark:bg-gray-900">
        
        <div className="max-w-2xl px-8 py-12 bg-gray-50 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-2xl shadow-sm">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-950 dark:border-gray-600  dark:text-gray-300 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Built to streamline team data creation.{' '}
              <a href="https://www.youtube.com/watch?v=UOraKZbEj_M" target="_blank" className="font-semibold text-purple-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">
            Manage your products
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-500 dark:text-gray-300">
            Work with your team to create data in an organized manner through our fast and intuitive interface, which will allow you to have a more efficient and effective experience in creating your products.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 ">
              <Link href="/dashboard" className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-lg group hover:ring-1 hover:ring-purple-500">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700" />
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease" />
                <span className="relative text-white">Get started</span>
              </Link>

              <Link href="/login" className="rounded-xl bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-950 text-sm font-semibold px-3.5 py-2.5  border border-gray-300 dark:border-gray-700 leading-6 text-gray-900 dark:text-gray-200 w-full sm:w-auto">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Index