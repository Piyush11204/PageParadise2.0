import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { Heart, BookOpen, Share2, ShoppingCart, CreditCard } from "lucide-react";

const BookDetails = () => {
  const { bookId } = useParams();
  const {firebase , user} = useFirebase();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
   const [orderSuccess, setOrderSuccess] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
      };
      document.body.appendChild(script);
    };

    loadRazorpay();
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      const razorpayScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (razorpayScript) {
        document.body.removeChild(razorpayScript);
      }
    };
  }, []);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const bookDetails = await firebase.fetchBookById(bookId);
        setBook(bookDetails);
      } catch (err) {
        setError("Failed to fetch book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [firebase, bookId]);

  const handleAddToCart = async () => {
    try {
      await firebase.addToCart(bookId, 1);
      // Add some success notification here
    } catch (error) {
      // Handle error
      console.error("Error adding to cart:", error);
    }
  };

  const handlePayment = async () => {
    if (!book) return;
    
    try {
      setPaymentProcessing(true);
      
      if (!razorpayLoaded) {
        alert("Payment gateway is still loading. Please try again in a few seconds.");
        setPaymentProcessing(false);
        return;
      }
    
      // Replace with your Razorpay key ID
      const options = {
        key: "rzp_test_EjQc1EWnjKqegB", // Replace with your actual key
        amount: book.price * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "PageParadise",
        description: `Purchase of ${book.name}`,
        image: "https://your-logo-url.png", // Replace with your logo URL
        // order_id: orderId, // In production, use the order ID from your backend
        handler: function (response) {
          // Handle successful payment
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          // You can call your backend to verify the payment and update order status
          // verifyPayment(response);
          setPaymentProcessing(false);
          setOrderSuccess(true);
        },
        prefill: {
          name : user.displayName,
          email : user.email,
          contact : user.phoneNumber || "9822362516"
          
        },
        notes: {
          bookId: bookId
        },
        theme: {
          color: "#f97316" // Orange color matching your UI
        },
        modal: {
          ondismiss: function() {
            setPaymentProcessing(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentProcessing(false);
      alert("Payment failed. Please try again later.");
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="text-xl text-purple-600 flex items-center space-x-3">
          <div className="animate-spin">🌀</div>
          <span>Loading book details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg shadow-md max-w-2xl mx-auto">
          {error}
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500 text-xl">Book not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
      <div className="max-w-7xl mt-10 mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Image */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="relative group">
                {book.image ? (
                  <img
                    src={`data:image/jpeg;base64,${book.image}`}
                    alt={book.name}
                    className="w-full rounded-xl shadow-xl object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <button 
                  onClick={() => setLiked(!liked)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart 
                    className={`${liked ? 'text-red-500 fill-current' : 'text-gray-400'} transition-colors`}
                    size={24}
                  />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-4">
                <button 
                  onClick={handlePayment}
                  disabled={paymentProcessing || !razorpayLoaded}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition-colors duration-200 disabled:bg-green-600  disabled:cursor-not-allowed"
                >
                  {paymentProcessing ? (
                    <>
                      <div className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : !razorpayLoaded ? (
                    <>
                      <div className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2" />
                      Buy Now - ₹{book.price}.00
                    </>
                  )}
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 py-4 rounded-lg text-lg font-semibold flex items-center justify-center border-2 border-gray-200 transition-colors duration-200"
                >
                  <ShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:w-2/3 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {book.category}
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <h1 className="text-4xl font-bold mt-2 text-gray-900">{book.name}</h1>
              <p className="text-xl text-gray-600 mt-2">by {book.author}</p>
            </div>

            {/* Book Details Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-lg mb-2">Publication Details</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Publisher: {book.Publisher || 'Not Available'}</p>
                  <p>Language: {book.Languages || 'Not Available'}</p>
                  <p>Pages: {book.Pages || 'Not Available'}</p>
                  <p>ISBN: {book.ISBN || 'Not Available'}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-lg mb-2">Additional Info</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Format: {book.format || 'Paperback'}</p>
                  <p>Publication Date: {book.publicationDate || 'Not Available'}</p>
                  <p>Edition: {book.edition || 'First Edition'}</p>
                  <p>Weight: {book.weight || 'Not Available'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4">About this Book</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>

            {/* Features or Highlights */}
            {book.highlights && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {book.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
              {book.reviews ? (
                <div className="space-y-4">
                  {book.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex text-yellow-400">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;