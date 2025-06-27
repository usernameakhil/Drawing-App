const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');

// Set canvas full size
function resizeCanvas() {
  canvas.width = window.innerWidth - 40;
  canvas.height = window.innerHeight - 180;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let drawing = false;
let currentColor = colorPicker.value;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', e => { e.preventDefault(); drawing = true; });
canvas.addEventListener('touchend', () => drawing = false);
canvas.addEventListener('touchmove', drawTouch);

function draw(e) {
  if (!drawing) return;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function drawTouch(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

colorPicker.addEventListener('change', e => {
  currentColor = e.target.value;
  ctx.beginPath(); // Reset drawing path
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
