/*
---
description: A Cross Broser rotation Fx

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.3: Element,Fx,Class

provides: [Fx.Rotate]

...
*/
(function ($,window,undef){

var webkit = Browser.chrome || Browser.safari || Browser.Platform.ios || Browser.Platform.webos;

/** 
 * Matrix function taken from http://www.boogdesign.com/examples/transforms/matrix-calculator.html
 */

Fx.Rotate = new Class({
    Extends : Fx
    , element : null
    , prefix : (Browser.firefox) ? 'moz' : (webkit) ? 'webkit' : (Browser.opera) ? 'o' : 'ms'
    , initialize : function(el,options){
        this.element = $(el);
        
        //cross-browser - set he rotation to spin around it's center as with IE
        this.element.setStyle("-"+this.prefix+"-transform-origin","center center");
        
        if (Browser.Engine.trident){ //this allows the use of the DOM filter API instead of CSS
            this.element.setStyle("filter","progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand')");
        }
        
        this.parent(options);
    }
    , set : function (current){
        
        var matrix = this.getMatrix( ((Browser.Engine.trident) ? (current *-1) : current) ), item;
        
        if (Browser.Engine.trident){
            item = this.element.filters.item(0);
            
            item.M11 = matrix[0];
            item.M12 = matrix[1];
            item.M21 = matrix[2];
            item.M22 = matrix[3];
        }else{
            this.element.setStyle("-"+this.prefix+"-transform","matrix("+matrix[0]+","+matrix[1]+","+matrix[2]+", "+matrix[3]+", 0, 0)");
        }
    }
    , getMatrix : function(deg){    
        var rad = deg * Math.PI * 180
            , costheta = Math.cos(rad)
            , sintheta = Math.sin(rad)
            , a = parseFloat(costheta).toFixed(8)
            , c = parseFloat(-sintheta).toFixed(8)
            , b = parseFloat(sintheta).toFixed(8)
            , d = parseFloat(costheta).toFixed(8);
            
        return [a,b,c,d];
    }
});

})(document.id,this);

