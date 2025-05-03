import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../firebase.js"; 
import { getFirestore } from "firebase/firestore"; // Import Firestore functions
import { useEffect, useState } from "react";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"; // Import Firestore functions

export default function Card({ name, image, number }) {
  const navigate = useNavigate();
  const db = getFirestore(); 
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };




  
  const addToFavOnClick = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid; // Get the logged-in user's ID
      const userFavRef = doc(db, "favorites", userId); // Reference to the user's favorites document

      try {
        const userDoc = await getDoc(userFavRef);

        if (userDoc.exists()) {
          await updateDoc(userFavRef, {
            favorites: arrayUnion({ name, image, number }), 
          });
        } else {

          await setDoc(userFavRef, {
            favorites: [{ name, image, number }], 
          });
        }
        console.log(`${name} added to favorites`);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    } else {
      console.log("User not logged in");
    }
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
    <div
      
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        textAlign: "center",
        width: "200px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      <img
        onClick={handleClick}
        src={image}
        alt={name}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <h3>{name}</h3>
      <p>Card #0{number}</p>
      {isLoggedIn && (
        <button
          onClick={addToFavOnClick}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add to Fav
        </button>
      )}
    </div>
  );
}
