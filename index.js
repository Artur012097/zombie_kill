// let elements from DOM
let $game = document.querySelector('#game')
let $start = document.querySelector('#start')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')
let $time = document.querySelector('#time')
let score = 0
let isGameStarted = false

// show element global function
function show($el) {
    $el.classList.remove('hide')
}

// hide element global function
function hide($el) {
    $el.classList.add('hide')
}

$start.addEventListener('click', startGame)
document.addEventListener('click', boxClick)
$gameTime.addEventListener('input', setTime)

function startGame() {
    isGameStarted = true
    score = 0
    hide(start)
    $game.style.backgroundColor = red
    $gameTime.setAttribute('disabled', 'true')
    setTime()
    setGameTime()
    renderBox()
}

function setGameTime() {
    let interval = setInterval(function() {
        // let variable vor set game time
        let time = parseFloat($time.textContent)
    
        if (time <= 0) {
            clearInterval(interval)
            stopGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    },100)
}

function stopGame () {
    isGameStarted = false
    $game.innerHTML = ''
    setTimeout(() => {
        show($start)
    }, 1000)
    $game.style.backgroundColor = gray
    hide($timeHeader)
    show($resultHeader)
    $gameTime.removeAttribute('disabled')
    setResult()
}

function setResult() {
    $result.textContent = score
}

function setTime() {
    let setGameTime = $gameTime.value

    $time.textContent = setGameTime + '.0'

    show($timeHeader)
    hide($resultHeader)
}

function boxClick(e) {
    // box renders when player clicks on it
    if (e.target.dataset.box) {
        // score rises when player clicks on rendered box
        score++
        renderBox()
    }
}

function renderBox() {
    // clear html after render next box
    $game.innerHTML = ''
    // xox create after start button click
    let box = document.createElement('div')
    // box random size render
    let boxSize = randomBox(30, 100)
    // let game box styles
    let gameBox = $game.getBoundingClientRect()
    // random positions render for box
    let maxTop = gameBox.height - boxSize
    let maxLeft = gameBox.width - boxSize
    // set box random width
    box.style.width = boxSize + 'px'
    // set box random height
    box.style.height = boxSize + 'px'
    // set box random background color from function
    box.style.backgroundImage = letBoxBg()
    box.style.backgroundRepeat = 'no-repeat'
    box.style.backgroundSize = 'cover'
    box.style.border = `1px solid${gray}`;
    box.style.position = 'absolute'
    // set box random position top
    box.style.top = randomBox(0, maxTop) + 'px'
    // set box random position left
    box.style.left = randomBox(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    // set data atribut to box, it needs for next ranbom box render after click
    box.setAttribute('data-box', true)
    // set created div on game box
    $game.insertAdjacentElement('afterbegin', box)
}
// random background color for rendered boxes
function letBoxBg() {
    return boxBg[randomBox(0, boxBg.length)]
}
// randomiser, random numbers from min to max
function randomBox(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}



