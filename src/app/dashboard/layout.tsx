import Nav from '@/components/Nav'

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Nav />
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col max-w-7xl p-4 gap-8 pt-28">
        {children}
      </div>
    </div>
    </>
  )
}