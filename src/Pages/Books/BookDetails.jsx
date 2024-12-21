import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { Heart, BookOpen, Share2, ShoppingCart, CreditCard } from "lucide-react";

const BookDetails = () => {
  const { bookId } = useParams();
  const firebase = useFirebase();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);

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
      <div className="max-w-7xl mx-auto">
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
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition-colors duration-200"
                >
                  <CreditCard className="mr-2" />
                  Buy Now - ₹{book.price}.00
                </button>
                <button onClick={handleAddToCart}
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
                  <p>Publisher: {book.publisher || 'Not Available'}</p>
                  <p>Language: {book.language || 'Not Available'}</p>
                  <p>Pages: {book.pages || 'Not Available'}</p>
                  <p>ISBN: {book.isbn || 'Not Available'}</p>
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