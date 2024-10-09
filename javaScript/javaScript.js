//הגדרת מערך להגרלת מיקום הכדור בתוך גבולות הלוח
const ranges = [
    [11, 18],
    [21, 28],
    [31, 38],
    [41, 48],
    [51, 58],
    [61, 68],
    [71, 78],
    [81, 88]
];

//מונה למספר הכדורים
let count_of_balls = 0;

//מונה למספר הכדורים שתפסתי
let count_balls_catching = 0;

let intervalId;
//לשמירת השחקן על הלוח
let gamerOnGrid;

//בניית לוח משחק
document.addEventListener('DOMContentLoaded', () => {
    const createGrid = () => {
        const grid = document.getElementById("grid");
        for (let i = 0; i < 100; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.id = `${i}`;
            debugger
            if (i == 4 || i == 5 || i == 94 || i == 95 || i == 40 || i == 50 || i == 49 || i == 59)
                square.style.backgroundColor = "black";
            else if (i <= 10 || i % 10 == 0 || i % 10 == 9 || i >= 90)
                square.style.backgroundColor = "purple";
            else square.style.backgroundColor = "gray";
            grid.appendChild(square);
            if (i == 11)
                createMe();
        }
    }
    createGrid();
    document.getElementById("countBalls").textContent = `you catch ${count_balls_catching} balls`;
});

//הגרלת המיקום בטבלה
const randPlace = () => {
    const randomRange = ranges[Math.floor(Math.random() * ranges.length)];
    const randomNumber = Math.floor(Math.random() * (randomRange[1] - randomRange[0] + 1)) + randomRange[0];
    return randomNumber;
}

//הוספת כדור במקום שהוגרל עד 10 כדורים ביחד
const addball = () => {
    intervalId = setInterval(() => {
        let getPlace = randPlace();
        let ballPlace = document.getElementById(`${getPlace}`);
        if (ballPlace.childElementCount == 0) {
            const ball = document.createElement('img');
            ball.classList.add('ball');
            ball.id = `ball${getPlace}`;
            ballPlace.appendChild(ball);
        }
    }, 5000);
}

//תפיסת כדור
const catchBall = (getPlace) => {
    console.log('catch me');
    let ballPlace = document.getElementById(`${getPlace}`);
    if (ballPlace.childElementCount > 1) {
        let ballCatching = document.getElementById(`ball${getPlace}`);
        console.log(ballPlace);
        ballPlace.removeChild(ballCatching);
        count_of_balls--;
        count_balls_catching++;
    }
    isWinner();
}

//יצירת השחקן
const createMe = () => {
    let myPlace = document.getElementById('11');
    const gamer = document.createElement('img');
    gamer.classList.add("gamer");
    myPlace.appendChild(gamer);
    addball();
}

//תפיסת אירוע הלחיצה
document.addEventListener('keydown', (event) => {
    let ball = document.getElementsByClassName("ball");
    if (ball.length > 0) {
        let childElement = document.getElementsByClassName("gamer")[0];
        let parentElement = childElement.parentNode;
        let parentId = parentElement.id;
        switch (event.key) {
            case 'ArrowDown':
                moveDown(parentId);
                break;
            case 'ArrowUp':
                moveUp(parentId);
                break;
            case 'ArrowLeft':
                moveLeft(parentId);
                break;
            case 'ArrowRight':
                moveRight(parentId);
                break;
            default:
                break;
        }
    }
});

//הוזזה למטה
const moveDown = (currentPosition) => {
    debugger
    if (currentPosition < 81) {
        removeGamer(currentPosition);
        currentPosition = parseInt(currentPosition) + 10;
        addGamer(currentPosition);
    }
    else if (currentPosition == 84 || currentPosition == 85) {
        removeGamer(currentPosition);
        currentPosition -= 70;
        addGamer(currentPosition);
    }
}

//הוזזה ללמעלה
const moveUp = (currentPosition) => {
    if (currentPosition >= 20) { // לוודא שהשחקן לא יוצא מהלוח
        removeGamer(currentPosition);
        currentPosition -= 10;
        addGamer(currentPosition);
    }
    else if (currentPosition == 14 || currentPosition == 15) {
        removeGamer(currentPosition);
        currentPosition = parseInt(currentPosition) + 70;
        addGamer(currentPosition);
    }
}

//הוזזה לשמאל
const moveLeft = (currentPosition) => {
    debugger
    if (parseInt(currentPosition - 1) % 10 != 0) { // לוודא שהשחקן לא יוצא מהלוח
        removeGamer(currentPosition);
        currentPosition--;
        addGamer(currentPosition);
    }
    else if (currentPosition == 41 || currentPosition == 51) {
        removeGamer(currentPosition);
        currentPosition = parseInt(currentPosition) + 7;
        addGamer(currentPosition);
    }
}

//הוזזה לימין
const moveRight = (currentPosition) => {
    debugger
    if ((parseInt(currentPosition) + 1) % 10 != 9) { // לוודא שהשחקן לא יוצא מהלוח
        removeGamer(currentPosition);
        currentPosition++;
        addGamer(currentPosition);
    }
    else if (currentPosition == 48 || currentPosition == 58) {
        removeGamer(currentPosition);
        currentPosition = parseInt(currentPosition) - 7;
        addGamer(currentPosition);
    }
}

const removeGamer = (currentPosition) => {
    let oldPlace = document.getElementById(currentPosition);
    gamerOnGrid = document.getElementsByClassName('gamer')[0];
    oldPlace.removeChild(gamerOnGrid);
}

const addGamer = (currentPosition) => {
    let newPlace = document.getElementById(currentPosition);
    newPlace.appendChild(gamerOnGrid);
    catchBall(currentPosition);
}

//בדיקה האם ניצח
const isWinner = () => {
    let ballsList = document.getElementsByClassName('ball');
    if (ballsList.length == 0) {
        setTimeout(() => {
            alert("you are the winner");
            setTimeout(() => {
                restart();
            }, 1000);
        }, 100);
        clearInterval(intervalId);
    }
    document.getElementById("countBalls").textContent = `you catch ${count_balls_catching} balls`;
}

//התחלת משחק חדש
const restart = () => {
    debugger
    for (let i = 11; i < 81; i++) {
        const square = document.getElementById(`${i}`);
        if (square.childElementCount > 0) {
            const ball = document.getElementById(`ball${i}`);
            const gamer = document.getElementsByClassName('gamer')[0];
            ball ? square.removeChild(ball) : square.removeChild(gamer);
        }
    }
    document.getElementById("countBalls").textContent = `you catch 0 balls`;
    createMe();
}