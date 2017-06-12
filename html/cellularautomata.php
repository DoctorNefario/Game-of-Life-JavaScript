<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Cellular Automata</title>

    <!-- Universal resources -->
    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="resources/css/material.cyan-yellow.min.css">
    <link rel="stylesheet" type="text/css" href="resources/css/material.icons.css">
    <!-- JavaScript -->
    <script src="resources/js/material.min.js"></script>
    <script src="resources/js/jquery-3.2.0.min.js"></script>

    <!-- Specific resources -->
    <script src="js/cellularautomata.js"></script>
</head>
<body>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <!-- Title -->
                <span class="mdl-layout-title">Cellular Automata</span>
                <!-- Add spacer, to align navigation to the right -->
                <div class="mdl-layout-spacer"></div>
                <!-- Navigation. We hide it in small screens. -->
                <nav class="mdl-navigation mdl-layout--large-screen-only">
                    <a class="mdl-navigation__link" href="/">Home</a>
                    <a class="mdl-navigation__link" href="alphabeast">Alphabeast</a>
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
                <a class="mdl-navigation__link" href="alphabeast">Alphabeast</a>
                <a class="mdl-navigation__link" href="decoder">Decoder</a>
                <a class="mdl-navigation__link" href="gameoflife">Game of Life</a>
                <!--<a class="mdl-navigation__link" href="">Link</a>-->
            </nav>
        </div>
        <main class="mdl-layout__content">
            <div class="page-content">
                <div id="switches">

                </div>
                <div id="output">
                    <canvas id="automata-canvas"></canvas>
                </div>
            </div>
            Not even close to finished. How did you get here?
        </main>
    </div>
</body>
</html>