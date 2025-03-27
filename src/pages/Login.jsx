import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, LogIn } from 'lucide-react'

const Login = () => {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // Credentials from .env (also shown in comments for ease of testing)
    // User ID: CSEfac101
    // Password: TeachMate2024!

    const handleLogin = (e) => {
        e.preventDefault()
        setError('')

        // Get credentials from environment variables
        const validUserId = import.meta.env.VITE_USER_ID
        const validPassword = import.meta.env.VITE_USER_PASSWORD

        if (userId === validUserId && password === validPassword) {
            // Store authentication state (you might want to use a more secure method later)
            localStorage.setItem('isAuthenticated', 'true')
            navigate('/')
        } else {
            setError('Invalid User ID or Password')
        }
    }

    return (
        <div className="min-h-screen   flex items-center justify-center px-4 py-8">
            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-md">
                <div className="p-8 bg-white">
                    <div className="text-center mb-4">
                        <img
                            src="/Teachmate-logo.png"
                            alt="TeachMate Logo"
                            className="mx-auto h-24 w-24 mb-4 rounded-full ring-4 ring-blue-200"
                        />
                        <h1 className="text-3xl font-bold text-gray-800">TeachMate</h1>
                        <p className="text-gray-500 mt-2">Educational Management System</p>
                    </div>
                    <div className="mb-6 text-center">
                        <p className="text-blue-500 text-sm">
                            Id : CSEfac101 <br />
                            Password : TeachMate2024! <br />
                        </p>

                        <p className='text-gray-500 text-sm mt-2'> Keep Patience software might take time to load due to server issues</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="text-gray-400 h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="User ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-700 border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="text-gray-400 h-5 w-5" />
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 text-gray-700  rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2"
                        >
                            <LogIn className="h-5 w-5" />
                            <span>Login</span>
                        </button>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default Login
