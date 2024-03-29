//page elements
const instructionModal = document.querySelector('#instructionModal');
const instructionCloseBtn = document.querySelector('.instructionClose');
const instructionsButton = document.querySelector('#instructionsButton');
const startButton = document.querySelector('.start');
const gameOverModal = document.querySelector('#gameOverModal');
const gameOverCloseBtns = document.querySelectorAll('.gameOverClose');
const boxes = document.querySelectorAll('.box');
const levelNumber = document.querySelector('.levelNum');
const playerName = document.querySelector('#name');
const submitName = document.querySelector('.submitName');
const playAgainButtons = document.querySelectorAll('.replayButton');
const leaderboardModal = document.querySelector('#leaderboardModal');
const leaderboardButtons = document.querySelectorAll('.leaderboardButton');
const leaderboardButton = document.querySelector('.leaderboardButton');
const leaderboardTable = document.querySelector('.leaderboardTable tbody');
const themeMusic = document.querySelector('.music');

let roundCounter = 0;
let patternLength = 4;
let speed = 1000;
let pattern = [];
let patternCounter = 0;
let boxesActive = false;

//function definitions
const openModal = (modal) => {
    modal.classList.add('open');
}

const closeModal = (modal) => {
    modal.classList.remove('open');
}

const gameOver = () => {
    boxesActive = false;
    openModal(gameOverModal);
    startButton.disabled = false;
}

const resetPattern = () => {
    pattern = [];
    roundCounter = 0;
    speed = 1000;
    patternLength = 4;
    patternCounter = 0;
    levelNumber.textContent = 'Level 1';
}

const  getRandBoxes = (patternLength) => {
    for (let i = 0; i < patternLength; i++) {
        pattern.push(Math.floor(Math.random() * 9));
    }
}

const lightDiv = (div, background) => {
    div.classList.add(background);
    const speedMultDisappear = 0.6;
    setTimeout(() => {
        div.classList.remove(background);
    }, speed * speedMultDisappear);
}

const displayPattern = (pattern, speed) => {
    for (let i = 0; i < pattern.length; i++) {
        let currentBox = boxes[pattern[i]];
        setTimeout(() => {
            lightDiv(currentBox, 'dogImg');
        }, speed * (i+1));
    }
    setTimeout(() => {
        boxesActive = true
    }, speed * (patternLength))
}

const startGame = () => {
    boxesActive = false
    themeMusic.play();
    getRandBoxes(patternLength);
    themeMusic.play();
    const speedMult = 0.5;
    if (roundCounter % 5 === 0 && roundCounter !== 0) {
        speed *= speedMult;
    }
    displayPattern(pattern, speed);
}

const nextRound = () => {
    patternCounter = 0;
    pattern = [];
    roundCounter++;
    levelNumber.textContent = 'Level ' + (roundCounter+1);
    if (roundCounter % 3 === 0){
        patternLength++;
    }
    startGame();
}

const addLeaderboardTable = (player, i) => {
    let tableRow = document.createElement('tr');
    let tableData = document.createElement('td');
    let tableDataTwo = document.createElement('td');
    let tableDataThree = document.createElement('td');
    leaderboardTable.appendChild(tableRow);
    if (i > 0 && i < 4) {
        let image = document.createElement('img');
        tableRow.appendChild(tableDataThree);
        tableDataThree.appendChild(image);
        if (i === 1) {
            image.src = 'firstPlaceRibbon.png';
        } else if (i === 2) {
            image.src = 'secondPlaceRibbon.png';
        } else if (i === 3) {
            image.src = 'thirdPlaceRibbon.png';
        }
    } else {
        tableRow.appendChild(tableDataThree).textContent = i;
    }
    tableRow.appendChild(tableData).textContent = player.name;
    tableRow.appendChild(tableDataTwo).textContent = player.score;
}
const getData = () => {
    fetch('https://leaderboard.dev.io-academy.uk/scores?game=MemoryDog').then(response => {
        return response.json();
    }).then(result => {
            let leaders = [];
            for (let i=0;i<10;i++){
                leaders.push(result.data.sort(function(a,b){return b.score-a.score})[i]);
                addLeaderboardTable(leaders[i], i+1);
            }
        }
    )}

const sendData = () => {
    fetch('https://leaderboard.dev.io-academy.uk/score',
        {
            method: 'POST',
            body: JSON.stringify({'game': 'MemoryDog', 'name': playerName.value, 'score': roundCounter}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
        return response.json();
    }).then(data => {
        leaderboardTable.innerHTML = '';
        getData();
        openModal(leaderboardModal);
    })
    resetPattern();
}

instructionsButton.addEventListener('click', () => {
    openModal(instructionModal);
})

instructionCloseBtn.addEventListener('click', () => {
    closeModal(instructionModal);
})

gameOverCloseBtns.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(instructionModal);
        closeModal(gameOverModal);
        closeModal(leaderboardModal);
    })
})

playAgainButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(gameOverModal);
        closeModal(leaderboardModal);
        startButton.disabled = true;
        resetPattern();
        startGame();
    })
})

leaderboardButtons.forEach(button => {
    button.addEventListener('click', () => {
        openModal(leaderboardModal);
        leaderboardTable.innerHTML = '';
        getData();
        closeModal(gameOverModal);
    })
})

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    resetPattern();
    startGame();
});

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (boxesActive) {
            if (box.id === 'box' + pattern[patternCounter]) {
                patternCounter++;
                lightDiv(box, "pawImg");
            } else {
                gameOver();
            }
            if (patternCounter === pattern.length && patternCounter !== 0) {
                setTimeout(nextRound, 500);
            }
        }
    })
    })

submitName.addEventListener('click', sendData);

