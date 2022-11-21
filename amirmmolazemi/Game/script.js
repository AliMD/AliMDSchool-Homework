(() => {
    'use strict';
    const starGameBtn = document.querySelector('.start-game');
    const pauseGameBtn = document.querySelector('#pause');
    const continueGameBtn = document.querySelector('#continue');
    const restartBtn= document.querySelector('.restart');
    const endGameBtn = document.querySelector('#end');
    const endPage = document.querySelector('.end-page');
    const winGameBtn = document.querySelector('#win');
    const loseGameBtn = document.querySelector('#lose');
    const gameContainer = document.querySelector('.game-container');
    const scoreValue = document.querySelector('.score-value');
    const timeSec = document.querySelector('#second');
    const timeMin = document.querySelector('#minute');
    const boxArr = document.querySelectorAll('.box');
    const colorArr =['#B069B2','#E28C10','#73842F','#683A3A','#0FEFE8','#DB1B84','#A016F2','#67B1F4','#1328EA','#0F6306','#FFC200','#FFC200','#EF1C00','#F9F7F7'];

    const startGame = () => {
        // console.log('startGame');
        starGameBtn.classList.add('hide');
        gameContainer.classList.remove('hide');


        for (const box of boxArr) {
            box.addEventListener('click' , boxClick );
        }

        updateScore(0);
        moveNextBox();
        timerGame();
    };

    const boxClick = function () {
        console.log('boxClick')
        updateScore(1);
        moveBox(this);
    };

    const rand = max => Math.floor( Math.random() * max );

    let moveBoxTimer;
    const moveBox = (box) => {
        // console.log('moveBox');
        box.classList.add('hide');
        moveBoxTimer = setTimeout(() => {
            box.style.left = rand(90) + '%';
        box.style.top = rand(90) + '%';
        box.style.backgroundColor = colorArr[rand(colorArr.length)];
        box.classList.remove('hide');
        }, 200);
    };

    let boxIndex = -1;
    let moveNextBoxTimer;
    const moveNextBox = () => {
        // console.log('moveNextBox');
        boxIndex++;
        if (boxIndex > boxArr.length-1) {
            boxIndex = 0;
        };
        moveBox(boxArr[boxIndex]);

        moveNextBoxTimer = setTimeout(moveNextBox, rand(300) + 200);
    };

    let score = 0;
    const updateScore = (addScore) => {
        console.log('updateScore');
        score += addScore;
        scoreValue.innerHTML = score;
    };

    const pauseGame = () => {
        console.log('PauseGame');

        clearTimeout(moveNextBoxTimer);
        clearTimeout(moveBoxTimer);
        clearInterval(timerId);

        for (const box of boxArr) {
            box.classList.add('hide');
        }

        pauseGameBtn.classList.add('hide');
        continueGameBtn.classList.remove('hide');
        endGameBtn.classList.remove('hide');
        restartBtn.classList.remove('hide')

    };

    const continueGame = () => {
        console.log('continueGame');
        moveNextBox();
        timerId = setTimeout(timerGame, 1000);

        pauseGameBtn.classList.remove('hide');
        continueGameBtn.classList.add('hide');
        endGameBtn.classList.add('hide');
        restartBtn.classList.add('hide');
    };
    
    const endGame = () => {
        console.log('endGame');
        endGameBtn.classList.add('hide');
        endPage.classList.remove('hide');
        gameContainer.classList.add('hide');
        restartBtn.classList.add('hide');

    };

    const restartGame = () => {
        console.log('restartGame');

        moveNextBox();
        score = 0
        timerId = setTimeout(timerGame, 1000);
        second = 0
        pauseGameBtn.classList.remove('hide');
        continueGameBtn.classList.add('hide');
        endGameBtn.classList.add('hide');
        restartBtn.classList.add('hide');
    };

    const winGame = () => {
        console.log('winGame');

        
        clearTimeout(moveNextBoxTimer);

        
        winGameBtn.classList.remove('hide');
        gameContainer.classList.add('hide');
    };

    const loseGame = () => {
        console.log('loseGame');

        clearTimeout(moveNextBoxTimer)

        loseGameBtn.classList.remove('hide');
        gameContainer.classList.add('hide');
    };

    let minute = 0;
    let second = 0;
    let timerId
    const timerGame = () => {
        // console.log('tik-tok');
        timeMin.innerHTML = minute;
        timeSec.innerHTML = second;
        timerId = setTimeout(timerGame, 1000);
        second++; 

        if (second === 60) {
            minute += 1;
            second = 0;
        };

        if (score >= 35 && minute === 1 && second === 1) {
            winGame();
        };

        if (score <= 35 && minute === 1) {
            loseGame();
        };
    };        
    

    starGameBtn.addEventListener('click', startGame )
    pauseGameBtn.addEventListener('click',  pauseGame)
    continueGameBtn.addEventListener('click', continueGame);
    endGameBtn.addEventListener('click', endGame);
    restartBtn.addEventListener('click', restartGame);


})();
