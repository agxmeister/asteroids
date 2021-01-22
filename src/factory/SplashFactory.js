import BlockFactory from "./BlockFactory";
import {FireSplash, StoneSplash} from "../block/Splash";

class SplashFactory extends BlockFactory {
}

export class FireSplashFactory extends SplashFactory {
    doCreate() {
        return new FireSplash(this.canvasWidth, this.canvasHeight, 2000);
    }
}

export class StoneSplashFactory extends SplashFactory {
    doCreate() {
        return new StoneSplash(this.canvasWidth, this.canvasHeight, 1500);
    }
}
