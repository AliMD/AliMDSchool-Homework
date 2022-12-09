(() => {
    'use strict';

    const startGameBtn = document.querySelector('.start-Game-container');
    const gameContainer = document.querySelector('.Game-container');
    const boxArr = document.querySelectorAll('.box');
    const colorArr = ['#f44336', '#673ab7', '#9C27B0', '#3F51B5', '#2196F3', '#FF9800'];
    const scoreValueElement = document.querySelector('.score-value');

    const startGame = () => {
        console.log('startGame');
        startGameBtn.classList.add('hide');
        gameContainer.classList.remove('hide');
        updateScore(0);

        for (const box of boxArr) {
            box.addEventListener('click', boxClick);
        };

        setInterval(moveNextBox, 500);
    };
    const boxClick = function () {
        updateScore(1);
        moveBox(this);
    };

    const rand = max => Math.floor(Math.random() * max);

    const moveBox = (box) => {
        box.classList.add('hide');
        setTimeout(() => {
            box.style.left = rand(90) + '%';
            box.style.top = rand(90) + '%';
            box.style.backgroundColor = colorArr[rand(colorArr.length)];
            box.classList.remove('hide');
        }, 100);
    };

    let boxIndex = -1;
    const moveNextBox = () => {
        boxIndex++
        if (boxIndex >= boxArr.length) {
            boxIndex = 0;
        }
        moveBox(boxArr[boxIndex]);
    };

    let score = 0;
    const updateScore = (addScore) => {
        score += addScore;
        scoreValueElement.innerHTML = score;
    };

    startGameBtn.addEventListener('click', startGame);
})();
