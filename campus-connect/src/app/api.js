"use client";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

// Component Imports - Assuming they are in frontend/app/components/
import Login from './components/Login';
import UserStats from './components/UserStats';
import Leaderboard from './components/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';

// Page Imports - Jumping into the subfolders
import Book from './components/Book';
import History from './history/page';

const Navigation = () => {
    const navigate = useNavigate();
    // Safe check for localStorage in Next.js environment
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (!token) return null;

    return (
        <nav className="p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center text-cyan-400 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div className="flex gap-8 items-center">
                <span className="text-xl font-black tracking-tighter text-white uppercase">Campus<span className="text-cyan-500">Con</span></span>
                <div className="flex gap-6 text-xs uppercase tracking-widest font-bold">
                    <Link to="/dashboard" className="hover:text-white transition">Stats</Link>
                    <Link to="/leaderboard" className="hover:text-white transition">Elite</Link>
                    <Link to="/bond-bridge" className="hover:text-white transition text-cyan-500 underline underline-offset-4">Book Bond</Link>
                    <Link to="/history" className="hover:text-white transition">Logs</Link>
                </div>
            </div>
            <button onClick={handleLogout} className="px-4 py-1.5 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-tighter">
                Terminate
            </button>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <Navigation />
            <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* Shielded Community Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><UserStats /></ProtectedRoute>} />
                    <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                    <Route path="/bond-bridge" element={<ProtectedRoute><Book /></ProtectedRoute>} />
                    <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

                    {/* 404 Redirect */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;