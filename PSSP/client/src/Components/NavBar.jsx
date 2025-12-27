import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import the profile icon
import '../Styling/NavBar.css'; 

const Navbar = () => {
  const location = useLocation();  // Get the current path
  const navigate = useNavigate();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);  // For handling the dropdown
  const dropdownRef = useRef(null);  // To manage the dropdown
  const excludedPaths = ["/login", "/signup", "/forgotpassword", "/resetPassword/:token"];  // Excluded paths

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle logout and navigate to login page
  const handleLogout = () => {
    // Add logout logic here if necessary
    navigate('/login');
  };

  // If the current path is in the excludedPaths array, don't render the navbar
  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className={location.pathname === "/Home" ? "active" : ""}>
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
        {/* <li className={location.pathname === "/Forum" ? "active" : ""}>
          <Link to="/Forum">Forum</Link>
        </li> */}
      </ul>

      {/* Profile section with dropdown */}
      <div className="profile-section" ref={dropdownRef}>
        <div className="profile-icon" onClick={toggleDropdown}>
          <FaUserCircle size={30} />
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            {/* <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
              Profile
            </Link> */}
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
