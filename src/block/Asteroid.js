import Block from "./Block";

export default class Asteroid extends Block {
    constructor(canvasWidth, canvasHeight, size, asteroidFactory) {
        const radius = size === 3 ? 20 : size === 2 ? 15 : 10;
        super(canvasWidth, canvasHeight, radius);
        this.size = size;
        this.asteroidFactory = asteroidFactory;
        this.endurance = size;
        this.rotation = 0;
        this.angles = [];
        let currentAngle = Math.random() * 55;
        while (currentAngle < 360) {
            this.angles.push(currentAngle);
            currentAngle += Math.random() * 55;
        }
        this.angles.push(this.angles[0]);
    }
    onDestroy() {
        if (this.size <= 1) {
            return;
        }
        for (let i = 0; i < 4; i++) {
            const asteroid = this.asteroidFactory.create();
            asteroid.setPosition(this.position.x, this.position.y);
            asteroid.setDirection(this.getDirection() + (i - 2) * Math.random() * 25);
            asteroid.setSpeed(this.getSpeed() + Math.random() / 3);
        }
    }
    onUpdate(time) {
        this.rotation++;
    }
    onDraw(context) {
        const getX = angle => this.radius * Math.cos((angle + this.rotation) * Math.PI / 180);
        const getY = angle => this.radius * Math.sin((angle + this.rotation) * Math.PI / 180);

        context.save();
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.moveTo(getX(this.angles[0]), getY(this.angles[0]));
        this.angles.forEach(angle => {
            context.lineTo(getX(angle), getY(angle));
        });
        context.fillStyle = 'rgb(230, 230, 230)';
        context.fill();
        context.restore();
    }
}
