<!DOCTYPE html>
<html>
	<!-- Made by Charles Maher -->
	<head>
		<title>Alphabeast</title>
		<?php include("resources/site-wide/head.html"); ?>

		<link rel="stylesheet" type="text/css" href="./css/alphabeast.css">
		<script src="./js/alphabeast.js"></script>
		
	</head>
	<body>
		<!-- Always shows a header, even in smaller screens. -->
		<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			<header class="mdl-layout__header">
				<div class="mdl-layout__header-row">
					<!-- Title -->
					<span class="mdl-layout-title">Alphabeast</span>
					<!-- Add spacer, to align navigation to the right -->
					<div class="mdl-layout-spacer"></div>
					<!-- Navigation. We hide it in small screens. -->
					<nav class="mdl-navigation mdl-layout--large-screen-only">
						<a class="mdl-navigation__link" href="/">Home</a>
						<a class="mdl-navigation__link" href="">Alphabeast</a>
						<a class="mdl-navigation__link" href="decoder">Decoder</a>
						<a class="mdl-navigation__link" href="gameoflife">Game of Life</a>
						<!--<a class="mdl-navigation__link" href="">Link</a>-->
					</nav>
				</div>
			</header>
			<div class="mdl-layout__drawer">
				<span class="mdl-layout-title">Other pages</span>
				<nav class="mdl-navigation">
					<a class="mdl-navigation__link" href="/">Home</a>
					<a class="mdl-navigation__link" href="">Alphabeast</a>
					<a class="mdl-navigation__link" href="decoder">Decoder</a>
					<a class="mdl-navigation__link" href="gameoflife">Game of Life</a>
					<!--<a class="mdl-navigation__link" href="">Link</a>-->
				</nav>
			</div>
			<main class="mdl-layout__content">
				<div class="page-content">
					<div id="alphabeast">
						<div class="mdl-textfield mdl-js-textfield">
							<input class="mdl-textfield__input" type="text" id="alphaGet">
							<label class="mdl-textfield__label" for="alphaGet">Alphabeast...</label>
						</div>
						<button id="alphaStart" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored alphaButton">Generate</button>
						<button id="alphaDownload" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored alphaButton hideAtStart">Download</button>
					</div>
				</div>
			</main>
		</div>
	</body>
</html>
