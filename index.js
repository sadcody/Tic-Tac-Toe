const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restartBtn");
const winConditon = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [6,4,2]
];
const gameState = ["","","","","","","","",""];
let currentPlayer = "X";
let players = {
   playerOne : 0,
   playerTwo : 0,
}
let playerOneScore = document.querySelector(".playerOne");
let playerTwoScore = document.querySelector(".playerTwo");
let running = false;
const h1 = document.querySelector("h1");
const turn = document.querySelector(".turn");

intializeGame();

function intializeGame(){
   cells.forEach(cell => cell.addEventListener("click",cellClicked));
   restartBtn.addEventListener("click",restartGame);
   running = true;

}
function cellClicked(){
   const cellIndex = this.getAttribute("cellindex") - 1;
   
   if(gameState[cellIndex] !== "" || !running){
      return;
   }
   updateCell(this,cellIndex);
}
function updateCell(cell,index){
   gameState[index]  = `${currentPlayer}`;
   cell.textContent = `${currentPlayer}`;
   checkWinner();
   changePlayer();
}
function checkWinner(){
   for(let i = 0; i < winConditon.length ; i++){
      let option = winConditon[i]
      let cellA = gameState[option[0]];
      let cellB = gameState[option[1]];
      let cellC = gameState[option[2]];

      if(cellA == "" || cellA == "" || cellB == ""){
         continue;
      }
      if(cellA == cellB && cellB == cellC){
         running = false;
         h1.textContent = `${currentPlayer} is winner`;
         if(currentPlayer == "X" ){
            players.playerOne++;
            playerOneScore.textContent = `Player 1:${players.playerOne}`;
         }else if(currentPlayer == "O"){
            players.playerTwo++;
            playerTwoScore.textContent = `Player 2:${players.playerTwo}`;
         }
      }
      if(!gameState.includes("")){
         h1.textContent = "Draw";
      }
      
   }
}
function changePlayer(){
   if(currentPlayer == "X"){
      currentPlayer = "O";
      turn.textContent = `Now is turn for ${currentPlayer}`;
   }else if(currentPlayer == "O"){
      currentPlayer = "X";
      turn.textContent = `Now is turn for ${currentPlayer}`;
   }
   
}
function restartGame(){
   gameState.fill("");
   cells.forEach(cell => cell.textContent = "");
   currentPlayer = "X";
   running = true;
   h1.textContent  = "";
}