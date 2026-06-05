"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function BookAppointment() {
    const [formData, setFormData] = useState({
        studentName: '', facultyName: '', communityName: '',
        roomNo: '', appointmentTime: '', reason: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/appointments/book', formData);
            alert("✨ Request Sent Successfully!");
            setFormData({ studentName: '', facultyName: '', communityName: '', roomNo: '', appointmentTime: '', reason: '' });
        } catch (err) { alert("Connection Error. Check Spring Boot!"); }
    };

    return (
        <div className="p-10 flex justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen items-center">
            <motion.form
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-2xl w-full max-w-md space-y-5 border border-white"
            >
                <div className="text-center space-y-1">
                    <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Schedule Meeting</h2>
                    <p className="text-gray-400 text-sm font-medium">Reserve your slot with faculty</p>
                </div>

                <div className="space-y-4">
                    <input className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-400 transition-all outline-none" placeholder="Student Name" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} required />
                    <div className="flex gap-3">
                        <input className="w-1/2 p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-400 transition-all outline-none" placeholder="Faculty" value={formData.facultyName} onChange={e => setFormData({...formData, facultyName: e.target.value})} required />
                        <input className="w-1/2 p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-400 transition-all outline-none" placeholder="Room" value={formData.roomNo} onChange={e => setFormData({...formData, roomNo: e.target.value})} required />
                    </div>
                    <input type="datetime-local" className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-400 transition-all outline-none text-gray-500" value={formData.appointmentTime} onChange={e => setFormData({...formData, appointmentTime: e.target.value})} required />
                    <textarea className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-400 transition-all outline-none h-28 resize-none" placeholder="Purpose of meeting..." value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} required />
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all">
                    Confirm Appointment
                </motion.button>
            </motion.form>
        </div>
    );
}