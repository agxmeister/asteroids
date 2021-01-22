import Block from "./Block";

export default class Flash extends Block {
    constructor(canvasWidth, canvasHeight) {
        super(canvasWidth, canvasHeight, 2);
    }
    onUpdate(time) {
        if (this.stateTime == null) {
            return;
        }
        if (this.stateTime + 5000 < time) {
            this.isDestroyed = true;
        }
    }
    onDraw(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.direction);
        context.beginPath();
        context.moveTo(0, 1);
        context.lineTo(0, -1);
        context.strokeStyle = 'rgb(255, 150, 150, 0.3)';
        context.stroke();
        context.restore();
    }
    onOutOfScreen() {
        this.isDestroyed = true;
    }
}
