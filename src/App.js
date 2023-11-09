import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
const Obj = [
  { color: "red", match: false },
  { color: "blue", match: false },
  { color: "green", match: false },
  { color: "orange", match: false },
  { color: "pink", match: false },
  { color: "yellow", match: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(20);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [disabled, setDisabled] = useState(false); // clicks are not disabled, user can click

  const shuffleCards = () => {
    const shuffledCards = [...Obj, ...Obj]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(20);
    setMatchedPairs([]);
    // console.log(shuffledCards);
  };
  const handleChoice = (card) => {
    setTurns((prevTurns) => prevTurns - 1);

    if (selectedCards.length < 2 && !card.match) {
      setSelectedCards((prevSelectedCards) => [...prevSelectedCards, card]);
    }
  };
  useEffect(() => {
    if (selectedCards.length === 2) {
      setDisabled(true);

      const [cardOne, cardTwo] = selectedCards;

      if (cardOne.color === cardTwo.color) {
        setMatchedPairs((prevMatchedPairs) => [
          ...prevMatchedPairs,
          cardOne.color,
        ]);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.color === cardOne.color) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        setTimeout(() => resetTurns(), 500);
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [selectedCards]);

  const resetTurns = () => {
    setSelectedCards([]);

    setDisabled(false); //enables card clicking again.
  };
  //console.log(cards, turns);
  useEffect(() => {
    if (turns === 0) {
      alert("Game over");
      shuffleCards();
    }
  }, [turns]);
  return (
    <div className="App">
      <h1>Memory Game</h1>

      {matchedPairs.length === Obj.length && turns !== 20 ? (
        <>
          <div>You win </div>
          <button onClick={shuffleCards}>Restart the Game</button>
        </>
      ) : (
        <>
          <button onClick={shuffleCards}>
            {turns < 20 ? "Restart the Game" : "Start the Game"}
          </button>
        </>
      )}
      <div className="container">
        {cards.map((card) => (
          <Cards
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={selectedCards.includes(card) || card.match}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
