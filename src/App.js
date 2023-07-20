import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Services from './components/Services'; 
import Dashboard from './components/Dashboard'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/Services" element={<Services />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
