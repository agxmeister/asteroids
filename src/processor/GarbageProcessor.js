import {Processor} from "./Processor";

export class GarbageProcessor extends Processor {
    constructor(...blockCollection) {
        super();
        this.blockCollection = blockCollection;
    }
    run() {
        this.blockCollection.forEach(collection => collection.removeDestroyed());
    }
}
