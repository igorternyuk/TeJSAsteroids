const FIELD_WIDTH = 1200;
const FIELD_HEIGHT = 500;
var isGamePaused = false;
var isGameOver = false;
var GameState = Object.freeze({ PLAY: 0, VICTORY: 1, DEFEAT: 2 });
var gameState = GameState.PLAY;
var ship;

function setup() {
  createCanvas(FIELD_WIDTH, FIELD_HEIGHT);
  frameRate(30);
  ship = new Ship(FIELD_WIDTH / 2, FIELD_HEIGHT / 2, 20);
}


function startNewGame(){
	gameState = GameState.PLAY;

}

function mouseClicked(){
	//console.log("mouseX = ", mouseX, " mouseY = ", mouseY);
}

function keyPressed(){
	/*if(key === ' '){
		revealAll();
	} else if(key === 'N'){
		startNewGame();
	}*/
	if(keyCode === LEFT_ARROW || key === 'A'){
		ship.setRotation(-0.025 * PI);
	} else if(keyCode === RIGHT_ARROW || key === 'D'){
		ship.setRotation(+0.025 * PI);
	} else if(key === 'W'){
		console.log("boost forward");
		ship.boost(1);
	}
}

function keyReleased(){
	if(keyCode === LEFT_ARROW || key === 'A'){
		ship.stopRotation();
	} else if(keyCode === RIGHT_ARROW || key === 'D'){
		ship.stopRotation();
	} else if(key === 'W'){
		ship.turnBoostOff();
	} else if(key === 'S'){
		ship.brake();
	}
}

function updatePhase(){
	ship.update();
}

function renderPhase(){
	ship.render();
}

//main loop
function draw() {
	updatePhase();
	background(0);
	renderPhase();
}

function renderScore(){

}

function renderGameStatus(){
	if(gameState === GameState.DEFEAT){
		fill(255,0,0);
		textSize(40);
		text("You lost!!!", FIELD_WIDTH / 5, FIELD_HEIGHT - 20);
	}
}
