const currentPlayer = document.querySelector(".currentPlayer"); //Pegando a referência do jogador atual 

let selected;
let player = "X";

let positions = [ //Possíveis chances de vencer
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selected = [];

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; //Armazenando o jogador

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = ""; //Preenchendo os botões com nada, vazio
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(event) {
  const index = event.target.getAttribute("data-i"); //Retorna onde cliquei
  event.target.innerHTML = player;
  event.target.removeEventListener("click", newMove); //Eliminando o local clicado
  selected[index] = player; //Armazena itens selecionados

  setTimeout(() => {
    check();
  }, [100]);

  player = player === "X" ? "O" : "X"; //Alternando jogador
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; //Alternando jogador no texto
}

function check() {
  let playerLastMove = player === "X" ? "O" : "X"; //Pega o último player que jogou

  const items = selected //Mapeando itens selecionados
    .map((item, i) => [item, i]) 
    .filter((item) => item[0] === playerLastMove) 
    .map((item) => item[1]); 

  for (pos of positions) { //Verificação dos ganhadores
    if (pos.every((item) => items.includes(item))) {
      alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
      init();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) { //Verificando empate pelo filter
    alert("DEU EMPATE!");
    init();
    return;
  }
}