function createPlayer(name, symbol) {
  const playerName = name;
  const playerSymbol = symbol;


  return { playerName, playerSymbol};
}

const rae = createPlayer("rae", "o");
const ansh = createPlayer("ansh", "x");


const gameBoard =(function () {
 let board=   [0,0,0,0,0,0,0,0,0];
 const getBoard= ()=> board;
  const pushSymbol = (symbol,index) => {
    if (board[index] != 0) {
      return;
    } else {
      board[index] = symbol;
      if (check() !== undefined) {
           check();
      }
    
    }
  };
  return{pushSymbol,getBoard};
})();

function check() {
    const checkBoard= gameBoard.getBoard();
    const checkWin1= (startIndex,EndIndex)=>{
        countX=0;
        countO=0;
        for(let i = startIndex; i<EndIndex;i++){
            if(checkBoard[i]==="x"){
                countX++;
            }else if(checkBoard[i]==="o"){
                countO++;
            }
        }
        if(countX===3){
            console.log("p1 win");
        }else if(countO===3){
            console.log("p2 win");
        }else{
            return;
        }
    }
    const checkWin2=(index1,index2,index3)=>{
        if(checkBoard[index1]==="x" && checkBoard[index2]==="x" && checkBoard[index3]==="x" ){
             console.log("p1 win");
        } else  if(checkBoard[index1]==="o" && checkBoard[index2]==="o" && checkBoard[index3]==="o" ){
             console.log("p2 win");
        } else{
            return;
        }
    }

    checkWin1(0,3);
    checkWin1(3,6);
    checkWin1(6,9);
    checkWin2(0,3,6);
    checkWin2(1,4,7);
    checkWin2(2,5,8);
    checkWin2(0,4,8);
    checkWin2(2,4,6);
}

gameBoard.pushSymbol(ansh.playerSymbol,0);
gameBoard.pushSymbol(ansh.playerSymbol,3);
gameBoard.pushSymbol(ansh.playerSymbol,6);











