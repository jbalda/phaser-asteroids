import Asteroid from "./asteroid.js";
export default class QuickAsteroid extends Asteroid{

    constructor(scene,x,y,claveTextura){
        //Escena, un x y un y, y el nombre de una textura, que ya hemos cargado (la imagen)
        super(scene,x,y,claveTextura);
        this.speed*=2;
    }
}