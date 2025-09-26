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
      return "error";
    } else {
      board[index] = symbol;
   
    
    }
  };

  const clearBoard=()=>{

    for(let i=0; i<board.length;i++){
      board[i]=0;
    }
    
  }
  return{pushSymbol,getBoard,clearBoard};
})();

const checkWinner=(function (){
   let p1Score=0;
    let p2Score=0;
  function check(){
    const checkBoard= gameBoard.getBoard();
   
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
     p1Score++;
    return "p1";
  
   
  }else if(winner==="o"){
    p2Score++;
    return "p2";
    
  }else if(isBoardFull){
    return "tie";

  }else if(winner==="error"){
    return "error";
  }


  if(p1Score===3){
    return "P1 win";
  }else if(p2Score===3){
     return "P2 win";
  }


 
}
  const getP1Score=()=>p1Score;
  const getP2Score=()=>p2Score;
 return{check,getP1Score,getP2Score};
})();


const gameDisplay=(function() {
    const displayBoard=gameBoard.getBoard();
    
    const gameScreen= document.querySelector(".gameScreen");
    const p1Name= document.querySelector("#p1Name");
    const p2Name= document.querySelector("#p2Name");
    const p1DisplayName=document.querySelector("#p1DisplayName");
      const p2DisplayName=document.querySelector("#p2DisplayName");
    const winner=document.querySelector("#winner");
  
    let pSymbol="x";
 
    const p1Score=document.querySelector("#p1Score");
    const p2Score=document.querySelector("#p2Score");
 
    const changeDisplay=()=>{
    for(let i=0; i<9 ;i++){
        const newDiv=document.createElement("div");
        newDiv.id=i;
        newDiv.classList.add("pattern_block");
         newDiv.classList.add("numberDiv");
        gameScreen.appendChild(newDiv);
          const clearDisplay=()=>{
    gameBoard.clearBoard();
   
      const selectDiv= document.querySelectorAll(".numberDiv");
      selectDiv.forEach(item=>item.innerText="");
    
   }

        newDiv.addEventListener("click",(event)=>{
            const chkWnr=checkWinner.check();
               const p1Scr=checkWinner.getP1Score();
    const p2Scr=checkWinner.getP2Score();
          const divId =Number(event.target.id);
         const pushMark= gameBoard.pushSymbol(pSymbol,divId);
           newDiv.innerText=displayBoard[i];
          if(pushMark!="error"){
           if(pSymbol==="x"){
            pSymbol="o";
           }else{
            pSymbol="x";
           }
          }
          
          console.log(displayBoard);
          if(chkWnr==="p1"){
         
          p1Score.innerText=p1Scr;
          clearDisplay();
        
        } else if(chkWnr==="p2"){
       
          p2Score.innerText=p2Scr;
          clearDisplay();
        } else if(chkWnr==="tie"){
          winner.innerText="Its a Tie";
          clearDisplay();
        } else if(chkWnr==="P1 win"){
           winner.innerText=`${p1DisplayName.textContent} Wins`;
           clearDisplay();
        }else if(chkWnr==="P2 win"){
           winner.innerText=`${p2DisplayName.textContent} Wins`;
           clearDisplay();
        }
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















