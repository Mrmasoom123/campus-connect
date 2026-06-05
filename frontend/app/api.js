import axios from 'axios';

const API = axios.create({
   baseURL: 'https://campus-connect-s0u2.onrender.com/api',
    withCredentials: true,
});

// ADD THIS: The Interceptor
// This automatically attaches your JWT to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchStudentNotifications = (id) => API.get(`/notifications/${id}`);

export default API;