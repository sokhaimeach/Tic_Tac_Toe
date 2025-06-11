const cell = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const reset = document.getElementById('reset');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGamme();

function initializeGamme() {
    cell.forEach(cel => {
        cel.addEventListener('click', cellClicked);
    });
    reset.addEventListener('click', resetGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if (options[cellIndex] != "" || !running) {return;}
    
    updateCell(this, cellIndex);
    changePlayer();
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.innerText = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWin = false;

    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if (cellA == cellB && cellB == cellC){
            roundWin = true;
            break;
        }
    }
    if (roundWin){
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        statusText.textContent = `${currentPlayer} win!`;
        running = false;
    } else if (!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        // changePlayer();
    }
}

function resetGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cell.forEach(cel => cel.textContent = "");
    running = true;
}