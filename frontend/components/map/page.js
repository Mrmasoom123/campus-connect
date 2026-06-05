"use client";
import { useState, useEffect } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import MapComponent from './MapComponent';
import API from '../../api';
import dynamic from 'next/dynamic';
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function Dashboard() {
    const { location, getCoordinates, loading } = useGeolocation();
    const [status, setStatus] = useState("AWAITING INITIALIZATION...");
    const [isVerified, setIsVerified] = useState(false);

    // Effect to check verification status for the UI header
    useEffect(() => {
        const user = localStorage.getItem("username");
        if (user) setIsVerified(true);
    }, []);

    const handleScan = async () => {
        // 1. Resolve Identity: Get the actual logged-in user from storage
        const activeUser = localStorage.getItem("username");

        if (!activeUser) {
            setStatus("DENIED: STUDENT ID IS MISSING!");
            return;
        }

        const coords = await getCoordinates();
        if (!coords || coords.lat === 0) {
            setStatus("ERROR: SIGNAL OBSTRUCTED");
            return;
        }

        setStatus("UPLINKING TO VORTEX...");

        try {
            // 2. FIXED: Included 'username' in the payload to satisfy Java backend
            const res = await API.post('/attendance/mark', {
                username: activeUser,
                latitude: coords.lat,
                longitude: coords.lng
            });

            // 3. Success handling: res.data.message comes from your Java Response
            setStatus(`SUCCESS: ${res.data.message?.toUpperCase() || "VERIFIED"}`);
        } catch (err) {
            // 4. Robust error extraction to show "Out of Range" or "Already Marked"
            const errorMsg = err.response?.data || "OFFLINE";
            setStatus(`DENIED: ${typeof errorMsg === 'string' ? errorMsg.toUpperCase() : "VERIFICATION FAILED"}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-cyan-400 p-6 font-mono selection:bg-cyan-500/30">
            <div className="max-w-5xl mx-auto space-y-6">
                <header className="flex justify-between items-end border-b border-cyan-900 pb-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter text-white">CAMPUS VORTEX</h1>
                        <p className="text-xs opacity-50">NODE: IBS_JAIPUR // V2.0.26</p>
                    </div>
                    <div className="text-right text-[10px]">
                        <p>NETWORK_STATUS: <span className="text-green-500">ENCRYPTED</span></p>
                        {/* UI fix to show if the session is active */}
                        <p>USER_ID: <span className={isVerified ? "text-cyan-400" : "text-red-500"}>
                            {isVerified ? 'VERIFIED' : 'GUEST'}
                        </span></p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded shadow-inner">
                            <h2 className="text-xs font-bold mb-2 text-white">CONTROL_UNIT</h2>
                            <button
                                onClick={handleScan}
                                disabled={loading}
                                className="w-full py-4 border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-bold disabled:opacity-50"
                            >
                                {loading ? "SCANNING..." : "START RADAR SCAN"}
                            </button>
                        </div>
                        <div className="bg-black border border-cyan-900 p-4 h-48 overflow-hidden relative">
                            <h2 className="text-[10px] mb-2 opacity-50">SYSTEM_LOGS:</h2>
                            <p className="text-sm leading-tight italic text-cyan-200">{`> ${status}`}</p>
                            <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-500 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="md:col-span-2 h-[500px] bg-black border border-cyan-500/20 rounded overflow-hidden">
                        {location.lat !== 0 ? (
                            <MapComponent userLat={location.lat} userLng={location.lng} />
                        ) : (
                            <div className="h-full flex items-center justify-center text-sm animate-pulse text-cyan-900">
                                [ OFFLINE: INITIALIZE SCAN TO MAP ]
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}