"use client";
import { useEffect, useState } from 'react';

export default function Leaderboard() {
    const [players, setPlayers] = useState([]);
    const [status, setStatus] = useState("");
    const [distance, setDistance] = useState(null);

    const CAMPUS_LAT = 26.8236; // Updated to match your Spring Boot service
    const CAMPUS_LNG = 75.8652;

    const fetchRankings = () => {
        fetch('http://localhost:8080/api/users/leaderboard')
            .then(res => res.json())
            .then(data => setPlayers(data))
            .catch(err => console.error("Error:", err));
    };

    useEffect(() => {
        fetchRankings();
    }, []);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
    };

    const handleCheckIn = (isSimulated = false, isInside = true) => {
        setStatus("Radar Scanning...");
        const processPosition = (lat, lng) => {
            const dist = calculateDistance(CAMPUS_LAT, CAMPUS_LNG, lat, lng);
            setDistance(Math.round(dist));

            fetch('http://localhost:8080/api/attendance/mark', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: "promit2026",
                    latitude: lat,
                    longitude: lng
                })
            })
            .then(res => res.json())
            .then(data => {
                setStatus(data.success ? `Verified: ${Math.round(dist)}m` : `Denied: ${data.message}`);
                if (data.success) fetchRankings();
            })
            .catch(() => setStatus("Radar offline"));
        };

        if (isSimulated) {
            processPosition(isInside ? 26.8237 : 26.8300, isInside ? 75.8653 : 75.8700);
        } else {
            navigator.geolocation.getCurrentPosition((pos) => {
                processPosition(pos.coords.latitude, pos.coords.longitude);
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-8 uppercase">
                Campus Vortex: Radar Leaderboard
            </h1>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col gap-3">
                    <button onClick={() => handleCheckIn(false)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg">
                        📡 Live Radar Scan
                    </button>
                    <div className="flex gap-2">
                        <button onClick={() => handleCheckIn(true, true)} className="flex-1 bg-slate-100 text-slate-600 text-xs py-2 rounded-lg hover:bg-green-50 transition-colors border border-slate-200">
                            Simulate: On-Campus
                        </button>
                        <button onClick={() => handleCheckIn(true, false)} className="flex-1 bg-slate-100 text-slate-600 text-xs py-2 rounded-lg hover:bg-red-50 transition-colors border border-slate-200">
                            Simulate: Off-Campus
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center border-l border-slate-100 pl-6">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">System Status</p>
                    <p className={`text-sm font-bold ${status.includes('Verified') ? 'text-green-600' : 'text-blue-600'}`}>{status || "Standing By..."}</p>
                    {distance !== null && <p className="text-3xl font-mono font-black text-slate-800 mt-1">{distance}m</p>}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4 text-left">Rank</th>
                            <th className="px-6 py-4 text-left">User</th>
                            <th className="px-6 py-4 text-right">Impact Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {players.map((p, i) => (
                            <tr key={p.id || i} className="hover:bg-blue-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-blue-600">#{i + 1}</td>
                                <td className="px-6 py-4 text-slate-700 font-medium">{p.username || p.student_name}</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-2xl font-bold text-cyan-600 font-mono">
                                        {p.score !== undefined ? p.score : p.impactScore}
                                    </span>
                                    <span className="text-[10px] text-slate-400 ml-1 uppercase">Pts</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}