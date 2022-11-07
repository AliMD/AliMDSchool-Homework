(() => {
  "use strict";

  const startGameBtn = document.querySelector(".game-start");
  const pauseGameBtn = document.querySelector("#pause");
  const continueGamebtn = document.querySelector("#continue");
  const gameContainer = document.querySelector(".game-container");
  const scoreValueElement = document.querySelector(".score-value");
  const inputSetTimer = document.querySelector(".set-timer");
  const boxArr = document.querySelectorAll(".box");
  const gameEnd = document.querySelector(".end-game");
  const scoreEndGame = document.querySelector(".emtiaz-score");
  const resetGameBtn = document.querySelector(".start-again");
  const timerValue = document.querySelector(".timer-value");
  // const colorArr = [
  //   "#f44336",
  //   "#9c27bo",
  //   "#673ab7",
  //   "#3f51b5",
  //   "#2196f3",
  //   "#00bcd4",
  //   "#ff9800",
  //   "#795548",
  //   "#ff5722",
  // ];
  const rundColor = () => {
    let maxVal = 0xffffff;
    let randomNumber = Math.floor(Math.random() * maxVal);
    randomNumber = randomNumber.toString(16);
    let randCl = randomNumber.padStart(6, 0);
    return `#${randCl.toUpperCase()}`;
  };
  const startGame = () => {
    // console.log("startGame");
    startGameBtn.classList.add("hide");
    gameContainer.classList.remove("hide");
    inputSetTimer.classList.add("hide");
    gameEnd.classList.add("hide");

    updateScore(0);
    for (const box of boxArr) {
      box.addEventListener("click", boxClick);
    }
    moveNextBox();
    timerValueGame();
  };
  const boxClick = function () {
    updateScore(1);
    moveBox(this);
  };

  let moveBoxTimer;
  const rand = (max) => Math.floor(Math.random() * max);
  const moveBox = (box) => {
    // console.log("moveBox");
    box.classList.add("hide");
    moveBoxTimer = setTimeout(() => {
      box.style.left = rand(90) + "%";
      box.style.top = rand(90) + "%";
      box.style.backgroundColor = rundColor();
      box.classList.remove("hide");
    }, 200);
  };
  let boxIndex = -1;
  let moveNextBoxTimer;
  const moveNextBox = () => {
    boxIndex++;
    if (boxIndex >= boxArr.length) {
      boxIndex = 0;
    }
    moveBox(boxArr[boxIndex]);
    moveNextBoxTimer = setTimeout(moveNextBox, rand(500) + 200);
  };
  let score = 0;
  const updateScore = (addScore) => {
    score += addScore;
    scoreValueElement.innerHTML = score;
  };
  const pauseGame = () => {
    // console.log("pauseGame");
    clearTimeout(moveNextBoxTimer);
    clearTimeout(moveBoxTimer);

    for (const box of boxArr) {
      box.classList.add("hide");
    }
    pauseGameBtn.classList.add("hide");
    continueGamebtn.classList.remove("hide");
  };
  const continueGame = () => {
    // console.log("continueGame");
    moveNextBox();

    pauseGameBtn.classList.remove("hide");
    continueGamebtn.classList.add("hide");
  };

  const timerValueGame = () => {
    let sec = parseInt(document.querySelector(".set-timer").value);
    let timer = setInterval(function () {
      timerValue.innerHTML = "00:" + sec;
      sec--;
      if (sec < 0) {
        clearInterval(timer);
        pauseGame();
        endGame();
      }
    }, 1000);
  };
  const endGame = () => {
    startGameBtn.classList.add("hide");
    gameContainer.classList.add("hide");
    inputSetTimer.classList.add("hide");
    gameEnd.classList.remove("hide");
    scoreEndGame.innerHTML = score;
  };
  const resetGame = () => {
    startGameBtn.classList.remove("hide");
    gameContainer.classList.add("hide");
    inputSetTimer.classList.remove("hide");
    gameEnd.classList.add("hide");
    for (const box of boxArr) {
      box.classList.add("hide");
    }
    clearTimeout(moveNextBoxTimer);
    clearTimeout(moveBoxTimer);
    score = 0;
    updateScore(0);
  };
  startGameBtn.addEventListener("click", startGame);
  pauseGameBtn.addEventListener("click", pauseGame);
  continueGamebtn.addEventListener("click", continueGame);
  resetGameBtn.addEventListener("click", resetGame);
})();
