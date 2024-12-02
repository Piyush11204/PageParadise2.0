import React from 'react';
import { Route ,Routes } from 'react-router-dom';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import HomePage from './Pages/Home/HomePage';
import Navbar from './components/Navbar';
import AddBook from './Pages/Home/AddBook';
function App() {
  return (
   <>
   <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path='/book/addbook' element={<AddBook/>} />
    </Routes>
   </>
  );
}

export default App;
