"use client";
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const radarIcon = typeof window !== 'undefined' ? L.divIcon({
    className: 'vortex-radar',
    html: '<div class="ping"></div><div class="core"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
}) : null;

export default function MapComponent({ userLat, userLng }) {
    const campusPosition = [26.8236, 75.8652];

    return (
        <div className="relative h-full w-full border border-cyan-500/30">
            <div className="absolute top-2 right-2 z-[1000] bg-black/60 p-2 text-[10px] font-mono text-cyan-400 backdrop-blur-md">
                LAT: {userLat.toFixed(4)} | LNG: {userLng.toFixed(4)}
            </div>
            <MapContainer center={campusPosition} zoom={18} zoomControl={false} className="h-full w-full">
                <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
                <Circle
                    center={campusPosition}
                    radius={50}
                    pathOptions={{ color: '#00ffee', fillColor: '#00ffee', fillOpacity: 0.1, weight: 1, dashArray: '5, 5' }}
                />
                {userLat !== 0 && (
                    <Marker position={[userLat, userLng]} icon={radarIcon}>
                        <Popup className="vortex-popup">LINK ESTABLISHED</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}