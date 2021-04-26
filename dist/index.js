"use strict";
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var clearBtn = document.getElementById('clear');
var changeImageBtn = document.getElementById('changeimage');
var image = new Image();
var allColors = ['red', 'orange', 'yellow', 'limegreen', 'blue', 'pink', 'purple', 'white', 'black'];
var selectedColor = 'red';
var allImages = ['unicorn.png', 'mermaid.png', 'tiana.png', 'bear.png', 'deer.png'];
var selectedImage = 'unicorn.png';
var dragging = false;
loadImage();
setupColors();
canvas.addEventListener('mousedown', function (_a) {
    var clientX = _a.clientX, clientY = _a.clientY, preventDefault = _a.preventDefault;
    beginPaint(clientX, clientY);
    preventDefault();
});
canvas.addEventListener('touchstart', function (e) {
    beginPaint(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
});
canvas.addEventListener('mouseup', function (_a) {
    var clientX = _a.clientX, clientY = _a.clientY, preventDefault = _a.preventDefault;
    endPaint(clientX, clientY);
    preventDefault();
});
canvas.addEventListener('touchend', function (e) {
    endPaint(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
});
canvas.addEventListener('mousemove', function (_a) {
    var clientX = _a.clientX, clientY = _a.clientY, preventDefault = _a.preventDefault;
    paint(clientX, clientY);
    preventDefault();
});
canvas.addEventListener('touchmove', function (e) {
    paint(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
});
clearBtn.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadImage();
});
changeImageBtn.addEventListener('click', function () {
    var newImage = '';
    do {
        var index = Math.floor(Math.random() * allImages.length);
        newImage = allImages[index];
    } while (newImage === selectedImage);
    selectedImage = newImage;
    loadImage();
});
function loadImage() {
    image.src = 'images/' + selectedImage;
    image.addEventListener('load', function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    });
}
function setupColors() {
    var ul = document.querySelector('.colors');
    var _loop_1 = function (color) {
        var li = document.createElement('li');
        li.style.backgroundColor = color;
        li.addEventListener('click', function (_) {
            selectedColor = color;
            // Soportar Safari antiguo es lo que tiene
            var colors = document.querySelectorAll('ul.colors li');
            for (var i = 0; i < colors.length; i++)
                colors[i].classList.remove('selected');
            li.classList.add('selected');
        });
        ul.appendChild(li);
    };
    for (var _i = 0, allColors_1 = allColors; _i < allColors_1.length; _i++) {
        var color = allColors_1[_i];
        _loop_1(color);
    }
    selectedColor = allColors[0];
    document.querySelector('ul.colors li').classList.add('selected');
}
var lastX = undefined;
var lastY = undefined;
function toCanvasPoint(clientX, clientY) {
    var _a = canvas.getBoundingClientRect(), left = _a.left, top = _a.top, width = _a.width;
    var unscaledX = clientX - left;
    var unscaledY = clientY - top;
    // El canvas tiene un max-width: 100% por lo que puede estar escalado
    var scaleRatio = image.width / width;
    var x = unscaledX * scaleRatio;
    var y = unscaledY * scaleRatio;
    return { x: x, y: y };
}
function beginPaint(clientX, clientY) {
    dragging = true;
    var _a = toCanvasPoint(clientX, clientY), x = _a.x, y = _a.y;
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
    var _a = toCanvasPoint(clientX, clientY), x = _a.x, y = _a.y;
    ctx.fillStyle = selectedColor;
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = selectedColor;
    ctx.beginPath();
    lastX = lastX || x;
    lastY = lastY || y;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.drawImage(image, 0, 0);
    lastX = x;
    lastY = y;
}
