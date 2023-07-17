var board;
var game;

window.onload = function () {
    initGame();
};

var initGame = function() {
   var cfg = {
       draggable: true,
       position: 'start',
       onDrop: handleMove,
   };
   
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};

var handleMove = function(source, target ) {
    var move = game.move({from: source, to: target});
    
    if (move === null)  return 'snapback';
};
 // setup my socket client
var socket = io();
window.onclick = function(e) {
      socket.emit('message', 'hello world!');
  };
// called when a player makes a move on the board UI
var handleMove = function(source, target) {
    var move = game.move({from: source, to: target});
    
    if (move === null)  {
      return 'snapback';
    }
    else socket.emit('move', move);
    
};
// called when the server calls socket.broadcast('move')
socket.on('move', function (msg) {
    game.move(msg);
    board.position(game.fen()); // fen is the board layout
});
// Get the input elements and image previews
const player1ImageInput = document.getElementById('player1-image');
const player1ImagePreview = document.getElementById('player1-img-preview');

const player2ImageInput = document.getElementById('player2-image');
const player2ImagePreview = document.getElementById('player2-img-preview');

// Add event listeners to the input elements
player1ImageInput.addEventListener('change', function() {
    const file = player1ImageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            player1ImagePreview.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
});

player2ImageInput.addEventListener('change', function() {
    const file = player2ImageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            player2ImagePreview.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
});
