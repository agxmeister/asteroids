import {Flash} from "../block/Flash";
import {BlockFactory} from "./BlockFactory";

export class FlashFactory extends BlockFactory {
    doCreate() {
        return new Flash(this.canvasWidth, this.canvasHeight);
    }
}
