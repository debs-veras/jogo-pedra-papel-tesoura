var jogadorEscolha = -1;
var computadorEscolha = -1;
var ganhador = -1;
var jogadorPontos = 0;
var computadorPontos = 0;

function jogar(escolha){
  if(jogadorEscolha != -1 && computadorEscolha != -1){
    document.getElementById("jogador-escolha-"+ jogadorEscolha).classList.remove('selecionado');
    document.getElementById("computador-escolha-"+ computadorEscolha).classList.remove('selecionado'); 
  }

  jogadorEscolha = escolha;
  computadorEscolha = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

  if(jogadorEscolha == computadorEscolha) ganhador = 0;
  else if(jogadorEscolha == 1 && computadorEscolha == 2) ganhador = 2;
  else if(jogadorEscolha == 1 && computadorEscolha == 3) ganhador = 1; 

  else if(jogadorEscolha == 2 && computadorEscolha == 1) ganhador = 1;
  else if(jogadorEscolha == 2 && computadorEscolha == 3) ganhador = 2;

  else if(jogadorEscolha == 3 && computadorEscolha == 2) ganhador = 1;
  else if(jogadorEscolha == 3 && computadorEscolha == 1) ganhador = 2;    

  document.getElementById("jogador-escolha-"+ jogadorEscolha).classList.add('selecionado');
  document.getElementById("computador-escolha-"+ computadorEscolha).classList.add('selecionado');
  
  if(ganhador == 0) document.getElementById('mensagens').innerHTML = 'Empate';
  else if(ganhador == 1){
    document.getElementById('mensagens').innerHTML = 'Jogador ganhou';
    jogadorPontos++;
    document.getElementById('jogador-pontos').innerHTML = jogadorPontos;
  }
  else if(ganhador == 2){
    document.getElementById('mensagens').innerHTML = 'Computador ganhou';
    computadorPontos++;
    document.getElementById('computador-pontos').innerHTML = computadorPontos;
    
  }
}   