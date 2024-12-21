import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Home, LogOut, LogIn, ShoppingBag, InfoIcon } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileSidePanelOpen, setIsMobileSidePanelOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await firebase.logout();
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Logout failed');
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
        <nav className="bg-gradient-to-r from-orange-500 to-orange-600 fixed w-full p-4 shadow-lg z-50">
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
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo or Brand Name */}
                <div className="text-white font-bold text-xl flex items-center space-x-2">
                    <BookOpen size={28} className="text-white" />
                    <Link to="/">PageParadise</Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button 
                        onClick={toggleMobileSidePanel} 
                        className="text-white hover:bg-orange-700 p-2 rounded-full transition-colors"
                    >
                        {isMobileSidePanelOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="text-white hover:text-orange-200 flex items-center space-x-2 transition-colors">
                        <Home size={18} />
                        <span>Home</span>
                    </Link>
                    <Link to="/Book/AddBook" className="text-white hover:text-orange-200 flex items-center space-x-2 transition-colors">
                        <BookOpen size={18} />
                        <span>Add Books</span>
                    </Link>
                    <Link to="/about" className="text-white hover:text-orange-200 flex items-center space-x-2 transition-colors">
                    <InfoIcon size={18} />
                    <span>About</span>
                    </Link>
                    <Link to="/cart" className="text-white hover:text-orange-200 flex items-center space-x-2 transition-colors">
                    <ShoppingBag size={18} />
                    <span>Cart</span>
                    </Link>
                </div>

                {/* User Profile & Logout */}
                <div className="hidden md:block relative">
                    {firebase.isLoggedin ? (
                        <div className="relative">
                            <button 
                                onClick={toggleDropdown} 
                                className="text-white flex items-center space-x-2 hover:bg-orange-700 p-2 rounded-full transition-colors"
                            >
                                <div className='first-letter:capitalize bg-orange-400 border-2 w-8 h-8 rounded-full flex items-center justify-center'>
                                    {firebase.user.email[0].toUpperCase()}
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-orange-100">
                                    <div className="p-4 border-b">
                                        <p className="text-orange-700 font-semibold">{firebase.user.displayName || 'User'}</p>
                                        <p className="text-orange-500 text-sm">{firebase.user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left py-3 px-4 text-orange-700 hover:bg-orange-100 flex items-center space-x-2"
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-white hover:text-orange-200 flex items-center space-x-2">
                                <LogIn size={18} />
                                <span>Login</span>
                            </Link>
                           
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
                        <div className="p-4 border-b bg-orange-50">
                            <button 
                                onClick={toggleMobileSidePanel} 
                                className="text-orange-600 absolute top-4 right-4"
                            >
                                <X size={24} />
                            </button>
                            {firebase.isLoggedin && (
                                <div className="mb-4">
                                    <p className="text-orange-700 font-semibold">{firebase.user.displayName || 'User'}</p>
                                    <p className="text-orange-500 text-sm">{firebase.user.email}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4 space-y-4">
                            <Link 
                                to="/" 
                                className=" text-orange-700 hover:bg-orange-100 p-2 rounded flex items-center space-x-2"
                                onClick={toggleMobileSidePanel}
                            >
                                <Home size={18} />
                                <span>Home</span>
                            </Link>
                            <Link 
                                to="/Book/AddBook" 
                                className=" text-orange-700 hover:bg-orange-100 p-2 rounded flex items-center space-x-2"
                                onClick={toggleMobileSidePanel}
                            >
                                <BookOpen size={18} />
                                <span>Add Books</span>
                            </Link>
                            <Link 
                                to="/about" 
                                className=" text-orange-700 hover:bg-orange-100 p-2 rounded  flex items-center space-x-2"
                                onClick={toggleMobileSidePanel}
                            >
                                <InfoIcon size={18} />
                                <span>About</span>
                            </Link>
                            <Link 
                                to="/cart" 
                                className=" text-orange-700 hover:bg-orange-100 p-2 rounded  flex items-center space-x-2"
                                onClick={toggleMobileSidePanel}
                            >
                                <ShoppingBag size={18} />
                                <span>Cart</span>
                            </Link>
                            {firebase.isLoggedin ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        toggleMobileSidePanel();
                                    }}
                                    className="w-full text-left text-orange-700 hover:bg-orange-100 p-2 rounded flex items-center space-x-2"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <>
                                    <Link 
                                        to="/login" 
                                        className=" text-orange-700 hover:bg-orange-100 p-2 rounded flex items-center space-x-2"
                                        onClick={toggleMobileSidePanel}
                                    >
                                        <LogIn size={18} />
                                        <span>Login</span>
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