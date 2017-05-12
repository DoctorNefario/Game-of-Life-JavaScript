/**
    * Created by Charles Maher on 4/5 2017.
    */
window.onload = function() {

    //Start of customisation

    //Dimensions, in px (Can change to any other measurement by putting it in quotes)
    var pointWidth = 20;
    var pointHeight = 20;

    var pointsRight = 20;
    var pointsDown = 20;

    var pointMargin = 2;

    //Colours
    var onShade = '#eee';
    var offShade = '#222';
    var backShade = '#ccc';

    //Whether or not it loops
    var loopsAround = true;

    //End of customisation

    var pointMarginT = pointMargin * 2;

    var pointWidthAndMargin = pointWidth + pointMarginT;
    var pointHeightAndMargin = pointHeight + pointMarginT;

    var canvasWidth = pointsRight * (pointWidthAndMargin) + pointMarginT;
    var canvasHeight = pointsDown * (pointHeightAndMargin) + pointMarginT;

    var onOffGrid = [];
    var surroundingGrid = [];
    var needsUpdateGrid = [];
    var blankGrid = [];

    var canvas = document.getElementById('golCanvas');
    var ctx = canvas.getContext('2d');

    function returnMousePointOnGrid(e) {
        var offset = $('#golCanvas').offset();

        var relX = e.pageX - offset.left;
        var relY = e.pageY - offset.top;

        var gridX = Math.floor(relX / (pointWidthAndMargin));
        var gridY = Math.floor(relY / (pointHeightAndMargin));

        if (gridX >= pointsRight) {
            gridX = pointsRight - 1;
        }
        if (gridY >= pointsDown) {
            gridY = pointsRight - 1;
        }

        return [gridX, gridY];
    }

    function togglePoint(x, y) {
        var curVal = onOffGrid[y][x];
        if (curVal === 1) {
            onOffGrid[y][x] = 0;
            ctx.fillStyle = offShade;
            ctx.fillRect(
                x * (pointWidthAndMargin) + pointMarginT,
                y * (pointHeightAndMargin) + pointMarginT,
                pointWidth,
                pointHeight
            );
        } else if (curVal === 0) {
            onOffGrid[y][x] = 1;
            ctx.fillStyle = onShade;
            ctx.fillRect(
                x * (pointWidthAndMargin) + pointMarginT,
                y * (pointHeightAndMargin) + pointMarginT,
                pointWidth,
                pointHeight
            );
        } else {
        }
    }

    function updateVisual(x, y) {
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

    function turnPointOn(x, y) {
        onOffGrid[y][x] = 1;
        ctx.fillStyle = onShade;
        ctx.fillRect(
            x * (pointWidthAndMargin) + pointMarginT,
            y * (pointHeightAndMargin) + pointMarginT,
            pointWidth,
            pointHeight
        );
    }

    function turnPointOff(x, y) {
        onOffGrid[y][x] = 0;
        ctx.fillStyle = offShade;
        ctx.fillRect(
            x * (pointWidthAndMargin) + pointMarginT,
            y * (pointHeightAndMargin) + pointMarginT,
            pointWidth,
            pointHeight
        );
    }


    function calculateSurrounding(x, y) {
        var edgeLeft = x === 0;
        var edgeRight = x === pointsRight - 1;

        var edgeTop = y === 0;
        var edgeBottom = y === pointsDown - 1;

        var totalSurrounding = 0;

        var rangeY;
        var normRangeX;
        var otherRangeX;

        if (loopsAround) {
            if (edgeLeft) {
                normRangeX = [pointsRight - 1, 0, 1];
                otherRangeX = [pointsRight - 1, 1];
            } else if (edgeRight) {
                normRangeX = [x - 1, x, 0];
                otherRangeX = [x - 1, 0];
            } else {
                normRangeX = [x - 1, x, x + 1];
                otherRangeX = [x - 1, x + 1];
            }

            if (edgeTop) {
                rangeY = [pointsDown - 1, 0, 1];
            } else if (edgeBottom) {
                rangeY = [y - 1, y, 0];
            } else {
                rangeY = [y - 1, y, y + 1];
            }
        } else {
            if (edgeLeft) {
                normRangeX = [0, 1];
                otherRangeX = [1];
            } else if (edgeRight) {
                normRangeX = [x - 1, x];
                otherRangeX = [x - 1];
            } else {
                normRangeX = [x - 1, x, x + 1];
                otherRangeX = [x - 1, x + 1];
            }

            if (edgeTop) {
                rangeY = [0, 1];
            } else if (edgeBottom) {
                rangeY = [y - 1, y];
            } else {
                rangeY = [y - 1, y, y + 1];
            }
        }

        rangeY.forEach(function(elemY) {
            if (elemY === y) {
                otherRangeX.forEach(function(elemX) {
                    if (onOffGrid[elemY][elemX] === 1) {totalSurrounding++;}
                });
            } else {
                normRangeX.forEach(function(elemX) {
                    if (onOffGrid[elemY][elemX] === 1) {totalSurrounding++;}
                });
            }
        });

        return totalSurrounding;
    }

    function setUpdatePoints(x, y) {
        if (onOffGrid[y][x] === 1) {
            var edgeLeft = x === 0;
            var edgeRight = x === pointsRight - 1;

            var edgeTop = y === 0;
            var edgeBottom = y === pointsDown - 1;

            var rangeY;
            var normRangeX;

            if (loopsAround) {
                if (edgeLeft) {
                    normRangeX = [pointsRight - 1, 0, 1];
                } else if (edgeRight) {
                    normRangeX = [x - 1, x, 0];
                } else {
                    normRangeX = [x - 1, x, x + 1];
                }

                if (edgeTop) {
                    rangeY = [pointsDown - 1, 0, 1];
                } else if (edgeBottom) {
                    rangeY = [y - 1, y, 0];
                } else {
                    rangeY = [y - 1, y, y + 1];
                }
            } else {
                if (edgeLeft) {
                    normRangeX = [0, 1];
                } else if (edgeRight) {
                    normRangeX = [x - 1, x];
                } else {
                    normRangeX = [x - 1, x, x + 1];
                }

                if (edgeTop) {
                    rangeY = [0, 1];
                } else if (edgeBottom) {
                    rangeY = [y - 1, y];
                } else {
                    rangeY = [y - 1, y, y + 1];
                }
            }

            rangeY.forEach(function (elemY) {
                normRangeX.forEach(function (elemX) {
                    needsUpdateGrid[elemY][elemX] = 1;
                });
            });
        }
    }

    function findAllUpdatePoints() {
        for (var updateY = 0; updateY < pointsDown; updateY++) {
            for (var updateX = 0; updateX < pointsRight; updateX++) {
                setUpdatePoints(updateX, updateY);
            }
        }
    }

    function startGoL() {

        $('#golCanvas').attr({
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
            surroundingGrid.push(blankGrid[startY].slice(0));
            needsUpdateGrid.push(blankGrid[startY].slice(0));
        }

    }

    function findNextFrame() {
        findAllUpdatePoints();
        for (var y = 0; y < pointsDown; y++) {
            for (var x = 0; x < pointsRight; x++) {
                if (needsUpdateGrid[y][x] === 1) {
                    surroundingGrid[y][x] = calculateSurrounding(x, y);
                }
            }
        }

        for (var nextY = 0; nextY < pointsDown; nextY++) {
            for (var nextX = 0; nextX < pointsRight; nextX++) {
                if (needsUpdateGrid[nextY][nextX] === 1) {
                    if (onOffGrid[nextY][nextX] === 0) {
                        if (surroundingGrid[nextY][nextX] === 3) {
                            turnPointOn(nextX, nextY);
                        }
                    } else if (surroundingGrid[nextY][nextX] < 2 || surroundingGrid[nextY][nextX] > 3) {
                        turnPointOff(nextX, nextY);
                    }
                }
            }
        }
    }

    canvas.addEventListener('click', function (e) {
        var xy = returnMousePointOnGrid(e);

        var x = xy[0];
        var y = xy[1];

        togglePoint(x, y);
        updateVisual(x, y);
    }, false);

    $('body').on('contextmenu', '#golCanvas', function () {
        findNextFrame();

        return false;
    });

    document.getElementById("turtleInNewWindow").addEventListener('click', function () {
        window.open("turtle","","fullscreen=no, width=800, height=720");
        return false;
    });

    startGoL();
};
