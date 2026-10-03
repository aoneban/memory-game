export function createHeader() {
  const header = document.getElementById('header');

  const container = document.createElement('div');
  container.classList.add('container');

  const buttonNewGame = document.createElement('button');
  buttonNewGame.classList.add('btn');
  buttonNewGame.textContent = 'New Game';

  const leaderBoard = document.createElement('button');
  leaderBoard.classList.add('btn');
  leaderBoard.textContent = 'Leaders Board';

  container.append(buttonNewGame, leaderBoard);
  header.append(container);
}