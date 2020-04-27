const FRONT_CLASS = "card_front";
const BACK_CLASS = "card_back";
const CARD_CLASS = "card";
const ICON_CLASS = "icon";
const FLIP_CLASS = "flip";

const GAMEOVER_ID = "gameOver";

const BACK_TEXT = "&lt/&gt";

startGame();

function startGame() {
    game.createCardsFromSnacks()

    initializeCards();
}

function initializeCards() {
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    for (let card of game.cards) {
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

    if (face === FRONT_CLASS) {
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
    if (game.setCard(this.id)) {
        this.classList.add(FLIP_CLASS);

        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById(GAMEOVER_ID);
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
        
                    firstCardView.classList.remove(FLIP_CLASS);
                    secondCardView.classList.remove(FLIP_CLASS);
                    game.unflipCards();
                    game.clearCards();
                }, 1000);
            }
        }
    }
}

function restart() {
    game.clearCards();
    startGame();

    let gameOverLayer = document.getElementById(GAMEOVER_ID);
    gameOverLayer.style.display = 'none';
}