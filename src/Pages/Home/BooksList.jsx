import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";

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
        return <div className="text-center py-6">Loading books...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Books List</h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                    <div key={book.id} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-bold text-gray-700">{book.name}</h2>
                        <p className="text-sm text-gray-500">by {book.author}</p>
                        <p className="text-sm text-indigo-500">${book.price}</p>
                        <p className="text-sm text-gray-600 mt-2">{book.description}</p>
                        {book.image ? (
                            <img
                                src={`data:image/jpeg;base64,${book.image}`} // Ensure correct base64 prefix
                                alt={book.name}
                                className="mt-4 rounded-md w-full h-48 object-cover"
                            />
                        ) : (
                            <p className="text-sm text-gray-400">No image available</p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                            <strong>Category:</strong> {book.category}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksList;
