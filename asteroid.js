class Asteroid extends Entity{
	constructor(x,y, radius){
		super(x,y,radius);
		this.velocity = p5.Vector.fromAngle(random(0,TWO_PI));
		this.velocity.mult(random(Asteroid.minVelocity, Asteroid.maxVelocity));
		this.rotationRate = this.radius / 1000 * PI;
		this.isMoving = true;
		this.isRotating = true;	
		this.edgeNumber = floor(random(Asteroid.minEdges, Asteroid.maxEdges));
		this.offsets = new Array(this.edgeNumber);
		for(let i = 0; i < this.edgeNumber; ++i){
			this.offsets[i] = floor(random(Asteroid.minOffset, Asteroid.maxOffset));
		}		
	}

	isAlive(){
		return this.radius >= Asteroid.minRadius;
	}

	breakup(){
		this.radius /= 2;
		this.rotationRate *= 2;
		entities.push(new Asteroid(this.position.x, this.position.y, this.radius));
	}

	render(){
		fill("#f6eb7b");
		strokeWeight(0);
		push();
		translate(this.position.x, this.position.y);
		rotate(this.heading);
		beginShape();
		for(let i = 0; i <= this.edgeNumber; ++i){
			let angle = map(i, 0, this.edgeNumber, 0, TWO_PI);
			let r = this.radius + this.offsets[i];
			let x = r * cos(angle);
			let y = r * sin(angle);
			vertex(x,y); 
		}
		endShape(CLOSE);
		pop();
		strokeWeight(1);
	}
}

Asteroid.maxVelocity = 5;
Asteroid.minVelocity = 1;
Asteroid.maxEdges = 20;
Asteroid.minEdges = 3;
Asteroid.maxRadius = 50;
Asteroid.minRadius = 5;
Asteroid.maxOffset = 20;
Asteroid.minOffset = 1;