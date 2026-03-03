import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage.jsx"
import AboutUs from "./Pages/AboutUs.jsx"
import ContactUs from "./Pages/ContactUs.jsx"
import ServicesPages from "./Pages/ServicesPages.jsx"
import PortfolioPages from "./Pages/PortfolioPages.jsx"
import PortfolioDetail from "./Pages/PortfolioDetail.jsx"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services/:id" element={<ServicesPages />} />
        <Route path="/portfolio/:serviceId" element={<PortfolioPages />} />
        <Route path="/portfolio/detail/:projectId" element={<PortfolioDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
