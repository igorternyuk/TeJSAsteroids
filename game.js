const FIELD_WIDTH = 1200;
const FIELD_HEIGHT = 500;
const NUM_ASTEROIDS = 10;
var isGamePaused = false;
var isGameOver = false;
var GameState = Object.freeze({ PLAY: 0, VICTORY: 1, DEFEAT: 2 });
var gameState = GameState.PLAY;
var ship;
var entities = [];

function setup() {
  createCanvas(FIELD_WIDTH, FIELD_HEIGHT);
  frameRate(30);
  ship = new Ship(FIELD_WIDTH / 2, FIELD_HEIGHT / 2, 20);
  entities.push(ship);
  createAsteroids();
}

function createAsteroids(){
	for(let i = 0; i < NUM_ASTEROIDS; ++i){
		randX = random(0,FIELD_WIDTH);
		randY = random(0,FIELD_HEIGHT);
		randRadius = floor(random(Asteroid.minRadius, Asteroid.maxRadius));
		entities.push(new Asteroid(randX, randY, randRadius));
	}
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

//main loop
function draw() {
	background(0);
	for(let i = 0; i < entities.length; ++i){
		entities[i].update();
		entities[i].render();
	}

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
