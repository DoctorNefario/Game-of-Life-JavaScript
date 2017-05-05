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
	</head>
	<body>
		<!-- Always shows a header, even in smaller screens. -->
		<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			<header class="mdl-layout__header">
				<div class="mdl-layout__header-row">
					<!-- Title -->
					<span class="mdl-layout-title">Home</span>
					<!-- Add spacer, to align navigation to the right -->
					<div class="mdl-layout-spacer"></div>
					<!-- Navigation. We hide it in small screens. -->
					<nav class="mdl-navigation mdl-layout--large-screen-only">
						<a class="mdl-navigation__link" href="/">Home</a>
						<a class="mdl-navigation__link" href="alphabeast">Alphabeast</a>
						<a class="mdl-navigation__link" href="decoder">Decoder</a>
						<a class="mdl-navigation__link" href="">Game of Life</a>
						<!--<a class="mdl-navigation__link" href="">Link</a>-->
					</nav>
				</div>
			</header>
			<div class="mdl-layout__drawer">
				<span class="mdl-layout-title">Other pages</span>
				<nav class="mdl-navigation">
					<a class="mdl-navigation__link" href="/">Home</a>
					<a class="mdl-navigation__link" href="alphabeast">Alphabeast</a>
					<a class="mdl-navigation__link" href="decoder">Decoder</a>
					<a class="mdl-navigation__link" href="">Game of Life</a>
					<!--<a class="mdl-navigation__link" href="">Link</a>-->
				</nav>
			</div>
			<main class="mdl-layout__content">
                <canvas id="golCanvas" width="0" height="0">Canvas is required for this program, please update or switch to a different browser such as Firefox</canvas>
                <noscript><p>Your browser does not support JavaScript, this simply cannot work without it.</p></noscript>
            </main>
        </div>
    </body>
</html>
