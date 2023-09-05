import {CoordinateCalculator} from './coordinateCalculator.js';
export class CanvasTesting {

    constructor() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'red';
        ctx.fillRect(10, 10, 100, 100);
    }

}

export function showSquare() {
    const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.style.border = '1px solid black';

        ctx.fillStyle = "rgba(0, 200, 0, 0.7)";
        ctx.fillRect(10, 10, 200, 100);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.7)';
        ctx.fillRect(50, 50, 200, 100);
        ctx.clearRect(70, 70, 20, 20)
        console.log('canvas height: ', canvas.clientHeight)
        console.log('canvas width: ', canvas.clientWidth)
        ctx.fillRect(10, 140, 1,1)
        // ctx.fillCircle(ctx.width/2, ctx.height/2, 50)
}


// const canvasTesting = new CanvasTesting();
const coordCalc = new CoordinateCalculator({x: 506.47, y: 487.6}, {x: 502.61, y: 515.51}, {x: 487.95, y: 549.69}, {x: 439.05, y: 528.87}, {x: 429.90, y: 484.37})
coordCalc.setInnerPoints({x: 500, y: 500}, {x: 451.21, y: 501.46})
coordCalc.setOuterPoints()
console.log('coordCalc: ', coordCalc)
console.log('coordCalc.getCenterPoint(): ', coordCalc.getCenterPoint())
console.log('coordCalc.getMaxMinFromPoints(): ', coordCalc.getMaxMinFromPoints({x: 10, y: 10}, {x: 100, y: 100}, {x: 200, y: 200}))

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.border = '1px solid black';
canvas.setAttribute('height', coordCalc.suggestCanvasSize().height + 20);
canvas.setAttribute('width', coordCalc.suggestCanvasSize().width + 20);
ctx.translate(coordCalc.getCenterPoint().centerX, coordCalc.getCenterPoint().centerY);
ctx.scale(1, -1);
for (const point of coordCalc.outerPoints) {
    ctx.move(point.x, point.y);
    ctx.line
}
// Inte helt intuitivt. Man kan inte veta vilka punkter som är grannar. Det måste användaren veta och ange. Då skulle man kunna strukturera dem som en dubbel circular linked list.