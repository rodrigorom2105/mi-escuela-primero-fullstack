import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Form from './pages/form'
import FormEconomica from './pages/formEconomica'
import Catalog from './pages/catalog'
import Admin from './pages/admin'
import ProjectDetail from './pages/ProjectDetail'
import ThankYou from './pages/ThankYou'
import Faq from './pages/faq'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/donar" element={<Form />} />
      <Route path="/donar/economica" element={<FormEconomica />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/proyecto/:id" element={<ProjectDetail />} />
      <Route path="/gracias" element={<ThankYou />} />
      <Route path="/faq" element={<Faq />} />
    </Routes>
  )
}

export default App