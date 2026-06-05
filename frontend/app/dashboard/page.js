'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardGate() {
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem('userRole');

        // Logical Path Mapping
        if (role === 'STUDENT') {
            router.replace('/dashboard/student');
        } else if (role === 'FACULTY') {
            router.replace('/dashboard/faculty');
        } else {
            router.replace('/login');
        }
    }, [router]);

    return (
        <div className="h-screen bg-slate-950 flex items-center justify-center">
            <div className="animate-pulse text-blue-500 font-black tracking-widest text-xs">
                MAPPING VORTEX_PATH...
            </div>
        </div>
    );
}