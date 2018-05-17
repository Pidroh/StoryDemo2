/*
* 5/5 Added setDisplaySize for customizable canvas size
*/

var display;

function setDisplaySize(w, h){
    if (display == null) {

        display = new ROT.Display({ width: w, height: h, bg: "#1f2026", fontSize: 12 });
        
    }
    display.setOptions({ width: w, height: h });
    var sw = screen.availWidth;
    var sh = screen.availHeight;
    sw = $(window).height()
    sh = $(window).width()
    sw = window.innerWidth
    sh = window.innerHeight
    //alert(screen.availHeight)
    //alert(screen.height)
    //alert()
    //if (sw > sh) sw = sh;
    //else sh = sw;
    var fontsize = display.computeFontSize(sw, sh);
    display.setOptions({ fontSize: fontsize });
}

window.onload = function () {
    // Check if rot.js can work on this browser
    if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
    } else {
        if (display == null) {
            setDisplaySize(10, 10);
        }
        window.addEventListener('resize', function (event) {
            setDisplaySize(display.getOptions().width, display.getOptions().height)
        });
        var container = display.getContainer();
        //container.setAttribute("align", "center");
        
        var cc = document.getElementById("canvas-container");
        //var cc = document.body;
        //cc = document.createElement("div");
        //console.log(cc);
        //container.setAttribute('height', '100%')
        //container.setAttribute('width', '100%')
        //alert(container.innerHTML)
        cc.appendChild(container);
        //alert(container.width)
        
        // Add the container to our HTML page
        //document.body.appendChild(container);
        var foreground, background, colors;
        //for (var i = 0; i < 15; i++) {
        //    // Calculate the foreground color, getting progressively darker
        //    // and the background color, getting progressively lighter.
        //    foreground = ROT.Color.toRGB([255 - (i * 20),
        //    255 - (i * 20),
        //    255 - (i * 20)]);
        //    background = ROT.Color.toRGB([i * 20, i * 20, i * 20]);
        //    // Create the color format specifier.
        //    colors = "%c{" + foreground + "}%b{" + background + "}";
        //    // Draw the text two columns in and at the row specified
        //    // by i
        //    display.drawText(2, i, colors + "Hello, world!");
        //}
    }
}

function clear()
{
    if (display)
    {
        display.clear();
    }
}

function draw(x, y, colorT, colorB, text)
{
    //alert(text);
    //alert(x + y + colorT + colorB + text);
    //console.log(colorT);
    if(display)
        display.draw(x, y, text,colorT, colorB);
    
}