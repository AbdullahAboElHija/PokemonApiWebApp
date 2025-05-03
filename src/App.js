import "./App.css";
import Header from "./Components/Header";
import CardsContainer from "./Components/CardsContainer";
import { Routes, Route } from "react-router-dom";
import PokemonPage from "./Components/PokemonPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import FavList from "./Components/FavList";
function App() {
  return (
    <div className="App">
      <Header name="PokemonApi" />
      <Routes>  
        
        <Route path="" element={<CardsContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
        <Route path="/Favorites/:userId" element={<FavList />} />
      </Routes>
    </div>
  );
}

export default App;
