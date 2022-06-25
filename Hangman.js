let keyboard = document.querySelector('.keyboard')
let WordSpotted = document.querySelector('.spotted-word')
let WrongLetter = document.querySelector('.mistake')
let hangmanImage = document.querySelector('#hangman')
let resetBTN = document.querySelector('.reset')
let gameSituation = document.querySelector('#game-situation')

let programming_languages = [
    'java',
    'javascript',
    'c',
    'sql',
    'golang',
    'python',
    'php',
    'kotlin',
    'ruby',
    'swift',
    'react',
    'rust',
    'cobol',
    'pascal',
    'fortran',
    'elixir',
]

let answer = ''
let guesses = []
let wordPopped
let mistakes = 0

//Generate a random word
function generateRandomWord() {
    answer =
        programming_languages[
            Math.floor(Math.random() * programming_languages.length)
        ]
}
generateRandomWord()

//Generate all the buttons
function generateAlphabetBTNS() {
    let letters = 'abcdefghijklmnopqrstuvxwyz'
        .split('')
        .map(
            letter =>
                `<button class='keyboardStyle' id="` +
                letter +
                `" onClick = "check_Correct_Letter('` +
                letter +
                `')"> ` +
                letter +
                `</button>`
        )
        .join('')

    keyboard.innerHTML = letters
}
generateAlphabetBTNS()

//Check if letter matches the answer
function check_Correct_Letter(clickedLetter) {
    guesses.indexOf(clickedLetter) === -1 ? guesses.push(clickedLetter) : null
    let keyboardButton = document.getElementById(clickedLetter)
    keyboardButton.setAttribute('disabled', true)
    keyboardButton.style.backgroundColor = '#e63b02'

    if (answer.indexOf(clickedLetter) >= 0) {
        wordsPopOut()
        keyboardButton.style.backgroundColor = '#05e81f'
        checkVictory()
    } else {
        mistakes++
        checkLoss()
        hangmanImage.src = `./Hangman-pieces/hangman${mistakes}.png`
    }
}

//Check if game's won
function checkVictory() {
    if (answer === wordPopped) {
        gameSituation.innerHTML = 'You won!'
        keyboard.style.display = 'none'
    }
}

//Check if game's lost
function checkLoss() {
    WrongLetter.innerHTML = mistakes

    if (mistakes === 6) {
        gameSituation.innerHTML = 'You lost!'
        keyboard.style.display = 'none'
    }
}

//insert correct in the space
function wordsPopOut() {
    wordPopped = answer
        .split('')
        .map(letter => (guesses.indexOf(letter) >= 0 ? letter : ' _ '))
        .join('')
    WordSpotted.innerHTML = wordPopped
}
wordsPopOut()

//Reset game
resetBTN.addEventListener('click', () => {
    mistakes = 0
    guesses = []
    hangmanImage.src = `./Hangman-pieces/hangman${mistakes}.png`
    keyboard.style.display = 'grid'
    gameSituation.innerHTML = ''
    generateAlphabetBTNS()
    generateRandomWord()
    wordsPopOut()
    checkLoss()
})
