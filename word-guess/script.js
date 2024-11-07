const words = [
  {
    title: "CARROT",
    hint: "A vegetable.",
  },
  {
    title: "KALEIDOSCOPE",
    hint: "A toy that creates effects visible through an eyehole.",
  },
  {
    title: "WORCESTERSHIRE",
    hint: "Both a sauce and a county in England."
  },
  {
    title: "WINDOWS",
    hint: "An operating system."
  },
  {
    title: "JAVASCRIPT",
    hint: "This game was made with this programming language."
  },
  {
    title: "ORANGE",
    hint: "A fruit."
  },
  {
    title: "BENIHANA",
    hint: "A skateboard trick."
  },
  {
    title: "OBLIVION",
    hint: "The state of being forgotten."
  },
  {
    title: "LIECHTENSTEIN",
    hint: "Longest country name with one word."
  }
];

const keyboard_letters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

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
const timeLeft = document.querySelector(".seconds");
const letterContainer = document.querySelector(".letter-container");
const keyboardLayout = document.querySelector(".keyboard-layout");
const gameStatus = document.querySelector(".game-status");
const triesCount = document.querySelector(".tries-count");

// Game status
let randomWord = 3 /*Math.floor(Math.random() * words.length)*/;
let tries = 4;
let gameEnded = false;
let score = 0;

function changeMenu(element1, element2) {
  element1.classList.add("invisible");
  element2.classList.remove("invisible");
  console.log("test");
}

function renderWord(words) {
  //wordTitle.innerText = words[0].title;
  wordHint.innerText = words[randomWord].hint;
  for (const _letter of words[randomWord].title) {
    const letterKey = `<span class="letter-word invisible-letter"></span>`;
    letterContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="letter-position">${letterKey}</div>`
    );
  }
}

// TODO: Refatorar essa tristeza.
function renderKeyboard(letters) {
  let rowCount = 0;
  for (let row of letters) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add(`keyboard-row-${rowCount}`);
    keyboardLayout.appendChild(rowDiv);
    for (let letter of row) {
      rowDiv.insertAdjacentHTML(
        "beforeend",
        `<div class="keyboard-letter">${letter.toUpperCase()}</div>`
      );
    }
    rowCount++;
  }

  document.querySelectorAll(".keyboard-letter").forEach((elm) =>
    elm.addEventListener(
      "click",
      (e) => {
        checkTry(words[randomWord], e.target.innerText);
        e.target.classList.add("tried");
      },
      { once: true }
    )
  );
}

function checkTry(randomWord, letterKey) {
  const allLetters = document.querySelectorAll(".letter-word");
  const invisibleLetters = document.querySelectorAll(".invisible-letter");

  if (randomWord.title.includes(letterKey) && !gameEnded && tries >= 1) {
    allLetters.forEach((elm, ind) => {
      if (elm.classList.contains("invisible-letter") && randomWord.title.at(ind) == letterKey) {
        elm.innerText = letterKey;
        elm.classList.remove("invisible-letter");
      }
    });

    return;
  }

  if (invisibleLetters.length <= 1 && tries >= 1) {
    gameWin(randomWord);
  }

  tries--;
  triesCount.innerText = tries;

  if (tries <= 0) {
    gameOver(randomWord);
  }
}

function gameOver(randomWord) {
  const allLetters = document.querySelectorAll(".letter-word");
  const allLettersPosition = document.querySelectorAll(".letter-position");

  allLetters.forEach((elm) => {
    if (elm.classList.contains("invisible-letter")) {
      elm.classList.remove("invisible-letter");
    }
  })

  allLettersPosition.forEach((elm, ind) => {
    if (elm.textContent == ""){
        elm.classList.add("missed-letter");
        elm.textContent = randomWord.title.at(ind);
    }
  }
);

  gameStatus.innerText = "Game Over.";
  gameEnded = true;
  lockKeyboard();
}

function gameWin() {
  const allLettersPosition = document.querySelectorAll(".letter-position");

  allLettersPosition.forEach((elm) => {
    elm.classList.add("correct-letter");
  });

  gameStatus.innerText = "You won!";
  gameEnded = true;
  lockKeyboard();
}

function lockKeyboard() {
  document
    .querySelectorAll(".keyboard-letter")
    .forEach((e) => e.classList.add("tried"));
}

function startTimer(){
    let seconds = 10;

    const timer = setInterval(() => {

        if (gameEnded){
            clearInterval(timer);
            return;
        }

        seconds--;
        timeLeft.innerText = seconds;

        if (seconds == 0){
            gameOver(words[randomWord]);
        }

    }, 1000);
}

instructionsButton.addEventListener("click", () => {
  changeMenu(mainMenu, gameInstructions);
});

returnMenuButton.addEventListener("click", () => {
  changeMenu(gameInstructions, mainMenu);
});

startButton.addEventListener("click", () => {
  changeMenu(mainMenu, gameMain);
  triesCount.innerText = tries;
  renderWord(words);
  renderKeyboard(keyboard_letters);
  gameEnded = false;
  startTimer();
});