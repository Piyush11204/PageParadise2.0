import React from 'react';
import { Route ,Routes } from 'react-router-dom';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import HomePage from './Pages/Home/HomePage';
import Navbar from './components/Navbar';
function App() {
  return (
   <>
   <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
   </>
  );
}

export default App;
