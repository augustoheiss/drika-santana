import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  const isCadWorkstation = pathname === '/servicos'

  return (
    <div
      className={`${
        isCadWorkstation ? 'h-[100dvh] overflow-hidden flex flex-col' : 'min-h-screen'
      } bg-zinc-950 text-slate-50`}
    >
      <ScrollToTop />
      <Navbar />
      <main className={isCadWorkstation ? 'flex-1 min-h-0 overflow-hidden' : ''}>
        <Outlet />
      </main>
      {!isCadWorkstation && <Footer />}
      {!isCadWorkstation && <WhatsAppFloat />}
    </div>
  )
}
