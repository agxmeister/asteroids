import {Processor} from "./Processor";

export class CollisionProcessor extends Processor {
    constructor(shipCollection, bulletCollection, asteroidCollection) {
        super();
        this.shipCollection = shipCollection;
        this.bulletCollection = bulletCollection;
        this.asteroidCollection = asteroidCollection;
    }
    run(time) {
        this.bulletCollection.get().forEach(bullet => {
            if (bullet.isDestroyed) {
                return;
            }
            this.asteroidCollection.get().forEach(asteroid => {
                if (bullet.isDestroyed || !bullet.isCollideWith(asteroid)) {
                    return;
                }
                bullet.hit();
                asteroid.hit();
            });
        });
        this.asteroidCollection.get().forEach(asteroid => {
            this.shipCollection.get().forEach(ship => {
                if (!asteroid.isCollideWith(ship)) {
                    return;
                }
                ship.hit();
            });
        });
    }
}
