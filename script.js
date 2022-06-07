const gameboard = (() => {
  const board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

  return { board };
})();

const game = (() => {
  const renderBoard = () => {
    let boardArray = document.getElementsByClassName("spot");
    let boardPosition = 0;
    for (let i = 0; i < gameboard.board.length; i++) {
      for (let x = 0; x < gameboard.board[i].length; x++) {
        boardArray[boardPosition].innerHTML = gameboard.board[i][x];
        boardPosition += 1;
      }
    }
  };

  renderBoard();

  const boardReset = () => {
    gameboard.board = [
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];
  };

  let players = [];

  let playerTurns = 0;

  let turnHistory = [];

  const reset = () => {
    location.reload();
  };

  let currentPlayer = players[0];

  if (playerTurns == 0 || playerTurns % 2 == 0) {
    currentPlayer = players[0];
  } else {
    currentPlayer = players[1];
  }

  //   WINNING scenarios

  const win = () => {
    let idPrefix = "s";

    for (let i = 0; i < gameboard.board.length; i++) {
      for (let x = 0; x < gameboard.board[i].length; x++) {
        if (gameboard.board[i][0] !== "_") {
          if (
            gameboard.board[i][0] == gameboard.board[i][1] &&
            gameboard.board[i][0] == gameboard.board[i][2]
          ) {
            console.log("win");

            document.getElementById(
              `${idPrefix}${String(i)}${String(x)}`
            ).style.backgroundColor = "lightgreen";
            document.getElementById(
              `${idPrefix}${String(i)}${String(1)}`
            ).style.backgroundColor = "lightgreen";
            document.getElementById(
              `${idPrefix}${String(i)}${String(2)}`
            ).style.backgroundColor = "lightgreen";

            return true;
          }
        }
      }
    }

    for (let i = 0; i < gameboard.board.length; i++) {
      for (let x = 0; x < gameboard.board[i].length; x++) {
        if (gameboard.board[i][x] !== "_") {
          if (
            gameboard.board[0][x] == gameboard.board[1][x] &&
            gameboard.board[0][x] == gameboard.board[2][x]
          ) {
            document.getElementById(
              `${idPrefix}${String(i)}${String(x)}`
            ).style.backgroundColor = "lightgreen";
            document.getElementById(
              `${idPrefix}${String(1)}${String(x)}`
            ).style.backgroundColor = "lightgreen";
            document.getElementById(
              `${idPrefix}${String(2)}${String(x)}`
            ).style.backgroundColor = "lightgreen";
            console.log("win");
            return true;
          }
        }
      }
    }

    for (let i = 0; i < gameboard.board.length; i++) {
      if (gameboard.board[i][i] !== "_") {
        if (
          gameboard.board[i][i] == gameboard.board[1][1] &&
          gameboard.board[i][i] == gameboard.board[2][2]
        ) {
          console.log("win");

          document.getElementById(
            `${idPrefix}${String(i)}${String(i)}`
          ).style.backgroundColor = "lightgreen";
          document.getElementById(
            `${idPrefix}${String(1)}${String(1)}`
          ).style.backgroundColor = "lightgreen";
          document.getElementById(
            `${idPrefix}${String(2)}${String(2)}`
          ).style.backgroundColor = "lightgreen";

          return true;
        }
      }
    }

    for (let i = 0; i < gameboard.board.length; i++) {
      if (gameboard.board[i][i] !== "_") {
        if (
          gameboard.board[i][i] == gameboard.board[1][1] &&
          gameboard.board[i][i] == gameboard.board[2][0]
        ) {
          console.log("win");

          document.getElementById(
            `${idPrefix}${String(0)}${String(2)}`
          ).style.backgroundColor = "lightgreen";
          document.getElementById(
            `${idPrefix}${String(1)}${String(1)}`
          ).style.backgroundColor = "lightgreen";
          document.getElementById(
            `${idPrefix}${String(2)}${String(0)}`
          ).style.backgroundColor = "lightgreen";

          return true;
        }
      }
    }

    return false;
  };

  //  END WIN scenarios
  //
  //

  const gameWon = () => {
    if (win()) {
      document.getElementById("winner").innerHTML = `${
        turnHistory[turnHistory.length - 2]
      } wins the game!`;
    }
  };

  const placeMark = (event) => {
    let row = Number(event.target.id[1]);
    let col = Number(event.target.id[2]);
    if (
      gameboard.board[row][col] !== "X" &&
      gameboard.board[row][col] !== "O"
    ) {
      if (playerTurns == 0 || playerTurns % 2 == 0) {
        gameboard.board[row][col] = players[0].mark;
        renderBoard();
        win();
        gameWon();
        playerTurns += 1;
        turnHistory.push(gameboard.board[row][col]);
        console.log(gameboard.board);
      } else {
        gameboard.board[row][col] = players[1].mark;
        renderBoard();
        win();
        gameWon();

        playerTurns += 1;
        turnHistory.push(gameboard.board[row][col]);

        console.log(gameboard.board);
      }
    }
  };

  return { boardReset, players, placeMark, reset };
})();

const playerFactory = (mark) => {
  return { mark };
};

const player1 = playerFactory("X");
game.players.push(player1);
const player2 = playerFactory("O");
game.players.push(player2);
