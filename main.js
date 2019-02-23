/** Board Class */
var Board = function (array, moves) {
  // state of board
  var state = {
    board: array,
    moves: moves
  }

  var setAttribute = function (attribute, value) {
    if (state.hasOwnProperty(attribute)) {
      state[attribute] = value;
    }
  }

  var getAttribute = function (attribute) {
    if (state.hasOwnProperty(attribute)) {
      return state[attribute];
    }
  }

  /** function that moves one disc to another peg */
  var moveDisc = function (moveOne, moveTwo) {
    // move disc by calling checkTopOfPeg

    var startPeg = state.board[moveOne - 1];
    var lastIndexOfStartPeg = startPeg.length - 1;
    var topDiscOfStartPeg = startPeg[lastIndexOfStartPeg];

    var endPeg = state.board[moveTwo - 1];
    var lastIndexOfEndPeg = endPeg.length - 1;
    var topDiscOfEndPeg = endPeg[lastIndexOfEndPeg];

    var okPeg = true;
    // console.log(endPeg.length);
    if (endPeg.length !== 0) {
      okPeg = checkTopOfPeg(moveOne);
    }

    if (!okPeg) {
      return false
    }

    console.log('inside okPeg')
    startPeg.splice(lastIndexOfStartPeg, 1)
    endPeg.push(topDiscOfStartPeg);
    // console.log(endPeg);
    state.moves++
    return true;
  }

  /* function that checks if the user has won the game */
  var checkWinner = function () {
    // use reduce  here 
    // check if board is in original order
    // but in another peg
  }

  /** function that checks if the peg can be moved or not */
  var checkTopOfPeg = function (moveOne) {
    // use filter here
    var userPeg = state.board[moveOne - 1];
    var lastIndex = userPeg.length - 1;
    var topUserDisc = userPeg[lastIndex];
    // console.log(topUserDisc);
    var filteredPegs = state.board.filter(function (peg) {
      var len = peg.length;
      return topUserDisc < peg[len - 1];
    });
    console.log(filteredPegs);

    if (filteredPegs === undefined || filteredPegs.length === 0) {
      return false
    }
    return true;
    // return filteredPegs;
  }

  var resetGame = function () {
    // start a new game
    // reset board state (or just create a new board object)
  }

  /** function that shows the current board state to user */
  var displayBoard = function () {
    // state.board[2].push(" ");
    state.board.map(function (peg, idx) {
      // console.log(`${peg}`);
      console.log('---', ...peg);
      // console.log(...peg);
    });
    // state.board[2].shift();
    // console.log('')
  }

  return {
    moveDisc: moveDisc,
    checkWinner: checkWinner,
    checkTopOfPeg: checkTopOfPeg,
    resetGame: resetGame,
    displayBoard: displayBoard,
    getAttribute: getAttribute,
    setAttribute: setAttribute
  }
}




// function init() {
var board = Board([[3, 2, 1], [], []], 0);
console.log("Starting Board")
board.displayBoard();
// }


function makeMove() {
  var gameFlag = true;
  var userInput = prompt('enter move: ex: 1, 2)');


  do {

    try {
      // console.log(input.length);
      var input = userInput.split(",");
      if (input.length !== 2) {
        userInput = prompt('Please enter two numbers');
      }

      var startPeg = parseInt(input[0], 10);
      var endPeg = parseInt(input[1], 10);

    } catch {
      console.log('GAME TERMINATED')
      gameFlag = false;
    }

    var status = board.moveDisc(startPeg, endPeg);
    if (!status) {
      console.log("You cannot move a larger disc on top of a smaller one, board is still:")
      board.displayBoard();
    }
    board.displayBoard();
    // board.displayBoard();
    console.log('current moves ' + board.getAttribute('moves'))




    gameFlag = false;
  } while (gameFlag)
}