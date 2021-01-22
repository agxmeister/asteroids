import BlockFactory from "./BlockFactory";
import Ship from "../block/Ship";

export default class ShipFactory extends BlockFactory {
    constructor(canvasWidth, canvasHeight, collection, bulletFactory, flashFactory) {
        super(canvasWidth, canvasHeight, collection);
        this.bulletFactory = bulletFactory;
        this.flashFactory = flashFactory;
    }
    doCreate() {
        return new Ship(this.canvasWidth, this.canvasHeight, this.bulletFactory, this.flashFactory);
    }
}
