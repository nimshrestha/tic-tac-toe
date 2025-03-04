function Gameboard() {
    const row = 3;
    const col = 3;
    const board = [];

    for(let i = 0; i < row; ++i){
        board[i] = [];
        for(let j = 0; j < col; ++j){
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