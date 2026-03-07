import React from 'react'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Services from './components/Services'
import Media from './components/Media' // <-- Nova importação aqui
import BookingCalendar from './components/BookingCalendar'
import Footer from './components/Footer'


export default function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-slate-50">
      <Hero />
      <Manifesto />
      <Services />
      <Media /> 
      <BookingCalendar />
      <Footer />
    </main>
  )
}