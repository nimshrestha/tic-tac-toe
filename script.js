function Gameboard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for(let i = 0; i < rows; ++i){
        board[i] = [];
        for(let j = 0; j < cols; ++j){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (row, col, playerToken) => {
        if(!(board[row][col].getValue() === '*')) return false; 
        board[row][col].addToken(playerToken);
        return true;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    const resetBoard = () => {
        for(let i = 0; i < rows; ++i){
            for(let j = 0; j < cols; ++j){
                board[i][j].addToken('*');
            }
        }
    }
    return {getBoard, placeToken, printBoard, resetBoard};
}

function Cell() {
    let value = '*';

    const addToken = (playerToken) => {
        value = playerToken;
    }

    const getValue = () => value;

    return {addToken, getValue};
}

function GameController(playerOneName = `Player 1`, playerTwoName = `Player 2`) {
    const gameBoard = Gameboard();
    const getBoard = gameBoard.getBoard();
    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0]? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    
    let isGameOver = false;
    let isGameDraw = false;
    
    const  getIsGameOver = () => isGameOver;
    const  getIsGameDraw = () => isGameDraw;
    
    const setIsGameOver = (value) => {
        isGameOver = value;
    }
    
    const setIsGameDraw = (value) => {
        isGameDraw = value;
    }
    
    const resetGame = () => {
        gameBoard.resetBoard();
        setIsGameDraw(false);
        setIsGameOver(false);
        activePlayer = players[0];
        console.log(`Reset Game`);
        gameBoard.printBoard();
    }

    const playRound = (row, col) => {
        if(gameBoard.placeToken(row, col, getActivePlayer().token)) {
            console.log(`Dropping ${getActivePlayer().name}'s token into row ${row} column ${col}`);
            
            // Win Conditions Check
    
            //row win condition
            const winningRow = getBoard.filter((row) => {
                return ((row[0].getValue() === row[1].getValue()) && (row[0].getValue() === row[2].getValue()) 
                && (row[0].getValue() !== `*`));
            });
            
            //col win condition
            const winningCol = getBoard.filter((row,index) => {
                return ((getBoard[0][index].getValue() === getBoard[1][index].getValue()) && 
                (getBoard[0][index].getValue() === getBoard[2][index].getValue()) && 
                (getBoard[0][index].getValue() !== `*`));
            }); 

            if(winningRow.length || winningCol.length) {
                gameBoard.printBoard();
                console.log(`${getActivePlayer().name} wins!!`);
                isGameOver = true;
                return; 
            }
            
            //diagonal win conditions
            else if(
                ((getBoard[0][0].getValue() === getBoard[1][1].getValue()) && 
                (getBoard[1][1].getValue() === getBoard[2][2].getValue())
                && (getBoard[0][0].getValue() !== `*`)) ||
                ((getBoard[0][2].getValue() === getBoard[1][1].getValue()) && 
                (getBoard[1][1].getValue() === getBoard[2][0].getValue())
                && (getBoard[0][2].getValue() !== `*`))
            ){
                gameBoard.printBoard();
                console.log(`${getActivePlayer().name} wins!!`);
                isGameOver = true;
                return;
            }
    
            //draw condition
            const boardWithCellValues = getBoard.map((row) => row.map((cell) => cell.getValue()));
            const drawBoard = boardWithCellValues.filter((row) => row.includes('*'));
            
            if(drawBoard.length == 0) {
                gameBoard.printBoard();
                console.log(`It's a Draw.`);
                isGameDraw = true;
                return;
            }
    
            switchPlayerTurn();
            printNewRound();
        }
        else{
            console.log(`Cell is already occupuied. Try again in a different cell.`);
        }
    }

    printNewRound();
    
    return {playRound, getActivePlayer, getIsGameOver, getIsGameDraw ,getBoard, resetGame};
}

function DisplayController() {
    const game = GameController();;
    const turnDisplay = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const resetBtn = document.querySelector('.reset');
    
    const updateScreen = () => {
        boardDiv.textContent = '';
        const board = game.getBoard;

        if(game.getIsGameOver() || game.getIsGameDraw()){
            
            if(game.getIsGameOver()){
                turnDisplay.textContent = `${game.getActivePlayer().name} wins!!`;
            }
    
            else{
                turnDisplay.textContent = `It's a Draw.`;
            }
        }
        else {
            turnDisplay.textContent = `${game.getActivePlayer().name}'s Turn`;
        }
        
        board.forEach((row,rowIndex) => {
            row.forEach((cell,colIndex)=> {
                const cellBtn = document.createElement('button');
                cellBtn.classList.add('token');
                cellBtn.dataset.row = rowIndex;
                cellBtn.dataset.col = colIndex;
                if(!(cell.getValue() === '*')) cellBtn.textContent = cell.getValue();
                boardDiv.appendChild(cellBtn);
            })
        })
    }

    boardDiv.addEventListener('click', (event) => {
        if((!game.getIsGameOver()) && (!game.getIsGameDraw()) ){
            
            const selectedCellRow = event.target.dataset.row;
            const selectedCellCol = event.target.dataset.col;
            if(!(selectedCellRow || selectedCellCol)) return;
            game.playRound(selectedCellRow,selectedCellCol)
            updateScreen();
        }
    })

    resetBtn.addEventListener('click', () => {
        game.resetGame();
        const cellBtns = document.querySelectorAll('.token');
        cellBtns.forEach((cell) =>{
            cell.textContent = '';
        })
        updateScreen();
    })

    //Initialize board display
    updateScreen();


}

DisplayController();
