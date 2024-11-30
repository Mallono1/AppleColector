let score = 0;
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const heartsDisplay = document.getElementById("hearts");
const basket = document.getElementById("basket");
const targetFps = 60;
let gameOverElement = document.getElementById("gameOver");
let restarbuttonElement = document.getElementById("restart-button");
let appleSpeed = 100;
const appleSpeedGain = 5;
let lastAppleSpawnTime = Date.now();
let appleSpawnTime = 1000;
const appleSpawnTimeGain = 10;
const maxAppleSpawnTime = 300;
let hearts = 3;

document.addEventListener("mousemove", (event) => {
  const basketRect = basket.getBoundingClientRect();
  const mouseX = event.clientX - gameArea.getBoundingClientRect().left;
  basket.style.left =
    Math.min(
      Math.max(mouseX, basketRect.width / 2),
      gameArea.clientWidth - basketRect.width / 2
    ) + "px";
});

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
function gameOver() {
  window.location.href = "endgame.html";
}

function fallApple(apple) {
  let lastUpdate = Date.now();
  let appleFallInterval = setInterval(() => {
    const appleRect = apple.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    const distanceDelta = ((Date.now() - lastUpdate) / 1000) * appleSpeed;

    if (appleRect.bottom >= gameArea.getBoundingClientRect().bottom) {
      clearInterval(appleFallInterval);
      apple.remove();
      hearts--;
      heartsDisplay.textContent = "♥ ".repeat(hearts).trim();
      if (hearts <= 0) {
        //TODO gameover
        //string.link("endgame.html");
        gameOverElement.style.display = "flex";
        restarbuttonElement.style.display = "flex";
        appleSpeed = 0;
        appleSpawnTime = Number.POSITIVE_INFINITY;
      }
    } else {
      apple.style.top = apple.offsetTop + distanceDelta + "px";
    }

    if (
      appleRect.bottom >= basketRect.top &&
      appleRect.right >= basketRect.left &&
      appleRect.left <= basketRect.right
    ) {
      clearInterval(appleFallInterval);
      apple.remove();
      score++;
      scoreDisplay.textContent = "Score: " + score;
      appleSpeed = appleSpeed + appleSpeedGain;
      appleSpawnTime = Math.max(
        appleSpawnTime - appleSpawnTimeGain,
        maxAppleSpawnTime
      );
    }

    lastUpdate = Date.now();
  }, 1000 / targetFps);
}

setInterval(createApple, 10);
