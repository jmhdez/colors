parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"nFhO":[function(require,module,exports) {
module.exports="unicorn.9360ae21.png";
},{}],"VQLC":[function(require,module,exports) {
module.exports="mermaid.644831df.png";
},{}],"R9yg":[function(require,module,exports) {
module.exports="tiana.103e33a2.png";
},{}],"STVM":[function(require,module,exports) {
module.exports="bear.c07a79a1.png";
},{}],"DkBr":[function(require,module,exports) {
module.exports="deer.25f07f59.png";
},{}],"GIOW":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("../images/unicorn.png")),a=e(require("../images/mermaid.png")),t=e(require("../images/tiana.png")),u=e(require("../images/bear.png")),i=e(require("../images/deer.png"));exports.default=[r.default,a.default,t.default,u.default,i.default];
},{"../images/unicorn.png":"nFhO","../images/mermaid.png":"VQLC","../images/tiana.png":"R9yg","../images/bear.png":"STVM","../images/deer.png":"DkBr"}],"B6dB":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./Images")),n=document.getElementsByTagName("canvas")[0],i=n.getContext("2d"),o=document.getElementById("clear"),l=document.getElementById("changeimage"),c=new Image,r=["red","orange","yellow","limegreen","blue","pink","purple","brown","white","black"],d="red",a=t.default[0],u=!1;function s(){c.src=a,c.addEventListener("load",function(){n.width=c.width,n.height=c.height,i.drawImage(c,0,0)})}function v(){for(var e=document.querySelector(".colors"),t=function(t){var n=document.createElement("li");n.style.backgroundColor=t,n.addEventListener("click",function(e){d=t;for(var i=document.querySelectorAll("ul.colors li"),o=0;o<i.length;o++)i[o].classList.remove("selected");n.classList.add("selected")}),e.appendChild(n)},n=0,i=r;n<i.length;n++){t(i[n])}d=r[0],document.querySelector("ul.colors li").classList.add("selected")}s(),v(),n.addEventListener("mousedown",function(e){var t=e.clientX,n=e.clientY,i=e.preventDefault;g(t,n),i()}),n.addEventListener("touchstart",function(e){g(e.touches[0].clientX,e.touches[0].clientY),e.preventDefault()}),n.addEventListener("mouseup",function(e){var t=e.clientX,n=e.clientY,i=e.preventDefault;p(t,n),i()}),n.addEventListener("touchend",function(e){p(e.touches[0].clientX,e.touches[0].clientY),e.preventDefault()}),n.addEventListener("mousemove",function(e){var t=e.clientX,n=e.clientY,i=e.preventDefault;y(t,n),i()}),n.addEventListener("touchmove",function(e){y(e.touches[0].clientX,e.touches[0].clientY),e.preventDefault()}),o.addEventListener("click",function(){i.clearRect(0,0,n.width,n.height),s()}),l.addEventListener("click",function(){var e="";do{var n=Math.floor(Math.random()*t.default.length);e=t.default[n]}while(e===a);a=e,s()});var f=void 0,h=void 0;function m(e,t){var i=n.getBoundingClientRect(),o=i.left,l=i.top,r=i.width,d=e-o,a=t-l,u=c.width/r;return{x:d*u,y:a*u}}function g(e,t){u=!0;var n=m(e,t),i=n.x,o=n.y;f=i,h=o}function p(e,t){u=!1,f=void 0,h=void 0}function y(e,t){if(u){var n=m(e,t),o=n.x,l=n.y;i.fillStyle=d,i.lineWidth=20,i.lineCap="round",i.lineJoin="round",i.strokeStyle=d,i.beginPath(),f=f||o,h=h||l,i.moveTo(f,h),i.lineTo(o,l),i.stroke(),i.drawImage(c,0,0),f=o,h=l}}
},{"./Images":"GIOW"}]},{},["B6dB"], null)
//# sourceMappingURL=src.1d7f2bd3.js.map