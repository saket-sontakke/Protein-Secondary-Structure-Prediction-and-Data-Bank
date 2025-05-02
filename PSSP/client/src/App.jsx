import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './Styling/App.css'; 

import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Admin from './Components/Admin';
import StructurePrediction from './Components/StructurePrediction';
import DataBank from './Components/DataBank';
import Resources from './Components/Resources';
import Forum from './Components/Forum';
import Navbar from './Components/NavBar'; 
import DataAnalysis from './Components/DataAnalysis';
import FullDataset from './Components/FullDataset'; 

// RequireAuth Component for protecting routes
const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get('http://localhost:3000/auth/verifyToken', { withCredentials: true })
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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
        <Route path="/DataAnalysis" element={<RequireAuth><DataAnalysis /></RequireAuth>} />
        <Route path="/structurePrediction" element={<RequireAuth><StructurePrediction /></RequireAuth>} />
        <Route path="/databank" element={<RequireAuth><DataBank /></RequireAuth>} />
        <Route path="/resources" element={<RequireAuth><Resources /></RequireAuth>} />
        <Route path="/forum" element={<RequireAuth><Forum /></RequireAuth>} />

        {/* New Route for Full Dataset */}
        <Route path="/fulldataset" element={<RequireAuth><FullDataset /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
