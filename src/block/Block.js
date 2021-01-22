export default class Block {
    constructor(canvasWidth, canvasHeight, radius) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.radius = radius;
        this.endurance = 1;
        this.position = {
            x: 0,
            y: 0
        };
        this.direction = 0;
        this.speed = {
            x: 0,
            y: 0
        };
        this.isDestroyed = false;
        this.stateTime = null;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    setDirection(direction) {
        this.direction = direction * Math.PI / 180;
        this.setSpeed(this.getSpeed());
    }

    getDirection() {
        return this.direction / Math.PI * 180;
    }

    setSpeed(speed) {
        this.speed.x = speed * Math.sin(this.direction);
        this.speed.y = -speed * Math.cos(this.direction);
    }

    getSpeed() {
        return Math.sqrt(Math.pow(this.speed.x, 2) + Math.pow(this.speed.y, 2));
    }

    destroy() {
        this.onDestroy();
        this.isDestroyed = true;
    }

    update(time) {
        if (this.stateTime + 10 > time) {
            return;
        }

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        let isOutOfScreen = false;
        if (this.position.x > this.canvasWidth + this.radius) {
            isOutOfScreen = true;
            this.position.x = -this.radius;
        }
        if (this.position.x < -this.radius) {
            isOutOfScreen = true;
            this.position.x = this.canvasWidth + this.radius;
        }
        if (this.position.y > this.canvasHeight + this.radius) {
            isOutOfScreen = true;
            this.position.y = -this.radius;
        }
        if (this.position.y < -this.radius) {
            isOutOfScreen = true;
            this.position.y = this.canvasHeight + this.radius;
        }

        this.onUpdate(time);
        if (isOutOfScreen) {
            this.onOutOfScreen();
        }

        this.stateTime = time;
    }

    draw(context) {
        this.onDraw(context);
    }

    isCollideWith(block) {
        const distance = Math.sqrt(Math.pow(this.position.x - block.position.x, 2) + Math.pow(this.position.y - block.position.y, 2));
        return distance < (this.radius + block.radius);
    }

    hit() {
        this.endurance--;
        if (this.endurance <= 0) {
            this.destroy();
        }
    }

    onDestroy() {}
    onUpdate() {}
    onOutOfScreen() {}
    onDraw(context) {}
}
