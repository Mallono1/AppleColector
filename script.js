let score = 0;
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const heartsDisplay = document.getElementById("hearts");
const basket = document.getElementById("basket");
const gameOverScreen = document.getElementById("gameOverScreen");
const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

const targetFps = 60;
let appleSpeed = 100;
const appleSpeedGain = 5;
let lastAppleSpawnTime = Date.now();
let appleSpawnTime = 1000;
const appleSpawnTimeGain = 10;
const maxAppleSpawnTime = 300;
let hearts = 5;
let gameInterval;

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach((scr) => {
    scr.classList.remove("active");
  });
  screen.classList.add("active"); 
}

// Basket moving
document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX - gameArea.getBoundingClientRect().left;
  const basketWidth = basket.offsetWidth / 2;
  basket.style.left =
    Math.min(
      Math.max(mouseX, basketWidth),
      gameArea.clientWidth - basketWidth
    ) + "px";
});

// create apples
function createApple() {
  if (Date.now() - lastAppleSpawnTime < appleSpawnTime) return;
  const apple = document.createElement("div");
  apple.classList.add("apple");
  apple.style.left = Math.random() * (gameArea.clientWidth - 30) + "px";
  apple.style.top = "0px";
  gameArea.appendChild(apple);
  fallApple(apple);
  lastAppleSpawnTime = Date.now();
}

// fall of apples
function fallApple(apple) {
  let lastUpdate = Date.now();
  let appleFallInterval = setInterval(() => {
    const appleRect = apple.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    const distanceDelta = ((Date.now() - lastUpdate) / 1000) * appleSpeed;

    // when apples hits the botton
    if (appleRect.bottom >= gameArea.getBoundingClientRect().bottom) {
      clearInterval(appleFallInterval);
      apple.remove();
      hearts--;
      heartsDisplay.textContent = "♥ ".repeat(hearts).trim();
      if (hearts <= 0) {
        gameOver();
      }
    } else {
      apple.style.top = apple.offsetTop + distanceDelta + "px";
    }

    // When the apple is caught by the basket
    if (
      appleRect.bottom >= basketRect.top &&
      appleRect.right >= basketRect.left &&
      appleRect.left <= basketRect.right
    ) {
      clearInterval(appleFallInterval);
      apple.remove();
      score++;
      scoreDisplay.textContent = "Score: " + score;
      appleSpeed += appleSpeedGain;
      appleSpawnTime = Math.max(
        appleSpawnTime - appleSpawnTimeGain,
        maxAppleSpawnTime
      );
    }

    lastUpdate = Date.now();
  }, 1000 / targetFps);
}

// Game ends
function gameOver() {
  clearInterval(gameInterval);
  const apples = document.querySelectorAll(".apple");
  apples.forEach((apple) => apple.remove());
  showScreen(gameOverScreen); 
}

// Restart Game
restartButton.addEventListener("click", () => {
  score = 0;
  hearts = 5;
  appleSpeed = 100;
  appleSpawnTime = 1000;
  scoreDisplay.textContent = "Score: 0";
  heartsDisplay.textContent = "♥ ♥ ♥ ♥ ♥";
  showScreen(gameScreen);
  startGame();
});

// Begin game
function startGame() {
  gameInterval = setInterval(createApple, 10);
}

// Start button
startButton.addEventListener("click", () => {
  showScreen(gameScreen);
  startGame();
});
