const boardBorder='black';
const boardBackground='#F5E4FB';
const snakeCol='lightgreen';
const snakeBorder='darkgreen';
const snake2Col='lightblue';
const snake2Border='darkblue';
//canvas
const snakeboard=document.getElementById("snakeboard");
const snakeboardCTX=snakeboard.getContext("2d");

let snake=[
  {x: 480, y: 250},
  {x: 470, y: 250},
  {x: 460, y: 250}
]  

let snake2=[
  {x: 60, y: 250},
  {x: 70, y: 250},
  {x: 80, y: 250}
]  
let score=0;
let score2=0;
let changingDirection=false;
let changingDirection2=false;
let foodX;
let foodY;
let speedX=10;
let speedY=0;
let speed2X=10;
let speed2Y=0;

main();
genFood();

document.addEventListener("keydown", changeDirection);
document.addEventListener("keydown", changeDirection2);
    
function main() {
  if (hasGameEnded()||hasGameEnded2()) 
  {
    clearBoard();
    if (hasGameEnded())
    {
      score2++;
      document.getElementById('score2').innerHTML="Player 2's score: "+score2;
    }
    if (hasGameEnded2())  
    {
      score++;
      document.getElementById('score').innerHTML="Player 1's score: "+score;
    }
    if(score>score2)
    {
      snakeboardCTX.fillStyle=snakeCol;
      snakeboardCTX.font = "bold 30px Montserrat";
      snakeboardCTX.fillText("Player 1 wins!", (snakeboard.width / 2)-105, (snakeboard.height / 2));
    }
    else if (score2>score)
    {
      snakeboardCTX.fillStyle=snake2Col;
      snakeboardCTX.font = "bold 30px Montserrat";
      snakeboardCTX.fillText("Player 2 wins!", (snakeboard.width / 2)-105, (snakeboard.height / 2));
    }
    else
    {
      snakeboardCTX.fillStyle=boardBorder;
      snakeboardCTX.font = "bold 30px Montserrat";
      snakeboardCTX.fillText("You both lose! :(", (snakeboard.width / 2)-105, (snakeboard.height / 2));
    }
    return
  };
  changingDirection=false;
  changingDirection2=false;
  setTimeout(function onTick() {
    clearBoard();
    drawFood();
    moveSnake();
    moveSnake2();
    drawSnake();
    drawSnake2();
    //repeats by calling main again
    main();
  }, 100)
}

