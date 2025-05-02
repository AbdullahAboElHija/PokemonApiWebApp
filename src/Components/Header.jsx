import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Header({ name }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };
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
        <img src="/assets/logo.png" onClick={handleClick}/>
        <h2>Explore the world of Pokemon</h2>
      </header>
    );
  }
  
