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

    const placeToken = (row, col, player) => {
        if(!board[row][col].getValue() === '*') return; 
        board[row][col].addToken(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {getBoard, placeToken, printBoard};
}