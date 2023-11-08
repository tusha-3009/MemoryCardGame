import React from "react";
import "./Cards.css";
function Cards({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div
          className="card front"
          style={{ backgroundColor: card.color }}
        ></div>
        <div
          className=" card back "
          onClick={handleClick}
          style={{ backgroundColor: "black" }}
        ></div>
      </div>
  
    </div>
    
  );
}

export default Cards;
