export default class BlockCollection {
    constructor() {
        this.blocks = [];
    }
    add(block) {
        this.blocks.push(block);
    }
    get() {
        return this.blocks;
    }
    removeDestroyed() {
        this.blocks = this.blocks.filter(block => !block.isDestroyed);
    }
}
