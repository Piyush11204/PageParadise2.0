import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";
import { Eye, Heart, ShoppingCart } from 'lucide-react';

const BookCard = ({ book }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Book Image */}
            <div className="relative">
                {book.image ? (
                    <img
                        src={`data:image/jpeg;base64,${book.image}`}
                        alt={book.name}
                        className="w-full h-56 object-cover"
                    />
                ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image Available
                    </div>
                )}
                
                {/* Hover Overlay */}
                {isHovered && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4">
                        <button className="text-white bg-purple-600 p-2 rounded-full hover:bg-purple-700">
                            <Eye size={24} />
                        </button>
                        <button className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600">
                            <Heart size={24} />
                        </button>
                        <button className="text-white bg-green-500 p-2 rounded-full hover:bg-green-600">
                            <ShoppingCart size={24} />
                        </button>
                    </div>
                )}
            </div>

            {/* Book Details */}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 truncate max-w-[200px]">
                            {book.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            by {book.author}
                        </p>
                    </div>
                    <span className="text-lg font-bold text-purple-600">
                        ${book.price}
                    </span>
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-600 mr-2">Category:</span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {book.category}
                        </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {book.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const BooksList = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const booksData = await firebase.fetchBooks();
                setBooks(booksData);
            } catch (error) {
                setError("Failed to fetch books. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [firebase]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-pulse text-xl text-purple-600">
                    Loading books...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">
                Discover Our Collection
            </h1>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BooksList;