import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css';
import HomePage from './pages/HomePage';
import AllProducts from './pages/AllProducts';
import AllProjects from './pages/AllProjects';
import ProductShowCasePage from './pages/ProductShowCasePage';
import ProjectShowCasePage from './pages/ProjectShowCasePage';
// import { CartProvider } from './context/CartContext';

function App() {
  return (
    // <CartProvider>
      <Router>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/all-products/:category" element={<ProductShowCasePage />} />
          <Route path="/all-projects/:category" element={<ProjectShowCasePage />} />
        </Routes>
      </Router>
    // </CartProvider>
    // <ShowCase/>
  )
}

export default App
