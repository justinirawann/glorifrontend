import React from "react"
import ReactDOM from "react-dom/client"
import AppRoutes from "./routes"
import "./index.css"
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 800,
  once: false,
  offset: 100
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
)

