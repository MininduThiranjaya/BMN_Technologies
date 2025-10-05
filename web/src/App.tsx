import "./index.css";
import "./App.css";
import Home from "./page/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
