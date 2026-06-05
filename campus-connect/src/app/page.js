'use client';
import { useState, useEffect } from 'react';
import API from '../api'; // Use your Axios helper instance

export default function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // This hits http://localhost:8080/api/events via your API.js config
                const res = await API.get('/events');
                setEvents(res.data);
            } catch (err) {
                console.error("Dashboard Sync Error:", err.response?.status || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div className="min-h-screen bg-gray-100 p-10 text-center">Initializing Campus Vortex...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-10 font-sans">
            <h1 className="text-4xl font-black text-blue-900 mb-10 text-center uppercase tracking-tighter">Campus Vortex</h1>
            <div className="max-w-4xl mx-auto grid gap-6">
                {events.length > 0 ? (
                    events.map(event => (
                        <div key={event.id} className="bg-white p-6 rounded-3xl shadow-xl border-l-8 border-blue-600 transform hover:scale-[1.02] transition-all">
                            <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
                            <p className="text-gray-500 mt-2">{event.description}</p>
                            <div className="mt-6 flex justify-between items-center text-sm font-bold text-blue-700">
                                <span className="bg-blue-50 px-4 py-1.5 rounded-full">📍 {event.location}</span>
                                <span className="bg-blue-50 px-4 py-1.5 rounded-full">📅 {new Date(event.eventDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400">No active events found on the radar.</p>
                )}
            </div>
        </div>
    );
}