function createPlayer(name) {
  const playerName = name;

  return { playerName };
}

const rae = createPlayer("rae", "o");
const ansh = createPlayer("ansh", "x");

const gameBoard = (function () {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const getBoard = () => board;
  const pushSymbol = (symbol, index) => {
    if (board[index] != 0) {
      return "error";
    } else {
      board[index] = symbol;
    }
  };

  const clearBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = 0;
    }
  };
  return { pushSymbol, getBoard, clearBoard };
})();

const checkWinner = (function () {
  let p1Score = 0;
  let p2Score = 0;
  let roundCount = 0;
  let status="";
  function check() {
    status = ""; 
    const checkBoard = gameBoard.getBoard();

    const checkWin1 = (startIndex, EndIndex) => {
      let countX = 0;
      let countO = 0;
      for (let i = startIndex; i < EndIndex; i++) {
        if (checkBoard[i] === "x") {
          countX++;
        } else if (checkBoard[i] === "o") {
          countO++;
        }
      }
      if (countX === 3) {
        return "x";
      } else if (countO === 3) {
        return "o";
      } else {
        return;
      }
    };
    const checkWin2 = (index1, index2, index3) => {
      if (
        checkBoard[index1] === "x" &&
        checkBoard[index2] === "x" &&
        checkBoard[index3] === "x"
      ) {
        return "x";
      } else if (
        checkBoard[index1] === "o" &&
        checkBoard[index2] === "o" &&
        checkBoard[index3] === "o"
      ) {
        return "o";
      } else {
        return;
      }
    };
    let winner =
      checkWin1(0, 3) ||
      checkWin1(3, 6) ||
      checkWin1(6, 9) ||
      checkWin2(0, 3, 6) ||
      checkWin2(1, 4, 7) ||
      checkWin2(2, 5, 8) ||
      checkWin2(0, 4, 8) ||
      checkWin2(2, 4, 6);
    const isBoardFull = checkBoard.every((item) => item !== 0);
    if (winner === "x") {
      p1Score++;
      roundCount++;
      status="p1";
    
    } else if (winner === "o") {
      p2Score++;
      roundCount++;
      status="p2";
     
    } else if (isBoardFull) {
      roundCount++;
     status="tie"
    }
      
    

    if (p1Score === 3) {
       status="P1 win";
    } else if (p2Score === 3) {
       status="P2 win";
    }

    if (roundCount === 3) {
      if (p1Score > p2Score)   status="P1 win";
      if (p2Score > p1Score) status="P2 win";
      if (p1Score === p2Score) status="tie game";
    }
  }
  const clearScores = () => {
    p1Score = 0;
    p2Score = 0;
    roundCount = 0;
    status="";
  };
  const getP1Score = () => p1Score;
  const getP2Score = () => p2Score;
  const getStatus= ()=> status;
  return { check, getP1Score, getP2Score, clearScores,getStatus};
})();

const gameDisplay = (function () {
  const displayBoard = gameBoard.getBoard();

  const gameScreen = document.querySelector(".gameScreen");
  const p1Name = document.querySelector("#p1Name");
  const p2Name = document.querySelector("#p2Name");
  const p1DisplayName = document.querySelector("#p1DisplayName");
  const p2DisplayName = document.querySelector("#p2DisplayName");
  const winner = document.querySelector("#winner");
  const startGame = document.querySelector("#startGame");

  let pSymbol = "x";

  const p1Score = document.querySelector("#p1Score");
  const p2Score = document.querySelector("#p2Score");
  const clearDisplay = () => {
    gameBoard.clearBoard();

    const selectDiv = document.querySelectorAll(".numberDiv");
    selectDiv.forEach((item) => (item.innerText = ""));
    pSymbol = "x";
  };

  const changeDisplay = () => {
    for (let i = 0; i < 9; i++) {
      const newDiv = document.createElement("div");
      newDiv.id = i;
      newDiv.classList.add("pattern_block");
      newDiv.classList.add("numberDiv");
      gameScreen.appendChild(newDiv);

      newDiv.addEventListener("click", (event) => {
        const divId = Number(event.target.id);
        const pushMark = gameBoard.pushSymbol(pSymbol, divId);
        if (pushMark === "error") {
          return;
        }
        newDiv.innerText = pSymbol;
        const chkWnr = checkWinner.check();
        const gameStatus=checkWinner.getStatus();
       
          p1Score.innerText = checkWinner.getP1Score();
          p2Score.innerText =  checkWinner.getP2Score();
       
        if(gameStatus===""){
              if (pSymbol === "x") {
          pSymbol = "o";
        } else {
          pSymbol = "x";
        }
        return;
        }
        

        if (gameStatus === "P1 win") {
          winner.innerText = `${p1DisplayName.textContent} Wins`;
          
        } else if (gameStatus === "P2 win") {
          winner.innerText = `${p2DisplayName.textContent} Wins`;
          
        } else if (gameStatus === "tie game") {
          winner.innerText = "Tie";
          
        } else{
          clearDisplay();
        }

    

        console.log(displayBoard);
      });
    }
  };
  changeDisplay();
  const createAndUpdatePlayer = (pName, pDisplay) => {
    const p = createPlayer(pName.value);
    pDisplay.textContent = p.playerName + ":";
  };
  startGame.addEventListener("click", () => {
    createAndUpdatePlayer(p1Name, p1DisplayName);
    createAndUpdatePlayer(p2Name, p2DisplayName);
    clearDisplay();
    checkWinner.clearScores();
    p1Score.innerText = "0";
    p2Score.innerText = "0";
    pSymbol = "x";
  });
})();
