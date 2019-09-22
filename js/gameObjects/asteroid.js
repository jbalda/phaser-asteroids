export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
    //asteroid-1
    constructor (scene, x, y, textureKey) {
        if(!textureKey){
            textureKey = 'asteroid-1';
        }
        super(scene, x, y, textureKey);

        this.speed = Phaser.Math.GetSpeed(100, 1);
        this.direction = 0;
        this.angle = 0;
        this.orbiting = false;
        this.direction = 0;
        this.factor = 1;
        
    }

    isOrbiting(){
        return this.orbiting;
    }

    fire(shipX, shipY) {
        this.setSize(32, 29);
        this.orbiting = true;

        this.setActive(true);
        this.setVisible(true);

        let xOrigin = Phaser.Math.RND.between(0, 800);
        let yOrigin = 600 * Phaser.Math.RND.between(0,1);
        this.setPosition(xOrigin, yOrigin);
        

        if (shipX > xOrigin){
            let m = (shipY - yOrigin) / (shipX - xOrigin);
            this.direction = Math.atan(m);
        } else {
            this.factor = -1;
            let m =  (shipY - yOrigin) / (xOrigin - shipX);
            this.direction = Math.atan(m);
        }

        this.angleRotation = Phaser.Math.RND.between(0.2, 0.9);
    }

    update(time, delta) {
        
        this.x += this.factor * Math.cos(this.direction) * this.speed * delta;
        this.y += Math.sin(this.direction) * this.speed * delta;
        this.angle += this.angleRotation;
        
        if (this.x < -50 || this.y < -50 || this.x > 800 || this.y > 600){
            this.setActive(false);
            this.setVisible(false);
        }
        
    }
}
