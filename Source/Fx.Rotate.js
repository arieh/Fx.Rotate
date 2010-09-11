/*
---
description: A Cross Broser rotation Fx

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4: Element,Fx,Class

provides: [Fx.Rotate]

...
*/
(function (window,undef){

/** 
 * taken from http://www.boogdesign.com/examples/transforms/matrix-calculator.html
 */
var deg2radians = Math.PI * 2 / 360
    , prefix = "";

function getMatrix(deg){
    rad = deg * deg2radians ;
    costheta = Math.cos(rad);
    sintheta = Math.sin(rad);

    a = parseFloat(costheta).toFixed(8);
    c = parseFloat(-sintheta).toFixed(8);
    b = parseFloat(sintheta).toFixed(8);
    d = parseFloat(costheta).toFixed(8);
    return [a,b,c,d];
}


if (Browser.Engine.gecko) prefix = 'moz';
if (Browser.Engine.webkit) prefix = 'webkit';
if (Browser.Engine.presto) prefix = 'o';

Fx.Rotate = new Class({
    Extends : Fx
    , element : null
    , initialize : function(el,options){
        this.element = $(el);
        this.element.setStyle("-"+prefix+"-transform-origin","center center");
        
        if (Browser.Engine.trident){
            this.element.setStyle("filter","progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand')");
        }
        
        this.parent(options);
    }
    , start : function(from,to){
        this.parent(from,to);
    }
    , set : function (current){
        if (Browser.Engine.trident) current *=-1;
        var matrix = getMatrix(current);
        
        if (Browser.Engine.trident){
            this.element.filters.item(0).M11 = matrix[0];
            this.element.filters.item(0).M12 = matrix[1];
            this.element.filters.item(0).M21 = matrix[2];
            this.element.filters.item(0).M22 = matrix[3];
        }else{
            this.element.setStyle("-"+prefix+"-transform","matrix("+matrix[0]+","+matrix[1]+","+matrix[2]+", "+matrix[3]+", 0, 0)");
        }
    }
});

})(this);

