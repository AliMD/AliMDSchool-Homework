(() => {
  'use strict';
  const startGameBtn = document.querySelector('.start-game');
  const pauseGameBtn = document.querySelector('#pauseGame');
  const resetGameBtn = document.querySelector('.reset');
  const resumeGameBtn = document.querySelector('.resume');
  const exitGameBtn = document.querySelector('.exit');
  const scoreInMenu = document.querySelector('.menu-score');
  const hardGameBtn = document.querySelector('.hard');
  const easyGameBtn = document.querySelector('.easy');

  const menucontainer = document.querySelector('.menu-game');
  const gameContainer = document.querySelector('.game-container');
  const scoreContainer = document.querySelector('.score-container');
  const scoreValueElemet = document.querySelector('.score-value');
  const startGameContainer = document.querySelector('.start-game-container');
  // const box = document.querySelector('.box');
  const boxArr = document.querySelectorAll('.box');
  const boxBomb = document.querySelectorAll('.bomb');

  const colorArr = ['#40ad3d', '#a2a628', '#44ff00', '##20ba81', '#28678f', '#201d73', '#5911bd', '#9a2aad', '#991572', '#f00c27'];

  let initScore = 10;
  const startGame = () => {
    console.log('Start Game');
    startGameContainer.classList.add('hide');
    gameContainer.classList.remove('hide');
    scoreContainer.classList.remove('hide');
    pauseGameBtn.classList.remove('hide');

    updatescore(initScore); // for drawing in first
    document.body.style.backgroundColor = "white";
    /*for (const box of boxArr) { 
      let isFirst = true;//clickable all elements of array
      if (isFirst) { 
        console.log(isFirst);
        isFirst = flase;
        continue;
      }
      box.addEventListener('click', boxclick);
      box.style.opacity = 1;
    }*/

    for (let i = 0; i < boxArr.length; i++) {
      const box = boxArr[i];
      if (i === 0) {
        box.addEventListener('click', bombclick);
        continue;
        boxBomb.style.opacity = 1;
      }
      box.addEventListener('click', boxclick);
      box.style.opacity = 1;
    }

    //setInterval(moveNextBox, 300);  //use another method for changing interval every time -- use settimeout in moveNextBox{}
    moveNextBox();
  };

  const pauseGame = () => {
    console.log('Pause Game');
    clearTimeout(moveNextBoxTimer);
    clearTimeout(moveBoxTimer);
    for (const box of boxArr) {
      //box.classList.add('hide');
      box.style.opacity = .1;
    }
    menucontainer.classList.remove('hide');
    scoreContainer.classList.add('hide');
    pauseGameBtn.classList.add('hide');

    //show score in menu
    scoreInMenu.innerHTML = (`امتیاز = ${score}`);

  };

  const resumeGame = () => {
    console.log('resume Game');
    menucontainer.classList.add('hide');
    startGameContainer.classList.add('hide');
    gameContainer.classList.remove('hide');
    scoreContainer.classList.remove('hide');
    pauseGameBtn.classList.remove('hide');
    document.body.style.backgroundColor = "white";
    moveNextBox();
    for (const box of boxArr) {
      //box.classList.add('hide');
      box.style.opacity = 1;
    }
  };

  const resetGame = () => {
    console.log('reset Game');
    score = initScore;
    for (const box of boxArr) {  //clickable all elements of array
      // box.addEventListener('click', boxclick);
      box.classList.add('hide');
    }
    resumeGame();
  };


  const boxclick = function () {  //beacuase use 'this', have to use function and can,t use arrow function
    // console.log('boxclick');
    updatescore(10);
    moveBox(this);  // 'this' refer to clicked box
  }

  const bombclick = function () {  //beacuase use 'this', have to use function and can,t use arrow function
    // console.log('boxclick');  
    document.body.style.backgroundColor = "red";
    setTimeout(() => { document.body.style.backgroundColor = "white"; }, 100);
    if (score > 0) {
      updatescore(-10);
      moveBox(this);  // 'this' refer to clicked box   
    } else {
      gameover();
    }
  }

  const exit = () => {
    console.log('Exit');
    score = 0;
    clearTimeout(moveNextBoxTimer);
    clearTimeout(moveBoxTimer);

    menucontainer.classList.add('hide');
    startGameContainer.classList.remove('hide');
    gameContainer.classList.add('hide');
    // exit();
  };

  const gameover = () => {
    alert('GameOver');
    console.log('Gameover');
    exit();
  };


  //Random function
  const rand = max => Math.floor(Math.random() * max);

  let moveBoxTimer;
  let speed = 500;

  const moveBox = (box) => {
    //console.log('Move Box');
    box.classList.add('hide'); //for opacity transition effect
    //wait for 150ms and run codes -define function inner >>  ()=>{codes}
    moveBoxTimer = setTimeout(() => {
      box.style.left = rand(90) + '%';
      box.style.top = rand(90) + '%';
      box.style.backgroundColor = colorArr[rand(colorArr.length)];
      box.classList.remove('hide');
      updatescore(-1);
      if (score < 0) {
        gameover();
      }
    }, 150);

  };

  let boxIndex = -1;
  let moveNextBoxTimer;

  const moveNextBox = () => {
    //console.log('moveNextBox');
    boxIndex++;
    if (boxIndex >= boxArr.length) {
      boxIndex = 0;
    };
    moveBox(boxArr[boxIndex]);
    moveNextBoxTimer = setTimeout(moveNextBox, rand(speed) + 50);
  };

  // boxArr.addEventListener('click',startGame);
  let score = 0;
  const updatescore = (addscore) => {
    //console.log('updatescore');
    score += addscore;
    scoreValueElemet.innerHTML = score;
  };

  const difficultyEasy = () => {
    speed = 700;
    initScore = 20;
    console.log('Easy Mode >> speed = %s - Init Bones = %s', speed, initScore);

    //resize boxes
    for (const box of boxArr) {  //clickable all elements of array
      box.style.width = 5 + 'em';
      box.style.hight = 5 + 'em';
    }
    startGame();
  };

  const difficultyHard = () => {
    speed = 200;
    initScore = 5;
    console.log('Hard Mode >> speed = %s - Init Bones = %s', speed, initScore);
    //resize boxes
    for (const box of boxArr) {
      box.style.width = 2 + 'em';
      box.style.hight = 2 + 'em';
    }
    startGame();
  };

  startGameBtn.addEventListener('click', startGame);
  pauseGameBtn.addEventListener('click', pauseGame);
  resumeGameBtn.addEventListener('click', resumeGame);
  resetGameBtn.addEventListener('click', resetGame);
  exitGameBtn.addEventListener('click', exit);

  easyGameBtn.addEventListener('click', difficultyEasy);
  hardGameBtn.addEventListener('click', difficultyHard);


})();
