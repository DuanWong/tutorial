'use strict';

const input = document.querySelector('.input');
const output = document.querySelector('.output');
const playButton = document.querySelector('.play');
const guessTimes = document.querySelector('.guess-times');
const guessButton = document.querySelector('.guess');
let randomNumber;

function generateRandomNumber() {
    randomNumber = Math.floor(Math.random() * 100);
}

function validateInput(value) {
    const inputNumber = Number(value); 
    if (isNaN(inputNumber) || value.trim() === '' || inputNumber < 0 
    || !Number.isInteger(inputNumber)) {
        output.value = 'Please enter a positive integer';
        return false;
    }
    return true;
}

function initializeGame() {
    generateRandomNumber();
    guessTimes.innerText = 'Guesses: 50';

    input.value = '';
    input.disabled = false;
    input.style.cursor = 'pointer';
    output.value = '';
    playButton.innerText = 'Play';
    guessButton.style.cursor = 'pointer';
}

function endGame() {
    input.value = '';
    input.disabled = true;
    input.style.cursor = 'not-allowed';
    playButton.innerText = 'Play again';
    guessButton.style.cursor = 'not-allowed';
    playButton.style.cursor = 'pointer';
}

function checkNumber() {
    const userGuess = parseInt(input.value.trim(), 10);

    if (!validateInput(input.value)) return; 

    if (userGuess > randomNumber) {
        output.value = 'My number is smaller';
    } else if (userGuess < randomNumber) {
        output.value = 'My number is bigger';
    } else {
        output.value = 'You are right!';
        endGame(); 
    }
}

function startGame() {
    initializeGame();
    input.focus();
    playButton.style.cursor = 'not-allowed';

    let times = 50;

    guessButton.addEventListener('click', function(event) {
        if (!input.disabled) {
            if(times > 0) {
                checkNumber(input.value);
                times--;
                guessTimes.innerText = `Guesses: ${times}`;
                input.value = '';
                input.focus();
            } else if(times === 0) {
                guessTimes.innerText = `Guesses: ${times}`;
                endGame();
            }
        }
    });
}

playButton.addEventListener('click', () => {
    startGame();
});