import QuickAsteroid  from "./quickAsteroid.js";
import Asteroid from "./asteroid.js";

export default class AsteroidFactory{

    static makeAsteroid(type,scene,x,y){
        switch(type){
            case 2: return new QuickAsteroid(scene,x,y,'asteroid-3');
            default: return new Asteroid(scene,x,y,'asteroid-1');
        }
    }
}