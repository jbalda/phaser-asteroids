import PlayScene from './playscene.js';
export default class StartScene extends Phaser.Scene{

    constructor(){
        super({key:'StartScene'});
    }

    preload(){
        console.log('Llegó a SceneA');
    }
    create(){
        //Graphics es la forma que tiene Phaser para graficar formas o figuras bidimensionales
        let graphics = this.add.graphics();
        //Defino un estilo de llenado  y un alfa (0 completamente transparente, 1 completamente opaco);
        graphics.fillStyle('0x0000FF',1);
        //Defino qué quiero graficar. x,y,ancho,alto
        graphics.fillRect(0,0,800,600);
        //Agrega texto
        this.add.text(90,90,'Bienvenido a Asteroid Killer',{font:'48px Arial',fill:'0x000000'});

        const startButton = this.add.text(350,300, 'Iniciar', {fill: '#0f0'});
        startButton.setInteractive();
        startButton.on('pointerdown', () => this.iniciar());
    }

    iniciar(){
        this.scene.add('PlayScene',new PlayScene());
        this.scene.remove('startScene');
    }

    update(){

    }
}