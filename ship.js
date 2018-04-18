class Ship extends Entity{
	constructor(x,y,radius){
		super(x,y,radius);
		this.isBoosting = false;
		this.thrust = p5.Vector.fromAngle(this.heading);
		this.friction = 0.99;		
	}

	setRotation(rate){
		this.isRotating = true;
		this.rotationRate = rate;
		this.thrust = p5.Vector.fromAngle(this.heading + 0.5 * PI);
		//console.log("rotating");
		//console.log("rotationRate = ", this.rotationRate);
	}

	stopRotation(){
		this.isRotating = false;
		//console.log("stopRotation");
		this.rotationRate = 0;	
	}

	boost(magnitude){
		this.thrust = p5.Vector.fromAngle(this.heading + 0.5 * PI);
		this.thrust.mult(-magnitude);
		this.isBoosting = true;
		this.isMoving = true;
	}

	turnBoostOff(){
		this.isBoosting = false;
	}

	brake(){
		this.isBoosting = false;
		this.isMoving = false;
		this.velocity.x = 0;
		this.velocity.y = 0;
	}

	update(){
		if(this.isBoosting){
			this.velocity.add(this.thrust);
			console.log("vel = ", this.velocity);
			console.log("pos = ", this.position);
		}
		this.velocity.mult(this.friction);
		super.update();
	}

	render(){
		fill("#2ee347");
		strokeWeight(0);
		push();
		translate(this.position.x, this.position.y);
		rotate(this.heading);
		//rotate(this.heading + 0.5 * PI);
		triangle(0, -this.radius, -this.radius, this.radius, 0, 2 * this.radius / 3);
		triangle(0, -this.radius, this.radius, this.radius, 0, 2 * this.radius / 3);
		pop();
		strokeWeight(1);
	}
}