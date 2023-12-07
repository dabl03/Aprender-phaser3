const SKY_BLUE='#87CEEB';
class Game_scene extends Phaser.Scene{
	constructor(){
		super({key:"game"});
		this.skin="boot-1";
		this.gameOver=false;
	}
	create(){
		this.world=new World_1(this);
		this.world.create();

		this.player=new Player(this,this.skin);
		Player.create_anim(this,this.player.skin,{
			"left":"left",
			"right":"right",
			"up":"up",
			"down":"turn",
			"gameOver":"gameOver"
		});
		this.world.create_collision(this.player.p);

    	this.cursors = this.input.keyboard.createCursorKeys();
    	this.cameras.main.startFollow(this.player.p);

    	//usar: this.cameras.main.setScroll(x, y);
    	let txt=this.text_coord=this.add.text(0, 10, '0x0', { fontFamily: 'pixel_font, serif',backgroundColor:'#000',color:"#ff8800", fontSize:"2em",align:"right"});
    	//Ponemos el texto en la parte derecha del lienzo.
    	this.text_coord.setX(this.game.config.width-(this.text_coord.getBounds().width*3.5));
    	this.text_coord.setScrollFactor(0,0);//Estatico.
	}
	update(){
		if (this.player.game_over){
			this.player.p.anims.play("gameOver");
			this.player.p.setVelocityY(0);
			this.player.p.setVelocityX(0);
			return;
		}
		//Key left, right move:
		if (this.cursors.left.isDown){
			this.player.p.setVelocityX(-160);
			this.player.p.anims.play("left", true);
		}else if (this.cursors.right.isDown){
			this.player.p.setVelocityX(160);
			this.player.p.anims.play("right", true);
		}else{
			this.player.p.setVelocityX(0);
			if (this.cursors.left.isUp && this.cursors.right.isUp) {
 			   this.player.p.anims.pause();
 			}
		}
		//Key up, down move:
		if (this.cursors.up.isDown) {
	        this.player.p.setVelocityY(-160);
			this.player.p.anims.play("up");
	    }
	    else if (this.cursors.down.isDown) {
	        this.player.p.setVelocityY(160);
			this.player.p.anims.play("turn");
	    }else {
	        if (this.gameOver){
				this.player.p.anims.play('gameOver');
			}else{
				this.player.p.setVelocityY(0);
			}
	    }

	    this.text_coord.setText(this.player.p.x.toFixed(1)+'x'+this.player.p.y.toFixed(1));
	}
	transitionOut (progress){
        this.face.y = (600 * progress);
    }
    getPlayer(){
    	return this.player.p;
    }
}
/*
var house1 = this.add.sprite(100, 100, 'houses', 0);
var house2 = this.add.sprite(200, 200, 'houses', 1);
var house3 = this.add.sprite(300, 300, 'houses', 2);

Para colocar las casas^
Para cambiar de escena
this.input.once('pointerdown', function ()
    {
		this.scene.transition({
		target: 'sceneB',
		duration: 2000,
		moveBelow: true,
		onUpdate: this.transitionOut,
		data: { x: 400, y: 300 }
	});
}, this);
this.cameras.main.useBounds=false;
this.player.setCollideWorldBounds(true);
*/