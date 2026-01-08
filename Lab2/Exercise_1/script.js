const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

context.fillStyle = "rgb(195 15 5/ 50%)";
context.fillRect(20, 20, 150, 100);

context.fillStyle = 'rgb(5 195 15/ 50%)';
context.beginPath();
context.arc(250, 70, 55, 0, 2 * Math.PI);
context.fill();

context.save();
context.lineWidth = 5;
context.strokeStyle = 'rgb(15 5 195/ 50%)'
context.beginPath();
context.moveTo(350, 35);
context.lineTo(430, 100);
context.lineCap = 'round';
context.stroke();
context.restore();