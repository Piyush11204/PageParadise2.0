import React from 'react';
import { BookOpen, Users, Shield, Globe, Star } from 'lucide-react';

const PageParadiseAbout = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-orange-600 mb-4">PageParadise</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover. Connect. Grow. Your Literary Journey Begins Here.
            
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">Our Mission</h2>
          <div className="bg-orange-50 p-8 rounded-lg shadow-md">
            <p className="text-lg text-center">
              PageParadise is a revolutionary digital platform dedicated to transforming the way book lovers discover, 
              share, and explore literature. We're not just a book platform; we're a comprehensive literary ecosystem 
              designed to connect readers, authors, and books in unprecedented ways.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-100 p-6 rounded-lg shadow-md text-center">
              <BookOpen className="mx-auto text-orange-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-4 text-orange-700">Extensive Book Categories</h3>
              <p>
                From Fiction and Non-Fiction to Academic texts, we cover every literary landscape 
                to satisfy diverse reading preferences.
              </p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg shadow-md text-center">
              <Users className="mx-auto text-orange-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-4 text-orange-700">Community-Driven Platform</h3>
              <p>
                Connect with fellow readers, join discussion forums, interact directly with authors, 
                and build your reading network.
              </p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg shadow-md text-center">
              <Shield className="mx-auto text-orange-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-4 text-orange-700">Advanced Technology</h3>
              <p>
                Powered by AI, blockchain, and machine learning to deliver personalized, 
                secure, and innovative reading experiences.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">Social Impact</h2>
          <div className="bg-orange-50 p-8 rounded-lg shadow-md text-center">
            <Globe className="mx-auto text-orange-600 mb-4" size={64} />
            <p className="text-lg">
              We're committed to democratizing reading, supporting emerging authors, 
              and promoting literacy in underserved communities.
            </p>
          </div>
        </section>

        <section className="text-center">
          <Star className="mx-auto text-orange-600 mb-4" size={64} />
          <h2 className="text-3xl font-bold text-orange-500 mb-4">Join Our Literary Revolution</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore Infinite Worlds, One Page at a Time
          </p>
          <button className="bg-orange-600 text-white px-8 py-3 rounded-full text-lg hover:bg-orange-700 transition duration-300">
            Get Started
          </button>
        </section>
      </div>
    </div>
  );
};

export default PageParadiseAbout;