// BookCarousel.js
import React, { useState, useEffect } from 'react';

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    discount: 15,
    cover: "https://books.google.co.in/books/publisher/content?id=M53SDwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2Lz0_4XfWJHNkQEVOk6UwFhlc96g&w=1280",
    description: "A mysterious library between life and death offers infinite possibilities",
    tags: ["Fiction", "Fantasy"],
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 29.99,
    discount: 20,
    cover: "https://m.media-amazon.com/images/I/51YU-QIowSL._SY445_SX342_.jpg",
    description: "An astronaut's solo mission to save humanity",
    tags: ["Sci-Fi", "Adventure"],
  },
  {
    id: 3,
    title: "Tomorrow's End",
    author: "Sarah Chen",
    price: 19.99,
    discount: 10,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1573351980i/48743364.jpg",
    description: "The thrilling first book in the new sci-fi trilogy",
    tags: ["Sci-Fi", "Thriller"],
  },
  {
    id: 4,
    title: "The Art of Cooking",
    author: "James Bennett",
    price: 34.99,
    discount: 25,
    cover: "https://m.media-amazon.com/images/I/612u+Qi85ML._AC_UF1000,1000_QL80_.jpg",
    description: "Master the fundamentals of culinary arts",
    tags: ["Non-Fiction", "Cooking"],
  },
  {
    id: 5,
    title: "Digital Dawn",
    author: "Elena Rodriguez",
    price: 27.99,
    discount: 30,
    cover: "https://m.media-amazon.com/images/I/61A7mOCOjlL._AC_UF1000,1000_QL80_.jpg",
    description: "A groundbreaking look at our technological future",
    tags: ["Technology", "Future"],
  },
];

const BookCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden bg-orange-100 px-8 py-8">
      <div className="flex items-center justify-between mb-4 px-4">
      <div className="absolute top-6 right-0 animate-pulse text-xl text-white">
        <div className="relative flex items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-0 h-0 border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent border-r-[30px] border-r-orange-500" />
          <div className="bg-orange-500 text-white py-4 px-6 font-bold text-lg">
            Newly added
          </div>
        </div>
      </div>
      </div>

      {books.map((book, index) => (
        <div
          key={book.id}
          className={`flex flex-col sm:flex-row items-center transition-transform duration-500 ease-in-out ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <img
            src={book.cover}
            alt={book.title}
            className="w-60 h-80 object-cover mb-4 sm:mb-0 sm:mr-6 shadow-lg"
          />
          <div className="text-left px-4">
            <h2 className="text-3xl font-bold mb-2 text-orange-700">{book.title}</h2>
            <p className="text-lg text-gray-700 mb-2">by {book.author}</p>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {book.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-orange-200 rounded-full text-sm text-orange-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xl font-semibold text-orange-800">
              ${book.price.toFixed(2)}
              <span className="ml-2 text-sm text-red-500">{book.discount}% Off</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCarousel;
