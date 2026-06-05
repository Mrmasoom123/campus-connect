"use client";
import { useState } from 'react';

export const useGeolocation = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCoordinates = (): Promise<{ lat: number; lng: number } | null> => {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                setError("GEOLOCATION_NOT_SUPPORTED");
                resolve(null);
                return;
            }

            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setLocation(coords);
                    setLoading(false);
                    resolve(coords);
                },
                (err) => {
                    setError(err.message);
                    setLoading(false);
                    resolve(null);
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        });
    };

    return { location, getCoordinates, error, loading };
};