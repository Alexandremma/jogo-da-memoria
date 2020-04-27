const FRONT_CLASS = "card_front";
const BACK_CLASS = "card_back";
const CARD_CLASS = "card";
const ICON_CLASS = "icon";

const BACK_TEXT = "&lt/&gt";

let snacks = [
    'batataCoca',
    'bigMc',
    'cheddar',
    'chicken',
    'fish',
    'nuggets',
    'quarteirao',
    'tasty',
    'triploTasty',
    'triploBurguerBacon'
];

let cards = null;

startGame()

function startGame() {
    cards = createCardsFromSnacks(snacks);
    shuffleCards(cards);

    initializeCards(cards);
}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard');
    
    for(let card of cards) {
        let cardElement = document.createElement('div');
        cardElement.id = card.id; 
        cardElement.classList.add(CARD_CLASS);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    }
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT_CLASS, card, cardElement);
    createCardFace(BACK_CLASS, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT_CLASS) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON_CLASS);
        iconElement.src = `./assets/images/${card.icon}.png`;
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = BACK_TEXT;
    }

    element.appendChild(cardElementFace);
}

function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]; 
    }
}

function createCardsFromSnacks(snacks) {
    let cards = [];

    for(let snack of snacks) {
        cards.push(createPairFromSnack(snack));
    }

    return cards.flatMap(pair => pair);
}

function createPairFromSnack(snack) {
    return [
        {
            id: createIdFromSnack(snack),
            icon: snack,
            flipped: false
        },
        {
            id: createIdFromSnack(snack),
            icon: snack,
            flipped: false
        }
    ]
}

function createIdFromSnack(snack) {
    return snack + parseInt(Math.random() * 1000);
}

function flipCard() {
     this.classList.add('flip');
}