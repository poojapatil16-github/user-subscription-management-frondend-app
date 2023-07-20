import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('userData');
    localStorage.removeItem('jwtToken');
    navigate('/');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">
        Innovation Factory
      </span>
      <div className="navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/Dashboard">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Services">Services</Link>
          </li>
        </ul>
        <button className="btn btn-danger logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
