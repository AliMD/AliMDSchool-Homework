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

  let moveBoxTimer;
  let boxIndex = -1;
  let moveNextBoxTimer;
  let score = 0;
  let gamePoint = {
    rundColor: () => {
      let maxVal = 0xffffff;
      let randomNumber = Math.floor(Math.random() * maxVal);
      randomNumber = randomNumber.toString(16);
      let randCl = randomNumber.padStart(6, 0);
      return `#${randCl.toUpperCase()}`;
    },

    startGame: () => {
      // console.log("startGame");
      startGameBtn.classList.add("hide");
      gameContainer.classList.remove("hide");
      inputSetTimer.classList.add("hide");
      gameEnd.classList.add("hide");

      gamePoint.updateScore(0);
      for (const box of boxArr) {
        box.addEventListener("click", gamePoint.boxClick);
      }
      gamePoint.moveNextBox();
      gamePoint.timerValueGame();
    },
    boxClick: function () {
      gamePoint.updateScore(1);
      gamePoint.moveBox(this);
    },
    rand: (max) => Math.floor(Math.random() * max),
    moveBox: (box) => {
      // console.log("moveBox");
      box.classList.add("hide");
      moveBoxTimer = setTimeout(() => {
        box.style.left = gamePoint.rand(90) + "%";
        box.style.top = gamePoint.rand(90) + "%";
        box.style.backgroundColor = gamePoint.rundColor();
        box.classList.remove("hide");
      }, 200);
    },
    moveNextBox: () => {
      boxIndex++;
      if (boxIndex >= boxArr.length) {
        boxIndex = 0;
      }
      gamePoint.moveBox(boxArr[boxIndex]);
      moveNextBoxTimer = setTimeout(
        gamePoint.moveNextBox,
        gamePoint.rand(500) + 200
      );
    },
    updateScore: (addScore) => {
      score += addScore;
      scoreValueElement.innerHTML = score;
    },
    pauseGame: () => {
      // console.log("pauseGame");
      clearTimeout(moveNextBoxTimer);
      clearTimeout(moveBoxTimer);

      for (const box of boxArr) {
        box.classList.add("hide");
      }
      pauseGameBtn.classList.add("hide");
      continueGamebtn.classList.remove("hide");
    },
    continueGame: () => {
      // console.log("continueGame");
      gamePoint.moveNextBox();

      pauseGameBtn.classList.remove("hide");
      continueGamebtn.classList.add("hide");
    },
    timerValueGame: () => {
      let sec = parseInt(document.querySelector(".set-timer").value);
      let timer = setInterval(function () {
        timerValue.innerHTML = "00:" + sec;
        sec--;
        if (sec < 0) {
          clearInterval(timer);
          gamePoint.pauseGame();
          gamePoint.endGame();
        }
      }, 1000);
    },
    endGame: () => {
      startGameBtn.classList.add("hide");
      gameContainer.classList.add("hide");
      inputSetTimer.classList.add("hide");
      gameEnd.classList.remove("hide");
      scoreEndGame.innerHTML = score;
    },
    resetGame: () => {
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
      gamePoint.updateScore(0);
    },
  };

  startGameBtn.addEventListener("click", gamePoint.startGame);
  pauseGameBtn.addEventListener("click", gamePoint.pauseGame);
  continueGamebtn.addEventListener("click", gamePoint.continueGame);
  resetGameBtn.addEventListener("click", gamePoint.resetGame);
})();
