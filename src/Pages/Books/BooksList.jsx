import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { useFirebase } from "../../context/firebase";
import BookCard from "../../components/BookCard";

const BooksList = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Fiction", 
    "Non-Fiction", 
    "Science", 
    "History", 
    "Biography", 
    "Children's Books"
  ];

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

  const filteredBooks = books.filter((book) => {
    const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex
    return (
      regex.test(book.name) && 
      (selectedCategory ? book.category === selectedCategory : true)
    );
  });
  

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Discover Our Collection
      </h1>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search books..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        
        <div className="relative">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-4 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No books found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksList;