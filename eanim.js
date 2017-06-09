var timer;
var time = 0;
var objs = [];
var keys = {};
var w = window.innerWidth;
var h = window.innerHeight;

boot = (config) => {
  if(config !== undefined) {
    if(config.keydown !== undefined) {
      document.onkeydown = (event) => {
        var key = event.which || event.keyCode;
        keys["" + key] = true;
        config.keydown(key);
      }
    } else {
      document.onkeydown = (event) => {
        var key = event.which || event.keyCode;
        keys["" + key] = true;
      }
    }
    if(config.keyup !== undefined) {
      document.onkeyup = (event) => {
        var key = event.which || event.keyCode;
        keys["" + key] = false;
        config.keyup(key);
      }
    } else {
      document.onkeyup = (event) => {
        var key = event.which || event.keyCode;
        keys["" + key] = false;
      }
    }
  }
};

isRunning = () => timer !== undefined;

play = () => {
  console.log("start");
  timer = setInterval(updateInterval, 50);
}
stop = () => {
  console.log("stop");
  clearInterval(timer);
  timer = undefined;
}

updateInterval = () => {
    updateObjs(++time);
    updateStatus(time);
}
updateStatus = (str) => console.log(str);
updateObjs = (time) => objs.forEach((obj) => obj.updateAndRender(time));

hitTestPoint = (x, y, obj2) => ((x < (obj2.left + obj2.width) && x > obj2.left) && (y < obj2.top + obj2.height && y > obj2.top));
//hitTest = (obj1, obj2) => !(obj1.right < obj2.left || obj1.left > obj2.right || obj1.bottom < obj2.top || obj1.top > obj2.bottom);

addObj = (obj) => objs.push(obj);
getObj = (id) => objs.filter(obj => obj.id === id)[0];
remObj = (obj) => objs.splice(objs.indexOf(obj), 1);
killObj = (obj) => {
  obj.el.parentNode.removeChild(obj.el);
  remObj(obj);
  obj = null;
}
createObj = (obj) => {
  obj.el = document.createElement("div");
  obj.el.id = obj.id;
  obj.color = obj.color != undefined ? obj.color : '#444444';
  obj.width = obj.width != undefined ? obj.width : 20;
  obj.height = obj.height != undefined ? obj.height : 20;
  obj.left = obj.left != undefined ? obj.left : (w-obj.width)*0.5;
  obj.top = obj.top != undefined ? obj.top : (h-obj.height)*0.5;
  obj.el.style.position = 'absolute';
  obj.render = () => {
    obj.el.style.backgroundColor = obj.color;
    obj.el.style.width = obj.width + 'px';
    obj.el.style.height = obj.height + 'px';
    obj.el.style.top = obj.top + 'px';
    obj.el.style.left = obj.left + 'px';
    return obj;
  }
  obj.show = () => {
    world.appendChild(obj.el);
    obj.render();
  }
  //REFATORAR:
  if(obj.update != undefined) {
    obj.updateAndRender = time => {
      obj.update(time);
      obj.render();
    }
  } else {
    obj.updateAndRender = time => {
      obj.render();
    }
  }
  addObj(obj);
  return obj;
}
const Keyboard = {
    isPressed: function(key) {
      return keys["" + key] !== undefined ? keys["" + key] : false;
    },
    CANCEL: 3,
    HELP: 6,
    BACK_SPACE: 8,
    TAB: 9,
    CLEAR: 12,
    RETURN: 13,
    ENTER: 14,
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINTSCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    SEMICOLON: 59,
    EQUALS: 61,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    CONTEXT_MENU: 93,
    NUMPAD0: 96,
    NUMPAD1: 97,
    NUMPAD2: 98,
    NUMPAD3: 99,
    NUMPAD4: 100,
    NUMPAD5: 101,
    NUMPAD6: 102,
    NUMPAD7: 103,
    NUMPAD8: 104,
    NUMPAD9: 105,
    MULTIPLY: 106,
    ADD: 107,
    SEPARATOR: 108,
    SUBTRACT: 109,
    DECIMAL: 110,
    DIVIDE: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    F16: 127,
    F17: 128,
    F18: 129,
    F19: 130,
    F20: 131,
    F21: 132,
    F22: 133,
    F23: 134,
    F24: 135,
    NUM_LOCK: 144,
    SCROLL_LOCK: 145,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    BACK_QUOTE: 192,
    OPEN_BRACKET: 219,
    BACK_SLASH: 220,
    CLOSE_BRACKET: 221,
    QUOTE: 222,
    META: 224
};
