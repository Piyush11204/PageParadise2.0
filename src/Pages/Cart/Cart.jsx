import React, { useState } from 'react';
import { useFirebase } from '../../context/firebase';
import { Trash2, MinusCircle, PlusCircle, ShoppingBag, CreditCard, Shield } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, isLoggedin, user } = useFirebase();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isLoggedin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view your cart</p>
          <button 
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            onClick={() => window.location.href = '/login'}
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  const calculateTax = () => {
    // Calculate GST (18%)
    return Math.round(calculateSubtotal() * 0.18);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleRazorpayPayment = () => {
    setIsProcessing(true);
    
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      const options = {
        key: "rzp_test_EjQc1EWnjKqegB", // Replace with your actual Razorpay key
        amount: calculateTotal() * 100, // Amount in paisa
        currency: "INR",
        name: "PageParadise",
        description: "Purchase of Books",
        image: "/your-logo.png", // Your company logo
        order_id: "", // This should be generated from your backend
        handler: function(response) {
          // Handle successful payment
          console.log("Payment ID: " + response.razorpay_payment_id);
          console.log("Order ID: " + response.razorpay_order_id);
          console.log("Signature: " + response.razorpay_signature);
          
          // Here you would typically call your backend to verify the payment
          // and update your database
          setIsProcessing(false);
          setOrderSuccess(true);
        },
        prefill: {
        name : user.displayName,
        email : user.email,
        contact : user.phoneNumber || "9822362516"
        
        },
        notes: {
          address: "Customer Address"
        },
        theme: {
          color: "#f97316" // Orange-500 color
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };
      
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    };
    
    script.onerror = () => {
      alert("Failed to load Razorpay. Please try again.");
      setIsProcessing(false);
    };
    
    document.body.appendChild(script);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Order Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your books will be delivered soon.</p>
          <button 
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            onClick={() => window.location.href = '/'}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={24} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <button 
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            onClick={() => window.location.href = '/'}
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <ShoppingBag size={28} className="mr-3 text-orange-500" />
          Your Shopping Cart
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.book.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors duration-200">
                    {/* Book Image */}
                    <div className="w-full sm:w-32 h-48 sm:h-40 flex-shrink-0">
                      {item.book.image ? (
                        <img
                          src={`data:image/jpeg;base64,${item.book.image}`}
                          alt={item.book.name}
                          className="w-full h-full object-cover rounded-lg shadow-sm"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Book Details */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800">{item.book.name}</h3>
                      <p className="text-gray-600">{item.book.author}</p>
                      <p className="text-orange-600 font-bold mt-2">₹{item.book.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4 mt-4">
                        <button
                          onClick={() => updateCartItemQuantity(item.book.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className={`text-gray-500 hover:text-gray-700 ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <MinusCircle size={20} />
                        </button>
                        <span className="text-gray-800 font-medium bg-gray-100 px-4 py-1 rounded">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.book.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <PlusCircle size={20} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          className="ml-auto text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 size={18} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                    <span className="text-gray-800 font-semibold">₹{calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax (GST 18%)</span>
                    <span className="text-gray-800 font-semibold">₹{calculateTax()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-orange-600">₹{calculateTotal()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including all taxes</p>
                </div>
                <button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg mt-6 transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-green-600 disabled:cursor-not-allowed"
                  onClick={handleRazorpayPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      Payment Complete
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Pay with Razorpay
                    </>
                  )}
                </button>
              </div>
              <div className="bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Shield size={14} className="text-gray-400" />
                  <span>Secure Payment Processing by Razorpay</span>
                </div>
                <div className="flex justify-center gap-2">
                  <img src="/visa.svg" alt="Visa" className="h-6" />
                  <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                  <img src="/rupay.svg" alt="RuPay" className="h-6" />
                  <img src="/upi.svg" alt="UPI" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;