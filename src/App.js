import "./App.css";
import Header from "./Components/Header";
import CardsContainer from "./Components/CardsContainer";
import { Routes, Route } from "react-router-dom";
import PokemonPage from "./Components/PokemonPage";

function App() {
  return (
    <div className="App">
      <Header name="PokemonApi" />
      <Routes>
        <Route path="" element={<CardsContainer />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
      </Routes>
    </div>
  );
}

export default App;
