const boxes = document.querySelectorAll('.box')
const turnIndicator = document.querySelector('.turn-icon')
const winnerImage = document.querySelector(".round-taker")
const primaryWinner = document.querySelector(".primary-winner")
const secondaryWinner = document.querySelector(".secondary-winner")
const announcement = document.querySelector(".ann-back")
const homePage = document.querySelector(".home-page")
const restartScreen = document.querySelector(".restart-back")
const p1Score = document.querySelector(".p1-score")
const p2Score = document.querySelector(".p2-score")
const ties = document.querySelector(".tie-score")
const p1 =document.querySelector(".p1")
const p2 =document.querySelector(".p2")



const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
]



var currentPlayerX = false;
var CPUfirst = false;
var withCPU = false;
var cpuTurn = false;
var currentClass = currentPlayerX? "O-box" : "X-box"


var winningCombo = []
var emptyBoxes = []
var xScore = 0
var oScore = 0
var tieScore = 0
p1.textContent = "X (P1)"
p2.textContent = "O (P2)"
applyHover()

function p1X(){
    p1.textContent = "X (P1)"
    p2.textContent = "O (P2)"
}

function p1O(){
    p1.textContent = "X (P2)"
    p2.textContent = "O (P1)"
    CPUfirst = true
}

function showBoard(){
    homePage.style.display = "none"
}

function startGame(){
    applyHover()
    currentPlayerX? turnIndicator.src = "./assets/icon-o.svg" : turnIndicator.src = "./assets/icon-x.svg";
    boxes.forEach(box => {
        box.classList.remove("O-box")
        box.classList.remove("X-box")
        box.classList.remove("winner-x")
        box.classList.remove("winner-o")
        box.addEventListener('click', handleClick, {once: true})
    })  
    announcement.style.display = "none"
}

function startWithCpu(){
    console.log("playng with cpu")
    withCPU = true
    homePage.style.display = "none"
    console.log(CPUfirst)
    CPUfirst && computerPlay()
}

function computerPlay(){
    cpuTurn = !cpuTurn
    placeRandom()
}

function placeRandom(){
    checkEmpty()
    emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)].click()
}

boxes.forEach(box => {
    box.addEventListener('click', handleClick, {once: true})
})


function handleClick(e){
    const box = e.target
    currentClass = currentPlayerX? "O-box" : "X-box"
    placemark(box, currentClass)

    if(!withCPU){
        if(checkWinner(currentClass)){
            highlight(winningCombo)
            endgame(currentPlayerX)
        }
        else if(checkDraw()){
            tieScore++
            ties.textContent = tieScore
            tieEnding()
        }
        switchTurn()
        applyHover()
    }

    else{
        if(!cpuTurn){
            if(checkWinner(currentClass)){
                highlight(winningCombo)
                endgame(currentPlayerX)
                switchTurn()

            }
            else if(checkDraw()){
                tieScore++
                ties.textContent = tieScore
                tieEnding()
            }
            else{
                checkEmpty()
                console.log(emptyBoxes)
                switchTurn()
                applyHover()
                console.log("these were applied")
                computerPlay()
            }
        
        }
        else{
            if(checkWinner(currentClass)){
                highlight(winningCombo)
                endgame(currentPlayerX)
                switchTurn()
            }
            else if(checkDraw()){
                tieScore++
                ties.textContent = tieScore
                tieEnding()
            }
            cpuTurn = !cpuTurn
            checkEmpty()
            console.log(emptyBoxes)
            switchTurn()
            applyHover()
        }

    }

}

function placemark(box, currentClass){
   box.classList.add(currentClass)
}

function switchTurn(){
    currentPlayerX? turnIndicator.src = "./assets/icon-x.svg" : turnIndicator.src = "./assets/icon-o.svg";
    currentPlayerX = !currentPlayerX
}

function applyHover(){
   boxes.forEach(box => box.classList.remove("hover-x"))
   boxes.forEach(box => box.classList.remove("hover-o"))
   currentPlayerX? boxes.forEach(box => box.classList.add("hover-o")) : boxes.forEach(box => box.classList.add("hover-x"))
}

function checkWinner(currentClass){
    return combinations.some(combination => {
        winningCombo = []
        combination.forEach(e => winningCombo.push(e))
        return combination.every(index => {
            return boxes[index].classList.contains(currentClass)
        })
    }) 
}

function checkDraw(){
    return [...boxes].every(box => {
        return box.classList.contains("O-box") || box.classList.contains("X-box")
    })
}

function checkEmpty(){
    emptyBoxes = []
    boxes.forEach(box => {
        (!box.classList.contains("O-box") && !box.classList.contains("X-box"))&&emptyBoxes.push(box) 
    })
}

function highlight(winningCombo){
   currentPlayerX? winningCombo.forEach(cell => boxes[cell].classList.add("winner-o")) : winningCombo.forEach(cell => boxes[cell].classList.add("winner-x")) 
}

function endgame(currentPlayerX){
    announcement.style.display = "flex"
    currentPlayerX? winnerImage.src="././assets/icon-o.svg" : winnerImage.src = "././assets/icon-x.svg"
    currentPlayerX? secondaryWinner.textContent = "PLAYER 2 WINS" : secondaryWinner.textContent = "PLAYER 1 WINS"
    currentPlayerX? primaryWinner.style.color = "#F2B137" : primaryWinner.style.color = "#31C3BD"  
    currentPlayerX? oScore++ : xScore++
    p1Score.textContent = xScore
    p2Score.textContent = oScore
}
function tieEnding(){
    announcement.style.display = "flex"
    primaryWinner.textContent = "ROUND TIED"
    primaryWinner.style.color = "#A8BFC9"
    secondaryWinner.style.display = "none"
    winnerImage.style.display = "none"
    p1Score.textContent = xScore
    p2Score.textContent = oScore
}

function restart(){
    restartScreen.style.display = "flex"
}
function cancel(){
    restartScreen.style.display = "none"
}

function quit(){
    location.reload()
}