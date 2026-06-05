"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function FacultyDashboard() {
    const [appointments, setAppointments] = useState([]);

    const fetchAppts = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8080/api/appointments/all');
            setAppointments(res.data);
        } catch (err) { console.error("Fetch Error:", err); }
    };

    useEffect(() => { fetchAppts(); }, []);

    const handleAction = async (id, status) => {
        try {
            await axios.patch(`http://127.0.0.1:8080/api/appointments/${id}/status?status=${status}`);
            fetchAppts();
        } catch (err) { alert("Failed to update status."); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this record?")) {
            try {
                await axios.delete(`http://127.0.0.1:8080/api/appointments/${id}`);
                fetchAppts();
            } catch (err) { alert("Delete failed!"); }
        }
    };

    return (
        <div className="p-8 bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-5xl mx-auto mb-10">
                <h1 className="text-4xl font-black text-indigo-950 tracking-tight">Faculty Approval Desk</h1>
                <p className="text-indigo-400 font-medium">Manage and review student meeting requests</p>
            </motion.div>

            <div className="grid gap-6 max-w-5xl mx-auto">
                <AnimatePresence>
                    {appointments.map((appt, index) => (
                        <motion.div
                            key={appt.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/70 backdrop-blur-md p-6 rounded-[2rem] shadow-xl shadow-indigo-100/50 flex justify-between items-center border border-white hover:border-indigo-200 transition-all group"
                        >
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{appt.studentName}</h2>
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-widest">{appt.communityName}</span>
                                </div>
                                <p className="text-gray-500 font-medium flex items-center gap-2">
                                    <span className="text-indigo-400">📍 Room {appt.roomNo}</span> • <span className="text-xs">{new Date(appt.appointmentTime).toLocaleString()}</span>
                                </p>
                                <div className="mt-4 bg-white/50 p-4 rounded-2xl border border-dashed border-indigo-100 text-gray-600 italic">"{appt.reason}"</div>
                            </div>

                            <div className="flex flex-col gap-3 min-w-[200px] ml-8 border-l border-indigo-50 pl-8">
                                <div className={`text-center py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${appt.status === 'APPROVED' ? 'bg-green-100 text-green-700' : appt.status === 'DECLINED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {appt.status || 'PENDING'}
                                </div>
                                <div className="flex gap-2">
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAction(appt.id, 'APPROVED')} className="flex-1 py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-200">Approve</motion.button>
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAction(appt.id, 'DECLINED')} className="flex-1 py-3 bg-white border border-gray-200 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-50">Reject</motion.button>
                                    <button onClick={() => handleDelete(appt.id)} className="p-3 text-red-400 hover:text-red-600 transition-colors">🗑️</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}