document.addEventListener('DOMContentLoaded', () => {

    const statusDisplay = document.querySelector('#statusArea');
    const restartButton = document.getElementById('restartButton');
    const cells = document.querySelectorAll('[data-cell]');
    const gameOutcomeModal = document.querySelector('#gameOutcome');
    const winnerMessageDisplay = document.querySelector('#winnerMessage');
    const newGameButton = document.querySelector('#newGameButton');
    const closeButton = document.querySelector('.close-button');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if ([a, b, c].includes("")) continue;
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            showGameOutcome(`Player ${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            showGameOutcome("Game ended in a draw!!😔");
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) return;

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState.fill("");
        statusDisplay.textContent = `Player X's turn`;
        cells.forEach(cell => cell.textContent = "");
        gameOutcomeModal.classList.add('hidden');
    }

    cells.forEach((cell, index) => {
        cell.setAttribute('data-cell-index', index);
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', handleRestartGame);

    function showGameOutcome(message) {
        winnerMessageDisplay.textContent = message;
        gameOutcomeModal.style.display = 'flex'; 
        setTimeout(() => {
            gameOutcomeModal.querySelector('.modal-content').style.opacity = '1';
            gameOutcomeModal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10); 
    }

    closeButton.addEventListener('click', () => {
        gameOutcomeModal.querySelector('.modal-content').style.opacity = '0';
        gameOutcomeModal.querySelector('.modal-content').style.transform = 'translateY(-100px)';
        setTimeout(() => {
            gameOutcomeModal.style.display = 'none';
        }, 300); 
    });

    newGameButton.addEventListener('click', () => {
        handleRestartGame();
        closeButton.click();
    });

});
