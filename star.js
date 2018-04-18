class Star extends Entity{
	constructor(){
		super(random(FIELD_WIDTH), random(FIELD_HEIGHT),1);
		this.velocity = p5.Vector.fromAngle(random(0, TWO_PI));
		this.velocity.mult(Star.velMagnitude);
		this.isMoving = true;
	}

	render(){
		fill(255,255,0, 100);
		strokeWeight(0);
		ellipse(this.position.x, this.position.y, 2 * this.radius);
		strokeWeight(1);
	}
}

Star.velMagnitude = 1;