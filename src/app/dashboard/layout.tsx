import Nav from '@/components/Nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Nav />
    <div className="min-h-screen flex flex-col items-center dark:bg-gray-900">
      <div className="flex flex-col max-w-7xl p-4 gap-8 pt-28 dark:bg-gray-900">
        {children}
      </div>
    </div>
    </>
  )
}