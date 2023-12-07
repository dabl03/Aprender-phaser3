class Rect{
}
class Player{
	constructor(this_scene,skin){
		this.scene=this_scene;
		this.p = this.scene.physics.add.sprite(this.scene.game.config.width/2,this.scene.game.config.height/2, skin);
		this.skin=skin;
		this.game_over=false;	
	}
}
Player.create_anim=function(this_scene,skin,keys){
	this_scene.anims.create({
		key: keys['left'],
		frames: this_scene.anims.generateFrameNumbers(skin, { start: 0, end: 3 }),
		frameRate: 10,
		repeat: -1
	});

	this_scene.anims.create({
		key: keys['down'],
		frames: [ { key: skin, frame: 4 } ],
		frameRate: 20
	});

	this_scene.anims.create({
		key: keys['right'],
		frames: this_scene.anims.generateFrameNumbers(skin, { start: 5, end: 8 }),
		frameRate: 10,
		repeat: -1
	});
	this_scene.anims.create({
		key: keys['gameOver'],
		frames: [ { key: skin, frame: 9 } ],
		frameRate: 20
	});
	this_scene.anims.create({
		key: keys['up'],
		frames: [ { key: skin, frame: 10 } ],
		frameRate: 20
	});
}