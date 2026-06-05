'use client';
import "./globals.css";
import Link from 'next/link';
import { useState } from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F3F4F6] text-slate-900 antialiased selection:bg-blue-500/30">
        <div className="flex min-h-screen">

          {/* SIDEBAR NAVIGATION */}
          <aside className="fixed left-0 top-0 h-full w-24 md:w-28 bg-[#2D54C4] flex flex-col items-center py-8 z-[9999] shadow-2xl shadow-blue-900/20">
            {/* LOGO AREA */}
            <Link href="/" className="mb-12 group transition-transform active:scale-90">
               <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <span className="text-white font-black text-xl tracking-tighter">V</span>
               </div>
            </Link>

            {/* NAV LINKS */}
            <div className="flex flex-col gap-8 flex-1 w-full px-2">
              <NavItem href="/" icon="🏠" label="Home" active />

              {/* RADAR HUB DROPDOWN */}
              <NavItem
                icon="🛰️"
                label="Radar"
                isDropdown
                items={[
                  { label: 'Mark Attendance', href: '/components/map' },
                  { label: 'Faculty Inspect', href: '/admin/log' },
                  { label: 'Global Stats', href: '/leaderboard' }
                ]}
              />

              {/* BOND HUB DROPDOWN */}
              <NavItem
                icon="📅"
                label="Bond Hub"
                isDropdown
                items={[
                  { label: 'Book Session', href: '/book' },
                  { label: 'Faculty Portal', href: '/faculty1/dashboard' }
                ]}
              />

              {/* PROFILE DROPDOWN */}
              <NavItem
                icon="👤"
                label="Profile"
                isDropdown
                items={[
                  { label: 'Student Dashboard', href: '/dashboard/student' },
                  { label: 'Faculty Dashboard', href: '/dashboard/faculty' },
                  { label: 'Account Login', href: '/login' }
                ]}
              />
            </div>

            {/* --- NOTIFICATION HUB (Replaced Settings Menu) --- */}
            <NavItem
              icon="🔔"
              label="Alerts"
              isDropdown
              isNotification
              items={[
                { label: '📅 New Event: Java Workshop', type: 'schedule' },
                { label: '📡 Radar: NSS Camp LIVE', type: 'status' },
                { label: '✅ Attendance Confirmed', type: 'success' },
                { label: '🤝 Meeting: Prof. Sharma', type: 'bond' }
              ]}
            />
          </aside>

          {/* MAIN VIEWPORT */}
          <div className="flex-1 ml-24 md:ml-28 flex flex-col">
            <header className="h-20 bg-white border-b border-slate-200 px-8 flex justify-between items-center sticky top-0 z-[999]">
              <h1 className="font-black text-xl uppercase tracking-tight text-slate-800">
                Campus <span className="text-blue-600">Vortex</span>
              </h1>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Node</p>
                    <p className="text-[9px] font-bold text-blue-500">ICFAI University Jaipur</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Promit" alt="User" />
                  </div>
                </div>
              </div>
            </header>

            <main className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

function NavItem({ href, icon, label, active = false, isDropdown = false, isNotification = false, items = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  const content = (
    <div className={`flex flex-col items-center gap-1 group transition-all ${active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all relative ${active ? 'bg-white text-blue-600 shadow-lg' : 'text-white hover:bg-white/10'}`}>
        {icon}
        {isNotification && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-[#2D54C4] rounded-full animate-pulse"></span>}
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest text-white mt-1">
        {label}
      </span>
    </div>
  );

  if (isDropdown) {
    return (
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className="cursor-pointer outline-none border-none bg-transparent">{content}</button>

        {isOpen && (
          <div className={`absolute left-full ml-2 ${isNotification ? 'bottom-0' : 'top-0'} w-56 bg-white rounded-3xl shadow-2xl border border-slate-200 py-4 animate-in slide-in-from-left-2 duration-200 z-[9999]`}>
            {isNotification && <p className="px-5 pb-3 border-b border-slate-50 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Live Pulse alerts</p>}

            <div className="max-h-64 overflow-y-auto">
              {items.map((item, idx) => (
                isNotification ? (
                  <div key={idx} className="px-5 py-3 hover:bg-slate-50 transition-colors cursor-default border-b border-slate-50 last:border-none">
                    <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter leading-tight">{item.label}</p>
                    <p className="text-[9px] font-bold text-blue-500 mt-1 uppercase opacity-70">Just Now</p>
                  </div>
                ) : (
                  <Link
                    key={idx}
                    href={item.href || "#"}
                    className="block px-5 py-3 text-[10px] font-black text-slate-600 hover:text-blue-600 hover:bg-slate-50 uppercase tracking-tighter transition-all"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return <Link href={href}>{content}</Link>;
}