let canvas = document.getElementById("myCanvas");

function init(){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const test = new Ball(0, 0, canvas);
    setInterval(test.updateBall, 10);
}

function logWindowSize(){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    console.clear();
    console.log(canvas.clientWidth + ", " + canvas.clientHeight);
}

class Ball {
    constructor(xPos, yPos, canvas){
        this.x = xPos;
        this.y = yPos;
        this.canvas = canvas;
        this.dx = 2;
        this.dy = -2;
        this.ballRadius = 10;
    }
    ctx = canvas.getContext("2d");

    drawBall(){
        ctx.beginPath();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    updateBall(){
        this.drawBall;
        this.x += this.dx;
        this.y += this.dy;
        if(this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        if(this.y + this.dy > this.canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }
    }
}