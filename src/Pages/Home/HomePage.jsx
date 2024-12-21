import React from 'react'
// import { useFirebase } from '../../context/firebase';
import BooksList from '../Books/BooksList';
import BookCarousel from './BookCarousel';
import Video from './Video';


const HomePage = () => {
    // const firebase = useFirebase();
    
    
  return (
    <div>
       <Video/>
      <BookCarousel/>
       <BooksList/>
    </div>
  )
}

export default HomePage
