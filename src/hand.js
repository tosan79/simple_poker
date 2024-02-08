let deck = Array.from(Array(52).keys()).map(_ => _ + 1);

function shuffle(deck) {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function draw_two(deck) {
    return [deck.pop(), deck.pop()];
}

function draw_one(deck) {
    return deck.pop();
}

function display_card(card) {
    let suits = ['♥', '♦', '♣', '♠'];
    let suit = suits[Math.floor((card - 1) / 13)];
    let rank = (card % 13) + 1;
    if (rank === 1) rank = 'A';
    else if (rank === 11) rank = 'J';
    else if (rank === 12) rank = 'Q';
    else if (rank === 13) rank = 'K';
    return `${rank}${suit}`;
}

module.exports = {
    deck,
    shuffle,
    draw_two,
    draw_one,
    display_card
};