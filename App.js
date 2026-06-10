import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoverLetterBuilder from "./pages/CoverLetterBuilder";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import ATSAnalyzer from "./pages/ATSAnalyzer";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cover-letter"
          element={
            <ProtectedRoute>
              <CoverLetterBuilder />
            </ProtectedRoute>}
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
                <PortfolioBuilder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ats"
          element={
            <ProtectedRoute>
              <ATSAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
      </Routes>
      
    </BrowserRouter>
  );
}