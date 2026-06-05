"use client";
import { useEffect, useState } from 'react';

export default function AdminLogs() {
    const [logs, setLogs] = useState([]);

    const fetchLogs = () => {
        fetch('http://localhost:8080/api/admin/log')
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setLogs([...data].reverse());
                } else {
                    setLogs([]);
                }
            })
            .catch(err => {
                console.error("Error fetching logs:", err);
                setLogs([]);
            });
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Campus Vortex: Audit Logs</h1>
                    <button onClick={fetchLogs} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Refresh Data</button>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                            <tr>
                                <th className="p-4">Student</th>
                                <th className="p-4">Timestamp</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Distance (m)</th>
                                <th className="p-4">Check Out</th>
                                <th className="p-4">Duration</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50">
                                    {/* Maps to @JsonProperty("student_name") */}
                                    <td className="p-4 font-semibold text-slate-700">{log.student_name || 'N/A'}</td>

                                    {/* Maps to @JsonProperty("timestamp") */}
                                    <td className="p-4 text-slate-500">
                                        {log.timestamp ? new Date(log.timestamp).toLocaleString() : '---'}
                                    </td>

                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            log.status === 'VERIFIED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {log.status}
                                        </span>
                                    </td>

                                    {/* Maps to @JsonProperty("distance_m") */}
                                    <td className="p-4 font-mono text-slate-500">
                                        {log.distance_m != null ? `${Math.round(log.distance_m)}m` : '0m'}
                                    </td>

                                    {/* Maps to @JsonProperty("check_out_time") */}
                                    <td className="p-4 text-slate-500">
                                        {log.check_out_time ? new Date(log.check_out_time).toLocaleString() : '---'}
                                    </td>

                                    {/* Maps to @JsonProperty("total_minutes") */}
                                    <td className="p-4 text-slate-700 font-medium">
                                        {log.total_minutes ? `${log.total_minutes} mins` : 'In Session'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}