class Ship extends Entity{
	constructor(x,y){
		super(x,y);
	}

	update(){
		super.update();
	}

	render(){
		push();
		pop();
	}
}