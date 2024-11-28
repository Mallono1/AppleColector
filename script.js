let score = 0;
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const basket = document.getElementById("basket");

document.addEventListener("mousemove", (event) => {
  const basketRect = basket.getBoundingClientRect();
  const mouseX = event.clientX - gameArea.getBoundingClientRect().left;
  basket.style.left = Math.min(
      Math.max(mouseX, basketRect.width / 2),
      gameArea.clientWidth - basketRect.width/2
    ) + "px";
});

function createApple() {
  const apple = document.createElement("div");
  apple.classList.add("apple");
  apple.style.left = Math.random() * (gameArea.clientWidth - 30) + "px";
  apple.style.top = "0px";
  gameArea.appendChild(apple);
  fallApple(apple);
}

function fallApple(apple) {
  let appleFallInterval = setInterval(() => {
    const appleRect = apple.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (appleRect.bottom >= gameArea.getBoundingClientRect().bottom) {
      clearInterval(appleFallInterval);
      apple.remove();
    } else {
      apple.style.top = apple.offsetTop + 10 + "px";
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
    }
  }, 200);
}

setInterval(createApple, 2500);
