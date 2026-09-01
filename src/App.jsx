import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ContentPage from "./views/ContentPage";
import "./styles/site.css";

export default function App() {
  return (
    <BrowserRouter>
      <a className="skiplink" href="#main">
        Skip to content
      </a>
      <Navigation />
      <Routes>
        <Route path="*" element={<ContentPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
