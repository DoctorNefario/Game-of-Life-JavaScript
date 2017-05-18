<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Conway's Game of Life</title>
		
		<!-- Universal resources -->
		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="resources/css/material.cyan-yellow.min.css">
		<link rel="stylesheet" type="text/css" href="resources/css/material.icons.css">
		<!-- JavaScript -->
		<script src="resources/js/material.min.js"></script>
		<script src="resources/js/jquery-3.2.0.min.js"></script>
		
		<!-- Specific resources -->
        <script src="js/gameoflife.js"></script>
        <link rel="stylesheet" type="text/css" href="css/gameoflife.css">
	</head>
	<body>
        <canvas id="golCanvas" width="0" height="0">Canvas is required for this program, please update or switch to a different browser such as Chrome or Firefox</canvas>
        <noscript><p>Your browser does not support JavaScript, this simply cannot work without it.</p></noscript>

        <div id="rightClickBackground"></div>
        <div id="rightClickMenu">
            <button class="menuButton mdl-button mdl-js-button" id="playPause">Play</button>
            <button class="menuButton mdl-button mdl-js-button" id="step">Step</button>
            <button class="menuButton mdl-button mdl-js-button" id="clear">Clear</button>
            <input class="mdl-slider mdl-js-slider" id="intervalSlider" type="range" min="0" max="500" step="5" />
            <div class="mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="intervalNumber">
                <label class="mdl-textfield__label" for="sample2">Number...</label>
                <span class="mdl-textfield__error">Input is not a number!</span>
            </div>
        </div>
        <a id="turtleInNewWindow" href="">Turtle</a>
    </body>
</html>
