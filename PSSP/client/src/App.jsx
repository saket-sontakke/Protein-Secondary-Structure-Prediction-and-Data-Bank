import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';
import './Styling/App.css'; 
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Home from './Components/Home';
import Admin from './Components/Admin';
import StructurePrediction from './Components/StructurePrediction';
import DataBank from './Components/DataBank';
import Resources from './Components/Resources';
import Navbar from './Components/NavBar'; 
import DataAnalysis from './Components/DataAnalysis';
import FullDataset from './Components/FullDataset'; 

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

// RequireAuth Component for protecting routes
const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${baseUrl}/auth/verifyToken`, { withCredentials: true })
      .then(response => {
        if (!response.data.status) {
          navigate('/login');
        } else {
          setLoading(false);
        }
      }).catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

// New Layout Component: Handles Navbar and Margins for dashboard pages only
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Outlet /> {/* This renders the child route (e.g., Home, Admin) */}
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        {/* These are NOT wrapped in main-content, so they will be full screen (0 margin) */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        {/* --- PROTECTED / MAIN APP ROUTES --- */}
        {/* These ARE wrapped in MainLayout, so they get the Navbar and 70px margin */}
        <Route element={<MainLayout />}>
            <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
            <Route path="/DataAnalysis" element={<RequireAuth><DataAnalysis /></RequireAuth>} />
            <Route path="/structurePrediction" element={<RequireAuth><StructurePrediction /></RequireAuth>} />
            <Route path="/databank" element={<RequireAuth><DataBank /></RequireAuth>} />
            <Route path="/resources" element={<RequireAuth><Resources /></RequireAuth>} />
            <Route path="/fulldataset" element={<RequireAuth><FullDataset /></RequireAuth>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;