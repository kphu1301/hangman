class UI {
  constructor() {
    this.playGameEl = document.querySelector(".play-btn");
    this.promptEl = document.querySelector("#prompt");
    this.containerEl = document.querySelector(".container");
  }
  showUnderscores(word) {
    const div = document.createElement("div");
    div.className = "word-container";

    let html = "";
    for (let i = 0; i < word.length; i++) {
      html += `
        <h1 class="word-letter letter-${word[i]} d-inline" id="letter-${i}">__&nbsp</h1>
      `;
    }
    div.innerHTML = html;
    this.containerEl.appendChild(div);
  }

  changeGuessState(button, state) {
    if (state === "initial") {
      button.dataset.status = state;
      button.classList.replace("btn-secondary", "btn-warning");
      button.classList.replace("btn-success", "btn-warning");
    } else if (state === "guessed") {
      button.classList.replace("btn-warning", "btn-secondary");
      button.dataset.status = "guessed";
    } else if (state === "correct") {
      button.classList.replace("btn-warning", "btn-success");
      button.dataset.status = "correct";
    }
  }

  gameOver(won, message) {
    const div = document.createElement("div");
    if (won) {
      div.className = "result-win alert alert-success";
    } else {
      div.className = "result-loss alert alert-danger";
    }
    div.appendChild(document.createTextNode(message));

    document
      .querySelector(".word-container")
      .insertAdjacentElement("beforebegin", div);

    setTimeout(() => {
      div.remove();
    }, 3000);
  }
  reveal(letter) {
    const letterDivs = document.querySelectorAll(`.letter-${letter}`);
    letterDivs.forEach(letterDiv => {
      letterDiv.innerHTML = `<u>${letter}</ul>`;
    });
  }

  showInputLetters() {
    const a = 65;
    const z = 65 + 25;

    const div = document.createElement("div");
    div.className = "input-letters";
    div.id = "input-letters";

    for (let i = a; i <= z; i++) {
      let button = document.createElement("button");
      button.className = "input-letter btn btn-warning border border-dark";
      button.id = String.fromCharCode(i);
      button.dataset.status = "false";
      button.textContent = button.id;

      button.addEventListener("click", guess);
      div.appendChild(button);
    }

    this.containerEl.appendChild(div);
  }
}

function guess(e) {
  if (numGuesses != 0) {
    // check guess
    if (e.target.dataset.status === "false") {
      let guess = false;
      for (let i = 0; i < word.length; i++) {
        if (word[i] === e.target.id) {
          //letter is correct, show matching letter
          ui.reveal(word[i]);
          guess = true;
        }
      }
      if (guess) {
        ui.changeGuessState(e.target, "correct");
        correctGuesses++;
        if (correctGuesses === word.length) {
          ui.gameOver(true, `Game Over, You Win with ${numGuesses} left!`);
        }
      } else {
        ui.changeGuessState(e.target, "guessed");
        numGuesses--;
        if (numGuesses == 0) {
          ui.gameOver(false, `Game Over, You Lose! Word was ${word}`);
        }
      }
    }
  }
  e.preventDefault();
}

const words = ["truck", "airplane", "basketball", "pizza"];
let numGuesses;
let correctGuesses;
const ui = new UI();

// play new game event
ui.playGameEl.addEventListener("click", startNewGame);
function startNewGame(e) {
  //hide new gae button
  ui.playGameEl.style = "display: none";
  ui.promptEl.textContent = "Category: Things";

  //get word
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();

  numGuesses = 6;
  correctGuesses = 0;
  console.log(word);

  //show word
  ui.showUnderscores(word);

  //show user input
  ui.showInputLetters();
}
