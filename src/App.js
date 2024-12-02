import React from 'react';
import { Route ,Routes } from 'react-router-dom';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import HomePage from './Pages/Home/HomePage';
import Navbar from './components/Navbar';
import AddBook from './Pages/Books/AddBook';
import PageParadiseAbout from './Pages/Home/about';
import ForNav from './components/forNav';
import BookDetails from './Pages/Books/BookDetails';
function App() {
  return (
   <>
   <Navbar/>
   <ForNav/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path='/book/addbook' element={<AddBook/>} />
      <Route path='/books/:bookId' element={<BookDetails />} />
      <Route path='about' element={<PageParadiseAbout/>} />
    </Routes>
   </>
  );
}

export default App;
