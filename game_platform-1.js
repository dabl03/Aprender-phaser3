const SKY_BLUE='#87CEEB';
class Game_scene extends Phaser.Scene{
	constructor(){
		super();
		this.platform_1;
		this.key_codes;
		this.speed_y=-400;
		this.coint_count=0;
		this.coint_text="";
		this.bombs=null;
		this.player=null;
		this.gameOver=false;
	}
	preload(){
		this.load.image('sky', 'media/sky-1.png');
		this.load.image('ground', 'media/platform-1.png');
		this.load.image('coint', 'media/coint-1.png');
		this.load.image('bomb', 'media/bomba-1.png');
		this.load.spritesheet('dude', 
			'media/boot-1.png',
			{ frameWidth: 26, frameHeight: 37 }
			);
	}
	create(){
		//Cargamos el fondo y le damos el tamaño de toda la pantalla
		let f_img=this.add.image(this.game.config.width/2, this.game.config.height/2, 'sky');
		f_img.setDisplaySize(this.game.config.width, this.game.config.height);

		//Creamos una nueva fisica estatica(Sera inmutables los objetos.).
		this.platform_1 = this.physics.add.staticGroup();
		this.platform_1.create(400, 568, 'ground').setScale(3).refreshBody();

		this.platform_1.create(600, 400, 'ground');
		this.platform_1.create(50, 250, 'ground');
		this.platform_1.create(750, 220, 'ground');
	    //Creamos una fisica de un objeto dinamico(se puede mover,)
	    this.player = this.physics.add.sprite(100, 450, 'dude');
	    //Después de crear el sprite se le da un ligero valor de rebote de 0.2.
	    this.player.setBounce(0.2);
		//cuanto mayor sea el valor más pesado será el objeto y más rápido caerá
		this.player.body.setGravityY(300);
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [ { key: 'dude', frame: 4 } ],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'gameOver',
			frames: [ { key: 'dude', frame: 9 } ],
			frameRate: 20
		});
		//Para permitir que el personaje colisione con las plataformas hay que crear un objeto Collider
		// Este supervisa si dos objetos físicos (que pueden incluir grupos) colisionan o se superponen entre ellos. Si esto ocurre se puede ejecutar una función propia opcionalmente, pero para detectar el simple hecho de que el personaje colisione con las plataformas no es necesario:
		this.physics.add.collider(this.player, this.platform_1);
		//Evento teclado:
		this.key_codes = this.input.keyboard.createCursorKeys();
		//Las monedas:
		let stars = this.physics.add.group({
			key: 'coint',
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 }
		});

		stars.children.iterate(function (child) {

			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

		});
		this.physics.add.collider(stars, this.platform_1);
		//Vemos si las extrellas se superponen con el jugador.
		this.physics.add.overlap(this.player, stars, function(player,star){
			star.disableBody(true, true);
			this.speed_y-=20;
			this.coint_text.setText('Coints: ' + (this.coint_count+=10));
			if (stars.countActive(true) === 0){
				stars.children.iterate(function (child) {

					child.enableBody(true, child.x, 0, true, true);

				});
			}
			var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

			var bomb = this.bombs.create(x, 16, 'bomb');
			bomb.setBounce(0.9);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		    //}
		}, null, this);
		this.coint_text = this.add.text(16, 16, 'Coints: 0', { fontSize: '32px', fill: '#000' });
		//Bomba
		this.bombs = this.physics.add.group();

		this.physics.add.collider(this.bombs, this.platform_1);

		this.physics.add.collider(this.player, this.bombs, function(p,bomm){
			this.physics.pause();
			//Colorea el personaje de rojo.
			//this.player.setTint(0xff0000);
			this.gameOver = true;
		}, null, this);
        this.cameras.main.startFollow(this.player);
        //se indica que colisione con los límites del juego
		////this.player.setCollideWorldBounds(true);
		////this.cameras.main.setZoom(1);
	}
	update (){
		if (this.key_codes.left.isDown){
			this.player.setVelocityX(-160);

			this.player.anims.play('left', true);
		}else if (this.key_codes.right.isDown){
			this.player.setVelocityX(160);

			this.player.anims.play('right', true);
		}else{
			if (this.gameOver){
				this.player.anims.play('gameOver');
			}else{
				this.player.setVelocityX(0);

				this.player.anims.play('turn');
			}
		}

		if (this.key_codes.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(this.speed_y);
		}
	}
	pause(){
		console.log("In pause")
	}
};