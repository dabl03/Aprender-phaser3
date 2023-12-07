const txt_font_style={fontFamily: 'pixel_font, serif',fontSize:"2em",align:"right"};
class loads extends Phaser.Scene{
	constructor(){
		super({key:"loads"});
		this.if_error=false;
	}
	preload(){
		let progress = this.add.graphics();
        //this.load.setPath('media/');
        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0xff0000, 1);
            progress.fillRect(0, 270, 800 * value, 60);
            //this.add.//Todo: Añadir texto.
        });

        this.load.on('complete', ()=>{progress.destroy();});
        //Error:
        this.load.on('fileerror', function (key, file) {//No se esta llamando.
		    console.log('Error al cargar el archivo:', key);
		    alert("Hubo un error al cargar un archivo de recurso. Intente reiniciar la pagina o contacte al desarrollador.");
		    this.if_error=true;
		});

        //Texto de carga:
        this.loads_text=this.add.text(this.game.config.width/2,this.game.config.height/2, 'Cargando.',
         { backgroundColor:SKY_BLUE,color:"#000", fontFamily: 'pixel_font, serif',fontSize:"2em",align:"right"});
		let textBounds = this.loads_text.getBounds();
		this.loads_text.setX(this.game.config.width / 2 - textBounds.width / 2);
		this.loads_text.setY(this.game.config.height / 2 - textBounds.height / 2);

        //  Now let's load a huge stack of files!
        this.load.spritesheet('houses', 'media/casa2-1.png', { frameWidth: 39, frameHeight: 39 });
		this.load.spritesheet('boot-1', 
			'media/boot-1.png',{ frameWidth: 26, frameHeight: 37 }
		);
		//Imgs:
		this.load.image("back","media/sky-1.png");
		this.load.spritesheet("water+","media/downloads/Water+.png",{ frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet("Tnature-1.1","media/downloads/RPG Nature Tileset.png",{ frameWidth: 32, frameHeight: 32 });
		this.load.tilemapTiledJSON("map-1","utils/world-2/map-1.json");
	}
	create (){
		if (this.if_error){
	        this.loads_text.setText("Error.");
			return;
		}
		this.input.once('pointerdown', function (){
        	this.scene.start('game');
        }, this);
        this.loads_text.setText("Click para continuar.");
        let textBounds = this.loads_text.getBounds();
		this.loads_text.setX(this.game.config.width / 2 - textBounds.width / 2);
		this.loads_text.setY(this.game.config.height / 2 - textBounds.height / 2);
    }
}