import Block from "./Block";

export default class Bullet extends Block {
    constructor(canvasWidth, canvasHeight, splashFactory) {
        super(canvasWidth, canvasHeight, 2);
        this.splashFactory = splashFactory;
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
            const splash = this.splashFactory.create();
            splash.setPosition(this.position.x, this.position.y);
            splash.setDirection(this.getDirection() - 180 + (i - 5) * Math.random() * 14);
            splash.setSpeed(3 + Math.random() * 3);
        }
    }
}
