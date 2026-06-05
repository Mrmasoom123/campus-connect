import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../app/api';

export default function ImpactLeaderboard() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard()
            .then(res => {
                setStudents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Leaderboard fetch failed:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center text-cyan-400 p-8 animate-pulse font-mono">SCANNING CAMPUS NETWORK...</div>;

    return (
        <div className="p-8 bg-black border border-gray-800 rounded-3xl shadow-2xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-8 text-center tracking-tighter">
                🏆 CAMPUS ELITE
            </h2>
            <div className="space-y-3">
                {students.map((s, i) => (
                    <div key={s.id || i}
                         className={`flex justify-between items-center p-5 rounded-2xl border transition-all duration-300
                         ${i === 0 ? 'bg-cyan-900/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-gray-900/50 border-gray-800 hover:border-gray-600'}`}>
                        <div className="flex items-center gap-5">
                            <span className={`text-xl font-black ${i < 3 ? 'text-cyan-400' : 'text-gray-600'}`}>
                                {i + 1 < 10 ? `0${i + 1}` : i + 1}
                            </span>
                            <div>
                                <p className="font-bold text-white tracking-tight">{s.user?.username || 'Anonymous'}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">{s.department || 'General'}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-xl font-mono font-bold text-cyan-400">{s.impactPoints || 0}</span>
                            <span className="text-[10px] text-gray-600 block font-bold">XP</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}