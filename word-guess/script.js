const words = [
    {
        title: "CARROT",
        hint: "A vegetable.",
    },
    {
    
        title: "KALEIDOSCOPE",
        hint: "A toy that creates effects visible through an eyehole.",
    }
]

const keyboard_letters = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

// Main Menu
const instructionsButton = document.querySelector(".instructions-game");
const returnMenuButton = document.querySelector(".return-menu");
const startButton = document.querySelector(".start-button");
const mainMenu = document.querySelector(".main-menu");
const gameMain = document.querySelector(".game-main");
const gameInstructions = document.querySelector(".game-instructions");

// Game render
const wordTitle = document.querySelector(".word");
const wordHint = document.querySelector(".hint");
const letterContainer = document.querySelector(".letter-container")
const keyboardLayout = document.querySelector(".keyboard-layout");
const gameStatus = document.querySelector(".game-status");
const triesCount = document.querySelector(".tries-count");

let randomWord = 1;
let tries = 6
let gameEnded = false;

function changeMenu(element1, element2){
    element1.classList.add("invisible");
    element2.classList.remove("invisible");
    console.log("test");
}

function renderWord(words){
    //wordTitle.innerText = words[0].title;
    wordHint.innerText = words[randomWord].hint;
    for (const letter of words[randomWord].title){
        const letterKey = `<span class="letter-word invisible-letter">${letter}</span>`;
        letterContainer.insertAdjacentHTML('beforeend', `<div class="letter-position">${letterKey}</div>`)
    }
}

// TODO: Refatorar essa tristeza.
function renderKeyboard(letters){
    let rowCount = 0;
    for (let row of letters){
        const rowDiv = document.createElement('div');
        rowDiv.classList.add(`keyboard-row-${rowCount}`)
        keyboardLayout.appendChild(rowDiv);
        for(let letter of row){
            rowDiv.insertAdjacentHTML('beforeend', `<div class="keyboard-letter">${letter.toUpperCase()}</div>`);
        }
        rowCount++;
    }

    document.querySelectorAll('.keyboard-letter').forEach(elm => elm.addEventListener('click', (e) => {
        checkTry(words[randomWord], e.target.innerText);
        e.target.classList.add('tried');
    }, {once: true}));
};

function checkTry(randomWord, letterKey){
    const invisibleLetters = document.querySelectorAll('.invisible-letter');

    if (randomWord.title.includes(letterKey) && !gameEnded){
        invisibleLetters.forEach(elm => {
            if (elm.classList.contains('invisible-letter') && elm.textContent == letterKey){
                elm.classList.remove('invisible-letter');
            }
        })
        return;
    }

    tries--;
    triesCount.innerText = tries;
    if (tries == 0){
        gameOver();
    }
}

function gameOver(){
    const allLetters = document.querySelectorAll('.letter-position');

    allLetters.forEach(elm => {
        if(elm.classList.contains('invisible-letter')){
           elm.classList.remove('invisible-letter');
           elm.classList.add('missed-letter');
        }
    })

    gameStatus.innerText = "Game Over.";
    gameEnded = true;
    document.querySelectorAll('.keyboard-letter').forEach(e => e.classList.add('tried'));
}

instructionsButton.addEventListener('click', () => {
    changeMenu(mainMenu, gameInstructions);
})

returnMenuButton.addEventListener('click', () => {
    changeMenu(gameInstructions, mainMenu);
})

startButton.addEventListener('click', () => {
    changeMenu(mainMenu, gameMain);
    triesCount.innerText = tries;
    renderWord(words);
    renderKeyboard(keyboard_letters);
});