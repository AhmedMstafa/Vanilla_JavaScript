const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// Create Ball Props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Create Brick Props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create Bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Draw Ball
const drawBall = function () {
  let { x, y, size } = ball;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

// Create Paddle Props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Draw Paddle
const drawPaddle = function () {
  let { x, y, w, h } = paddle;

  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

// Draw Score
const drawScore = function () {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
};

// Draw Bricks
const drawBricks = function () {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
};

// Move Paddle
const movePaddle = function () {
  paddle.x += paddle.dx;

  // Wall Detection
  if (paddle.x + paddle.w > canvas.width) paddle.x = canvas.width - paddle.w;

  if (paddle.x < 0) paddle.x = 0;
};

const showAllBricks = function () {
  score = 0;

  bricks.forEach((column) => {
    column.forEach((column) => {
      column.visible = true;
    });
  });
};

const increaseScore = function () {
  score++;

  if (score % (brickRowCount * brickColumnCount) === 0) {
    showAllBricks();
  }
};

// Move Ball
const moveBall = function () {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall Collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1;
  }
  // Wall Collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1; // ball.dx = ball.dx * -1;
  }

  // Paddle Collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });

  // Hit Bottom Wall - Lose
  if (ball.y + ball.size > canvas.height) showAllBricks();
};

// Draw Everything
const draw = function () {
  // Clear Canvas First
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
  moveBall();
};

// Update Canvas Drawing And Animation
const update = function () {
  movePaddle();

  // Draw Everything
  draw();

  requestAnimationFrame(update);
};

update();

// Keydonw Event
const keyDown = function (e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
    return;
  }

  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
    return;
  }
};

// KeyUp Event
const KeyUp = function (e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
};

// Keyboard Event Handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', KeyUp);

// Ruels And Close Event Handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
