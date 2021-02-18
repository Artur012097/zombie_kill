// let elements from DOM
let $game = document.querySelector('#game')
let $start = document.querySelector('#start')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')
let $time = document.querySelector('#time')
let $gameScoreReal = document.querySelector('#game__score')
let $controlButtons = document.querySelector('#control-buttons')
let $stopGame = document.querySelector('#stop-game')
const gameStartMusic = new Audio('../audio/game-start.mp3')
const gameEndMusic = new Audio('../audio/game-end.mp3')
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
$controlButtons.addEventListener('click', timeChange)
$stopGame.addEventListener('click', stopGame)

function startGame() {
    isGameStarted = true
    score = 0
    hide(start)
    $game.style.backgroundColor = red
    $gameTime.setAttribute('disabled', 'true')
    hide($controlButtons)
    setTime()
    setGameTime()
    renderBox()
    startMusic()
}

function stopGame () {
    isGameStarted = false
    $game.innerHTML = ''
    setTimeout(() => {
        show($start)
    }, 1300)
    $game.style.backgroundColor = gray
    hide($timeHeader)
    show($resultHeader)
    $gameTime.removeAttribute('disabled')
    show($controlButtons)
    endMusic()
    setResult()
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
            // game score real time show
            $gameScoreReal.textContent = score
        }
    },100)
}

function endMusic() {
    gameStartMusic.pause()
    gameStartMusic.currentTime = 0
    gameEndMusic.play()
}

function startMusic() {
    gameStartMusic.play()
    gameEndMusic.pause()
    gameEndMusic.currentTime = 0
}

function setResult() {
    $result.textContent = score
}

function timeChange(e) {
    if (e.target.dataset.remove) {
        $gameTime.value --
        if ($gameTime.value <= 0) {
            $gameTime.value = 1
        }
    } 
    else if (e.target.dataset.add) {
        $gameTime.value ++
    }
    setTime()
}

function setTime() {
    let getGameTime = $gameTime.value

    $time.textContent = getGameTime + '.0'

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
    // box create after start button click
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
    box.style.backgroundColor = '#7a8577'
    box.style.borderRadius = '5px';
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



