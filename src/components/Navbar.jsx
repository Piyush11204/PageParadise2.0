import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileSidePanelOpen, setIsMobileSidePanelOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await firebase.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const toggleMobileSidePanel = () => {
        setIsMobileSidePanelOpen(!isMobileSidePanelOpen);
    }

    return (
        <nav className="bg-purple-600 fixed w-full p-4">
            <div className="max-w-7xl  mx-auto flex justify-between items-center">
                {/* Logo or Brand Name */}
                <div className="text-white font-bold text-lg">
                    <Link to="/">PageParadise</Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button 
                        onClick={toggleMobileSidePanel} 
                        className="text-white"
                    >
                        {isMobileSidePanelOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/Book/AddBook" className="text-white hover:text-gray-300">Add Books</Link>
                    <Link to="/about" className="text-white hover:text-gray-300">About</Link>
                </div>

                {/* User Profile & Logout */}
                <div className="hidden md:block relative">
                    {firebase.isLoggedin ? (
                        <div className="relative">
                            <button onClick={toggleDropdown} className="text-white flex items-center space-x-2">
                                <div className='first-letter:capitalize bg-purple-400 border-2 w-8 h-8 rounded-full flex items-center justify-center'>
                                    {firebase.user.email[0].toUpperCase()}
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                                    <div className="p-2">
                                        <p className="text-gray-700">Hello, {firebase.user.displayName}</p>
                                        <p className="text-gray-500 text-sm">{firebase.user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                            <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Side Panel */}
            {isMobileSidePanelOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div 
                        className="absolute inset-0 bg-black opacity-50" 
                        onClick={toggleMobileSidePanel}
                    ></div>
                    <div className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out">
                        <div className="p-4 border-b">
                            <button 
                                onClick={toggleMobileSidePanel} 
                                className="text-gray-600 absolute top-4 right-4"
                            >
                                <X size={24} />
                            </button>
                            {firebase.isLoggedin && (
                                <div className="mb-4">
                                    <p className="text-gray-700 font-semibold">Hello, {firebase.user.displayName}</p>
                                    <p className="text-gray-500 text-sm">{firebase.user.email}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4 space-y-4">
                            <Link 
                                to="/home" 
                                className="block text-gray-700 hover:bg-gray-100 p-2 rounded"
                                onClick={toggleMobileSidePanel}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/Book/AddBook" 
                                className="block text-gray-700 hover:bg-gray-100 p-2 rounded"
                                onClick={toggleMobileSidePanel}
                            >
                                Add Books
                            </Link>
                            <Link 
                                to="/about" 
                                className="block text-gray-700 hover:bg-gray-100 p-2 rounded"
                                onClick={toggleMobileSidePanel}
                            >
                                About
                            </Link>
                            {firebase.isLoggedin ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        toggleMobileSidePanel();
                                    }}
                                    className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link 
                                        to="/login" 
                                        className="block text-gray-700 hover:bg-gray-100 p-2 rounded"
                                        onClick={toggleMobileSidePanel}
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/signup" 
                                        className="block text-gray-700 hover:bg-gray-100 p-2 rounded"
                                        onClick={toggleMobileSidePanel}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;