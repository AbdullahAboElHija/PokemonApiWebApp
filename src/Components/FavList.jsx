import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../firebase.js"; 
import { getFirestore } from "firebase/firestore"; // Import Firestore functions
import { useEffect, useState } from "react";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"; // Import Firestore functions
import Card from "./Card"; // Import the Card component
export default function FavList() {
  const db = getFirestore();
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoritesList, setFavorites] = useState([]); // State to store favorites

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid; // Get the logged-in user's ID
        const userFavRef = doc(db, "favorites", userId); // Reference to the user's favorites document

        try {
          const userDoc = await getDoc(userFavRef);
          setFavorites(userDoc.data().favorites); // Set the favorites state with the fetched data
          if (userDoc.exists()) {
            console.log("User favorites:", userDoc.data().favorites);
          } else {
            console.log("No favorites found for this user.");
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      } else {
        console.log("User not logged in");
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
    <div className="CardContainer">
      {favoritesList.map((pokemon, index) => (
        <Card
          key={index}
          name={pokemon.name}
          image={pokemon.image}

        />
      ))}
    </div>

    </div>
  )
}


// const user = auth.currentUser;
//     if (user) {
//       const userId = user.uid; // Get the logged-in user's ID
//       const userFavRef = doc(db, "favorites", userId); // Reference to the user's favorites document

//       try {
//         const userDoc = await getDoc(userFavRef);

//         if (userDoc.exists()) {
//           await updateDoc(userFavRef, {
//             favorites: arrayUnion({ name, image, number }), 
//           });
//         } else {

//           await setDoc(userFavRef, {
//             favorites: [{ name, image, number }], 
//           });
//         }
//         console.log(`${name} added to favorites`);
//       } catch (error) {
//         console.error("Error adding to favorites:", error);
//       }
//     } else {
//       console.log("User not logged in");
//     }