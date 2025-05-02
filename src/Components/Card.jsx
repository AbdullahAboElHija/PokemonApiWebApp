import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ name, image, number }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <div
      onClick={handleClick}
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
        src={image}
        alt={name}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <h3>{name}</h3>
      <p>Card #0{number}</p>
    </div>
  );
}
