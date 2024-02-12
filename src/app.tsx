import {deck, shuffle, draw_one, display_card} from './hand'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

// let deck = Array.from(Array(52).keys()).map(_ => _ + 1);

// function shuffle(deck: Array<number>) {
//   for (let i = 0; i < deck.length; i++) {
//     let j = Math.floor(Math.random() * deck.length);
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }
//   return deck;
// }

// function draw_one(deck: Array<number>) {
//   return deck.pop();
// }

// function display_card(card: number) {
//   let suits = ['♡', '♢', '♣', '♠'];
//   let suit = suits[Math.floor((card - 1) / 13)];
//   let rank: any = (card % 13) + 1;
//   if (rank === 1) rank = 'A';
//   else if (rank === 11) rank = 'J';
//   else if (rank === 12) rank = 'Q';
//   else if (rank === 13) rank = 'K';
//   return `${rank}${suit}`;
// }

function Card() {
  const [value, setValue] = useState('🂠')
  const [isClicked, setIsClicked] = useState(false)

  function handleClick() {
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
  )
}

function River() {
  return (
    <div className='board-row'>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}

let Greeting = () => {
  shuffle(deck)
  return <div style={{ marginBottom: '20px' }}>hello, player! this is your hand: </div>
}

let Choice = () => {

  const [decision, setDecision] = useState(null);

  function handleFold() {
    console.log('folded')
    setDecision('🙁')
  }

  function handleAllIn() {
    console.log('all-in')
    setDecision(<River />)
  }

  return (
    <>
      <button className='choice-button' onClick={handleFold}>fold</button>
      <button className='choice-button' onClick={handleAllIn}>all-in</button>
      <div style={{marginTop: '20px'}}> {decision} </div>
    </>
  )
}

const socket = io("http://localhost:3001").connect()

const App = () => {
  
  const [room, setRoom] = useState("")
  const [nickname, setNickname] = useState("")
  const [messageReceived, setMessageReceived] = useState("")

  const joinRoom = () => {
    let room: string
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", {nickname})
  }

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setMessageReceived(data.nickname)
    })
  }, [socket])

  return (
    <div>
      <input
        placeholder='enter table number'
        onChange={(event => {
          setRoom(event.target.value)
        })}
      />
      <input
        placeholder='enter your nickname' 
        onChange={(event) => {
          setNickname(event.target.value)
        }} 
      />
      <button onClick={sendMessage}>save</button>
      <br/><br/>
      you play against: {messageReceived}
      <br/><br/>
      <Greeting />
      <Hand />
      <Choice />
    </div>
  )
}

export default App;
