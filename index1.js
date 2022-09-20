const grid = document.querySelector('.grid')
const left = document.querySelector('.left')
const right = document.querySelector('.right')
const btns = [left,right]
const scoreDisplay = document.getElementById('score')
const blockWidth = 65
const blockHeight = 15
const boardWidth = 350
const boardHeight = 300
const ballDiameter = 20
let score = 0
let timerId
let xDirection = -2
let yDirection = 2
let gameSpeed = 10

const userStart = [140, 5]
let currentPosition = userStart

const ballStart = [165, 20]
let ballCurrentPosition = ballStart

//create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//all my blocks
const blocks = [
    new Block(2, 280),
    new Block(72, 280),
    new Block(142, 280),
    new Block(212, 280),
    new Block(282, 280),
    new Block(2, 260),
    new Block(72, 260),
    new Block(142, 260),
    new Block(212, 260),
    new Block(282, 260),
    new Block(2, 240),
    new Block(72, 240),
    new Block(142, 240),
    new Block(212, 240),
    new Block(282, 240)
]
//draw my blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks();

// add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move user
function moveUser1() {
    const currentBtn = left.classList
    if (currentBtn.contains('left')) {
        if (currentPosition[0] > 0) {
            currentPosition[0] -= 10
            drawUser()
        }
    }
}

function moveUser2() {
    const currentBtn = right.classList
    if (currentBtn.contains('right')) {
        if (currentPosition[0] < (boardWidth - blockWidth - 5)) {
            currentPosition[0] += 10
            drawUser()
        }
    }
}
// adding event listener for both the btns
    left.addEventListener('click', moveUser1)
    right.addEventListener('click', moveUser2)

//add ball 
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move the ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, gameSpeed)

//check for collisions
function checkForCollisions() {
    //check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            // check for win
            if (blocks.length == 0) {
                scoreDisplay.innerHTML = 'You win!'
                clearInterval(timerId)
                document.removeEventListener('keydown'.moveUser)
            }
        }
    }

    //check for wall collisions
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0) {
        changeDirection()
    }

    //check for user colisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    //check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose!';
        document.removeEventListener('keydown', moveUser)
    }
}


function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}