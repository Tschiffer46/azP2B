import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import MembershipPage from './pages/MembershipPage'
import FindUsPage from './pages/FindUsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kalender" element={<CalendarPage />} />
          <Route path="/bli-medlem" element={<MembershipPage />} />
          <Route path="/hitta-hit" element={<FindUsPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
