import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPage from "./page/login.js";
import Dashboard from "./page/Dashboard.js";
import PrivateRoute from "./components/PrivateRoute .js";
import { AuthProvider } from "./context/AuthProvider.js";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
    // <AddProject/>
  );
}

export default App;
