import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './style.css';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CourseList from './components/courses/CourseList';

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<CourseList />} />
        </Routes>
    </Router>
);

export default App; // Add this line