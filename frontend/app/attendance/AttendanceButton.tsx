"use client";
import { useState } from 'react';
import { markAttendance } from '../services/attendanceService';

export default function RadarScanner() {
  const [isScanning, setIsScanning] = useState(false);

  const handleRadarPing = () => {
    setIsScanning(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const result = await markAttendance(latitude, longitude, "Promit");

      alert(result.message);
      setIsScanning(false);
    }, () => {
      alert("GPS Signal Obstructed!");
      setIsScanning(false);
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <div className="relative">
        {/* The Pulsing Ripple Effect */}
        {isScanning && (
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
        )}

        <button
          onClick={handleRadarPing}
          disabled={isScanning}
          className={`relative z-10 w-32 h-32 rounded-full border-4 flex items-center justify-center font-bold transition-all
            ${isScanning ? 'border-green-400 bg-black text-green-400' : 'border-blue-500 bg-blue-600 text-white shadow-lg'}`}
        >
          {isScanning ? "SCANNING..." : "START RADAR"}
        </button>
      </div>
      <p className="text-sm text-gray-400 uppercase tracking-widest">Campus Vortex v1.0</p>
    </div>
  );
}