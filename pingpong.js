//canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//variables 
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 5,
    speed: 5,
    dx: 2,
    dy: -2
};

const user = {
    x: 0,
    y: canvas.height / 3,
    width: 5,
    height: 30,
    score: 0
};

const AI = {
    x: canvas.width - 5,
    y: canvas.height / 3,
    width: 5,
    height: 30,
    score: 0
};

//draw objects
function draw() {
    //clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    //User paddle
    ctx.beginPath();
    ctx.rect(user.x, user.y, user.width, user.height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    // AI paddle
    ctx.beginPath();
    ctx.rect(AI.x, AI.y, AI.width, AI.height);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    //net
    ctx.beginPath();
    ctx.setLineDash([5, 2]);
    ctx.StrokeStyle = "black";
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.closePath();

    //User Score
    ctx.fillStyle = "black"
    ctx.font = "10px Time New Roman";
    ctx.fillText(`User: ${user.score}`, 50, 10);

    //AI Score
    ctx.fillText(`AI: ${AI.score}`, canvas.width / 2 + 50, 10);
}

function update() {
    //move ball
    ball.x += ball.dx
    ball.y += ball.dy

    //collision check wall
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    //collison check user paddle
    if (ball.x - ball.radius < user.x + user.width &&
        ball.y + ball.radius > user.y &&
        ball.y - ball.radius < user.y + user.height) {
        ball.dx = -ball.dx;
    }

    //collison check AI paddle
    if (ball.x + ball.radius > AI.x &&
        ball.y + ball.radius > AI.y &&
        ball.y - ball.radius < AI.y + AI.height) {
        ball.dx = -ball.dx;
    }

    //check if out of bounds
    if (ball.x - ball.radius < 0) {
        AI.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}

//ball reset (and paddles)
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    ball.dx = Math.round(Math.random() * 4 -4) + ball.speed;
    ball.dy = Math.round(Math.random() * 4 -4) + ball.speed;

    user.y = canvas.height / 3;
    AI.y = canvas.height / 3;
}

//move player paddle
function moveUserPaddle(event) {
    let key = event.key;
    if (key == "w" || key == 'ArrowUp') {
        if (user.y > 0) {
            user.y -= 10
        }
    }
    if (key == "s" || key == 'ArrowDown') {
        if (user.y + user.height / 2 < canvas.height) {
            user.y += 10
        }
    }
}

//move (simple) ai paddle
document.addEventListener("keydown", moveUserPaddle)
function moveAIPaddle() {
    if (ball.y < AI.y + AI.height / 2) {
        AI.y -= 2;
    } else {
        AI.y += 2;
    }
}

//Game Check
function checkGameOver() {
    if (user.score === 20) {
        alert("User wins!");
        document.location.reload();
    } else if (AI.score === 20) {
        alert("AI wins!");
        document.location.reload();
    }
}

//game start
function main() {
    draw();
    update();
    moveAIPaddle();
    checkGameOver();
}
setInterval(main, 10);