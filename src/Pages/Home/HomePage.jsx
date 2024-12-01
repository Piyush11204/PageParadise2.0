import React from 'react'
import { useFirebase } from '../../context/firebase';


const HomePage = () => {
    const firebase = useFirebase();
    const logout = async () => {
        try {
            await firebase.logout();
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default HomePage
