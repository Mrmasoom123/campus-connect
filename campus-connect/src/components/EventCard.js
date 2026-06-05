'use client';

export default function EventCard({ event, onJoin }) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Event</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {event.title}
                    </h3>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed italic">
                        {event.description}
                    </p>
                    <div className="flex gap-4 mt-4">
                        <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-lg uppercase">
                            📍 {event.location}
                        </span>
                        <span className="text-[10px] font-black bg-gray-50 text-gray-600 px-3 py-1 rounded-lg uppercase">
                            📅 {new Date(event.eventDate).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => onJoin(event.id)}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest text-[10px]"
                >
                    Confirm Slot
                </button>
            </div>
        </div>
    );
}