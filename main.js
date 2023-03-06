const cards = document.querySelectorAll('.card');


let hasFlipedCard = false;
let firstFlipedCard, secondFlipedCard;
let lockBoard = false;
let matchedCards = 0;
/*
function flipCard (e) { //We have to set pointer-events none and user-select none in css for .card .front, card .back
    console.log(e.target)
}
*/

function flipCard () {
    if(lockBoard) return;
    if(this === firstFlipedCard) return;

    this.classList.toggle('flip');
    if(!hasFlipedCard) {
        hasFlipedCard = true;
        firstFlipedCard = this;
    } else {
        hasFlipedCard = false;
        secondFlipedCard = this;

        matchCards();
    }
};

function matchCards () {
    /*let isMatch = firstFlipedCard.dataset.number === secondFlipedCard.dataset.number
    isMatch ? disableCards() : unflipCards(); */
    
    if(firstFlipedCard.dataset.number === secondFlipedCard.dataset.number) {
        lockBoard = true;
        disableCards();
        matchedCards++;
        if (matchedCards == 8) {
            return setBoard();
        } 

    } else {
        unflipCards();
    }
    
}

function disableCards () {
    firstFlipedCard.removeEventListener('click', flipCard);
    secondFlipedCard.removeEventListener('click', flipCard);
    setTimeout(() => {
        resetValues()
    }, 1000)
}

function unflipCards () {
    lockBoard = true;
    setTimeout(() => {
        firstFlipedCard.classList.remove('flip');
        secondFlipedCard.classList.remove('flip');
        resetValues()
    }, 1000)
}

function resetValues () {
    hasFlipedCard = false;
    lockBoard = false;
    firstFlipedCard = null;
    secondFlipedCard = null;
}

(function shuffleCards () {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition; 
    })
})();

function setBoard () {
    matchedCards = 0;
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard)
            return resetValues();
        })
        
    }, 1500)
} 

cards.forEach(card => card.addEventListener('click', flipCard));
