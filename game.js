const FIELD_WIDTH = 1200;
const FIELD_HEIGHT = 500;
const NUM_ASTEROIDS = 10;
const NUM_STARS = 500;
var GameState = Object.freeze({ PLAY: 0, PAUSED: 1, VICTORY: 2, DEFEAT: 3 });
var gameState = GameState.PLAY;
var ship;
var entities;
var score = 0;

function setup() {
  createCanvas(FIELD_WIDTH, FIELD_HEIGHT);
  frameRate(30);
  startNewGame();
}


function createStars(){
	for(let i = 0; i < NUM_STARS; ++i){
		entities.push(new Star());
	}
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
	entities = [];
    ship = new Ship(FIELD_WIDTH / 2, 11 * FIELD_HEIGHT / 12, 20);
    entities.push(ship);
    createStars();
    createAsteroids();
    score = 0;
	gameState = GameState.PLAY;
}

function mouseClicked(){
	if(mouseButton === CENTER){
		togglePause();
	}
	//console.log("mouseX = ", mouseX, " mouseY = ", mouseY);
}

function togglePause(){
	if(gameState === GameState.PLAY){
		gameState = GameState.PAUSED;
	} else if(gameState === GameState.PAUSED){
		gameState = GameState.PLAY;
	}
}

function keyPressed(){
	if(gameState === GameState.PLAY){
		if(key === ' ' || key === 'F'){
			ship.fire();
		} else if(keyCode === LEFT_ARROW || key === 'A'){
			ship.setRotation(-0.025 * PI);
		} else if(keyCode === RIGHT_ARROW || key === 'D'){
			ship.setRotation(+0.025 * PI);
		} else if(key === 'W'){
			ship.boost(1);
		}
	}
}

function keyReleased(){
	if(key === 'N'){
		startNewGame();
	} else if(key === 'P'){
		togglePause();
	} else if(gameState === GameState.PLAY){
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
}

function checkCollisions(){
	bullets = entities.filter(entity => entity instanceof Bullet);
	asteroids = entities.filter(entity => entity instanceof Asteroid);
	if(asteroids.length === 0){
		gameState = GameState.VICTORY;
		return;
	}
	for(let i = 0; i < asteroids.length; ++i){
		for(let j = 0; j < bullets.length; ++j){
			if(bullets[j].isAlive() && asteroids[i].isAlive()
			 && bullets[j].collides(asteroids[i])){
				asteroids[i].breakup();
				bullets[j].destroy();
				++score;
			}
		}
		if(asteroids[i].isAlive() && asteroids[i].collides(ship)){
			ship.hit();
			asteroids[i].destroy();
		}
	}
}

//main loop
function draw() {
	background(0);
	if(gameState === GameState.PLAY){
		checkCollisions();
		checkDefeat();
		entities = entities.filter(entity => entity.isAlive());
	}
	for(let i = 0; i < entities.length; ++i){
		if(gameState === GameState.PLAY){
			entities[i].update();	
		}
		entities[i].render();
	}
	renderGameStatus();
	renderScore();
}

function checkDefeat(){
	if(!ship.isAlive()){
		gameState = GameState.DEFEAT;
	}
}

function renderScore(){
	fill("#e81f3f");
	textSize(32);
	text("Score: " + score + " Lives: " + ship.lives, 0, 40);
}

function renderGameStatus(){
	if(gameState === GameState.VICTORY){
		fill("#1ac02b");
		textSize(64);
		text("You won!!!", FIELD_WIDTH / 3, FIELD_HEIGHT / 2);
	} else if(gameState === GameState.DEFEAT){
		fill(255,0,0);
		textSize(64);
		text("You lost!!!", FIELD_WIDTH / 3, FIELD_HEIGHT / 2);
	} else if(gameState === GameState.PAUSED){
		fill(0,255,0);
		textSize(64);
		text("Game paused", FIELD_WIDTH / 3, FIELD_HEIGHT / 2);
	}
}
