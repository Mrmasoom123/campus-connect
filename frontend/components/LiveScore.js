"use client";

import { useState, useEffect } from 'react';

export default function LiveScore({ matchId }) {
    const [match, setMatch] = useState(null);
    const [error, setError] = useState(false);

    // Function to get the latest data from Spring Boot
    const fetchScore = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/matches/live/${matchId}`);
            if (!res.ok) throw new Error("Match not found");
            const data = await res.json();
            setMatch(data);
            setError(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(true);
        }
    };

    // Auto-refresh every 3 seconds
    useEffect(() => {
        const timer = setInterval(fetchScore, 3000);
        fetchScore();
        return () => clearInterval(timer);
    }, [matchId]);

    // Send updates (Goals or Ending Match)
    const sendUpdate = async (t1Add, t2Add, finishedStatus) => {
        const newT1 = (match?.team1Score || 0) + t1Add;
        const newT2 = (match?.team2Score || 0) + t2Add;

        await fetch(`http://localhost:8080/api/matches/update/${matchId}?t1=${newT1}&t2=${newT2}&finished=${finishedStatus}`, {
            method: 'POST'
        });
        fetchScore();
    };

    // Reset Match to 0-0 and restart
    const resetMatch = async () => {
        await fetch(`http://localhost:8080/api/matches/update/${matchId}?t1=0&t2=0&finished=false`, {
            method: 'POST'
        });
        fetchScore();
    };

    if (error) return <div className="text-red-500 text-center p-4 bg-white rounded-xl shadow">⚠️ Match ID {matchId} not found in Database</div>;
    if (!match) return <div className="text-center p-4 animate-pulse">Connecting to Stadium Feed...</div>;

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-3xl shadow-2xl border-b-4 border-blue-600">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest ${match.finished ? 'bg-gray-700' : 'bg-red-600 animate-pulse'}`}>
                    {match.finished ? 'MATCH ENDED' : '• LIVE'}
                </span>
                <span className="text-gray-500 text-xs font-mono">ID: #{match.id}</span>
            </div>

            {/* Scoreboard */}
            <div className="flex justify-around items-center mb-8">
                <div className="text-center">
                    <p className="text-xs text-blue-400 font-bold mb-2 uppercase">CSE</p>
                    <p className="text-6xl font-black">{match.team1Score}</p>
                </div>
                <div className="text-4xl font-thin text-gray-700">:</div>
                <div className="text-center">
                    <p className="text-xs text-green-400 font-bold mb-2 uppercase">ECE</p>
                    <p className="text-6xl font-black">{match.team2Score}</p>
                </div>
            </div>

            {/* Admin Controls - Only shown while match is active */}
            {!match.finished ? (
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => sendUpdate(1, 0, false)} className="bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold text-sm transition-all active:scale-95">
                            + CSE GOAL
                        </button>
                        <button onClick={() => sendUpdate(0, 1, false)} className="bg-green-600 hover:bg-green-500 py-3 rounded-xl font-bold text-sm transition-all active:scale-95">
                            + ECE GOAL
                        </button>
                    </div>
                    <button onClick={() => sendUpdate(0, 0, true)} className="w-full bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest">
                        End Match
                    </button>
                </div>
            ) : (
                /* Post-Match Section */
                <div className="mt-4 pt-4 border-t border-gray-800 text-center animate-fadeIn">
                    <p className="text-yellow-400 font-black text-lg mb-4 italic uppercase">
                        🏆 Winner: {match.winnerId === 0 ? "Draw" : (match.winnerId === 1 ? "CSE" : "ECE")}
                    </p>
                    <button
                        onClick={resetMatch}
                        className="w-full bg-white text-black hover:bg-gray-200 py-3 rounded-xl font-black text-xs tracking-widest transition-all uppercase"
                    >
                        New Match / Reset
                    </button>
                </div>
            )}
        </div>
    );
}