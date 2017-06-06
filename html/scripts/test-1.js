/**
 * This is a test for injecting elements and code into other pages dynamically
 */

var svg, svgNS, style;

function makeScriptCSS() {
    style = document.createElement('style');

    style.setAttribute('id', 'scriptCSS');
    style.type = 'text/css';
    // if (style.styleSheet){
    //     style.styleSheet.cssText = css;
    // } else {
    //     style.appendChild(document.createTextNode(css));
    // }

    document.head.appendChild(style);
}

function svgAddCSS(propToAdd, valToAdd) {
    if (typeof svg.style.cssText === 'undefined') {
        svg.style.cssText = propToAdd + ': ' + valToAdd;
    } else {
        svg.style.cssText += '; ' + propToAdd + ':' + valToAdd;
    }
}

function bodyAddCSS(propToAdd, valToAdd) {
    if (typeof document.body.style.cssText === 'undefined') {
        document.body.style.cssText = propToAdd + ': ' + valToAdd;
    } else {
        document.body.style.cssText += '; ' + propToAdd + ':' + valToAdd;
    }
}

function startScript() {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgNS = svg.namespaceURI;

    makeScriptCSS();

    svg.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    }, false);

    svg.addEventListener('mousedown', function(e) {
        e.preventDefault();
    }, false);

    svgAddCSS('margin', '0');
    svgAddCSS('position', 'fixed');
    svgAddCSS('z-index', '1000000');
    svgAddCSS('background', 'none');

    bodyAddCSS('pointer-events', 'auto');
    console.log(document.body.style.cssText);

    console.log(svg.style.cssText);
    svg.setAttribute('width', '100vw');
    svg.setAttribute('height', '100vh');

    var rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '-100vh');
    rect.setAttribute('width', '100vw');
    rect.setAttribute('height', '100vh');
    rect.setAttribute('fill', '#000');

    svg.appendChild(rect);
    document.body.appendChild(svg);

    setTimeout(function () {
        svg.addEventListener('mousemove', function() {
            rect.setAttribute('y', '0');
        }, false);
    }, 1000);
}

startScript();
