import allImages from './Images';

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d')!;
const clearBtn = document.getElementById('clear')!;
const changeImageBtn = document.getElementById('changeimage')!;

const image = new Image();

const allColors = ['red', 'orange', 'yellow', 'limegreen', 'blue', 'pink', 'purple', 'brown', 'white', 'black'];
let selectedColor = 'red';

let selectedImage = allImages[0];

let dragging = false;

loadImage();
setupColors();

canvas.addEventListener('mousedown', ({ clientX, clientY, preventDefault }) => {
  beginPaint(clientX, clientY);
  preventDefault();
});
canvas.addEventListener('touchstart', e => {
  beginPaint(e.touches[0].clientX, e.touches[0].clientY);
  e.preventDefault();
});
canvas.addEventListener('mouseup', ({ clientX, clientY, preventDefault }) => {
  endPaint(clientX, clientY);
  preventDefault();
});
canvas.addEventListener('touchend', e => {
  endPaint(e.touches[0].clientX, e.touches[0].clientY);
  e.preventDefault();
});
canvas.addEventListener('mousemove', ({ clientX, clientY, preventDefault }) => {
  paint(clientX, clientY);
  preventDefault();
});
canvas.addEventListener('touchmove', e => {
  paint(e.touches[0].clientX, e.touches[0].clientY);
  e.preventDefault();
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  loadImage();
})


changeImageBtn.addEventListener('click', () => {
  let newImage = '';
  do {
    const index = Math.floor(Math.random() * allImages.length);
    newImage = allImages[index];
  } while (newImage === selectedImage);

  selectedImage = newImage;
  loadImage();
})


function loadImage() {
  image.src = selectedImage;
  image.addEventListener('load', () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  });
}

function setupColors() {
  const ul = document.querySelector('.colors')!;
  for (const color of allColors) {
    const li = document.createElement('li');
    li.style.backgroundColor = color;
    li.addEventListener('click', _ => {
      selectedColor = color;
      // Soportar Safari antiguo es lo que tiene
      const colors = document.querySelectorAll('ul.colors li');
      for (let i = 0; i < colors.length; i++)
        colors[i].classList.remove('selected');
      li.classList.add('selected');
    })
    ul.appendChild(li);
  }
  selectedColor = allColors[0];
  document.querySelector('ul.colors li')!.classList.add('selected');
}

let lastX: number | undefined = undefined;
let lastY: number | undefined = undefined;

function toCanvasPoint(clientX: number, clientY: number) {
  const { left, top, width } = canvas.getBoundingClientRect();

  const unscaledX = clientX - left;
  const unscaledY = clientY - top;

  // El canvas tiene un max-width: 100% por lo que puede estar escalado
  const scaleRatio = image.width / width;
  const x = unscaledX * scaleRatio;
  const y = unscaledY * scaleRatio;
  return { x, y }
}

function beginPaint(clientX: number, clientY: number) {
  dragging = true;
  const { x, y } = toCanvasPoint(clientX, clientY);
  lastX = x;
  lastY = y;
}

function endPaint(_clientX: number, _clientY: number) {
  dragging = false;
  lastX = undefined;
  lastY = undefined;
}

function paint(clientX: number, clientY: number) {
  if (!dragging)
    return;

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