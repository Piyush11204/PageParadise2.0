import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await firebase.logout(); // Assuming you have a logout method in the Firebase context
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <nav className="bg-purple-600 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo or Brand Name */}
                <div className="text-white font-bold text-lg">
                    <a href="/">PageParadise</a>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/Book/AddBook" className="text-white hover:text-gray-300">Add Books</Link>
                    <Link to="/about" className="text-white hover:text-gray-300">About</Link>
                </div>

                {/* User Profile & Logout */}
                <div className="relative">
                    {firebase.isLoggedin ? (
                        <div className="relative">
                            {/* Dropdown button */}
                            <button onClick={toggleDropdown} className="text-white flex items-center space-x-2">
                                 <h1 className='first-letter:capitalize bg-purple-400  border-2 w-8 h-8 rounded-full '><p className=' text-[22px] mb-5 '>{firebase.user.email[0]}</p></h1>
                                {/* <span>{firebase.user.displayName}</span>
                                <span>{firebase.user.email}</span> */}
                               
                               
                            </button>

                            {/* Dropdown menu */}
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
        </nav>
    );
}

export default Navbar;
