import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './routes/Home'
import About from './routes/About'
import Services from './routes/Services'
import BlogList from './routes/BlogList'
import BlogPost from './routes/BlogPost'
import Testimonials from './routes/Testimonials'
import Locations from './routes/Locations'
import Contact from './routes/Contact'
import BookAppointment from './routes/BookAppointment'
import NotFound from './routes/NotFound'
import TopBar from './components/TopBar'
import ServicePage from "./routes/ServicePage";
import Assistant from './routes/Assistant';


export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
