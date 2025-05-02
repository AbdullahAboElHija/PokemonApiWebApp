import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PokemonPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemon(data);
    }
    fetchData();
  }, [name]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map(t => t.type.name).join(", ")}</p>
    </div>
  );
}
