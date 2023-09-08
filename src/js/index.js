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

const canvas = document.getElementById('canvas');

canvas.setAttribute('height', coordCalc.suggestCanvasSize().height + 500);
canvas.setAttribute('width', coordCalc.suggestCanvasSize().width + 500);
const ctx = canvas.getContext('2d');
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left)/6; // ctx.scale - faktorn och pga byte av x och y i coordCalc.rotate() pga fel axlar i kartan.
    const y = (-event.clientY + rect.top)/6; // ctx.scale - faktorn

    const translatedX = (y - dy); 
    const translatedY = (x - dx); 
  
    console.log(`Klickade på koordinat: x=${translatedX}, y=${translatedY}`);
  
    // Gör något med x och y, till exempel rita en punkt
    ctx.beginPath();
    ctx.arc(translatedY, translatedX, .5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  });
coordCalc.rotate();

ctx.scale(6, -6);

const dx = -470
const dy = -510 
ctx.translate(dx, dy); 

canvas.style.border = '1px solid black';


let flag = true;
let point1 = {}
for (const point of coordCalc.outerPoints) {
    if (flag) {
        ctx.moveTo(point.x, point.y);
        flag = false;
        point1 = point;
    } else {
    ctx.lineTo(point.x, point.y);
    }
}
ctx.lineTo(point1.x, point1.y)

ctx.lineWidth = .4;
ctx.stroke();

// Maybe structure points in double linked list?