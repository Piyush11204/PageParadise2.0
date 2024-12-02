import React from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-sm shadow-lg overflow-hidden transform transition-all duration-300">
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
        
        {/* Overlay with Price and Category */}
        <div className="absolute top-0 left-0 right-0 p-2 flex justify-between">
          <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">
            {book.category || "Uncategorized"}
          </span>
          <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
            ${book.price || "N/A"}
          </span>
        </div>
      </div>

      {/* Book Details */}
      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h2 className="text-xl font-bold text-gray-800 truncate">
            {book.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">by {book.author || "Unknown"}</p>
        </div>
        <div className="mt-4">
          {/* "View More" Button */}
          <Link
            to={`/books/${book.id}`} // Adjust the link to match your route structure
            className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-purple-700 transition"
          >
            <Eye size={20} />
            <span>View More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
