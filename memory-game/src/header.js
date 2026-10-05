export function createHeader(onNewGame) {
  const header = document.getElementById('header');

  const container = document.createElement('div');
  container.classList.add('container');

  const buttonNewGame = document.createElement('button');
  buttonNewGame.type = 'button';
  buttonNewGame.classList.add('btn');
  buttonNewGame.textContent = 'New Game';
  buttonNewGame.addEventListener('click', onNewGame);

  const leaderBoard = document.createElement('button');
  leaderBoard.type = 'button';
  leaderBoard.classList.add('btn');
  leaderBoard.textContent = 'Leaders Board';

  container.append(buttonNewGame, leaderBoard);
  header.append(container);
}
