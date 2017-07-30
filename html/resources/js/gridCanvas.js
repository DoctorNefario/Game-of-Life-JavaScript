// A library for turning a HTML canvas element into a grid

var canvas;
var ctx;
var usePreview;
var onShade;
var offShade;
var backShade;
var previewShade;
var pointMarginT;
var pointWidthAndMargin;
var pointHeightAndMargin;
var canvasWidth;
var canvasHeight;

function drawCanvas() {
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('style', 'background:' + backShade + ';');

    ctx.fillStyle = offShade;
    for (var startY = 0; startY < pointsDown; startY++) {
        for (var startX = 0; startX < pointsRight; startX++) {
            var startRectX = startX * (pointWidthAndMargin) + pointMarginT;
            var startRectY = startY * (pointHeightAndMargin) + pointMarginT;

            ctx.fillRect(startRectX, startRectY, pointWidth, pointHeight);
        }
    }
}

function initiateCanvas(canvasID, pointsRight, pointsDown, pointWidth, pointHeight, pointMargin, colors, preview) {
    usePreview = preview;

    canvas = document.getElementById(canvasID);
    ctx = canvas.getContext('2d');

    onShade = colors.onShade;
    offShade = colors.offShade;
    backShade = colors.backShade;

    previewShade = colors.previewShade;

    pointMarginT = pointMargin * 2;

    pointWidthAndMargin = pointWidth + pointMarginT;
    pointHeightAndMargin = pointHeight + pointMarginT;

    canvasWidth = pointWidthAndMargin * pointsRight + pointMarginT;
    canvasHeight = pointHeightAndMargin * pointsDown + pointMarginT;


}

initiateCanvas();