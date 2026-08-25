import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPage from "./page/login.js";
import Dashboard from "./page/Dashboard.js";
import PrivateRoute from "./components/PrivateRoute .js";
import { AuthProvider } from "./context/AuthProvider.js";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./components/ForgetPassword.js";

function App() {
  return (
    <>
        <ToastContainer />
        <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
      </AuthProvider>
        </BrowserRouter>
    </>
    // <AddProject/>
  );
}

export default App;
