function createPlayer(name) {
  const playerName = name;


  return { playerName};
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
    let p1Score=0;
    let p2Score=0;
    const checkWin1= (startIndex,EndIndex)=>{
       let countX=0;
       let countO=0;
        for(let i = startIndex; i<EndIndex;i++){
            if(checkBoard[i]==="x"){
                countX++;
            }else if(checkBoard[i]==="o"){
                countO++;
            }
        }
        if(countX===3){
          return  "x";
        }else if(countO===3){
         return   "o";
        }else{
            return;
        }
    }
    const checkWin2=(index1,index2,index3)=>{
        if(checkBoard[index1]==="x" && checkBoard[index2]==="x" && checkBoard[index3]==="x" ){
            return "x";
        } else  if(checkBoard[index1]==="o" && checkBoard[index2]==="o" && checkBoard[index3]==="o" ){
            return "o";
        } else{
            return;
        }
    }
let winner=
  checkWin1(0, 3) ||
  checkWin1(3, 6) ||
  checkWin1(6, 9) ||
  checkWin2(0, 3, 6) ||
  checkWin2(1, 4, 7) ||
  checkWin2(2, 5, 8) ||
  checkWin2(0, 4, 8) ||
  checkWin2(2, 4, 6);
 const isBoardFull = checkBoard.every(item => item !== 0);
  if(winner==="x"){
    console.log("p1 wins");
    p1Score++;
  }else if(winner==="o"){
    console.log("p2 wins");
    p2Score++;
  }else if(isBoardFull){
    console.log("tie");

  }
  if(p1Score===3){
    console.log("P1 is the winner");
  }else if(p2Score===3){
    console.log("P2 is the winner");
  }
}


const gameDisplay=(function() {
    const displayBoard=gameBoard.getBoard();
    const gameScreen= document.querySelector(".gameScreen");
    const p1Name= document.querySelector("#p1Name");
    const p2Name= document.querySelector("#p2Name");
    const p1DisplayName=document.querySelector("#p1DisplayName");
      const p2DisplayName=document.querySelector("#p2DisplayName");
    let pSymbol="x";
    const changeDisplay=()=>{
    for(let i=0; i<9 ;i++){
        const newDiv=document.createElement("div");
        newDiv.id=i;
        newDiv.classList.add("pattern_block");
        gameScreen.appendChild(newDiv);

        newDiv.addEventListener("click",(event)=>{
          const divId =Number(event.target.id);
          gameBoard.pushSymbol(pSymbol,divId);
           newDiv.innerText=displayBoard[i];
           if(pSymbol==="x"){
            pSymbol="o";
           }else{
            pSymbol="x";
           }
          console.log(displayBoard);
        })
    }
  }
  changeDisplay();
  const createAndUpdatePlayer=(pName,pDisplay)=>{
      const p= createPlayer(pName.value);
        pDisplay.textContent=p.playerName +":";
  }
  p1Name.addEventListener("keydown",event=>{
    if(event.key==="Enter"){
        createAndUpdatePlayer(p1Name,p1DisplayName);
    }
  })
    p2Name.addEventListener("keydown",event=>{
    if(event.key==="Enter"){
        createAndUpdatePlayer(p2Name,p2DisplayName);
    }
  })

})();















