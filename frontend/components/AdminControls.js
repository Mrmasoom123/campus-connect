"use client";

export default function AdminControls({ matchId }) {
    const updateScore = async (t1, t2, isFinished) => {
        try {
            // Logic: Sending data to your Spring Boot @PostMapping
            await fetch(`http://localhost:8080/api/matches/update/${matchId}?t1=${t1}&t2=${t2}&finished=${isFinished}`, {
                method: 'POST',
            });
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    return (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg flex gap-4 justify-center">
            <button onClick={() => updateScore(1, 0, false)} className="bg-blue-600 p-2 rounded">CSE Goal</button>
            <button onClick={() => updateScore(0, 1, false)} className="bg-green-600 p-2 rounded">ECE Goal</button>
            <button onClick={() => updateScore(0, 0, true)} className="bg-red-600 p-2 rounded">End Match</button>
        </div>
    );
}