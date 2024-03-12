const modal = document.querySelector('#instructionModal');
const closeBtn = document.querySelector('.close');
const instructionsButton = document.querySelector('#instructionsButton')
const startButton =document.querySelector('.start')

closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
});

const openInstructionsModal = () => {
    modal.classList.add('open');
}

instructionsButton.addEventListener('click', openInstructionsModal);



// max's get pattern functions:

// const
let pattern = []
function getRandBoxes(boxCount) {
    let newArray = [];
    for (let i = 0; i < boxCount; i++) {
        newArray.push(Math.floor(Math.random() * 9))
    }
    pattern = newArray;
}

const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');
const box4 = document.querySelector('.box4');
const box5 = document.querySelector('.box5');
const box6 = document.querySelector('.box6');
const box7 = document.querySelector('.box7');
const box8 = document.querySelector('.box8');
const box9 = document.querySelector('.box9');
let boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

const lightDiv = (div, url) => {
    div.style.backgroundImage = url;
    setTimeout(() => {
        div.style.backgroundImage = 'none';
        div.style.backgroundColor = '';
    }, 500);
}

const displayPattern = (pattern) => {
    for (let i= 0; i<pattern.length; i++) {
        let currentBox = boxArray[pattern[i]];
        setTimeout(() => {
            lightDiv(currentBox, "url('dogim7redone!.png')");
        }, 1000*(i+1));
    }
}

startButton.addEventListener('click', () => {
    getRandBoxes(4);
    displayPattern(pattern);
    startButton.style.visibility= 'hidden';
})

let patternCounter = 0;

let boxes = document.querySelectorAll('.box')
for (let box of boxes) {
    box.addEventListener('click', () => {
        if (box.id === 'box' + pattern[patternCounter]) {
            console.log('correct')
            patternCounter ++;
            lightDiv(box, "url('blackPawPrintTransparentBackground.png')")
        } else {
            console.log('Game over');
        }
        if (patternCounter === pattern.length) {
            patternCounter = 0;
            pattern = [];
            console.log('restart')
            startButton.style.visibility= 'visible';
        }
    })
}


