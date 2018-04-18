class Entity{
	constructor(x,y,radius){
		this.position = createVector(x,y);
		this.velocity = createVector(0,0);
		this.heading = 0;
		this.rotationRate = 0;
		this.isMoving = false;
		this.isRotating = false;
		this.radius = radius;
		this.health = 100;
	}

	isOutOfBounds(){
		return (this.position.x < -this.radius)
			|| (this.position.x - this.radius  > FIELD_WIDTH)
			|| (this.position.y < -this.radius)
			|| (this.position.y - this.radius  > FIELD_HEIGHT);
		
	}

	checkBounds(){
		if(this.position.x < -this.radius){
			this.position.x = FIELD_WIDTH + this.radius;
		} else if(this.position.x - this.radius  > FIELD_WIDTH){
			this.position.x = -this.radius;
		}
		if(this.position.y < -this.radius){
			this.position.y = FIELD_HEIGHT + this.radius;
		} else if(this.position.y - this.radius  > FIELD_HEIGHT){
			this.position.y = -this.radius;
		}
	}

	isAlive(){
		return this.health > 0;
	}

	destroy(){
		this.health = 0;
	}

	collides(other){
		return this.position.dist(other.position) <= this.radius + other.radius;
	}

	update(){
		if(this.isMoving){
			this.position.add(this.velocity);
			this.checkBounds();
		}

		if(this.isRotating){
			this.heading += this.rotationRate;
		}
	}

	render(){

	}
}