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
        if(!board[row][col].getValue() === '*') return; 
        board[row][col].addToken(playerToken);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {getBoard, placeToken, printBoard};
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

    const playRound = (row, col) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into row ${row} column ${col}`);
        gameBoard.placeToken(row, col, getActivePlayer().token);

        // Win Conditions Check

        //row win condition
        const winningRow = getBoard.filter((row) => {
            return row[0].getValue() === row[1].getValue() === row[2].getValue() !== `*`;
        });
        
        //col win condition
        const winningCol = getBoard.filter((row,index) => {
            return getBoard[0][index].getValue() === getBoard[1][index].getValue() === getBoard[2][index].getValue() !== `*`;
        }); 

        if(winningRow.length || winningCol.length) {
            console.log(`${getActivePlayer().name} wins!!`);
            gameBoard.printBoard();
            return;
        }
        
        //diagonal win conditions
        else if(
            (getBoard[0][0].getValue() === getBoard[1][1].getValue() === getBoard[2][2].getValue() !== `*`) ||
            (getBoard[0][2].getValue() === getBoard[1][1].getValue() === getBoard[2][0].getValue() !== `*`)
        ){
            console.log(`${getActivePlayer().name} wins!!`);
            gameBoard.printBoard();
            return;
        }


        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {playRound, getActivePlayer, getBoard};
}