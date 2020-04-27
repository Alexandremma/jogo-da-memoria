const FRONT = "card_front";
const BACK = "card_back";

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
    console.log(cards);
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