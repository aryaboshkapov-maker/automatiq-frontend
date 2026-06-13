import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import DemoTelegram from "./pages/DemoTelegram"
import DemoWhatsapp from "./pages/DemoWhatsapp"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo-telegram" element={<DemoTelegram />} />
        <Route path="/demo-whatsapp" element={<DemoWhatsapp />} />
      </Routes>
    </BrowserRouter>
  )
}
