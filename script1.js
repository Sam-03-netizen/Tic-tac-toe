let board = Array(9).fill("");
let turn = "X";
const cells = document.querySelectorAll(".cell");
const info = document.getElementById("info");
const boardDiv = document.getElementById("board");

function checkWinner(){
  const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(let w of wins){
    const[a,b,c]=w;
    if(board[a] && board[a]===board[b] && board[a]===board[c]) return board[a];
  }
  return board.includes("")?null:"Draw";
}

function sparkle(x,y){
  for(let i=0;i<15;i++){
    const s=document.createElement("div");
    s.className="sparkle";
    s.style.left=x+"px"; s.style.top=y+"px";
    const ang=Math.random()*2*Math.PI;
    const dist=80*Math.random();
    s.style.setProperty("--x",Math.cos(ang)*dist+"px");
    s.style.setProperty("--y",Math.sin(ang)*dist+"px");
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),800);
  }
}

function handleClick(e){
  const idx=e.target.dataset.index;
  if(board[idx]!=="" || checkWinner()) return;
  board[idx]=turn;
  e.target.textContent=turn;
  e.target.style.color = turn==="X" ? "#f06292" : "#4fc3f7";
  const result=checkWinner();
  if(result){
    if(result==="Draw"){ info.textContent="It's a Draw!"; }
    else {
      info.textContent=`${result} Wins! ✨`;
      const rect=e.target.getBoundingClientRect();
      sparkle(rect.left+rect.width/2, rect.top+rect.height/2);
    }
  } else {
    turn = turn==="X"?"O":"X";
    info.textContent=`Turn: ${turn}`;
  }
}

cells.forEach(c=>c.addEventListener("click",handleClick));
document.getElementById("restart").onclick=()=>{
  board.fill("");
  cells.forEach(c=>{c.textContent="";});
  turn="X";
  info.textContent="Turn: X";
};