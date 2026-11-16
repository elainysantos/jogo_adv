// Lista com 12 palavras e suas respectivas dicas (supera o mínimo de 10 palavras)
const palavras = [
  { palavra: "javascript", dica: "Linguagem de programação usada para dar interatividade às páginas web." },
  { palavra: "html", dica: "Linguagem de marcação usada para estruturar páginas na web." },
  { palavra: "css", dica: "Folhas de estilo usadas para definir cores, fontes e layout." },
  { palavra: "internet", dica: "Rede mundial de computadores interligados." },
  { palavra: "navegador", dica: "Programa usado para acessar sites, como Chrome ou Firefox." },
  { palavra: "programacao", dica: "Processo de escrever instruções para um computador executar." },
  { palavra: "computador", dica: "Máquina eletrônica capaz de processar dados." },
  { palavra: "algoritmo", dica: "Sequência finita de passos para resolver um problema." },
  { palavra: "variavel", dica: "Espaço na memória usado para armazenar um valor." },
  { palavra: "funcao", dica: "Bloco de código reutilizável que executa uma tarefa." },
  { palavra: "teclado", dica: "Periférico de entrada usado para digitar textos." },
  { palavra: "servidor", dica: "Computador que fornece recursos ou páginas web para outros dispositivos." }
];

// Variáveis de estado do jogo
let palavraSecreta = "";
let dicaAtual = "";
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoAtivo = true;
let vitorias = 0;
let derrotas = 0;

// Referências aos elementos do DOM
const elementoPalavra = document.getElementById("palavra");
const elementoDica = document.getElementById("dica");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");
const elementoVitorias = document.getElementById("vitorias");
const elementoDerrotas = document.getElementById("derrotas");

// Inicia ou reinicia uma partida
function iniciarJogo() {
  const indice = Math.floor(Math.random() * palavras.length);
  palavraSecreta = palavras[indice].palavra;
  dicaAtual = palavras[indice].dica;

  tentativas = 6;
  letrasCorretas = [];
  letrasUsadas = [];
  jogoAtivo = true;

  elementoDica.textContent = dicaAtual;
  elementoTentativas.textContent = tentativas;
  elementoLetrasUsadas.textContent = "";
  mensagem.textContent = "Digite uma letra para começar!";
  mensagem.style.color = "#333";

  inputLetra.disabled = false;
  botaoTentar.disabled = false;
  inputLetra.value = "";
  inputLetra.focus();

  atualizarPalavra();
}

// Atualiza a exibição dos traços e letras descobertas
function atualizarPalavra() {
  let exibicao = "";

  for (let i = 0; i < palavraSecreta.length; i++) {
    const letra = palavraSecreta[i];

    if (letrasCorretas.includes(letra)) {
      exibicao += letra + " ";
    } else {
      exibicao += "_ ";
    }
  }

  elementoPalavra.textContent = exibicao.trim();
}

// Verifica se todas as letras da palavra já foram descobertas
function venceu() {
  for (let i = 0; i < palavraSecreta.length; i++) {
    const letra = palavraSecreta[i];
    if (!letrasCorretas.includes(letra)) {
      return false;
    }
  }
  return true;
}

// Encerra a rodada bloqueando novas tentativas até clicar em Nova partida
function finalizarJogo() {
  jogoAtivo = false;
  inputLetra.disabled = true;
  botaoTentar.disabled = true;
}

// Processa a tentativa do jogador
function verificarLetra() {
  if (!jogoAtivo) return;

  const letra = inputLetra.value.trim().toLowerCase();
  inputLetra.value = "";
  inputLetra.focus();

  // Valida se foi digitada uma letra válida (a-z)
  if (letra === "" || !/^[a-z]$/.test(letra)) {
    mensagem.textContent = "Digite uma letra válida (A-Z, sem acentos).";
    mensagem.style.color = "#d97706";
    return;
  }

  // Bloqueia letras repetidas
  if (letrasUsadas.includes(letra)) {
    mensagem.textContent = `A letra "${letra.toUpperCase()}" já foi utilizada!`;
    mensagem.style.color = "#d97706";
    return;
  }

  letrasUsadas.push(letra);
  elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

  if (palavraSecreta.includes(letra)) {
    letrasCorretas.push(letra);
    mensagem.textContent = "Você acertou!";
    mensagem.style.color = "#059669";
  } else {
    tentativas--;
    elementoTentativas.textContent = tentativas;
    mensagem.textContent = "Você errou!";
    mensagem.style.color = "#dc2626";
  }

  atualizarPalavra();

  // Verifica condição de vitória ou derrota
  if (venceu()) {
    mensagem.textContent = "Parabéns! Você venceu!";
    mensagem.style.color = "#059669";
    vitorias++;
    elementoVitorias.textContent = vitorias;
    finalizarJogo();
  } else if (tentativas === 0) {
    mensagem.textContent = `Você perdeu! A palavra era: ${palavraSecreta.toUpperCase()}`;
    mensagem.style.color = "#dc2626";
    derrotas++;
    elementoDerrotas.textContent = derrotas;
    finalizarJogo();
  }
}

// Eventos de clique e tecla Enter
botaoTentar.addEventListener("click", verificarLetra);
botaoReiniciar.addEventListener("click", iniciarJogo);

inputLetra.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    verificarLetra();
  }
});

// Inicia a primeira partida ao carregar a página
iniciarJogo();
