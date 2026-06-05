'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FacultyDashboard() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/all-students')
            .then(res => {
                setStudents(res.data);
                setLoading(false);
            })
            .catch(err => console.log("Unauthorized Access"));
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER SECTION --- */}
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <nav className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                            Bond Bridge / <span className="text-blue-600">Faculty-Student Connection</span>
                        </nav>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Faculty <span className="text-blue-600">Cockpit</span></h1>
                    </div>
                    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 hidden md:block">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Active Students</p>
                        <p className="text-xl font-black text-blue-600">{students.length}</p>
                    </div>
                </header>

                {/* --- STUDENT AUDIT GRID --- */}
                <div className="grid gap-8">
                    {loading ? (
                        <div className="py-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">Initialising Audit...</div>
                    ) : students.map(s => (
                        <div key={s.uid} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all group">

                            {/* --- TOP PROFILE SECTION (Screenshot Style) --- */}
                            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-slate-50">
                                <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden shrink-0">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.fullName}`} alt="Avatar" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-black text-slate-900 mb-1">{s.fullName} <span className="text-slate-400 text-lg font-bold">({s.branch})</span></h3>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase">Impact Score</p>
                                            <p className="text-lg font-black text-blue-600">{s.impactScore}</p>
                                        </div>
                                        <div className="h-8 w-px bg-slate-100 mx-2 hidden md:block"></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase">Status</p>
                                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black rounded-lg uppercase">Advanced</span>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Primary Skills:</p>
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                            {['Java', 'React', 'Leadership'].map(skill => (
                                                <span key={skill} className="px-4 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- BOTTOM ACTION SECTION (Screenshot Style) --- */}
                            <div className="bg-slate-50/50 p-6 md:px-10 flex flex-col lg:flex-row justify-between items-center gap-6">
                                <div className="flex-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ongoing Project</p>
                                    <p className="font-bold text-slate-700">{s.committee || "Smart Campus App (Vortex)"}</p>
                                </div>
                                <div className="flex gap-3 w-full lg:w-auto">
                                    <button className="flex-1 lg:flex-none px-6 py-3 bg-[#1E40AF] text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-lg shadow-blue-900/20">
                                        Approve Project
                                    </button>
                                    <button className="flex-1 lg:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-600 text-[10px] font-black rounded-xl uppercase tracking-widest hover:border-blue-300 transition-all">
                                        Schedule Meeting
                                    </button>
                                    <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50">⋮</button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}