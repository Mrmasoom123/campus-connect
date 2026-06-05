'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const username = localStorage.getItem('username');
        axios.get(`http://localhost:8080/api/users/profile/${username}`)
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(err => console.log("Error loading Vortex Data"));
    }, []);

    if (loading) return (
        <div className="h-screen bg-[#F3F4F6] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Vortex Profile...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* --- HEADER NAVIGATION PATH --- */}
                <nav className="mb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Home / <span className="text-blue-600">Student Dashboard</span>
                </nav>

                {/* --- MAIN IMPACT BANNER (Matches Screenshot 2026-05-14 212016_2.jpg) --- */}
                <div className="relative overflow-hidden bg-gradient-to-r from-[#2D54C4] to-[#7C3AED] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20 mb-10">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 text-3xl shadow-inner">
                                🏅
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
                                    Impact Score: {user.impactScore} — <span className="opacity-80">Campus Leader</span>
                                </h2>
                                {/* PROGRESS BAR */}
                                <div className="mt-4 w-full md:w-96 h-3 bg-white/20 rounded-full overflow-hidden border border-white/10">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                                        style={{ width: `${(user.impactScore / 1000) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* DECORATIVE BACKGROUND VORTEX CIRCLE */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- CLUB HUB / ACTIVITY (Left Side) --- */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span> Club Hub
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ActivityCard
                                    title="Hackathon 2026"
                                    status="Register Now"
                                    img="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400"
                                    color="bg-blue-600"
                                />
                                <ActivityCard
                                    title="Art Exhibition"
                                    status="Attending"
                                    img="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400"
                                    color="bg-emerald-500"
                                    isAttending
                                />
                            </div>
                        </section>
                    </div>

                    {/* --- BOND BRIDGE / PROFILE (Right Side) --- */}
                    <div className="space-y-8">
                        <section>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">Bond Bridge</h3>
                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-50 overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`} alt="Profile" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current User</p>
                                        <h4 className="font-black text-slate-900 text-lg">{user.fullName}</h4>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Committee</p>
                                        <p className="font-bold text-slate-700">{user.committee || 'General Member'}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Contact Node</p>
                                        <p className="font-bold text-slate-700">{user.contact}</p>
                                    </div>
                                    <button className="w-full py-4 bg-slate-900 text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
                                        Request Mentorship
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
}

// HELPER COMPONENT FOR ACTIVITY CARDS
function ActivityCard({ title, status, img, color, isAttending = false }) {
    return (
        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm group hover:shadow-xl hover:shadow-blue-900/5 transition-all">
            <div className="h-32 w-full overflow-hidden">
                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={title} />
            </div>
            <div className="p-6">
                <h4 className="font-black text-slate-900 text-lg mb-4">{title}</h4>
                <button className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isAttending ? 'bg-emerald-100 text-emerald-600' : 'bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'}`}>
                    {status}
                </button>
            </div>
        </div>
    );
}