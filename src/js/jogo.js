const opcoes = [
  { nome: "Pedra", icone: "fa-hand-back-fist" },
  { nome: "Papel", icone: "fa-hand" },
  { nome: "Tesoura", icone: "fa-hand-scissors" },
];

let modo = null;
let jogador1Escolha = null;
let jogador2Escolha = null;
let jogoAtivo = true;
let botaoJogador1Selecionado = null;

function setMode(selectedMode) {
  modo = selectedMode;
  document.getElementById("resultado").textContent = "";
  document.getElementById("resultado").className = "result";
  jogador1Escolha = null;
  jogador2Escolha = null;
  jogoAtivo = true;
  botaoJogador1Selecionado = null;
  // Atualizar títulos
  document.getElementById("player1-title").textContent = "Player 1";
  document.getElementById("player2-title").textContent =
    modo === "cpu" ? "Máquina" : "Player 2";
  // Resetar seleções
  document.getElementById("p1-selection").textContent = "Escolha: -";
  document.getElementById("p2-selection").textContent = "Escolha: -";
  // Esconder botão de reset
  document.getElementById("reset-btn").classList.add("hidden");
  // Mostrar área do jogo
  document.getElementById("game-container").classList.remove("hidden");
  document.getElementById("game-container").classList.add("fade-in");
  renderChoices();
}

function renderChoices() {
  const p1 = document.getElementById("player1");
  const p2 = document.getElementById("player2");
  p1.innerHTML = "";
  p2.innerHTML = "";
  opcoes.forEach((op) => {
    // Botões para o Player 1
    const btn1 = document.createElement("button");
    btn1.className = "choice-btn";
    btn1.innerHTML = `<i class="fas ${op.icone}"></i> ${op.nome}`;
    btn1.onclick = () => escolhaPlayer1(op.nome, btn1);
    p1.appendChild(btn1);
  });
  if (modo === "pvp") p2.innerHTML = "<p>Esperando Player 1...</p>";
  else p2.innerHTML = "<p>A máquina aguarda sua jogada</p>";
}

function escolhaPlayer1(op, botao) {
  if (!jogoAtivo) return;
  jogador1Escolha = op;
  botaoJogador1Selecionado = botao;
  // Desabilitar botões do jogador 1 após a escolha
  const botoesP1 = document.querySelectorAll("#player1 .choice-btn");
  botoesP1.forEach((btn) => {
    btn.classList.add("disabled");
  });
  // No modo PvP, não exibir a escolha ainda nem destacar visualmente
  if (modo === "cpu") {
    // No modo contra máquina, destacar imediatamente
    botao.classList.add("selected");
    document.getElementById("p1-selection").textContent = `Escolha: ${op}`;
  } else {
    // No modo PvP, apenas desabilitar os botões sem destacar
    document.getElementById("p1-selection").textContent = "Escolhido!";
  }

  if (modo === "cpu") {
    // Computador escolhe aleatoriamente
    const computadorEscolha = opcoes[Math.floor(Math.random() * 3)].nome;
    // Simular "pensamento" da máquina com um pequeno delay
    setTimeout(() => {
      document.getElementById(
        "p2-selection"
      ).textContent = `Escolha: ${computadorEscolha}`;
      verificarResultado(jogador1Escolha, computadorEscolha);
    }, 500);
  } else if (modo === "pvp") {
    renderPlayer2();
  }
}

function renderPlayer2() {
  const p2 = document.getElementById("player2");
  p2.innerHTML = "";
  opcoes.forEach((op) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `<i class="fas ${op.icone}"></i> ${op.nome}`;
    btn.onclick = () => {
      if (!jogoAtivo) return;
      jogador2Escolha = op.nome;
      // Destacar a escolha do jogador 2
      const botoesP2 = document.querySelectorAll("#player2 .choice-btn");
      botoesP2.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      // Destacar a escolha do jogador 1 (apenas agora no modo PvP)
      if (botaoJogador1Selecionado) {
        botaoJogador1Selecionado.classList.add("selected");
      }
      // Desabilitar botões do jogador 2 após a escolha
      botoesP2.forEach((btn) => {
        btn.classList.add("disabled");
      });
      // Agora revelar ambas as escolhas
      document.getElementById(
        "p1-selection"
      ).textContent = `Escolha: ${jogador1Escolha}`;
      document.getElementById(
        "p2-selection"
      ).textContent = `Escolha: ${op.nome}`;
      verificarResultado(jogador1Escolha, op.nome);
    };
    p2.appendChild(btn);
  });
}

function verificarResultado(p1, p2) {
  let res = "";
  let resultadoClass = "";

  if (p1 === p2) {
    res = `Empate! Ambos escolheram ${p1}`;
    resultadoClass = "draw";
  } else if (
    (p1 === "Pedra" && p2 === "Tesoura") ||
    (p1 === "Papel" && p2 === "Pedra") ||
    (p1 === "Tesoura" && p2 === "Papel")
  ) {
    res = `Player 1 venceu! ${p1} ganha de ${p2}`;
    resultadoClass = "win";
  } else {
    res =
      modo === "cpu"
        ? `Máquina venceu! ${p2} ganha de ${p1}`
        : `Player 2 venceu! ${p2} ganha de ${p1}`;
    resultadoClass = "lose";
  }

  const resultadoEl = document.getElementById("resultado");
  resultadoEl.textContent = res;
  resultadoEl.className = "result";
  resultadoEl.classList.add(resultadoClass, "pulse");
  document.getElementById("reset-btn").classList.remove("hidden");
  jogoAtivo = false;
}

function resetGame() {
  const botoesP1 = document.querySelectorAll("#player1 .choice-btn");
  botoesP1.forEach((btn) => {
    btn.classList.remove("selected");
    btn.classList.remove("disabled");
  });

  const botoesP2 = document.querySelectorAll("#player2 .choice-btn");
  botoesP2.forEach((btn) => {
    btn.classList.remove("selected");
    btn.classList.remove("disabled");
  });

  setMode(modo);
}
