import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../app/api';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sending as JSON to match your @RequestBody Java Controller
            const response = await API.post('/auth/login', credentials);

            // Storing the JWT and roles from your Java JwtResponse
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('roles', JSON.stringify(response.data.roles));

            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md shadow-2xl">
                <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Campus Connect</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-2">Username</label>
                    <input
                        type="text" name="username" onChange={handleChange}
                        className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-cyan-500 outline-none"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">Password</label>
                    <input
                        type="password" name="password" onChange={handleChange}
                        className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-cyan-500 outline-none"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-cyan-900/20">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;