const canvasRect = document.getElementById('canvasRect');
const ctx = canvasRect.getContext('2d');

let lineY = 0;
let direction = 1;

function drawLine() {
   
   // Прямоугольник

   ctx.fillStyle = 'pink';
   ctx.fillRect(0, 0, canvasRect.width, canvasRect.height);

   // Круг

   ctx.fillStyle = 'blue';
   ctx.arc(50, 50, 30, 0, Math.PI * 2); 
   ctx.fill();

   // Линия
   ctx.beginPath();
   ctx.moveTo(100, lineY);
   ctx.lineTo(100, lineY + 80);
   ctx.strokeStyle = 'green';
   ctx.lineWidth = 5;
   ctx.stroke();
   ctx.closePath();
   
   lineY += direction * .5;
   
   if (lineY <= 0 || lineY >= canvasRect.height - 80) {
        direction *= -1;
   }
   
   requestAnimationFrame(drawLine);
   
   // Треугольник

   ctx.beginPath();
   ctx.moveTo(200, 50); 
   ctx.lineTo(150, 80);
   ctx.lineTo(250, 80);
   ctx.closePath();
   const gradient = ctx.createLinearGradient(150, 50, 250, 80);
   gradient.addColorStop(0, 'red');
   gradient.addColorStop(0.5, 'green');
   gradient.addColorStop(1, 'blue');
   ctx.fillStyle = gradient;
   ctx.fill();
   ctx.strokeStyle = 'gray';
   ctx.lineWidth = 4;
   ctx.stroke();
}

drawLine();

