import Block from "./Block";

export default class Bullet extends Block {
    constructor(canvasWidth, canvasHeight, flashFactory) {
        super(canvasWidth, canvasHeight, 2);
        this.flashFactory = flashFactory;
        this.setSpeed(4);
    }
    onDraw(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.direction);
        context.beginPath();
        context.moveTo(0, 1);
        context.lineTo(0, -1);
        context.strokeStyle = 'rgb(255, 75, 0)';
        context.stroke();
        context.restore();
    }
    onOutOfScreen() {
        this.isDestroyed = true;
    }
    onDestroy() {
        for (let i = 0; i < 10; i++) {
            const flash = this.flashFactory.create();
            flash.setPosition(this.position.x, this.position.y);
            flash.setDirection(this.getDirection() - 180 + (i - 5) * Math.random() * 14);
            flash.setSpeed(3 + Math.random() * 3);
        }
    }
}
