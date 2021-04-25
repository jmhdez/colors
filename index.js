const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear');

const image = new Image();

const allColors = ['red', 'orange', 'yellow', 'limegreen', 'blue', 'pink', 'purple', 'white', 'black'];
let selectedColor = 'red';

const allImages = ['unicorn.png', 'mermaid.png', 'tiana.png', 'bear.png'];
let selectedImage = 'unicorn.png';

let dragging = false;

loadImage();
setupColors();

canvas.addEventListener('mousedown', ({ clientX, clientY }) => beginPaint(clientX, clientY));
canvas.addEventListener('touchstart', e => beginPaint(e.touches[0].clientX, e.touches[0].clientY));
canvas.addEventListener('mouseup', ({ clientX, clientY }) => endPaint(clientX, clientY));
canvas.addEventListener('touchend', e => endPaint(e.touches[0].clientX, e.touches[0].clientY));
canvas.addEventListener('mousemove', ({ clientX, clientY }) => paint(clientX, clientY));
canvas.addEventListener('touchmove', e => paint(e.touches[0].clientX, e.touches[0].clientY));

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  loadImage();
})


document.getElementById('changeimage').addEventListener('click', () => {
  const index = Math.floor(Math.random() * allImages.length);
  selectedImage = allImages[index];
  loadImage();
})


function loadImage() {
  image.src = 'images/' + selectedImage;
  image.addEventListener('load', () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  });
}

function setupColors() {
  const ul = document.querySelector('.colors');
  for (const color of allColors) {
    const li = document.createElement('li');
    li.style.backgroundColor = color;
    li.addEventListener('click', _ => {
      selectedColor = color;
      document.querySelectorAll('ul.colors li').forEach(x => x.classList.remove('selected'));
      li.classList.add('selected');
    })
    ul.appendChild(li);
  }
  selectedColor = allColors[0];
  document.querySelector('ul.colors li').classList.add('selected');
}

let lastX = undefined;
let lastY = undefined;

function toCanvasPoint(clientX, clientY) {
  const { left, top, width } = canvas.getBoundingClientRect();

  const unscaledX = clientX - left;
  const unscaledY = clientY - top;

  // El canvas tiene un max-width: 100% por lo que puede estar escalado
  const scaleRatio = image.width / width;
  const x = unscaledX * scaleRatio;
  const y = unscaledY * scaleRatio;
  return { x, y }
}

function beginPaint(clientX, clientY) {
  dragging = true;
  const { x, y } = toCanvasPoint(clientX, clientY);
  lastX = x;
  lastY = y;
}

function endPaint(_clientX, _clientY) {
  dragging = false;
  lastX = undefined;
  lastY = undefined;
}

function paint(clientX, clientY) {
  if (!dragging)
    return;

  // TODO: Cambiar lo de pintar un círculo por una línea que
  // va desde el último, poniendo el estilo de línea gordo y 
  // redondo

  const { x, y } = toCanvasPoint(clientX, clientY);

  ctx.fillStyle = selectedColor;
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = selectedColor;

  ctx.beginPath();

  lastX = lastX || x;
  lastY = lastY || y;

  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y)
  ctx.stroke();

  ctx.drawImage(image, 0, 0);

  lastX = x;
  lastY = y;
}