import Shoot from './../gameObjects/shoot.js';
import  AsteroidFactory  from '../gameObjects/asteroidsFactory.js';

export default class PlayScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PlayScene', active: true });
        this.lastFired = 0;
        this.asteroidElapsedTime = 3000;
        this.gameOver = false;
        this.score =0;
        this.lives = 3; //vidas
        
    }

    preload() {
        this.load.image('background', './img/background.png');
        this.load.image('ship', './img/ship.png');
        this.load.image('asteroid-1', './img/asteroid-1.png');
        this.load.image('shoot', './img/shoot.png');
        this.load.image('asteroid-3', './img/asteroid-3.png');
        this.load.image('health-bar', './img/HealthBar.png');
        this.load.image('health-bar-color', './img/HealthBarColor.png');
    }

    create() {

        this.add.image(0, 0, 'background');
        this.add.image(640, 0, 'background');
        this.add.image(0, 480, 'background');
        this.add.image(640, 480, 'background');
        this.barraVida = this.add.image(708, 58, 'health-bar').setOrigin(1);
        this.barraVidaColor = this.add.image(700, 50, 'health-bar-color').setOrigin(1);
        this.barraVidaColor.setTint(0x00FF00);

        this.ship = this.physics.add.image(400, 300, 'ship');
        this.ship.setDamping(true);
        this.ship.setDrag(0.99);
        this.ship.setMaxVelocity(200);
        this.ship.setCollideWorldBounds(true);
        this.ship.setSize(20, 30);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.shootsGroup = this.physics.add.group({
            classType: Shoot,
            maxSize: 10,
            runChildUpdate: true
        });

        this.asteroidsGroup = this.physics.add.group();

        this.asteroidsArray = [];

        this.asteroidsTimedEvent = this.time.addEvent({
            delay: this.asteroidElapsedTime,
            callback: this.addAsteroid,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.ship, this.asteroidsGroup, this.hitShip, null, this);
        this.physics.add.collider(this.shootsGroup, this.asteroidsGroup, this.hitShoot, null, this);

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    update(time, delta) {

        if (this.gameOver) {
            return;
        }

        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
        } else {
            this.ship.setAcceleration(0);
        }

        if (this.cursors.space.isDown && time > this.lastFired) {
            let shoot = this.shootsGroup.get();

            if (shoot) {
                shoot.fire(this.ship.x, this.ship.y, this.ship.rotation);

                this.lastFired = time + 50;
            }
        }

        if (this.cursors.left.isDown) {
            this.ship.setAngularVelocity(-300);
        } else if (this.cursors.right.isDown) {
            this.ship.setAngularVelocity(300);
        } else {
            this.ship.setAngularVelocity(0);
        }

        this.asteroidsArray = this.asteroidsArray.filter(function (asteroid) {
            return asteroid.active;
        });

        for (let asteroid of this.asteroidsArray) {
            if (!asteroid.isOrbiting()) {
                asteroid.fire(this.ship.x, this.ship.y);
            }

            asteroid.update(time, delta);
        }
    }

    addAsteroid() {
        
        //let asteroid = new Asteroid(this, 200, 300, 'asteroid-1', 0);
        let asteroid = AsteroidFactory.makeAsteroid(Phaser.Math.RND.integerInRange(1,2),this,200,300);
        this.asteroidsGroup.add(asteroid, true);
        this.asteroidsArray.push(asteroid);

    }

    hitShip(ship, asteroid) {
        asteroid.disableBody(true, true);
        if(this.lives==1){
            console.log(this.lives);
            this.lives =0;
            this.physics.pause();
            this.asteroidsTimedEvent.paused = true;
            this.ship.setTint(0xff0000);
            this.barraVidaColor.setTint(0xff0000);
            this.barraVidaColor.displayWidth = 0;
            this.ship.body.allowRotation = false;
            this.gameOver = true;
        }
        else{
            this.lives--;
            console.log(this.lives);
            if(this.lives ==2){
                this.barraVidaColor.setTint(0x0000ff);
                this.barraVidaColor.displayWidth = this.barraVida.width *0.6;
                this.ship.setTint(0xffd400); //amarillo
            }
            else{
                this.barraVidaColor.setTint(0xff9000);
                this.barraVidaColor.displayWidth = this.barraVida.width *0.3;
                this.ship.setTint(0xff9000); //anaranjado
            }
        }

                 //ff9000 naranja


    }

    hitShoot(shoot, asteroid) {
        this.score +=asteroid.points;
        asteroid.disableBody(true, true);
        //Para score
       
        this.scoreText.setText("Score: " + this.score );
    }
}