import React, { useState, useEffect } from 'react';
import { useFirebase } from '../../context/firebase';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (firebase.isLoggedin) {
            toast.success('Already logged in, redirecting...');
            navigate('/');
        }
    }, [firebase, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // Password strength check
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }

        try {
            const result = await firebase.signupUserWithEmailAndPassword(email, password);
            toast.success('Account created successfully!');
            console.log('Signed up:', result);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email already in use. Try logging in or use a different email.');
            } else {
                toast.error('Sign up failed. Please try again.');
            }
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-50 to-orange-100 flex justify-center items-center">
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-orange-100">
                <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">Create Account</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-orange-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-orange-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Create a strong password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center justify-center my-6">
                    <div className="border-t border-orange-300 w-full"></div>
                    <span className="px-4 text-orange-500">OR</span>
                    <div className="border-t border-orange-300 w-full"></div>
                </div>
                <button
                    onClick={firebase.googleLogin}
                    className="w-full py-3 bg-white text-orange-600 font-semibold rounded-lg border border-orange-300 hover:bg-orange-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    Sign Up with Google
                </button>
                <p className="mt-6 text-center text-orange-700">
                    Already have an account? 
                    <a href="/login" className="ml-2 text-orange-600 hover:underline font-bold">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;