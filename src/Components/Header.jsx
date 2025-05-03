import React from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth functions
import { useEffect, useState } from "react";

export default function Header({ name }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser; // Get the current user
  const userId = user ? user.uid : null; // Get the user's ID if logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginClick = () => {
    navigate(`/login`);
  };

  const Favorites = () => {
    navigate(`/Favorites/${userId}`);
  };

  const registerClick = () => {
    navigate(`/register`);
  };

  const handleClick = () => {
    navigate(`/`);
  };

  const handleSignOut = () => {
    const authInstance = getAuth();
    signOut(authInstance)
      .then(() => {
        alert("You have signed out successfully.");
        navigate(`/login`); // Redirect to login page after sign out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });  
  };


    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setIsLoggedIn(true);
          console.log("User is logged in:", user.email);
        } else {
          setIsLoggedIn(false);
        }
      });
  
      return () => unsubscribe(); // Cleanup subscription on unmount
    }, [auth]);



  return (
    <header
      style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <h1>Welcome to {name} Website's</h1>
      <img src="/assets/logo.png" onClick={handleClick} alt="Logo" />
      <h2>Explore the world of Pokemon</h2>

      {!isLoggedIn && (
        <>
          <button
            onClick={loginClick}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
          <button
            onClick={registerClick}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </>
      )}
      {isLoggedIn && (
        <>
          <button
            onClick={Favorites}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Favorites
          </button>
          <button
            onClick={handleSignOut}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: 'red',
              color: 'white',
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </header>
  );
}
