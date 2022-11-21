(() => {
    'use strict';

    const startGameBtn = document.querySelector('.start-game');//start
    const pauseGameBtn = document.querySelector('.pause');//pause
    const contGameBtn = document.querySelector('#continue');//continue
    const gameContainer = document.querySelector('.game-container'); //game container
    const boxArr = document.querySelectorAll('.box');//game cube var
    const colorArr = ['#F44336', '#F48FB1', '#CE93D8', '#4A148C', '#2962FF', '#4FC3F7', '##689F38', '#F57F17', '#F9A825'];//cubes colors arr
    const scoreValue = document.querySelector('.score-value');//scorecounter
    const endGameBtn = document.querySelector('.end');//endGame
    const lastPage = document.querySelector('.end-page');//last page
    const resetGameBtn = document.querySelector('.reset');//reset game
    const win = document.getElementById('win');//win gamePage
    const seconds = document.querySelector('.sec');
    const minutes = document.querySelector('.min');
    const lost = document.querySelector('.lose');

    // let dificallity;
    let timerInterval;
    const startGame = () => {
        //console.log('startGame');
        // dificallity = prompt('enter 1-300');
        startGameBtn.classList.add('hide');
        gameContainer.classList.remove('hide');
        
        updateScore(0);//updateing score func call

        //box of boxArr means a for loop start at 0 and go till i < boxArr.lenght
        for (const box of boxArr){
            box.addEventListener('click', boxClick);
        };//a for loop for check click and call boxClick func

        moveNextBox();//use this func here to can randomise game dificallity
        gameTimer();//start timer
    };


    const boxClick = function() {
        // console.log("boxClick");
        updateScore(1);
        moveBox(this);//attension that THIS just works in a function() and arrow functions can not support THIS

    };//a function to update score and moveBox when call in startGame func

    const rand = max => Math.floor( Math.random() * max );//a func to use Math.random easier and we can use it as func in global scope


    const moveBox = (box) => {
        console.log('moveBox');
        box.style.left = rand(90) + "%";
        box.style.top = rand(90) + "%";
        box.style.backgroundColor = colorArr[rand(colorArr.length)];
        box.classList.remove('hide');
    };// a function for moving game cubes


    let boxIndex = -1;
    let lastTimerId;
    const moveNextBox = () => {
        // console.log('moveNextBox');
        boxIndex++;
        if (boxIndex >= boxArr.length) boxIndex = 0;
        moveBox(boxArr[boxIndex]);

        lastTimerId = setTimeout(moveNextBox, rand(300) + 200);//it helps to randomising game dificallity
        // lastTimerId = setTimeout(moveNextBox, dificallity + 100);
    };// a function to go to the next after finishing the cubes

    let score = 0;
    const updateScore = (addScore) => {
        // console.log('updateScore');
        score += addScore;
        scoreValue.innerHTML = score;
        if(score===20) winGame();//score to call winGame
    };// a func to updating score


    const pauseGame = () => {
        // console.log('pauseGame');


        clearTimeout(lastTimerId);
        clearTimeout(timerInterval);


        for (const box of boxArr) {
            box.classList.add('hide');
        };//hiding game cubes


        pauseGameBtn.classList.add('hide');
        contGameBtn.classList.remove('hide');
        endGameBtn.classList.remove('hide');
        resetGameBtn.classList.remove('hide');
    };//func for pausing game


    const contGame = () => {
        // console.log('contGame');
        moveNextBox();
        gameTimer();

        contGameBtn.classList.add('hide');
        pauseGameBtn.classList.remove('hide');
        endGameBtn.classList.add('hide');
        resetGameBtn.classList.add('hide');    
    };//func for continue game


    const endGame = () => {
        // console.log('endGame');

        gameContainer.classList.add('hide');
        lastPage.classList.remove('hide');
    };//func for ending game


    const resetGame = () => {
        // console.log('resetGame');

        pauseGameBtn.classList.remove('hide');
        contGameBtn.classList.add('hide');
        endGameBtn.classList.add('hide');
        resetGameBtn.classList.add('hide');

        sec = 0;
        min = 0;
        score = 0;


        startGame();
    };//func for reset game


    const winGame = () => {
        // console.log('winGame');

        clearTimeout(lastTimerId);


        win.classList.remove('hide');
        gameContainer.classList.add('hide');
    }//func for winning game


    let min = 0;
    let sec = 0;
    const gameTimer = () => {
        minutes.innerHTML = min;
        seconds.innerHTML = sec;
        sec++;
        if (sec===60){
            sec = 0;
            min =+ 1;
        };
        if (sec===30 && score<=19){
            console.log('lose');
            
            gameContainer.classList.add('hide');
            lost.classList.remove('hide');
        };


        timerInterval = setTimeout(gameTimer, 1000);
    };


    startGameBtn.addEventListener('click', startGame);//for starting game =)
    pauseGameBtn.addEventListener('click', pauseGame);//for pausing game
    contGameBtn.addEventListener('click', contGame);//for resuming game
    endGameBtn.addEventListener('click', endGame);//for ending game
    resetGameBtn.addEventListener('click', resetGame);//for reseting game
})();
