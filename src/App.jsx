import './App.css'
import React, { useEffect, useState } from 'react'
import { Card } from './components/Card';

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards =  () => {
    const shuffledCards = [ ...cardImages, ...cardImages ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setMatchedIds([]);
    setTurns(0);
  }

  useEffect(() => {
    shuffleCards();
  }, [])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setMatchedIds(ids => ([ ...ids, choiceOne.id, choiceTwo.id ]));
        nextTurn();
      } else {
        setTimeout(nextTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo])


  const handleChoice = (card) => {
    if (choiceOne) {
      if (!choiceTwo) {
        setChoiceTwo(card);
      }
    } else {
      setChoiceOne(card);
    }
  }

  const nextTurn = () => {
    setTurns(t => t + 1);
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  console.log(choiceOne, 'choiceOne')
  console.log(turns, 'turns')
  console.log(matchedIds, 'matchedIds')

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={() => shuffleCards()}>New Game</button>
      { matchedIds.length !== cards.length &&
        <div className='card-grid'>
          { cards.map(card => (
            <Card
              key={card.id}
              card={card}
              flipped={card === choiceOne || card === choiceTwo || matchedIds.includes(card.id)}
              handleChoice={handleChoice}
            />
          ))}
        </div>
      }
      { matchedIds.length === cards.length &&
        <p>恭喜你R～陳芷涵</p>
      }
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App
