import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; 
import '../Styling/NavBar.css'; 

const Navbar = () => {
  const location = useLocation();  
  const navigate = useNavigate();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  const dropdownRef = useRef(null);  
  const excludedPaths = ["/login", "/signup", "/forgotPassword"]; 

  const isExactMatch = excludedPaths.includes(location.pathname);
  const isResetPassword = location.pathname.startsWith("/resetPassword");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isExactMatch || isResetPassword) {
    return null;
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    navigate('/login');
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className={location.pathname.toLowerCase() === "/home" || location.pathname === "/" ? "active" : ""}>
          <Link to="/Home">Home</Link>
        </li>
        <li className={location.pathname === "/DataAnalysis" ? "active" : ""}>
          <Link to="/DataAnalysis">Data Analysis</Link>
        </li>
        <li className={location.pathname === "/StructurePrediction" ? "active" : ""}>
          <Link to="/StructurePrediction">Structure Prediction</Link>
        </li>
        <li className={location.pathname === "/DataBank" ? "active" : ""}>
          <Link to="/DataBank">Data Bank</Link>
        </li>
        <li className={location.pathname === "/Resources" ? "active" : ""}>
          <Link to="/Resources">Resources</Link>
        </li>
      </ul>

      <div className="profile-section" ref={dropdownRef}>
        <div className="profile-icon" onClick={toggleDropdown}>
          <FaUserCircle size={30} />
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;