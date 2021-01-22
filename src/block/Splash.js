import Block from "./Block";

class Splash extends Block {
    constructor(canvasWidth, canvasHeight, lifetime) {
        super(canvasWidth, canvasHeight, 2);
        this.lifetime = lifetime;
        this.createTime = null;
        this.transparency = 0.3;
    }
    onUpdate(time) {
        if (this.stateTime == null) {
            return;
        }
        if (this.createTime == null) {
            this.createTime = this.stateTime;
        }
        if (this.createTime + this.lifetime < time) {
            this.isDestroyed = true;
        } else {
            this.transparency *= (this.lifetime - (time - this.createTime)) / this.lifetime;
        }
    }
    onOutOfScreen() {
        this.isDestroyed = true;
    }
}

export class FireSplash extends Splash {
    onDraw(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.direction);
        context.beginPath();
        context.moveTo(0, 1);
        context.lineTo(0, -1);
        context.strokeStyle = 'rgb(255, 150, 150, ' + this.transparency + ')';
        context.stroke();
        context.restore();
    }
}

export class StoneSplash extends Splash {
    onDraw(context) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.direction);
        context.beginPath();
        context.arc(0, 0, 2, 0, Math.PI * 2, true);
        context.fillStyle = 'rgb(110, 110, 110, ' + this.transparency + ')';
        context.fill();
        context.restore();
    }
}
