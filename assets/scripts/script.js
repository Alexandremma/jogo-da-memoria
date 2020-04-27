const FRONT_CLASS = "card_front";
const BACK_CLASS = "card_back";
const CARD_CLASS = "card";
const ICON_CLASS = "icon";

const BACK_TEXT = "&lt/&gt";

startGame()

function startGame() {
    game.createCardsFromSnacks()
    
    initializeCards();
}

function initializeCards() {
    let gameBoard = document.getElementById('gameBoard');
    
    for(let card of game.cards) {
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

function flipCard() {
     this.classList.add('flip');
}