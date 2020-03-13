const words = ["truck", "apple", "green", "paper", "airplane", "basketball"];

//get ui elements
const wordEL = document.querySelector(".word");
const playEL = document.getElementById("play-game");
const buttonsEL = document.querySelector(".user-input").children;
const statusEL = document.getElementById("prompt");

//allow userto play new game!
playEL.addEventListener("click", newGame);

function newGame(e) {
  playEL.hidden = true;
  statusEL.textContent = "Category: Things";
  enableUserInput();
  displayWord();
  e.preventDefault();
}

function displayWord() {
  let word = words[Math.floor(Math.random() * words.length)];
  console.log(word);
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += "_____    ";
  }
  wordEL.innerHTML = html;
}

function enableUserInput() {
  console.log("user input enable");
  const buttons = Array.from(buttonsEL);
  buttons.forEach(button => {
    button.style = "visibility: visible";
    button.addEventListener("click", e => {
      if (button)
    });
  });
}
