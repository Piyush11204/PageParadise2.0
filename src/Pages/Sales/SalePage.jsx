import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, ShoppingCart } from 'lucide-react';

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    discount: 15,
    cover: "https://books.google.co.in/books/publisher/content?id=M53SDwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2Lz0_4XfWJHNkQEVOk6UwFhlc96g&w=1280",
    description: "A mysterious library between life and death offers infinite possibilities",
    tags: ["Fiction", "Fantasy"]
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 29.99,
    discount: 20,
    cover: "https://m.media-amazon.com/images/I/51YU-QIowSL._SY445_SX342_.jpg",
    description: "An astronaut's solo mission to save humanity",
    tags: ["Sci-Fi", "Adventure"]
  },
  {
    id: 3,
    title: "Tomorrow's End",
    author: "Sarah Chen",
    price: 19.99,
    discount: 10,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1573351980i/48743364.jpg",
    description: "The thrilling first book in the new sci-fi trilogy",
    tags: ["Sci-Fi", "Thriller"]
  },
  {
    id: 4,
    title: "The Art of Cooking",
    author: "James Bennett",
    price: 34.99,
    discount: 25,
    cover: "https://m.media-amazon.com/images/I/612u+Qi85ML._AC_UF1000,1000_QL80_.jpg",
    description: "Master the fundamentals of culinary arts",
    tags: ["Non-Fiction", "Cooking"]
  },
  {
    id: 5,
    title: "Digital Dawn",
    author: "Elena Rodriguez",
    price: 27.99,
    discount: 30,
    cover: "https://m.media-amazon.com/images/I/61A7mOCOjlL._AC_UF1000,1000_QL80_.jpg",
    description: "A groundbreaking look at our technological future",
    tags: ["Technology", "Future"]
  }
];

const BookCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className="w-full bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Deal Banner */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-orange-600 mb-2">Featured Books</h2>
          <p className="text-orange-800">Discover our handpicked selection with exclusive offers</p>
        </div>

        <div 
          className="relative overflow-hidden rounded-2xl bg-white shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Sale Banner */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 px-4 text-center z-10">
            <p className="text-lg font-medium">
              Summer Reading Sale! Extra 10% off with code: SUMMER24
            </p>
          </div>

          <div className="mt-14 relative min-h-[500px]">
            {/* Book Display */}
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {books.map((book) => (
                <div 
                  key={book.id}
                  className="w-full flex-shrink-0 px-8 py-6 flex gap-12"
                >
                  {/* Book Cover */}
                  <div className="relative w-80 flex-shrink-0">
                    <div className="relative group">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="rounded-lg shadow-xl transform transition-all duration-300 group-hover:scale-105"
                      />
                      {book.discount > 0 && (
                        <div className="absolute -top-4 -right-4 bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center transform rotate-12">
                          <span className="font-bold text-lg">-{book.discount}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 py-4">
                    <div className="flex gap-2 mb-4">
                      {book.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-4xl font-bold text-gray-800 mb-3">
                      {book.title}
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                    
                    <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                      {book.description}
                    </p>
                    
                    {/* Price Display */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold text-orange-600">
                          ${calculateDiscountedPrice(book.price, book.discount)}
                        </span>
                        {book.discount > 0 && (
                          <span className="text-2xl text-gray-400 line-through">
                            ${book.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg font-medium">
                        <ShoppingCart className="w-6 h-6" />
                        Add to Cart
                      </button>
                      <button className="flex-1 border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-lg font-medium">
                        <Bookmark className="w-6 h-6" />
                        Save for Later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full shadow-lg hover:bg-white transition-colors border border-orange-100"
            >
              <ChevronLeft className="w-8 h-8 text-orange-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full shadow-lg hover:bg-white transition-colors border border-orange-100"
            >
              <ChevronRight className="w-8 h-8 text-orange-600" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {books.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-orange-500 w-8' 
                      : 'bg-orange-200 hover:bg-orange-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCarousel;