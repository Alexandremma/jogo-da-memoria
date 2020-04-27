let game = {
    snacks: [
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
    ],

    cards: null,

    createCardsFromSnacks: function () {
        this.cards = [];
    
        for(let snack of this.snacks) {
            this.cards.push(this.createPairFromSnack(snack));
        }
    
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
    
        while(currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]; 
        }
    }
}