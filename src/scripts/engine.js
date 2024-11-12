const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
        bestScore: 0,
        canClick: true, // Nova flag para controlar cliques
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    },
};

function updateLives() {
    state.values.lives--;
    state.view.lives.textContent = state.values.lives;

    if (state.values.result > state.values.bestScore) {
        state.values.bestScore = state.values.result;
    }

    if (state.values.lives <= 0) {
        gameOver();
    } else {
        resetRound();
    }
}

function resetRound() {
    state.values.currentTime = 60;
    state.values.result = 0;
    state.values.canClick = true; // Reseta a flag de clique
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.currentTime;

    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function gameOver() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    saveScore(state.values.bestScore);

    const ranking = getTopScores();
    let message = `Game Over!\nSeu melhor score: ${state.values.bestScore}\n\nTop 5 Jogadores:\n`;
    ranking.forEach((score, index) => {
        message += `${index + 1}. ${score.playerName}: ${score.score} pontos\n`;
    });

    alert(message);

    if (confirm("Deseja jogar novamente?")) {
        resetGame();
    }
}

function resetGame() {
    state.values.lives = 3;
    state.values.bestScore = 0;
    state.values.canClick = true; // Reseta a flag de clique
    state.view.lives.textContent = state.values.lives;
    resetRound();
}

function saveScore(score) {
    const playerName = prompt("Digite seu nome para salvar a pontuação:");
    if (!playerName) return;

    let scores = JSON.parse(localStorage.getItem("gameScores")) || [];
    const existingScoreIndex = scores.findIndex(
        (item) => item.playerName === playerName
    );

    if (existingScoreIndex !== -1) {
        if (score > scores[existingScoreIndex].score) {
        scores[existingScoreIndex].score = score;
        scores[existingScoreIndex].date = new Date().toISOString();
        }
    } else {
        scores.push({
        playerName,
        score,
        date: new Date().toISOString(),
        });
    }

    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);

    localStorage.setItem("gameScores", JSON.stringify(scores));
}

function getTopScores() {
    return JSON.parse(localStorage.getItem("gameScores")) || [];
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        updateLives();
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
    state.values.canClick = true; // Reseta a flag de clique para cada novo quadrado
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition && state.values.canClick) {
            state.values.canClick = false; // Desabilita novos cliques
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
        }
        });
    });
}

function initialize() {
    state.view.lives.textContent = state.values.lives;
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    addListenerHitBox();
}

initialize();
