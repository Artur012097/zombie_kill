// let elements from DOM
let $game = document.querySelector('#game')
let $start = document.querySelector('#start')
let $timeHeader = document.querySelector('#time-header')
let $time = document.querySelector('#time')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')
let $controlButtons = document.querySelector('#control-buttons')
let $stopGame = document.querySelector('#stop-game')
let $muteButton = document.querySelector('#mute-button')
let gameStartMusic = new Audio(gameMusic[randomBox(0, gameMusic.length)])
let gameEndMusic = new Audio('../audio/game-end.mp3')
let volumeChangeSound = new Audio('../audio/volume-change.mp3')
let zombieTrackSound = new Audio('../audio/zombie-track-sound.mp3')
let score = 0
let isGameStarted = false
$time.textContent = $gameTime.value + '.0'
startMusic()

$start.addEventListener('click', startGame)
document.addEventListener('click', boxClick)
$gameTime.addEventListener('input', setTime)
$gameTime.addEventListener('input', maxValue)
$controlButtons.addEventListener('click', timeChange)
$muteButton.addEventListener('click', soundeMute)
$stopGame.addEventListener('click', () => {
    if (!isGameStarted) {
        return false
    } else {
        stopGame()
    }
});   

// show element global function
function show($el) {
    $el.classList.remove('hide')
}

// hide element global function
function hide($el) {
    $el.classList.add('hide')
}

// game start function, acts when player clicks on start button
function startGame() {
    // change isGameStarted flag to true
    isGameStarted = true
    // set score to 0
    score = 0
    // hide start button
    hide(start)
    // change game box background color
    $game.style.backgroundColor = red
    // set disable atribute for time input do disable it when game started
    $gameTime.setAttribute('disabled', 'true')
    // hide control buttons when game started
    hide($controlButtons)
    // calls function to set game time
    setTime()
    setGameTime()
    renderBox()
    gameStartMusic.pause()
    gameStartMusic.currentTime = 0
}

// game stop function when time is up 
function stopGame () {
    // change isGameStarted flag to false
    isGameStarted = false
    // clear game box elements
    $game.innerHTML = ''
    // shows start button after 1.45s delay
    setTimeout(show($start), 1450)
    // change game box background color
    $game.style.backgroundColor = gray
    // remove atribute disabled for time input to set time
    $gameTime.removeAttribute('disabled')
    // set game timer sow box content to 0
    $time.textContent = 0 + '.0'
    // show control buttons box if game stopped
    show($controlButtons)
    endMusic()
    setTimeout(startMusic, 2200)
}

// game duration time set function, shows time on time show block, acts when player clicks on start button and edns when time is up
function setGameTime() {
    let interval = setInterval(function() {
        // let game duration time from the function listed below
        let time = parseFloat($time.textContent)
        // end game if time equally zerro
        if (time <= 0) {
            clearInterval(interval)
            stopGame()
        } 
        // if time doesn't equally zerro timer continues to decrease
        else {
            $time.textContent = (time - 0.1).toFixed(1)
            // game score real time show
            $result.textContent = score
        }
    },100)
}

// game end music
function endMusic() {
    gameEndMusic.play()
}

// game start background music
function startMusic() {
    gameStartMusic.play()
}

// sounde off function
function soundeMute() {
    // this element toggle class active
    this.classList.toggle('active')
    // game sound off if this element has class active
    if (this.classList.contains('active')) {
        gameStartMusic.volume = 0
        gameEndMusic.volume = 0
        zombieTrackSound.volume = 0
    } 
    // game sound on if this element doesn't have class active
    else {
        gameStartMusic.volume = 1
        gameEndMusic.volume = 1
        zombieTrackSound.volume = 0
    }
}

// game duration time minimal and maximal values setup function
function maxValue(e) {

    if ($gameTime.value.length >= 4) {
        // disable manual time entry for input if time lenght more than 3
        $gameTime.setAttribute('onKeyDown', 'return false')
        // enable manual time entry for input after removing manual entered time and set time listed below
        setTimeout( ()=> {
            $gameTime.removeAttribute('onKeyDown')
            $gameTime.value = 999
            $time.textContent = 999 + '.0'
        }, 700)
    } else if ($gameTime.value <= 0) {
        $gameTime.value = ''
        $time.textContent = 1 + '.0'
    }
}

// game duration time change functions with buttons
function timeChange(e) {
    // decrease in game time if player clicks time remove button
    if (e.target.dataset.remove) {
        $gameTime.value --
        volumeChangeSound.play()
        // it is for to remove delays on quick clicks
        volumeChangeSound.currentTime = 0
        // game min value function
        maxValue()
    } 
    // increase in game time if player clicks time add button
    else if (e.target.dataset.add) {
        $gameTime.value ++
        volumeChangeSound.play()
        // it is for to remove delays on quick clicks
        volumeChangeSound.currentTime = 0
        // game min value function
        maxValue()
    }
    setTime()
}

// game duration time setup function
function setTime() {
    // get time input value from DOM
    let getGameTime = $gameTime.value
    // set game duration time
    $time.textContent = getGameTime + '.0'
}

// game renders new random block if player clicks on rendered button
function boxClick(e) {
    // box renders when player clicks on it
    if (e.target.dataset.box) {
        // score rises when player clicks on rendered box
        score++
        renderBox()
        // zombie track sound play
        zombieTrackSound.play()
        zombieTrackSound.currentTime = 0
    }
}

// random block randomiser
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
    // set random background for zombies blocks
    return boxBg[randomBox(0, boxBg.length)]
}
// randomiser, random numbers from min to max
function randomBox(min, max) {
    // return random number from min to max
    return Math.floor(Math.random() * (max - min) + min)
}


