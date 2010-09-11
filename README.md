Fx.Rotate
=========
This Class is an attempt on providing a cross-browser rotation mechanism. It is driven from this site: [http://www.boogdesign.com/examples/transforms/matrix-calculator.html].
The result will work on all popular browsers (IE5+ included). *But* IE's spin is a bit odd - it seems to go traveling. You should also note that IE calculates padding after transition.

How To Use
------------

    #JS
    var rotate = new Fx.Rotate('my-el');
    rotate.start(0,350);