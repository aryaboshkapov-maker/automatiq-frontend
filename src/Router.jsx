import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import DemoTelegram from "./pages/DemoTelegram"
import DemoWhatsapp from "./pages/DemoWhatsapp"
import HomeThumb from "./pages/HomeThumb"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/thumbtack" element={<HomeThumb />} />
        <Route path="/demo-telegram" element={<DemoTelegram />} />
        <Route path="/demo-whatsapp" element={<DemoWhatsapp />} />
      </Routes>
    </BrowserRouter>
  )
}
