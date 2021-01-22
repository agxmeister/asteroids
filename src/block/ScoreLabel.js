import Block from "./Block";

export default class ScoreLabel extends Block {
    constructor(canvasWidth, canvasHeight) {
        super(canvasWidth, canvasHeight, 0);
        this.score = 0;
    }
    onDraw(context) {
        context.save();
        context.fillStyle = 'rgb(230, 230, 230)';
        context.font = '10px arial';
        context.fillText('Score: ' + this.score, 4, this.canvasHeight - 4);
        context.restore();
    }
}
