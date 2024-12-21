import React from 'react';
import { useFirebase } from '../../context/firebase';
import { Trash2, MinusCircle, PlusCircle, } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, isLoggedin } = useFirebase();

  if (!isLoggedin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view your cart</p>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600">Start shopping to add items to your cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.book.id} className="p-6 flex flex-col sm:flex-row gap-6">
                {/* Book Image */}
                <div className="w-full sm:w-32 h-48 sm:h-36 flex-shrink-0">
                  {item.book.image ? (
                    <img
                      src={`data:image/jpeg;base64,${item.book.image}`}
                      alt={item.book.name}
                      className="w-full h-full object-cover rounded-lg"
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
                  <p className="text-orange-600 font-semibold mt-2">₹{item.book.price}.00</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      onClick={() => updateCartItemQuantity(item.book.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MinusCircle size={20} />
                    </button>
                    <span className="text-gray-800 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item.book.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <PlusCircle size={20} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.book.id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800 font-semibold">₹{calculateTotal()}.00</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800 font-semibold">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-xl font-bold text-orange-600">₹{calculateTotal()}.00</span>
              </div>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg mt-6 transition-colors duration-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;