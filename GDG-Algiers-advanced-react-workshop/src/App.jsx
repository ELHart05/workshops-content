import { Link, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ErrorPage from "./pages/ErrorPage"
import MemberPage from "./pages/MemberPage"
import Navbar from "./components/Layout/Navbar"
import Footer from "./components/Layout/Footer"

function App() {
  return (
    //this is React Fragment used to wrap all elements inside a single parent elements
    <> 
      <Navbar />
      <hr />
      <h1>WELCOME TO GDG FOR ONCE, GDG FOR EVER SESSION BY <Link to="https://github.com/ELHart05">OKBA...</Link></h1>
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/member/:name" element={<MemberPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
