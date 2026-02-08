import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage.jsx"
import AboutUs from "./Pages/AboutUs.jsx"
import AdminLandingImages from "./AdminPages/LandingImages.jsx"
import AdminDashboard from "./AdminPages/Dashboard.jsx"
import LoginAdmin from "./AdminPages/LoginAdmin.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/landing-images" 
          element={
            <ProtectedRoute>
              <AdminLandingImages />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}
