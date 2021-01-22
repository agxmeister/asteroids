import BlockFactory from "./BlockFactory";
import Asteroid from "../block/Asteroid";

class AsteroidFactory extends BlockFactory {
    constructor(canvasWidth, canvasHeight, collection, splashFactory, asteroidFactory) {
        super(canvasWidth, canvasHeight, collection);
        this.splashFactory = splashFactory;
        this.asteroidFactory = asteroidFactory;
    }
}

export class BigAsteroidFactory extends AsteroidFactory {
    doCreate(radius, positionX, positionY, direction, speed) {
        return new Asteroid(this.canvasWidth, this.canvasHeight, 3, this.splashFactory, this.asteroidFactory);
    }
}
export class MediumAsteroidFactory extends AsteroidFactory {
    doCreate(radius, positionX, positionY, direction, speed) {
        return new Asteroid(this.canvasWidth, this.canvasHeight, 2, this.splashFactory, this.asteroidFactory);
    }
}
export class SmallAsteroidFactory extends AsteroidFactory {
    doCreate(radius, positionX, positionY, direction, speed) {
        return new Asteroid(this.canvasWidth, this.canvasHeight, 1, this.splashFactory, this.asteroidFactory);
    }
}
