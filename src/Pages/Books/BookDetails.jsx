import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import {Heart} from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-red-600 text-xl bg-white p-6 rounded-lg shadow-md">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-md overflow-hidden">
        {/* Book Header */}
        <div className="bg-orange-500 text-white p-6">
          <h1 className="text-4xl font-bold mb-2">{book.name}</h1>
        </div>

        {/* Book Details Container */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Book Image */}
          <div className="flex flex-col items-center">
            {book.image ? (
              <div className="relative group">
                <img
                  src={`data:image/jpeg;base64,${book.image}`}
                  alt={book.name}
                  className="w-96 h-[500px] object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <button 
                  onClick={() => setLiked(!liked)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                >
                  <Heart 
                    className={`${liked ? 'text-red-500 fill-current' : 'text-gray-400'} transition-colors`} 
                  />
                </button>
              </div>
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-xl">
                No Image Available
              </div>
            )}
          </div>

          {/* Book Information */}
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-amber-950 mb-2">Book Details</h2>
              <div className="space-y-2">
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Price:</strong> ₹{book.price}.00</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
