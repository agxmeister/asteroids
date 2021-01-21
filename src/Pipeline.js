export class Pipeline {
    constructor(...processors) {
        this.processors = processors;
    }
    run(time) {
        if (!time) {
            return;
        }
        this.processors.forEach(processor => processor.run(time));
    }
}
