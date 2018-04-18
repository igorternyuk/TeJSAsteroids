class Entity{
	constructor(x,y){
		this.position = createVector(x,y);
		this.velocity = createVector(0,0);
		this.angle = 0;
		this.rotationRatio = 0;
		this.thrust = createVector(0,0);
		this.friction = 0.98;
		this.isMoving = false;
		this.isBoosting = false;
		this.isRotating = false;
	}

	update(){
		if(this.isBoosting){
			this.velocity.add(this.thrust);
		}

		this.velocity.mult(this.friction);
		
		if(this.isMoving){
			this.position.add(this.velocity);
		}

		if(this.isRotating){
			this.angle += this.rotationRatio;
		}
	}

	render(){

	}
}