function clearBoard() {
  snakeboardCTX.fillStyle=boardBackground;
  snakeboardCTX.strokestyle=boardBorder;
  snakeboardCTX.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboardCTX.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
  
function drawSnakePart(snakePart) {
  snakeboardCTX.fillStyle=snakeCol;
  snakeboardCTX.strokestyle=snakeBorder;
  snakeboardCTX.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeboardCTX.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
function drawSnakePart2(snakePart2) {
  snakeboardCTX.fillStyle=snake2Col;
  snakeboardCTX.strokestyle=snake2Border;
  snakeboardCTX.fillRect(snakePart2.x, snakePart2.y, 10, 10);
  snakeboardCTX.strokeRect(snakePart2.x, snakePart2.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}
function drawSnake2() {
  snake2.forEach(drawSnakePart2)
}

function drawFood() {
  snakeboardCTX.fillStyle='#FF0000';
  snakeboardCTX.strokestyle='#FF0000';
  snakeboardCTX.fillRect(foodX, foodY, 10, 10);
  snakeboardCTX.strokeRect(foodX, foodY, 10, 10);
}

function hasGameEnded() {
  for (let i=4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  if(snake.length<=snake2.length)
    for (let i=0; i < snake.length; i++) {
      if (snake2[i].x === snake[0].x && snake2[i].y === snake[0].y) return true;
    }
  else if(snake.length>snake2.length)
    for (let i=0; i < snake2.length; i++) {
      if (snake2[i].x === snake[0].x && snake2[i].y === snake[0].y) return true;
    }
  const hitLeftWall=snake[0].x < 0;
  const hitRightWall=snake[0].x > snakeboard.width - 10;
  const hitToptWall=snake[0].y < 0;
  const hitBottomWall=snake[0].y > snakeboard.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}
function hasGameEnded2() {
  for (let i=4; i < snake2.length; i++) {
    if (snake2[i].x === snake2[0].x && snake2[i].y === snake2[0].y) return true;
  }
  if(snake.length<=snake2.length)
    for (let i=0; i < snake.length; i++) {
      if (snake[i].x === snake2[0].x && snake[i].y === snake2[0].y) return true;
    }
  else if(snake.length>snake2.length)
    for (let i=0; i < snake2.length; i++) {
      if (snake[i].x === snake2[0].x && snake[i].y === snake2[0].y) return true;
    }
  const hitLeftWall=snake2[0].x < 0;
  const hitRightWall=snake2[0].x > snakeboard.width - 10;
  const hitToptWall=snake2[0].y < 0;
  const hitBottomWall=snake2[0].y > snakeboard.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function genFood() {
  //food coordinates
  foodX=randomFood(0, snakeboard.width - 10);
  foodY=randomFood(0, snakeboard.height - 10);
  snake.forEach(function hasSnakeEaten(part) {
  const hasEaten=part.x == foodX && part.y == foodY;
  if (hasEaten) genFood();
  });
  snake2.forEach(function hasSnakeEaten(part) {
    const hasEaten=part.x == foodX && part.y == foodY;
    if (hasEaten) genFood();
  });
}

function changeDirection(event) {
  const leftKey=37;
  const rightKey=39;
  const upKey=38;
  const downKey=40;
  if (changingDirection) return;
  changingDirection=true;
  const keyPressed=event.keyCode;
  const goingUp=speedY === -10;
  const goingDown=speedY === 10;
  const goingRight=speedX === 10;
  const goingLeft=speedX === -10;
  if (keyPressed === leftKey && !goingRight) {
    speedX=-10;
    speedY=0;
  }
  if (keyPressed === upKey && !goingDown) {
    speedX=0;
    speedY=-10;
  }
  if (keyPressed === rightKey && !goingLeft) {
    speedX=10;
    speedY=0;
  }
  if (keyPressed === downKey && !goingUp) {
    speedX=0;
    speedY=10;
  }
}
function changeDirection2(event) {
  const leftKey=65;
  const rightKey=68;
  const upKey=87;
  const downKey=83;
  if (changingDirection2) return;
  changingDirection2=true;
  const keyPressed=event.keyCode;
  const goingUp=speed2Y === -10;
  const goingDown=speed2Y === 10;
  const goingRight=speed2X === 10;
  const goingLeft=speed2X === -10;
  if (keyPressed === leftKey && !goingRight) {
    speed2X=-10;
    speed2Y=0;
  }
  if (keyPressed === upKey && !goingDown) {
    speed2X=0;
    speed2Y=-10;
  }
  if (keyPressed === rightKey && !goingLeft) {
    speed2X=10;
    speed2Y=0;
  }
  if (keyPressed === downKey && !goingUp) {
    speed2X=0;
    speed2Y=10;
  }
}

function moveSnake() {
  const head={x: snake[0].x + speedX, y: snake[0].y + speedY};
  //add new head for snake
  snake.unshift(head);
  const hasEatenFood=snake[0].x === foodX && snake[0].y === foodY;
  if (hasEatenFood) {
    score += 1;
    document.getElementById('score').innerHTML="Player 1's score: "+score;
    genFood();
  } else {
    //remove the last part of snake
    snake.pop();
  }
}
function moveSnake2() {
  const head={x: snake2[0].x + speed2X, y: snake2[0].y + speed2Y};
  snake2.unshift(head);
  const hasEatenFood=snake2[0].x === foodX && snake2[0].y === foodY;
  if (hasEatenFood) {
    score2 += 1;
    document.getElementById('score2').innerHTML="Player 2's score: "+score2;
    genFood();
  } else {
    snake2.pop();
  }
}
