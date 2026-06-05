'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 1. Pointing to your specific LoginController endpoint
            const res = await axios.post('http://localhost:8080/api/auth/login', {
                email, // Maps to loginData.get("email") in Java
                password
            });

            if (res.data.status === "success") {
                // 2. Map response keys exactly as defined in your LoginController
                const { role, username, userId, impactScore } = res.data;

                localStorage.setItem('userRole', role);
                localStorage.setItem('username', username);
                localStorage.setItem('userId', userId);
                localStorage.setItem('impactScore', impactScore);

                // 3. Routing logic based on your UserRole enum
                if (role === 'FACULTY') {
                    router.push('/dashboard/faculty');
                } else if (role === 'STUDENT') {
                    router.push('/dashboard/student');
                } else {
                    alert("Vortex Access Restricted to Students & Faculty.");
                }
            }
        } catch (err) {
            console.error("Vortex Login Error:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Invalid Email or Secret Key.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
            <div className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                        Campus <span className="text-blue-600">Vortex</span>
                    </h2>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Authentication Required</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="College Email"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-slate-900"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Secret Key"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-slate-900"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all uppercase tracking-widest text-[10px]"
                    >
                        Enter the Vortex →
                    </button>
                </form>
            </div>
        </div>
    );
}