import Splash from "../block/Flash";
import BlockFactory from "./BlockFactory";

export default class FlashFactory extends BlockFactory {
    doCreate() {
        return new Splash(this.canvasWidth, this.canvasHeight);
    }
}
