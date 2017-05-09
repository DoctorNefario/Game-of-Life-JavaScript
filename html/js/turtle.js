/**
    * Created by Charles Maher on 9/5 2017.
    */
window.onload = function() {

    //Start of customisation

    //Dimensions, in px (Can change to any other measurement by putting it in quotes)
    var pointWidth = 5;
    var pointHeight = 5;

    var pointsRight = 100;
    var pointsDown = 100;

    var pointMargin = 0.5;

    var turtleX = 50;
    var turtleY = 50;
    var turtleFacing = 0;

    var turtleEnd = false;

    var turtleTimeout = 1000;

    //Colours
    var offShade = '#eee';
    var onShade = '#222';
    var backShade = '#ccc';
    var fastShade = "#f00";
    var normalShade = "#4cf";


    //End of customisation

    var turtleShade = normalShade;

    var veryFast = false;
    var prevTimeout = turtleTimeout;

    var pointMarginT = pointMargin * 2;

    var pointWidthAndMargin = pointWidth + pointMarginT;
    var pointHeightAndMargin = pointHeight + pointMarginT;

    var canvasWidth = pointsRight * (pointWidthAndMargin) + pointMarginT;
    var canvasHeight = pointsDown * (pointHeightAndMargin) + pointMarginT;

    var onOffGrid = [];
    var blankGrid = [];

    var canvas = document.getElementById('turtleCanvas');
    var ctx = canvas.getContext('2d');

    function drawPoint(x, y) {
        var curVal = onOffGrid[y][x];
        if (curVal === 1) {
            ctx.fillStyle = onShade;
            ctx.fillRect(
                x * (pointWidthAndMargin) + pointMarginT,
                y * (pointHeightAndMargin) + pointMarginT,
                pointWidth,
                pointHeight
            );
        } else if (curVal === 0) {
            ctx.fillStyle = offShade;
            ctx.fillRect(
                x * (pointWidthAndMargin) + pointMarginT,
                y * (pointHeightAndMargin) + pointMarginT,
                pointWidth,
                pointHeight
            );
        } else {
            console.log("shit m8", curVal);
        }
    }

    function drawTurtle () {
        ctx.fillStyle = turtleShade;
        ctx.fillRect(
            turtleX * (pointWidthAndMargin) + pointMarginT,
            turtleY * (pointHeightAndMargin) + pointMarginT,
            pointWidth,
            pointHeight
        );
    }

    function turnRight () {
        switch (turtleFacing) {
            case 3:
                turtleFacing = 0;
                break;
            default:
                turtleFacing++;
        }
    }

    function turnLeft () {
        switch (turtleFacing) {
            case 0:
                turtleFacing = 3;
                break;
            default:
                turtleFacing--;
        }
    }

    function moveForward () {
        //0 is up, 1 is right, etc
        switch (turtleFacing) {
            case 0:
                if (turtleY > 0) {
                    turtleY--;
                } else turtleY = pointsDown - 1;
                break
            case 1:
                if (turtleX < pointsRight - 1) {
                    turtleX++;
                } else turtleX = 0;
                break
            case 2:
                if (turtleY < pointsDown - 1) {
                    turtleY++;
                } else turtleY = 0;
                break
            case 3:
                if (turtleX > 0) {
                    turtleX--;
                } else turtleX = pointsRight - 1;
                break
            default:
                console.log("incorrect given: " + turtleFacing);
        }
    }

    function findNextFrame() {
        var sx;
        var sy;
        if (onOffGrid[turtleY][turtleX] === 0) {
            sx = turtleX;
            sy = turtleY;

            onOffGrid[turtleY][turtleX] = 1;

            turnRight();
            moveForward();
            drawPoint(sx, sy);
            drawTurtle();
        } else {
            sx = turtleX;
            sy = turtleY;

            onOffGrid[turtleY][turtleX] = 0;

            turnLeft();
            moveForward();
            drawPoint(sx, sy);
            drawTurtle();
        }
    }

    function findNextFrameUntilEnd () {
        if (!turtleEnd) {
            findNextFrame();
            setTimeout(function () {findNextFrameUntilEnd();}, turtleTimeout);
        } else {
            console.log("ended", turtleX, turtleY);
        }
    }

    function startTurtle() {

        $('#turtleCanvas').attr({
            width: canvasWidth,
            height: canvasHeight
        }).css({
            backgroundColor: backShade
        });

        ctx.fillStyle = offShade;
        for (var startY = 0; startY < pointsDown; startY++) {
            blankGrid.push([]);
            for (var startX = 0; startX < pointsRight; startX++) {
                blankGrid[startY].push(0);

                var startRectX = startX * (pointWidthAndMargin) + pointMarginT;
                var startRectY = startY * (pointHeightAndMargin) + pointMarginT;

                ctx.fillRect(startRectX, startRectY, pointWidth, pointHeight);
            }
            onOffGrid.push(blankGrid[startY].slice(0));
        }
        findNextFrameUntilEnd();
    }
    $('body').on('contextmenu', '#turtleCanvas', function () {
        return false;
    });

    $(document).mousedown(function(e){
        switch(e.which)
        {
            case 1:
                if (!veryFast) {
                    if (turtleTimeout < 1000) {
                        turtleTimeout = turtleTimeout * 2;
                        $("#speed").empty().append(turtleTimeout);
                    }
                }
                break;
            case 2:
                if (veryFast) {
                    turtleShade = normalShade;
                    turtleTimeout = prevTimeout;
                    veryFast = false;
                    $("#mode").empty().append("Normal");
                    $("#speed").empty().append(turtleTimeout);
                } else {
                    turtleShade = fastShade;
                    prevTimeout = turtleTimeout;
                    turtleTimeout = 0;
                    veryFast = true;
                    $("#mode").empty().append("Fast");
                    $("#speed").empty().append(turtleTimeout);
                }
                break;
            case 3:
                if (!veryFast) {
                    if (turtleTimeout > 10) {
                        turtleTimeout = turtleTimeout / 2;
                        $("#speed").empty().append(turtleTimeout);
                    }
                }
                break;
        }
        return true;
    });

    startTurtle();
};
