const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cardImages = [
    'banana.png', 'banana.png',
    'cabbage.png', 'cabbage.png',
    'carrot.png', 'carrot.png',
    'corn.png', 'corn.png',
    'orange.png', 'orange.png',
    'eggplant.png', 'eggplant.png',
    'strawberry.png', 'strawberry.png',
    'tomato.png', 'tomato.png',
];

function createCards() {
    const shuffledImages = cardImages.sort(() => Math.random() - 0.5);
    board.innerHTML = '';

    shuffledImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.dataset.index = index;

        const img = document.createElement('img');
        img.src = `images/${image}`;
        img.alt = 'carta';
        img.style.display = 'none';

        const number = document.createElement('span');
        number.textContent = index + 1;

        card.appendChild(number);
        card.appendChild(img);
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add('flip');
    this.querySelector('img').style.display = 'block';
    this.querySelector('span').style.display = 'none';
  
    if (!firstCard) {
      firstCard = this;
      return;
    }
  
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
  
    if (isMatch) {
      disableCards();
    } else {
      unflipCards();
    }
}

// Função para desabilitar cartas correspondentes
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Função para desvirar cartas que não correspondem
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.querySelector('img').style.display = 'none';
    secondCard.querySelector('img').style.display = 'none';
    firstCard.querySelector('span').style.display = 'block';
    secondCard.querySelector('span').style.display = 'block';
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

// Função para reiniciar o tabuleiro
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Função para reiniciar o jogo
function resetGame() {
  createCards();
  resetBoard();
}

// Adiciona evento ao botão de reiniciar
resetButton.addEventListener('click', resetGame);

// Inicializa o jogo
createCards();

