import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import './index.css';
import HomePage from './pages/HomePage';
import AllProducts from './components/AllProducts';
import AllProjects from './components/AllProjects';

function App() {
  return (
    <Router>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/all-projects" element={<AllProjects />} />
        </Routes>
    </Router>
  )
}

export default App
