<html>
    <head>
        <script src="resources/js/jquery-3.2.0.min.js"></script>
        <script src="js/turtle.js"></script>
    </head>
    <body>
        <canvas id="turtleCanvas" oncontextmenu="return false;"></canvas>
        <p>Right click speeds up, left click slows down, middle click changes mode.</p>
        <p>You can only change the speed between 1000ms and 10ms, changing to fast mode will make it run as fast as it can, and changing to frame by frame mode will let you left click to advance a frame</p>
        <p>Mode: <a id="mode">Normal</a> | Speed: <a id="speed">500</a>ms</p>
    </body>
</html>