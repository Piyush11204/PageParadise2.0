import React from "react";
import BooksList from "../Books/BooksList";
import BookCarousel from "./BookCarousel";
import Video from "./Video";

const HomePage = () => {


  return (
    <div className="container mx-auto p-4">
      <Video />
      <BookCarousel />
      <BooksList />

      </div>
  );
};

export default HomePage;
