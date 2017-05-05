<!DOCTYPE html>
<html>
	<!-- Made by Charles Maher -->
	<head>
		<title>Decoder</title>
		<?php include("resources/site-wide/head.html"); ?>

		<link rel="stylesheet" type="text/css" href="./css/decoder.css">
		<script src="./js/decoder.js"></script>
		
	</head>
	<body>
		<!-- Always shows a header, even in smaller screens. -->
		<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			<header class="mdl-layout__header">
				<div class="mdl-layout__header-row">
					<!-- Title -->
					<span class="mdl-layout-title">Decoder</span>
					<!-- Add spacer, to align navigation to the right -->
					<div class="mdl-layout-spacer"></div>
					<!-- Navigation. We hide it in small screens. -->
					<nav class="mdl-navigation mdl-layout--large-screen-only">
						<a class="mdl-navigation__link" href="/">Home</a>
						<a class="mdl-navigation__link" href="alphabeast">Alphabeast</a>
						<a class="mdl-navigation__link" href="">Decoder</a>
						<a class="mdl-navigation__link" href="gameoflife">Game of Life</a>
						<!--<a class="mdl-navigation__link" href="">Link</a>-->
					</nav>
				</div>
			</header>
			<div class="mdl-layout__drawer">
				<span class="mdl-layout-title">Other pages</span>
				<nav class="mdl-navigation">
					<a class="mdl-navigation__link" href="/">Home</a>
					<a class="mdl-navigation__link" href="alphabeast">Alphabeast</a>
					<a class="mdl-navigation__link" href="">Decoder</a>
					<a class="mdl-navigation__link" href="gameoflife">Game of Life</a>
					<!--<a class="mdl-navigation__link" href="">Link</a>-->
				</nav>
			</div>
			<main class="mdl-layout__content">
				<div class="page-content">
					<div id="decoder">
						<div id="textField" class="mdl-textfield mdl-js-textfield">
							<input id="input" class="mdl-textfield__input" type="text">
							<label class="mdl-textfield__label" for="input">Input text...</label>
						</div>
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id="decode">Decode</button>
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id="encode">Encode</button>
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="recode">Recode</button>
						<ul class="demo-list-item mdl-list">
							<li class="mdl-list__item">
								<span id="output" class="mdl-list__item-primary-content"></span>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</div>
	</body>
</html>
