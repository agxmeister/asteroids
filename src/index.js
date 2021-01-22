import {Application} from './Application';

function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '400');
    canvas.setAttribute('height', '400');
    return canvas;
}
const canvas = createCanvas();
document.body.appendChild(canvas);

const application = new Application();
application.run(canvas);
