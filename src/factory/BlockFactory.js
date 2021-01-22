export default class BlockFactory {
    constructor(canvasWidth, canvasHeight, collection) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.collection = collection;
    }
    create() {
        const block = this.doCreate();
        this.collection.add(block);
        return block;
    }
    doCreate() {}
}
