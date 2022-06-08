/*----- constants -----*/

// letters allowed to use
const ALLOWED_LETTERS = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
['z', 'x', 'c', 'v', 'b', 'n', 'm']];

// create an array of words
const WORD_BANK = ['FLOWER', 'GARDEN', 'STAMEN', 'PETAL', 'LEAF', 'POLLEN', 'STEM', 'THORN', 'ROOT', 'BLOSSOM', 'ROSE', 'ORCHID', 'DAISY', 'SUNFLOWER', 'LILAC', 'LAVENDER', 'TULIP', 'LILY', 'PEONY', 'GARDENIA', 'CARNATION', 'DAHLIA', 'PANSY', 'AZALEA', 'GERANIUM', 'SNAPDRAGON', 'IRIS', 'POPPY', 'DAFFODIL', 'PETUNIA', 'VIOLET', 'HIBISCUS', 'PLUMERIA'];
// const WORD_BANK = [
//     ['f', 'l', 'o', 'w', 'e', 'r'], 
//     ['s', 't', 'a', 'i', 'r', 's'],
// ];

// holds flowers in diff states of decay's images
const DECAYED_FLOWERS = ['https://i.imgur.com/sSlpUiV.jpg?2', 'https://i.imgur.com/r8SL3dO.jpg?1', 'https://i.imgur.com/0v8IfiF.jpg?1', 'https://i.imgur.com/bft2YiS.jpg?2', 'https://i.imgur.com/mT7c7QG.jpg?2', 'https://i.imgur.com/hNeSeqR.jpg?2'];

// defines the most incorrect guesses that can be made
const MAX_WRONG_GUESSES = 5

/*----- app's state (variables) -----*/

// pick a random word from array
let secretWord;

// setup array to show # of empty spaces per word '_' (arr.length)
let lengthOfWord;

// variable that holds guess from keyboard
let currentGuess;

// variable that tracks # of wrong guesses
let currWrongGuesses;

// variable holds true or false depending on whether current guess is in word
let includedLetter;


// (icebox: hints)

/*----- cached element references -----*/

// gets keyboard rows from DOM
const keyboard1 = document.getElementById('keyboard1');
const keyboard2 = document.getElementById('keyboard2');
const keyboard3 = document.getElementById('keyboard3');

// gets reset button from DOM
const resetButton = document.getElementById('reset-button');

// gets image div from DOM
const roses = document.getElementById('roses');

// current guessed letter
const currentGuessEl = document.getElementById('current-guess');

// display screen (icebox: update display to say `You have made ${# of wrong guesses}` or `you have `${x}` amount of guesses left`)
const displayScreen = document.getElementById('displayScreen')

/*----- event listeners -----*/

// allows keyboard to be clicked, runs handleClick function
keyboard1.addEventListener('click', handleClick);
keyboard2.addEventListener('click', handleClick);
keyboard3.addEventListener('click', handleClick);

// allows reset button to be clicked, runs resetGame function
resetButton.addEventListener('click', resetGame);

/*----- functions -----*/

// render current guessed word progress or blank spots per length

// sets game up to starting state
function initGame() {
    secretWord = getSecretWord()
    currWrongGuesses = 0
    renderDisplay()
    currentGuess = ''
    roses.src = DECAYED_FLOWERS[0]
    generateKeyboard1()
    generateKeyboard2()
    generateKeyboard3()
}

// resets game
function resetGame() {
    secretWord = getSecretWord()
    currWrongGuesses = 0
    renderDisplay()
    currentGuess = ''
    roses.src = DECAYED_FLOWERS[0]
    keyboard1.addEventListener('click', handleClick);
    keyboard2.addEventListener('click', handleClick);
    keyboard3.addEventListener('click', handleClick);
}
// randomizes secret word
function getSecretWord() {
    const randomInt = Math.floor(Math.random() * WORD_BANK.length)
    return WORD_BANK[randomInt]
}

function generateKeyboard1() {
    // generates top row of keyboard
    ALLOWED_LETTERS[0].forEach(function (letter) {
        const cell1 = document.createElement('div')
        cell1.innerText = letter.toUpperCase()
        cell1.classList.add('cell')
        keyboard1.appendChild(cell1)
    })

}
function generateKeyboard2() {
    // generates middle row of keyboard
    ALLOWED_LETTERS[1].forEach(function (letter) {
        const cell2 = document.createElement('div')
        cell2.innerText = letter.toUpperCase()
        cell2.classList.add('cell')
        keyboard2.appendChild(cell2)
    })

}
function generateKeyboard3() {
    // generates bottom row of keyboard
    ALLOWED_LETTERS[2].forEach(function (letter) {
        const cell3 = document.createElement('div')
        cell3.innerText = letter.toUpperCase()
        cell3.classList.add('cell')
        keyboard3.appendChild(cell3)
    })

}
// when keyboard is clicked, updates the inner text and runs updateCurrentGuess function
function handleClick(evt) {
    updateCurrentGuess(evt.target.innerText)
}

// updates current guess to chosen letter
function updateCurrentGuess(letter) {
    currentGuess = letter
    console.log(currentGuess)
    checkForLetter()
    dealResults()
    phaseFlower()
}

// searches to see if currentGuess is in word
function checkForLetter() {
    includedLetter = secretWord.includes(currentGuess)
}

// updates correct or incorrect guesses
function dealResults() {
    if (includedLetter === true) {
        console.log('trueeeeee')
        // make letter unclickable a 2nd time (change color)
    } else {
        currWrongGuesses += 1
        // make letter unclickable a 2nd time (change color)
    }
}

// changes image based on incorrect guesses
function phaseFlower() {
    if (currWrongGuesses === 1) {
        roses.src = DECAYED_FLOWERS[1]
        renderDisplay()
    } if (currWrongGuesses === 2) {
        roses.src = DECAYED_FLOWERS[2]
        renderDisplay()
    } if (currWrongGuesses === 3) {
        roses.src = DECAYED_FLOWERS[3]
        renderDisplay()
    } if (currWrongGuesses === 4) {
        roses.src = DECAYED_FLOWERS[4]
        renderDisplay()
    } if (currWrongGuesses === 5) {
        roses.src = DECAYED_FLOWERS[5]
        loseGame()
    }
}

// in event of a won game, deactivates keyboard & displays win
// function winGame() {
//     if (some winning condition) {
//         keyboard1.removeEventListener('click', handleClick);
//         keyboard2.removeEventListener('click', handleClick);
//         keyboard3.removeEventListener('click', handleClick);
//         displayScreen.innerText = 'Felicitations! We have a winner!'
//     }
// }

// in event of a lost game, deactivates keyboard & displays loss
function loseGame() {
    if (currWrongGuesses === 5) {
        keyboard1.removeEventListener('click', handleClick);
        keyboard2.removeEventListener('click', handleClick);
        keyboard3.removeEventListener('click', handleClick);
        displayScreen.innerText = 'Fin... Play again?'
    }
}
// displays length of secret word and guesses left
function renderDisplay() {
    displayScreen.innerText = `Make a guess! Your word is ${secretWord.length} letters long, you have ${5 - currWrongGuesses} guesses left.`
}

initGame() 