import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Servicos from './pages/Servicos'
import Contato from './pages/Contato'
import Avaliacoes from './pages/Avaliacoes'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="contato" element={<Contato />} />
          <Route path="avaliacoes" element={<Avaliacoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}