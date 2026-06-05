"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// --- Integrated Notification Bell ---
const NotificationBell = ({ count }) => (
    <div className="relative p-3 bg-white rounded-2xl shadow-sm cursor-pointer hover:scale-110 transition">
        <span className="text-2xl">🔔</span>
        {count > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
                {count}
            </span>
        )}
    </div>
);

export default function StudentDashboard() {
    const [myAppts, setMyAppts] = useState([]);
    const [studentName, setStudentName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const savedName = localStorage.getItem('studentName');
        if (!savedName) {
            router.push('/login');
            return;
        }
        setStudentName(savedName);

        axios.get(`http://127.0.0.1:8080/api/appointments/all`)
            .then(res => {
                const filtered = res.data.filter(a => a.studentName === savedName);
                setMyAppts(filtered);
            })
            .catch(err => console.error("Fetch Error:", err));
    }, [router]);

    // Derived Logic
    const approvedAppts = myAppts.filter(a => a.status === 'APPROVED');
    const impactScore = approvedAppts.length * 10;
    const pendingCount = myAppts.filter(a => a.status === 'PENDING').length;

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-5xl mx-auto">

                {/* 1. TOP NAV: Identity & Notifications */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Student Portal</h1>
                        <p className="text-indigo-600 font-bold">Logged in: {studentName}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <NotificationBell count={pendingCount} />
                        <button onClick={() => {localStorage.clear(); router.push('/login');}}
                                className="text-xs font-black uppercase text-slate-400 hover:text-red-500 transition">
                            Logout
                        </button>
                    </div>
                </header>

                {/* 2. IMPACT SCORE SECTION (The New Addition) */}
                <div className="bg-indigo-900 rounded-[2rem] p-8 text-white mb-10 flex justify-between items-center shadow-2xl border-b-8 border-indigo-700">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Global Impact Ranking</span>
                        <h2 className="text-4xl font-black mt-1 tracking-tight">Level {Math.floor(impactScore / 50) + 1}</h2>
                    </div>
                    <div className="bg-white/10 p-5 rounded-3xl border border-white/20 backdrop-blur-md text-center min-w-[120px]">
                        <span className="text-5xl font-black block leading-none">{impactScore}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-300">Total Points</span>
                    </div>
                </div>

                {/* 3. APPOINTMENT FEED */}
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    Recent Activity <span className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></span>
                </h3>

                <div className="grid gap-4">
                    {myAppts.length > 0 ? myAppts.map(a => (
                        <div key={a.id} className="group bg-white p-6 rounded-[1.8rem] border border-slate-100 shadow-sm flex justify-between items-center hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
                            <div className="flex gap-5 items-center">
                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-xl ${
                                    a.status === 'APPROVED' ? 'bg-green-50' : a.status === 'DECLINED' ? 'bg-red-50' : 'bg-amber-50'
                                }`}>
                                    {a.status === 'APPROVED' ? '✅' : a.status === 'DECLINED' ? '❌' : '⏳'}
                                </div>
                                <div>
                                    <p className="font-black text-slate-900 text-lg leading-tight">{a.facultyName}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mt-1">Room {a.roomNo} • {new Date(a.appointmentTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    a.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                    a.status === 'DECLINED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                    {a.status}
                                </span>
                                {a.status === 'APPROVED' && (
                                    <p className="text-[9px] font-black text-green-500 mt-2 flex items-center justify-end gap-1">
                                        REWARD: +10 <span className="animate-bounce">⭐</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-300 font-bold uppercase tracking-widest">
                            No active requests
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}