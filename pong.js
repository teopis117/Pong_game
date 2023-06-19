const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Crear la paleta del jugador
const player = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: "#808080",
    dy: 4
};

// Crear la paleta de la IA
const ai = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: "#808080",
    dy: 2
};

// Crear la pelota
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 2,
    dx: 2,
    dy: 2,
    color: "#808080"
};

// Dibujar una paleta
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// Dibujar la pelota
function drawBall(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Mover la paleta del jugador
function movePaddle(paddle, upKey, downKey) {
    document.addEventListener("keydown", function(event) {
        switch(event.keyCode) {
            case upKey:
                paddle.y -= paddle.dy;
                break;
            case downKey:
                paddle.y += paddle.dy;
                break;
        }
    });
}

// Mover la pelota
function moveBall(ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Rebotar en la paleta del jugador
    if(ball.y + ball.radius > player.y && ball.y - ball.radius < player.y + player.height && ball.dx < 0) {
        if(ball.x - ball.radius < player.x + player.width) {
            ball.dx *= -1;
        }
    }

    // Rebotar en la paleta de la IA
    if(ball.y + ball.radius > ai.y && ball.y - ball.radius < ai.y + ai.height && ball.dx > 0) {
        if(ball.x + ball.radius > ai.x) {
            ball.dx *= -1;
        }
    }
}

// Actualizar el canvas
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    moveBall(ball);
    if(player.y < 0) player.y = 0;
    if(player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Loop del juego
function loop() {
    update();
    if(player.y < ball.y) {
        player.y += 1;
    }
    if(player.y > ball.y) {
        player.y -= 1;
    }
    if(ai.y + ai.height / 2 < ball.y) {
        ai.y += ai.dy;
    }
    if(ai.y + ai.height / 2 > ball.y) {
        ai.y -= ai.dy;
    }
    if(ai.y < 0) ai.y = 0;
    if(ai.y + ai.height > canvas.height) ai.y = canvas.height - ai.height;
    requestAnimationFrame(loop);
}

// Controlar la paleta del jugador
movePaddle(player, 87, 83);
loop();
