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

    refreshPlayersScore();

    game.cards.map(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD_CLASS);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
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
        let iconElement = document.createElement('img');
        iconElement.src = './assets/images/frontImage.png';
        cardElementFace.appendChild(iconElement);
    }

    element.appendChild(cardElementFace);
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add(FLIP_CLASS);

        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                
                game.playerScore();

                refreshPlayersScore();

                if (game.checkGameOver()) {
                    let gameOverMessage = document.getElementById('gameOverMessage');
                    gameOverMessage.textContent = playerWinMessage();

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

                    (game.playerTime === 0) ? game.playerTime = 1 : game.playerTime = 0;
                }, 1000);
            }
        }
    }
}

function playerWinMessage() {
    if (game.player1Points > game.player2Points) {
        return 'Parabéns Player 1, você ganhou o jogo!';
    } else if (game.player2Points > game.player1Points) {
        return 'Parabéns Player 2, você ganhou o jogo!';
    } else {
        return 'Empate!';
    }
}

function refreshPlayersScore() {
    let player1View = document.getElementById('player1Points');
    let player2View = document.getElementById('player2Points');

    player1View.textContent = `Player 1: ${game.player1Points}`;
    player2View.textContent = `Player 2: ${game.player2Points}`;
}

function restart() {
    game.playerTime = 0;
    game.player1Points = 0;
    game.player2Points = 0;
    game.clearCards();
    startGame();

    let gameOverLayer = document.getElementById(GAMEOVER_ID);
    gameOverLayer.style.display = 'none';
}