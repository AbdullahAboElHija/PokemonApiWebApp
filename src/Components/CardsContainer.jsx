import React from "react";
import Card from "./Card";
import { useEffect, useState } from "react";
import "../Styles/CardsContainer.css";

export default function CardsContainer() {
  const [pokemonList, setPokemonList] = useState([]);
  const LIMIT = 5;
  const [OFFSET, setOFFSET] = useState(0);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${OFFSET}`
        );
        const data = await response.json();

        // Fetch detailed info for each Pokémon
        const detailedList = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: pokemon.name,
              number: details.id,
              image: details.sprites.front_default,
            };
          })
        );

        setPokemonList((prevList) => {
          return [...prevList, ...detailedList];
        });

        if (flag) {
          setPokemonList(detailedList);
          setFlag(false);
        }

        
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }

    fetchPokemonList();
  }, [OFFSET]);

  const ButtonOnClick = () => {
    setOFFSET(OFFSET + LIMIT);
    
  };

  return (
    <div>
    <div className="CardContainer">
      {pokemonList.map((pokemon, index) => (
        <Card
          key={index}
          name={pokemon.name}
          image={pokemon.image}
          number={pokemon.number}
        />
      ))}
    </div>
    <button className="loadMore" onClick={ButtonOnClick}>Load More</button>
    </div>
  );
}
