function createPlayer(name, symbol) {
  const playerName = name;
  const playerSymbol = symbol;


  return { playerName, playerSymbol};
}

const rae = createPlayer("rae", "o");
const ansh = createPlayer("ansh", "x");


const gameBoard =(function () {
 let board=   [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
 const getBoard= ()=> board;
  const pushSymbol = (symbol,index1, index2) => {
    if (board[index1][index2] != 0) {
      return;
    } else {
      board[index1][index2] = symbol;
      if (check() !== undefined) {
        console.log(check());
      }
      console.log(board);
    }
  };
  return{pushSymbol,getBoard};
})();

function check() {
    const checkBoard= gameBoard.getBoard();
    const loopBoard=()=>{
       let countX1=0;
       let countO1=0;
       let countX2=0;
        let countO2=0;
       let  countX3=0;
       let countO3=0;
        function checkStraight(index,number1,number2){
               checkBoard[index].forEach(item=>{
        
            if(item==="x"){
                number1++;
            }else{
                number2++;
            }
        
    })
}
        
        checkStraight(0,countX1,countO1);
        checkStraight(1,countX2,countO2);
        checkStraight(2,countX3,countO3);
 
    if(countX1===3 || countX2===3 || countX3===3 ){
        return "x";
    }else if(countO1===3 || countO2===3 || countO3===3){
        return "o";
    }
}
  if (loopBoard()==="x") {
    return "winner player one";
  } else if ( loopBoard()==="o") {
    return "winner player two";
  }
}

gameBoard.pushSymbol(ansh.playerSymbol,1,0);
gameBoard.pushSymbol(ansh.playerSymbol,1,1);
gameBoard.pushSymbol(ansh.playerSymbol,1,2);









