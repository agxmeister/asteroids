import BlockCollection from "./BlockCollection";
import {BigAsteroidFactory, MediumAsteroidFactory, SmallAsteroidFactory} from "./factory/AsteroidFactory";
import BulletFactory from "./factory/BulletFactory";
import ShipFactory from "./factory/ShipFactory";
import ScoreLabel from "./block/ScoreLabel";
import Pipeline from "./Pipeline";
import CollisionProcessor from "./processor/CollisionProcessor";
import AnimationProcessor from "./processor/AnimationProcessor";
import GameProcessor from "./processor/GameProcessor";
import GarbageProcessor from "./processor/GarbageProcessor";
import {FireSplashFactory, StoneSplashFactory} from "./factory/SplashFactory";

export default class Application {
    run(canvas) {
        const context = canvas.getContext('2d');

        const splashCollection = new BlockCollection();
        const fireSplashFactory = new FireSplashFactory(canvas.width, canvas.height, splashCollection);
        const stoneSplashFactory = new StoneSplashFactory(canvas.width, canvas.height, splashCollection);

        const asteroidCollection = new BlockCollection();
        const smallAsteroidFactory = new SmallAsteroidFactory(canvas.width, canvas.height, asteroidCollection, stoneSplashFactory);
        const mediumAsteroidFactory = new MediumAsteroidFactory(canvas.width, canvas.height, asteroidCollection, stoneSplashFactory, smallAsteroidFactory);
        const bigAsteroidFactory = new BigAsteroidFactory(canvas.width, canvas.height, asteroidCollection, stoneSplashFactory, mediumAsteroidFactory);

        const bulletCollection = new BlockCollection();
        const bulletFactory = new BulletFactory(canvas.width, canvas.height, bulletCollection, fireSplashFactory);

        const shipCollection = new BlockCollection();
        const shipFactory = new ShipFactory(canvas.width, canvas.height, shipCollection, bulletFactory, fireSplashFactory);

        const ship = shipFactory.create();
        ship.setPosition(canvas.width / 2, canvas.height / 2);

        const labelCollection = new BlockCollection();
        const scoreLabel = new ScoreLabel(canvas.width, canvas.height);
        labelCollection.add(scoreLabel);

        const pipeline = new Pipeline(
            new CollisionProcessor(shipCollection, bulletCollection, asteroidCollection),
            new AnimationProcessor(context, shipCollection, bulletCollection, asteroidCollection, splashCollection, labelCollection),
            new GameProcessor(shipCollection, asteroidCollection, bigAsteroidFactory, scoreLabel),
            new GarbageProcessor(shipCollection, bulletCollection, asteroidCollection, splashCollection),
        );

        function render(time) {
            context.fillStyle = 'rgb(25, 25, 25)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            pipeline.run(time);
            window.requestAnimationFrame(render);
        }

        window.addEventListener("keydown", event => {
            if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                ship.left = true;
            }
            if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                ship.right = true;
            }
            if (event.code === 'KeyW' || event.code === 'ArrowUp') {
                ship.up = true;
            }
            if (event.code === 'Space') {
                ship.fire(event.timeStamp);
            }
        });

        window.addEventListener("keyup", event => {
            if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                ship.left = false;
            }
            if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                ship.right = false;
            }
            if (event.code === 'KeyW' || event.code === 'ArrowUp') {
                ship.up = false;
            }
            if (event.code === 'Space') {
                ship.arm(event.timeStamp);
            }
        });

        render();
    }
}
