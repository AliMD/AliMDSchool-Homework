(() => {
  "use strict";

  const startGameBtn = document.querySelector(".start-game");
  const pauseGameBtn = document.querySelector("#pause");
  const continueGamebtn = document.querySelector("#continue");
  const gameContainer = document.querySelector(".game-container");
  const scoreValueElement = document.querySelector(".score-value");
  const boxArr = document.querySelectorAll(".box");
  const colorArr = [
    "#f44336",
    "#9c27bo",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#00bcd4",
    "#ff9800",
    "#795548",
    "#ff5722",
  ];

  const startGame = () => {
    // console.log("startGame");
    startGameBtn.classList.add("hide");
    gameContainer.classList.remove("hide");
    updateScore(0);
    for (const box of boxArr) {
      box.addEventListener("click", boxClick);
    }
    moveNextBox();
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
      box.style.backgroundColor = colorArr[rand(colorArr.length)];
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

  startGameBtn.addEventListener("click", startGame);
  pauseGameBtn.addEventListener("click", pauseGame);
  continueGamebtn.addEventListener("click", continueGame);
})();
