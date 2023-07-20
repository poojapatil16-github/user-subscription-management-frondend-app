import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


const Dashboard = () => {

  return (
    <div className="dashboard">
      <Navbar />
      <div className="services-content">
        <h1>Hello User!</h1>
        <p>Welcome to the portal</p>
        <Link to="/Services" ><button type="submit" className="btn btn-light">Subscribe</button></Link>
      </div>
    </div>
  );
};

export default Dashboard;
