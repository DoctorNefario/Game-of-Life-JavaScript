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
    <link rel="stylesheet" type="text/css" href="css/cellularautomata.css">
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
                <div id="automata">
                    <div id="switches">

                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-128">
                            <input type="checkbox" id="checkbox-128" class="mdl-checkbox__input">
                            <span class="mdl-checkbox__label">
                                <a class="automata-block aut-on"></a>
                                <a class="automata-block aut-on"></a>
                                <a class="automata-block aut-on"></a>
                                128
                            </span>
                        </label>

                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-64">
                            <input type="checkbox" id="checkbox-64" class="mdl-checkbox__input">
                            <span class="mdl-checkbox__label">
                                <a class="automata-block aut-on"></a>
                                <a class="automata-block aut-on"></a>
                                <a class="automata-block aut-off"></a>
                                64
                            </span>
                        </label>

                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-32">
                            <input type="checkbox" id="checkbox-32" class="mdl-checkbox__input">
                            <span class="mdl-checkbox__label">
                                <a class="automata-block aut-on"></a>
                                <a class="automata-block aut-off"></a>
                                <a class="automata-block aut-on"></a>
                                32
                            </span>
                        </label>

                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-16">
                            <input type="checkbox" id="checkbox-16" class="mdl-checkbox__input">
                            <span class="mdl-checkbox__label">
                                <a class="automata-block aut-on"></a>
                                <a class="automata-block aut-off"></a>
                                <a class="automata-block aut-off"></a>
                                16
                            </span>
                        </label>

                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-8">
                            <input type="checkbox" id="checkbox-8" class="mdl-checkbox__input">
                            <span class="mdl-checkbox__label">
                                <a class="automata-block aut-off"></a>
                                <a class="automata-block aut-on"></a>
                                <a class="automata-block aut-on"></a>
                                8
                            </span>
                        </label>

                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                            <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input">
                            <span class="mdl-checkbox__label">
                                <a class="automata-block aut-off"></a>
                                <a class="automata-block aut-on"></a>
                                <a class="automata-block aut-off"></a>
                                4
                            </span>
                        </label>

                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-2">
                            <input type="checkbox" id="checkbox-2" class="mdl-checkbox__input">
                            <span class="mdl-checkbox__label">
                                <a class="automata-block aut-off"></a>
                                <a class="automata-block aut-off"></a>
                                <a class="automata-block aut-on"></a>
                                2
                            </span>
                        </label>

                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
                            <input type="checkbox" id="checkbox-1" class="mdl-checkbox__input">
                            <span class="mdl-checkbox__label">
                                <a class="automata-block aut-off"></a>
                                <a class="automata-block aut-off"></a>
                                <a class="automata-block aut-off"></a>
                                1
                            </span>
                        </label>
                    </div>
                    <div id="output">
                        <canvas id="automata-canvas"></canvas>
                    </div>
                    Not even close to finished. How did you get here?
                </div>
            </div>
        </main>
    </div>
</body>
</html>