// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"images/unicorn.png":[function(require,module,exports) {
module.exports = "/unicorn.2f14e6f5.png";
},{}],"images/mermaid.png":[function(require,module,exports) {
module.exports = "/mermaid.0d1a8b6c.png";
},{}],"images/tiana.png":[function(require,module,exports) {
module.exports = "/tiana.8e5302f5.png";
},{}],"images/bear.png":[function(require,module,exports) {
module.exports = "/bear.d4a65f6e.png";
},{}],"images/deer.png":[function(require,module,exports) {
module.exports = "/deer.efac47c7.png";
},{}],"src/Images.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var unicorn_png_1 = __importDefault(require("../images/unicorn.png"));

var mermaid_png_1 = __importDefault(require("../images/mermaid.png"));

var tiana_png_1 = __importDefault(require("../images/tiana.png"));

var bear_png_1 = __importDefault(require("../images/bear.png"));

var deer_png_1 = __importDefault(require("../images/deer.png"));

exports.default = [unicorn_png_1.default, mermaid_png_1.default, tiana_png_1.default, bear_png_1.default, deer_png_1.default];
},{"../images/unicorn.png":"images/unicorn.png","../images/mermaid.png":"images/mermaid.png","../images/tiana.png":"images/tiana.png","../images/bear.png":"images/bear.png","../images/deer.png":"images/deer.png"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Images_1 = __importDefault(require("./Images"));

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var clearBtn = document.getElementById('clear');
var changeImageBtn = document.getElementById('changeimage');
var image = new Image();
var allColors = ['red', 'orange', 'yellow', 'limegreen', 'blue', 'pink', 'purple', 'brown', 'white', 'black'];
var selectedColor = 'red';
var selectedImage = Images_1.default[0];
var dragging = false;
loadImage();
setupColors();
canvas.addEventListener('mousedown', function (_a) {
  var clientX = _a.clientX,
      clientY = _a.clientY,
      preventDefault = _a.preventDefault;
  beginPaint(clientX, clientY);
  preventDefault();
});
canvas.addEventListener('touchstart', function (e) {
  beginPaint(e.touches[0].clientX, e.touches[0].clientY);
  e.preventDefault();
});
canvas.addEventListener('mouseup', function (_a) {
  var clientX = _a.clientX,
      clientY = _a.clientY,
      preventDefault = _a.preventDefault;
  endPaint(clientX, clientY);
  preventDefault();
});
canvas.addEventListener('touchend', function (e) {
  endPaint(e.touches[0].clientX, e.touches[0].clientY);
  e.preventDefault();
});
canvas.addEventListener('mousemove', function (_a) {
  var clientX = _a.clientX,
      clientY = _a.clientY,
      preventDefault = _a.preventDefault;
  paint(clientX, clientY);
  preventDefault();
});
canvas.addEventListener('touchmove', function (e) {
  paint(e.touches[0].clientX, e.touches[0].clientY);
  e.preventDefault();
});
clearBtn.addEventListener('click', function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  loadImage();
});
changeImageBtn.addEventListener('click', function () {
  var newImage = '';

  do {
    var index = Math.floor(Math.random() * Images_1.default.length);
    newImage = Images_1.default[index];
  } while (newImage === selectedImage);

  selectedImage = newImage;
  loadImage();
});

function loadImage() {
  image.src = selectedImage;
  image.addEventListener('load', function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  });
}

function setupColors() {
  var ul = document.querySelector('.colors');

  var _loop_1 = function _loop_1(color) {
    var li = document.createElement('li');
    li.style.backgroundColor = color;
    li.addEventListener('click', function (_) {
      selectedColor = color; // Soportar Safari antiguo es lo que tiene

      var colors = document.querySelectorAll('ul.colors li');

      for (var i = 0; i < colors.length; i++) {
        colors[i].classList.remove('selected');
      }

      li.classList.add('selected');
    });
    ul.appendChild(li);
  };

  for (var _i = 0, allColors_1 = allColors; _i < allColors_1.length; _i++) {
    var color = allColors_1[_i];

    _loop_1(color);
  }

  selectedColor = allColors[0];
  document.querySelector('ul.colors li').classList.add('selected');
}

var lastX = undefined;
var lastY = undefined;

function toCanvasPoint(clientX, clientY) {
  var _a = canvas.getBoundingClientRect(),
      left = _a.left,
      top = _a.top,
      width = _a.width;

  var unscaledX = clientX - left;
  var unscaledY = clientY - top; // El canvas tiene un max-width: 100% por lo que puede estar escalado

  var scaleRatio = image.width / width;
  var x = unscaledX * scaleRatio;
  var y = unscaledY * scaleRatio;
  return {
    x: x,
    y: y
  };
}

function beginPaint(clientX, clientY) {
  dragging = true;

  var _a = toCanvasPoint(clientX, clientY),
      x = _a.x,
      y = _a.y;

  lastX = x;
  lastY = y;
}

function endPaint(_clientX, _clientY) {
  dragging = false;
  lastX = undefined;
  lastY = undefined;
}

function paint(clientX, clientY) {
  if (!dragging) return;

  var _a = toCanvasPoint(clientX, clientY),
      x = _a.x,
      y = _a.y;

  ctx.fillStyle = selectedColor;
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = selectedColor;
  ctx.beginPath();
  lastX = lastX || x;
  lastY = lastY || y;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.drawImage(image, 0, 0);
  lastX = x;
  lastY = y;
}
},{"./Images":"src/Images.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53796" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map