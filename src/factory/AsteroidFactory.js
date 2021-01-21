import {BlockFactory} from "./BlockFactory";
import {Asteroid} from "../block/Asteroid";

export class AsteroidFactory extends BlockFactory {
    constructor(canvasWidth, canvasHeight, collection, asteroidFactory) {
        super(canvasWidth, canvasHeight, collection);
        this.asteroidFactory = asteroidFactory;
    }
}

export class BigAsteroidFactory extends AsteroidFactory {
    doCreate(radius, positionX, positionY, direction, speed) {
        return new Asteroid(this.canvasWidth, this.canvasHeight, 3, this.asteroidFactory);
    }
}
export class MediumAsteroidFactory extends AsteroidFactory {
    doCreate(radius, positionX, positionY, direction, speed) {
        return new Asteroid(this.canvasWidth, this.canvasHeight, 2, this.asteroidFactory);
    }
}
export class SmallAsteroidFactory extends AsteroidFactory {
    doCreate(radius, positionX, positionY, direction, speed) {
        return new Asteroid(this.canvasWidth, this.canvasHeight, 1, this.asteroidFactory);
    }
}
