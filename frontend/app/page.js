'use client';
import API from './api';
import { useState, useEffect } from 'react';

export default function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingStatus, setBookingStatus] = useState(null); // For the Slot Booking Popup

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://your-spring-boot-backend.onrender.com/api/events');
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchEvents(); }, []);

    const handleJoinEvent = (eventTitle) => {
        // Logic: Simulate a backend booking call
        setBookingStatus(eventTitle);
        // Auto-close modal after 3 seconds
        setTimeout(() => setBookingStatus(null), 3500);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
            {/* --- SUCCESS MODAL --- */}
            {bookingStatus && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/20 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-100 text-center max-w-sm mx-4 animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                        <h3 className="text-xl font-black text-slate-900 uppercase">Slot Confirmed!</h3>
                        <p className="text-slate-500 text-sm mt-2">You are registered for <span className="font-bold text-blue-600">{bookingStatus}</span>. Your digital pass is active.</p>
                        <div className="mt-6 pt-4 border-t border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vortex ID: VX-{Math.floor(Math.random() * 90000) + 10000}</div>
                    </div>
                </div>
            )}

            {/* --- HEADER --- */}
            <header className="max-w-5xl mx-auto text-center mb-20">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-6">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ICFAI University Jaipur</span>
                </div>
                <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                    Campus <span className="text-blue-600">Vortex</span>
                </h1>
                <p className="text-slate-500 mt-4 max-w-lg mx-auto text-sm font-medium leading-relaxed">
                    The smart ecosystem for seamless campus logistics, event synergy, and real-time student impact.
                </p>
            </header>

            <main className="max-w-5xl mx-auto">
                <div className="flex justify-between items-end mb-12 px-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Live Feed</h2>
                        <div className="h-1.5 w-12 bg-blue-600 mt-2 rounded-full"></div>
                    </div>
                    <button onClick={fetchEvents} className="group flex items-center gap-2 bg-white text-slate-600 text-[10px] font-black px-6 py-3 rounded-2xl border border-slate-200 hover:border-blue-200 transition-all active:scale-95 uppercase tracking-widest">
                        <span className="group-hover:rotate-180 transition-transform duration-500">🔄</span> Refresh System
                    </button>
                </div>

                {/* --- EVENTS GRID --- */}
                <div className="grid gap-8">
                    {loading ? (
                        <div className="py-24 text-center">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Syncing Vortex Data...</p>
                        </div>
                    ) : events.map(event => (
                        <div key={event.id} className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black rounded-lg uppercase tracking-widest">
                                            {event.status || 'UPCOMING'}
                                        </span>
                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Points: +{event.points || 0}</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                                        {event.title || "Untitled Vortex Event"}
                                    </h3>
                                    <p className="text-slate-500 mt-4 text-base leading-relaxed max-w-2xl font-medium">
                                        {event.description || "System data pending for this event description."}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mt-8">
                                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                                            <span className="text-sm">📍</span>
                                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">{event.location || 'Location TBD'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                                            <span className="text-sm">📅</span>
                                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
                                                {event.startTime ? new Date(event.startTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Date Pending'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                                            <span className="text-sm">⏰</span>
                                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
                                                {event.startTime ? new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--'} -
                                                {event.endTime ? new Date(event.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleJoinEvent(event.title)}
                                    className="w-full lg:w-auto bg-blue-600 hover:bg-slate-900 text-white font-black px-12 py-6 rounded-[2rem] shadow-xl shadow-blue-200 hover:shadow-slate-200 transition-all active:scale-95 uppercase tracking-[0.2em] text-[11px]"
                                >
                                    Confirm Slot
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="mt-24 text-center pb-12">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">Developed by Team Vortex • B.Tech CSE 2026</p>
            </footer>
        </div>
    );
}
// build trigger
