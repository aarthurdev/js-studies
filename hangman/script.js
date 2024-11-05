const words = [
    {
    title: "CARROT",
    hint: "A vegetable."
    },
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
let randomWord = 0;
let tries = 0;


function changeMenu(element1, element2){
    element1.classList.add("invisible");
    element2.classList.remove("invisible");
    console.log("test");
}

function renderWord(words){
    //wordTitle.innerText = words[0].title;
    wordHint.innerText = words[0].hint;
    for (const letter of words[0].title){
        const letterKey = `<span class="invisible-letter">${letter}</span>`;
        letterContainer.insertAdjacentHTML('beforeend', `<div class="letter-position">${letterKey}</div>`)
    }
}

function renderKeyboard(letters){
    let rowCount = 0;
    for (let row of letters){
        const rowDiv = document.createElement('div');
        rowDiv.classList.add(`keyboard-row-${rowCount}`)
        keyboardLayout.appendChild(rowDiv);
            for(let letter of row){
                rowDiv.insertAdjacentHTML("beforeend", `<div class="keyboard-letter">${letter.toUpperCase()}</div>`);
            }
        document.querySelectorAll('.keyboard-letter').forEach(elm => elm.addEventListener('click', (e) => {
                checkTry(words[randomWord], e.target.innerText);
            }))
        rowCount++;
    }

    
};

function checkTry(randomWord, letterKey){
    const invisibleLetters = document.querySelectorAll('.invisible-letter');
    const allLetters = document.querySelectorAll('.letter-position');

    if (randomWord.title.includes(letterKey)){
        invisibleLetters.forEach((elm, ind) => {

            if (elm.classList.contains('invisible-letter') && elm.textContent == letterKey){
                console.log('a');
                elm.classList.remove('invisible-letter');
                allLetters[ind].classList.add("tried");
            }
        })
    }
    console.log(tries);
    return;
}

instructionsButton.addEventListener('click', () => {
    changeMenu(mainMenu, gameInstructions);
})

returnMenuButton.addEventListener('click', () => {
    changeMenu(gameInstructions, mainMenu);
})

startButton.addEventListener('click', () => {
    changeMenu(mainMenu, gameMain);
    renderWord(words);
    renderKeyboard(keyboard_letters);
});