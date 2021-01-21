import {Block} from "./Block";

export class Ship extends Block {
    constructor(canvasWidth, canvasHeight, bulletFactory, flashFactory) {
        super(canvasWidth, canvasHeight, 10);
        this.bulletFactory = bulletFactory;
        this.flashFactory = flashFactory;
        this.left = false;
        this.right = false;
        this.up = false;
        this.armedTime = null;
        this.isArmed = true;
    }
    onDestroy() {
        for (let i = 0; i < 50; i++) {
            const flash = this.flashFactory.create();
            flash.setPosition(this.position.x, this.position.y);
            flash.setDirection(this.getDirection() + (i - 5) * Math.random() * 14);
            flash.setSpeed(3 + Math.random() * 3);
        }
    }
    onUpdate(time) {
        if (this.left) {
            this.direction -= ((Math.PI / 180) * 3);
        }
        if (this.right) {
            this.direction += ((Math.PI / 180) * 3);
        }
        if (this.up) {
            this.speed.x += Math.sin(this.direction) * 0.05;
            this.speed.y += Math.cos(this.direction) * -0.05;
            const speed = this.getSpeed();
            if (speed > 3) {
                const factor = 3 / speed;
                this.speed.x = this.speed.x * factor;
                this.speed.y = this.speed.y * factor;
            }
        }
    }
    onDraw(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.direction);
        context.beginPath();
        context.moveTo(-5, 7);
        context.lineTo(0, -7);
        context.lineTo(5, 7);
        context.fillStyle = 'rgb(230, 230, 230)';
        context.fill();
        if (this.up) {
            context.beginPath();
            context.moveTo(-4, 8);
            context.lineTo(0, 10);
            context.lineTo(4, 8);
            context.fillStyle = 'rgb(255, 0, 0)';
            context.fill();
        }
        context.restore();
    }
    fire(time) {
        if (!this.isArmed || this.armedTime + 200 > time) {
            return;
        }
        const bullet = this.bulletFactory.create();
        bullet.setPosition(this.position.x, this.position.y);
        bullet.setDirection(this.getDirection());
        this.isArmed = false;
    }
    arm(time) {
        if (this.isArmed) {
            return;
        }
        this.armedTime = time;
        this.isArmed = true;
    }
}
