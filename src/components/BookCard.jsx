import React, { useState } from "react";
import { Eye } from "lucide-react";

const BookCard = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative bg-white rounded-sm shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book Image with Overlay */}
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
            {book.category || 'Uncategorized'}
          </span>
          <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
            ${book.price}
          </span>
        </div>

        {/* View More Button on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <button className="bg-white text-purple-600 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-purple-50 transition">
              <Eye size={20} />
              <span>View More</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Book Details */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 truncate">
          {book.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          by {book.author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;