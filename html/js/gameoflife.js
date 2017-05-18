/**
    * Created by Charles Maher on 4/5 2017.
    */
window.onload = function() {

    //Start of customisation

    //Dimensions, in px (Can change to any other measurement by putting it in quotes)
    var pointWidth = 20;
    var pointHeight = 20;

    var pointMargin = 2;

    var pointsRight = Math.floor($(window).width() / (pointWidth + pointMargin * 2)) - 1;
    var pointsDown = Math.floor($(window).height() / (pointHeight + pointMargin * 2)) - 1;

    //Colours
    var onShade = '#eee';
    var offShade = '#222';
    var backShade = '#ccc';

    //Whether or not it loops
    var loopsAround = true;

    //End of customisation

    var loopFrames = false;
    var stepTimeout = 100;
    var nextFrameTimeout;
   
    var pointMarginT = pointMargin * 2;

    var pointWidthAndMargin = pointWidth + pointMarginT;
    var pointHeightAndMargin = pointHeight + pointMarginT;

    var canvasWidth = pointsRight * (pointWidthAndMargin) + pointMarginT;
    var canvasHeight = pointsDown * (pointHeightAndMargin) + pointMarginT;

    var onOffGrid = [];
    var surroundingGrid = [];
    var needsUpdatePoints = [];
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
                    if (needsUpdatePoints.indexOf([elemX, elemY]) === -1) {
                        needsUpdatePoints.push([elemX, elemY]);
                    }
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

    function clearGrid() {
        for (var gy = 0; gy < onOffGrid.length; gy++) {
            for (var gx = 0; gx < onOffGrid[gy].length; gx++) {
                if (onOffGrid[gy][gx] === 1) {
                    turnPointOff(gx, gy);
                }
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
        }

    }

    function findNextFrame() {
        findAllUpdatePoints();

        needsUpdatePoints.forEach(function(elem) {
            surroundingGrid[elem[1]][elem[0]] = calculateSurrounding(elem[0], elem[1]);
        });

        needsUpdatePoints.forEach(function(elem) {
            if (onOffGrid[elem[1]][elem[0]] === 0) {
                if (surroundingGrid[elem[1]][elem[0]] === 3) {
                    turnPointOn(elem[0], elem[1]);
                }
            } else if (surroundingGrid[elem[1]][elem[0]] < 2 || surroundingGrid[elem[1]][elem[0]] > 3) {
                    turnPointOff(elem[0], elem[1]);
            }
        });

        needsUpdatePoints = blankGrid.slice();
    }

    function changeMenu(mode) {
        var RCM = $("#rightClickMenu");
        var RCB = $("#rightClickBackground");
        if (!mode) {
            var currentState = RCM.is(":visible");
            if (currentState) {
                RCM.hide();
                RCB.hide();
            } else {
                RCM.show();
                RCB.show();
            }
        } else {
            if (mode === 0) {
                RCM.hide();
                RCB.hide();
            } else {
                RCM.show();
                RCB.show();
            }
        }
    }
    
    function frameLoop() {
        if (loopFrames) {
            findNextFrame();
            nextFrameTimeout = setTimeout(frameLoop, stepTimeout);
        }
    }

    canvas.addEventListener('click', function (e) {
        var xy = returnMousePointOnGrid(e);

        var x = xy[0];
        var y = xy[1];

        togglePoint(x, y);
        updateVisual(x, y);
    }, false);


    //This is broken at the moment.
    /*
    $('body').on('contextmenu', '#golCanvas', function () {
        changeMenu(1);

        return false;
    });
   */

    document.getElementById("rightClickBackground").addEventListener("click", function () {
        changeMenu(0);
    });

    //For turtle, opens a new window
    document.getElementById("turtleInNewWindow").addEventListener('click', function () {
        window.open("turtle", "", "fullscreen=no, width=800, height=720");
        return false;
    });

    $("#playPause").click(function() {
        clearTimeout(nextFrameTimeout);
        loopFrames = !loopFrames;
        if (loopFrames) {
            $("#playPause").empty().append("Pause");
        } else {
            $("#playPause").empty().append("Play");
        }
        frameLoop();
    });

    function resetGoLTimeout() {
        clearTimeout(nextFrameTimeout);
        frameLoop();
    }
    
    $("#clear").click(function() {
        clearGrid();
    });

    $("#step").click(function() {
        findNextFrame();
    });

    $("#rightClickBackground").click(function() {
        //Hide menu
        changeMenu(0);
    });

    $("#intervalSlider").change(function() {
        stepTimeout = 0 + $("#intervalSlider").val();
        $("#intervalNumber").val(stepTimeout);
        resetGoLTimeout();
    });


    $("#intervalNumber").change(function() {
        stepTimeout = 0 + $("#intervalNumber").val();
        resetGoLTimeout();
    }).val(stepTimeout);

    startGoL();
};
