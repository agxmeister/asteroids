import Processor from "./Processor";

export default class GameProcessor extends Processor {
    constructor(shipCollection, asteroidCollection, asteroidFactory, scoreLabel) {
        super();
        this.shipCollection = shipCollection;
        this.asteroidCollection = asteroidCollection;
        this.asteroidFactory = asteroidFactory;
        this.scoreLabel = scoreLabel;
        this.generationTime = null;
    }
    run(time) {
        if (this.generationTime == null || this.generationTime < time - 30000) {
            const asteroid = this.asteroidFactory.create();
            if (Math.random() < 0.5) {
                asteroid.setPosition(Math.random() * asteroid.canvasWidth, -asteroid.radius);
            } else {
                asteroid.setPosition(-asteroid.radius, Math.random() * asteroid.canvasHeight);
            }
            asteroid.setDirection(Math.random() * 360);
            asteroid.setSpeed(Math.random() / 2 + 0.1);
            this.generationTime = time;
        }
        this.asteroidCollection.get().forEach(asteroid => {
            if (asteroid.isDestroyed) {
                this.scoreLabel.score++;
            }
        });
    }
}
