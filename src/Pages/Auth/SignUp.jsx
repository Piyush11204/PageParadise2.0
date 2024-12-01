import React, { useState, useEffect } from 'react';
import { useFirebase } from '../../context/firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (firebase.isLoggedin) {
            navigate('/');
        }
    }, [firebase, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await firebase.signupUserWithEmailAndPassword(email, password);
            console.log('Signed up:', result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-purple-700 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign Up for PageParadise</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Create Account
                    </button>
                </form>
                <div className="flex items-center justify-center space-x-4 mt-6">
                    <h2 className="text-sm text-gray-600">OR</h2>
                </div>
                <button
                    onClick={firebase.googleLogin}
                    className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Sign Up with Google
                </button>
                <p className="mt-4 text-center text-gray-600">Already have an account? <a href="/login" className="text-purple-500 hover:underline">Login</a></p>
            </div>
        </div>
    );
}

export default SignUp;
