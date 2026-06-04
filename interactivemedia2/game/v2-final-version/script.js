(function () {
    "use strict";
    console.log("reading JS");

    const btnRoll = document.querySelector("#btn-roll");
    const btnPass = document.querySelector("#btn-pass");
    const dice1Img = document.querySelector("#dice1");
    const dice2Img = document.querySelector("#dice2");
    const score1Display = document.querySelector("#score1");
    const score2Display = document.querySelector("#score2");
    const turnIndicator = document.querySelector("#turn-indicator");
    const player1Section = document.querySelector("#player1");
    const player2Section = document.querySelector("#player2");
    const gameOverArea = document.querySelector("#game-over-area");
    const btnRestart = document.querySelector("#btn-restart");

    /* rule overlay elements */
    const btnRuleOpen = document.querySelector("#btn-rule-open");
    const btnRuleClose = document.querySelector("#btn-rule-close");
    const ruleOverlay = document.querySelector("#rule-overlay");

    /* game audio files */
    const soundRoll = new Audio("audio/diceroll.mp3");
    const soundWinCat = new Audio("audio/wincat.mp3");
    const soundLoseCat = new Audio("audio/losecat.mp3");

    /* game data tracking */
    const gameData = {
        diceImages: [
            "dice1.png", 
            "dice2.png", 
            "dice3.png", 
            "dice4.png", 
            "dice5.png", 
            "dice6.png"
        ],
        players: ["Player 1", "Player 2"],
        scores: [0, 0],
        currentTurnScore: 0,
        roll1: 0,
        roll2: 0,
        index: 0,
        gameEndScore: 29
    };

    /* open rule overlay */
    btnRuleOpen.addEventListener("click", function () {
        ruleOverlay.classList.remove("overlay-hidden");
    });

    /* close rule overlay */
    btnRuleClose.addEventListener("click", function () {
        ruleOverlay.classList.add("overlay-hidden");
    });

    /* roll dice trigger */
    btnRoll.addEventListener("click", function () {
        soundRoll.currentTime = 0;
        soundRoll.play();
        throwDice();
    });

    /* pass turn trigger */
    btnPass.addEventListener("click", function () {
        gameData.currentTurnScore = 0; 
        
        if (gameData.scores[gameData.index] > gameData.gameEndScore) {
            handleGameWin();
        } else {
            switchPlayer();
        }
    });

    /* restart game trigger */
    btnRestart.addEventListener("click", function () {
        resetGameDefaults();
    });

    /* main dice logic */
    function throwDice() {
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;

        dice1Img.src = `images/${gameData.diceImages[gameData.roll1 - 1]}`;
        dice2Img.src = `images/${gameData.diceImages[gameData.roll2 - 1]}`;
        dice1Img.alt = `Dice ${gameData.roll1}`;
        dice2Img.alt = `Dice ${gameData.roll2}`;

        const rollSum = gameData.roll1 + gameData.roll2;

        if (gameData.roll1 === 1 && gameData.roll2 === 1) {
            turnIndicator.innerHTML = "Snake Eyes! Score reset!";
            soundLoseCat.currentTime = 0;
            soundLoseCat.play();
            
            gameData.scores[gameData.index] = 0; 
            gameData.currentTurnScore = 0;
            
            updateScoreDisplay();
            disableButtonsTemporarily();
            
            setTimeout(function() {
                switchPlayer();
                enableButtons();
            }, 2000);
        }
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            turnIndicator.innerHTML = "Rolled a 1! Turn lost!";
            gameData.scores[gameData.index] -= gameData.currentTurnScore;
            gameData.currentTurnScore = 0; 
            
            updateScoreDisplay();
            disableButtonsTemporarily();
            
            setTimeout(function() {
                switchPlayer();
                enableButtons();
            }, 2000);
        }
        else {
            gameData.currentTurnScore += rollSum;
            gameData.scores[gameData.index] += rollSum;
            
            updateScoreDisplay();

            if (gameData.scores[gameData.index] > gameData.gameEndScore) {
                handleGameWin();
            } else {
                turnIndicator.innerHTML = `${gameData.players[gameData.index]}: +${rollSum} pts`;
            }
        }
    }

    /* swap active player */
    function switchPlayer() {
        gameData.index = gameData.index === 0 ? 1 : 0;
        turnIndicator.innerHTML = `${gameData.players[gameData.index]} Turn`;

        if (gameData.index === 0) {
            player1Section.classList.add("active-player");
            player2Section.classList.remove("active-player");
        } else {
            player1Section.classList.remove("active-player");
            player2Section.classList.add("active-player");
        }
    }

    /* sync html score display */
    function updateScoreDisplay() {
        score1Display.textContent = gameData.scores[0];
        score2Display.textContent = gameData.scores[1];
    }

    /* process game victory */
    function handleGameWin() {
        turnIndicator.innerHTML = `${gameData.players[gameData.index]} Wins the Game!`;
        soundWinCat.currentTime = 0;
        soundWinCat.play();
        disableButtonsTemporarily();
        btnRoll.style.opacity = "0.3";
        btnPass.style.opacity = "0.3";
        gameOverArea.classList.remove("hidden-element");
    }

    /* full game reset */
    function resetGameDefaults() {
        gameData.scores = [0, 0];
        gameData.currentTurnScore = 0;
        gameData.index = 0;
        
        updateScoreDisplay();
        enableButtons();
        
        btnRoll.style.opacity = "1";
        btnPass.style.opacity = "1";
        turnIndicator.innerHTML = "Player 1 Turn";
        
        dice1Img.src = "images/dice1.png";
        dice2Img.src = "images/dice2.png";
        
        player1Section.classList.add("active-player");
        player2Section.classList.remove("active-player");
        gameOverArea.classList.add("hidden-element");
    }

    /* stop button actions */
    function disableButtonsTemporarily() {
        btnRoll.disabled = true;
        btnPass.disabled = true;
    }

    /* restart button actions */
    function enableButtons() {
        btnRoll.disabled = false;
        btnPass.disabled = false;
    }

})();
