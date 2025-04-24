import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css';
import HomePage from './pages/HomePage';
import AllProducts from './components/AllProducts';
import AllProjects from './components/AllProjects';
import ShowCase from './components/ShowCase';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/items" element={<ShowCase />} />
        </Routes>
      </Router>
    </CartProvider>
    // <ShowCase/>
  )
}

export default App
