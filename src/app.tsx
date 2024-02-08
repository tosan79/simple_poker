import React, {useState} from 'react';
//var hand = require('./hand')

function Card() {
  const [value, setValue] = useState('🂠');
  const [isClicked, setIsClicked] = useState(false);

  let deck = Array.from(Array(52).keys()).map(_ => _ + 1);

  function shuffle(deck: Array<number>) {
      for (let i = 0; i < deck.length; i++) {
          let j = Math.floor(Math.random() * deck.length);
          [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return deck;
  }

  function draw_two(deck: Array<number>) {
      return [deck.pop(), deck.pop()];
  }

  function draw_one(deck: Array<number>) {
      return deck.pop();
  }

  function display_card(card: number) {
      let suits = ['♡', '♢', '♣', '♠'];
      let suit = suits[Math.floor((card - 1) / 13)];
      let rank: any = (card % 13) + 1;
      if (rank === 1) rank = 'A';
      else if (rank === 11) rank = 'J';
      else if (rank === 12) rank = 'Q';
      else if (rank === 13) rank = 'K';
      return `${rank}${suit}`;
  }

  function handleClick() {
    shuffle(deck);
    setValue(display_card(draw_one(deck)))
    setIsClicked(true);
    console.log(`clicked on ${value}`)
  }

  return (
    <button className='rectangle' onClick={handleClick} disabled={isClicked}>
      {value}
    </button>
  );
}

function Hand() {
  return (
    <>
      <div className='board-row'>
        <Card />
        <Card />
      </div>
    </>
  );
}

// 🂠

let Greeting = () => {
  return <div style={{marginBottom: '20px'}}>witaj, pokerzysto! Twoja ręka to: </div>
}

const App = () => {
  return (
    <>
      <Greeting />
      <Hand />
    </>
  )
}

export default App;
