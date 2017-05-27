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

    var turtle = [];
    turtle.push(new Turtle(
        0, //Facing, 0 = Up, 1 = Right, etc...
        49, //Starting X coordinate
        50 //Starting Y coordinate
    ));

    turtle.push(new Turtle(
        2,
        51,
        50
    ));

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

    function Turtle(facing, startX, startY) {
        this.facing = facing;
        this.curX = startX;
        this.curY = startY;
    }

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

    function drawTurtle (turtleNum) {
        ctx.fillStyle = turtleShade;
        ctx.fillRect(
            turtle[turtleNum].curX * (pointWidthAndMargin) + pointMarginT,
            turtle[turtleNum].curY * (pointHeightAndMargin) + pointMarginT,
            pointWidth,
            pointHeight
        );
    }

    function turnRight (turtleNum) {
        switch (turtle[turtleNum].facing) {
            case 3:
                turtle[turtleNum].facing = 0;
                break;
            default:
                turtle[turtleNum].facing++;
        }
    }

    function turnLeft (turtleNum) {
        switch (turtle[turtleNum].facing) {
            case 0:
                turtle[turtleNum].facing = 3;
                break;
            default:
                turtle[turtleNum].facing--;
        }
    }

    function moveForward (turtleNum) {
        //0 is up, 1 is right, etc
        switch (turtle[turtleNum].facing) {
            case 0:
                if (turtle[turtleNum].curY > 0) {
                    turtle[turtleNum].curY--;
                } else turtle[turtleNum].curY = pointsDown - 1;
                break;
            case 1:
                if (turtle[turtleNum].curX < pointsRight - 1) {
                    turtle[turtleNum].curX++;
                } else turtle[turtleNum].curX = 0;
                break;
            case 2:
                if (turtle[turtleNum].curY < pointsDown - 1) {
                    turtle[turtleNum].curY++;
                } else turtle[turtleNum].curY = 0;
                break;
            case 3:
                if (turtle[turtleNum].curX > 0) {
                    turtle[turtleNum].curX--;
                } else turtle[turtleNum].curX = pointsRight - 1;
                break;
            default:
                console.log("incorrect given: " + turtle[turtleNum].facing);
        }
    }

    function findNextFrame(turtleNum) {
        var sx;
        var sy;
        if (onOffGrid[turtle[turtleNum].curY][turtle[turtleNum].curX] === 0) {
            sx = turtle[turtleNum].curX;
            sy = turtle[turtleNum].curY;

            onOffGrid[turtle[turtleNum].curY][turtle[turtleNum].curX] = 1;

            turnRight(turtleNum);
            moveForward(turtleNum);
            drawPoint(sx, sy);
            drawTurtle(turtleNum);
        } else {
            sx = turtle[turtleNum].curX;
            sy = turtle[turtleNum].curY;

            onOffGrid[turtle[turtleNum].curY][turtle[turtleNum].curX] = 0;

            turnLeft(turtleNum);
            moveForward(turtleNum);
            drawPoint(sx, sy);
            drawTurtle(turtleNum);
        }
    }

    function findNextFrameUntilEnd () {
        if (!turtleEnd) {
            for (var i = 0; i < turtle.length; i++) {
                findNextFrame(i);
            }
            setTimeout(function () {
                findNextFrameUntilEnd();
            }, turtleTimeout);
        } else {
            console.log("ended");
            for (var e = 0; e < turtle.length; e++) {
                console.log("turtle " + e, turtle[e].curX, turtle[e].curY);
            }
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
