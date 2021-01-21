import {Processor} from "./Processor";

export class AnimationProcessor extends Processor {
    constructor(context, ...blockCollection) {
        super();
        this.context = context;
        this.blockCollection = blockCollection;
    }
    run(time) {
        this.blockCollection.forEach(collection => collection.get().forEach(block => {
            block.update(time);
            block.draw(this.context);
        }));
    }
}
