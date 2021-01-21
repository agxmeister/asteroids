import {BlockFactory} from "./BlockFactory";
import {Bullet} from "../block/Bullet";

export class BulletFactory extends BlockFactory {
    constructor(canvasWidth, canvasHeight, collection, flashFactory) {
        super(canvasWidth, canvasHeight, collection);
        this.flashFactory = flashFactory;
    }
    doCreate() {
        return new Bullet(this.canvasWidth, this.canvasHeight, this.flashFactory);
    }
}
