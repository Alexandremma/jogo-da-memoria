let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    playerTime: 0,
    player1Points: 0,
    player2Points: 0,

    snacks: [
        'bigMc',
        'cheddar',
        'chicken',
        'coca',
        'fish',
        'nuggets',
        'quarteirao',
        'tasty',
        'triploTasty',
        'triploBurguerBacon'
    ],

    cards: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }

        return this.firstCard.icon === this.secondCard.icon;
    },

    playerScore: function() {
        (this.playerTime === 0) ? this.player1Points++ : this.player2Points++;
    },

    clearCards: function () {
        this.lockMode = false;
        this.firstCard = null;
        this.secondCard = null;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
    },

    checkGameOver: function () {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    createCardsFromSnacks: function () {
        this.cards = [];

        this.snacks.map(snack => {
            this.cards.push(this.createPairFromSnack(snack));
        })

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
    },

    createPairFromSnack: function (snack) {
        return [
            {
                id: this.createIdFromSnack(snack),
                icon: snack,
                flipped: false
            },
            {
                id: this.createIdFromSnack(snack),
                icon: snack,
                flipped: false
            }
        ]
    },

    createIdFromSnack: function (snack) {
        return snack + parseInt(Math.random() * 1000);
    },

    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
}