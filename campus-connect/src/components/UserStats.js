import React, { useState, useEffect } from 'react';
import API from '../app/api';

const UserStats = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetching user data using the token stored during login
        API.get('/user/profile')
            .then(res => setUser(res.data))
            .catch(err => console.error("Profile fetch failed:", err));
    }, []);

    if (!user) return <div className="p-4 text-cyan-400 animate-pulse font-mono">Initializing System...</div>;

    return (
        <div className="p-8 border border-gray-800 rounded-3xl bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl transition-all hover:border-cyan-500/50">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        {user.fullName || user.username}
                    </h2>
                    <p className="text-cyan-500 font-medium tracking-wide mt-1">{user.department || 'CSE Dept'}</p>
                </div>
                <div className="text-right">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Status</span>
                    <p className="text-green-400 text-sm font-mono">● ONLINE</p>
                </div>
            </div>

            <div className="mt-8 p-6 bg-cyan-950/20 border border-cyan-900/50 rounded-2xl flex items-center justify-between">
                <div>
                    <span className="text-xs uppercase text-gray-400 font-semibold tracking-widest">Impact Score</span>
                    <p className="text-4xl font-black text-cyan-400 mt-1">{user.impactScore || 0} <span className="text-sm text-cyan-700">XP</span></p>
                </div>
                <div className="h-16 w-16 rounded-full border-2 border-cyan-500 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    🏆
                </div>
            </div>
        </div>
    );
};

export default UserStats;