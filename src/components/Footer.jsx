import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  CreditCard, 
  Truck, 
  Shield, 
  RefreshCcw, 
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  GitHub
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Implementation for newsletter subscription would go here
    alert(`Thanks for subscribing with: ${email}`);
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-orange-600 to-orange-700 text-white pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen size={24} />
              <h3 className="text-xl font-bold">PageParadise</h3>
            </div>
            <p className="text-orange-100 mb-4">
              Your one-stop destination for all types of books. Discover new worlds, 
              gain knowledge, and find your next favorite read with us.
            </p>
            <div className="flex space-x-4">
              <a href="/" className="text-white hover:text-orange-200 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="/" className="text-white hover:text-orange-200 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="/" className="text-white hover:text-orange-200 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-orange-500 pb-2">
              Our Policies
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-orange-100 hover:text-white flex items-center space-x-2 transition-colors">
                  <CreditCard size={16} />
                  <span>Pricing Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-orange-100 hover:text-white flex items-center space-x-2 transition-colors">
                  <Truck size={16} />
                  <span>Shipping Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-orange-100 hover:text-white flex items-center space-x-2 transition-colors">
                  <FileText size={16} />
                  <span>Terms and Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-orange-100 hover:text-white flex items-center space-x-2 transition-colors">
                  <Shield size={16} />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-orange-100 hover:text-white flex items-center space-x-2 transition-colors">
                  <RefreshCcw size={16} />
                  <span>Cancellation/Refund Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-orange-500 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-orange-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Book/AddBook" className="text-orange-100 hover:text-white transition-colors">
                  Add Books
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-orange-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-orange-100 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-orange-100 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <a href="/" className="text-orange-100 hover:text-white flex items-center space-x-1 transition-colors">
                  <span>Blog</span>
                  <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-orange-500 pb-2">
              Stay Updated
            </h3>
            <p className="text-orange-100 mb-4">
              Subscribe to our newsletter for the latest book releases, promotions, and reading recommendations.
            </p>
            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-800"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-800 hover:bg-orange-900 px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="text-orange-100">
              <div className="flex items-start space-x-2 mb-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>+91 7558565929</span>
              </div>
              <div className="flex items-start space-x-2 mb-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>piyushkrishna113@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Palghar, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Copyright */}
        <div className="pt-8 border-t border-orange-500 text-center text-orange-200">
          <p>&copy; {currentYear} PageParadise. All rights reserved.</p>
          <p className="text-sm mt-1">
            Made with <span className="text-red-300">♥</span> for book lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;