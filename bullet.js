class Bullet extends Entity{
	constructor(){
		super(ship.position.x, ship.position.y, Bullet.RADIUS);
		this.heading = ship.heading  + 0.5 * PI;
		this.velocity = p5.Vector.fromAngle(this.heading);
		this.velocity.mult(Bullet.velMagnitude);
		this.isMoving = true;
	}

	isAlive(){
		//console.log("isBullet alive = ", (!super.isOutOfBounds()));
		return !super.isOutOfBounds() && this.health > 0;
	}

	update(){
		//console.log("bullet updating");
		if(this.isMoving){
			this.position.add(this.velocity);
		}
	}

	render(){
		fill(255,255,0);
		strokeWeight(0);
		push();
		translate(this.position.x, this.position.y);
		rotate(this.heading);
		ellipse(0, 0, 2 * Bullet.RADIUS);
		pop();
		strokeWeight(1);
	}
}

Bullet.velMagnitude = -20;
Bullet.RADIUS = 5;