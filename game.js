const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
var isGamePaused = false;
var isGameOver = false;
var GameState = Object.freeze({ PLAY: 0, VICTORY: 1, DEFEAT: 2 });
var gameState = GameState.PLAY;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(30);
}


function startNewGame(){
	gameState = GameState.PLAY;

}

function mouseClicked(){
	//console.log("mouseX = ", mouseX, " mouseY = ", mouseY);
}

function keyPressed(){
	if(key === ' '){
		revealAll();
	} else if(key === 'N'){
		startNewGame();
	}
}

//main loop
function draw() {
	background(0);
	renderGameStatus();
	renderScore();
}

function renderScore(){

}

function renderGameStatus(){
	if(gameState === GameState.DEFEAT){
		fill(255,0,0);
		textSize(40);
		text("You lost!!!", CANVAS_WIDTH / 5, CANVAS_HEIGHT - 20);
	}
}
