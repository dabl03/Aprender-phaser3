class World_1{
	constructor(this_scene, player){
		this.scene=this_scene;
		this.treansure=[];
		this.houses=[];
		this.point_door=[];
		this.enemy=[];
	}
	create(){
		this.scene.cameras.main.setBounds(0, 0, 3392, 1000);
        this.scene.physics.world.setBounds(0, 0, 3392, 1000);

        this.map=this.scene.make.tilemap({ key: 'map-1' });
        this.tileset= this.map.addTilesetImage( 'Tnature-1.1');

        var layer = this.map.createLayer('back', this.tileset, 0, 0);
        this.layer2 = this.map.createLayer('no-mover', this.tileset, 0, 0);
 		this.layer3=this.map.createLayer("death",this.tileset,0,0);

 		this.layer2.setCollisionByExclusion([-1]);
 		this.layer3.setCollisionByExclusion([-1]);
	}
	create_collision(player){

 		this.scene.physics.add.collider(player, this.layer2);
 		this.scene.physics.add.collider(player, this.layer3,(player,e)=>{
 			/*
	 			if ((e.x>player.x-(player.width>>1) && e.x<player.x+(player.width>>1) ) && 
	 				(e.y>player.y-(player.height>>1) && e.y<player.y+(player.height>>1) )
	 			)
	 			this.scene.player.game_over=true;
 			/**/
 			console.log(e)
		    let offsetX = (e.width - e.width) / 2;
		    let offsetY = (e.height - e.height) / 2;
		    e.setSize(e.width * 0.8, e.height * 0.8);
		    e.setOffset(offsetX, offsetY);
		    if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), e.getBounds())) {
		        this.scene.player.game_over = true;
		    }
 		});
	}
}