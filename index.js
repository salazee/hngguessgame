 const colors =["red", "blue", "green","purple", "pink", "brown"];
 // Generate a random RGB color
function randomRGB() { return `rgb(${Math.floor(Math.random() * 256)}, 
                    ${Math.floor(Math.random() * 256)}, 
                    ${Math.floor(Math.random() * 256)})`;
    }
    


// Elements
const targetColorBox =document.getElementById("target-color-box");
const startBtn = document.getElementById("start-btn");
const colorOptions = document.getElementById("color-options");
const scoreBoard = document.getElementById("score");
const attemptsBoard = document.getElementById("attempts");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let attempts = 3;
let targetColor = "";

// Function to start the game
function startGame() {
    score = 0;
    attempts = 3;
    scoreBoard.textContent = score;
    attemptsBoard.textContent = attempts;
    gameOverScreen.classList.add("hidden");
    startBtn.style.display = "none";
    generateRound();
}

// Function to generate a new round
function generateRound() {
    colorOptions.innerHTML = ""; 
    targetColorBox.style.backgroundColor = targetColor;
    

// Clear previous buttons




    // Create a set of color choices (including the correct one)
    targetColor =randomRGB();
    let choices = [targetColor];
    while (choices.length < 6) {
        let newColor = randomRGB();
        if (!choices.includes(newColor)) {
            choices.push(newColor);
        }
    }

    // Shuffle choices
    choices = choices.sort(() => Math.random() - 0.5);

    //  buttons for each color choice(this makes all the color boxes show and clickable)
    choices.forEach(color => {
        const btn = document.createElement("button");
        btn.classList.add("color-btn");
        btn.style.backgroundColor = color;
        btn.setAttribute("data-color", color);
        btn.addEventListener("click", checkColor);
        colorOptions.appendChild(btn);
    });
    console.log("Target Color:", targetColor);
console.log("Choices:", choices);
}

// Function to check if the player's guess is correct
function checkColor(event) {
    const selectedColor = event.target.getAttribute("data-color");

    if (selectedColor === targetColor) {
        score++;
        scoreBoard.textContent = score;
        alert("Correct Color! 🎉");
    } else {
        attempts--;
        attemptsBoard.textContent = attempts;
        alert("Wrong! Try again.");
    }

    // Check if game over
    if (attempts === 0) {
        endGame();
    } else {
        generateRound();
    }
}

// Function to end the game
function endGame() {
    finalScore.textContent = score;
    gameOverScreen.classList.remove("hidden");
    colorOptions.innerHTML = ""; // Clear buttons
}

// Restart Game
restartBtn.addEventListener("click", startGame);
startBtn.addEventListener("click", startGame);
