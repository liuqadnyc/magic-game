import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  img {
    width: 100%;
    display: block;
    border: 2px solid #fff;
    border-radius: 6px;
  }
  .front {
    position: absolute;
    transform: rotateY(90deg);
    transition: all ease-in 0.2s;
  }
  .flipped .front {
    transform: rotateY(0);
    transition-delay: 0.2s;
  }
  .back {
    transition: all ease-in 0.2s;
    transition-delay: 0.2s;
  }
  .flipped .back {
    transform: rotateY(90deg);
    transition-delay: 0s;
  }
`

export const Card = ({card, flipped, handleChoice}) => {

  return (
    <Container className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt='card front' />
        <img
          className='back'
          src='img/cover.png'
          alt='card back'
          onClick={() => handleChoice(card)}
        />
      </div>
    </Container>
  )
}
