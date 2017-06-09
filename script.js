enemies = [];
points = 0;

updateStatus = (str) => {
  str = 'LEFT:' + Keyboard.isPressed(Keyboard.LEFT);
  str += ',RIGHT:' + Keyboard.isPressed(Keyboard.RIGHT);
  str += ',UP:' + Keyboard.isPressed(Keyboard.UP);
  str += ',DOWN:' + Keyboard.isPressed(Keyboard.DOWN);

  var s = getObj('spaceship');

  str += ',vX:' + s.vX;
  str += ',vY:' + s.vY;
  str += ',left:' + s.left;
  str += ',top:' + s.top;
  str += ',enemies:' + enemies.length;
  str += ',points:' + points;

  consoleEl.innerHTML = str;
}

init = () => {

  consoleEl = document.getElementById("console");

  var btn = document.getElementById("btn");
  btn.addEventListener("click", clickStartStop);

  var world = document.getElementById("world");
  world.style.width = w + 'px';
  world.style.height = h + 'px';
  world.style.left = 0 + 'px';
  world.style.top = 0 + 'px';

  var spaceship = createObj({
    id: 'spaceship',
    width: 30,
    height: 50,
    top: h - 55,
    left: 300,
    color: '#0000AA',
    a: 3,
    maxX: 20,
    maxY: 20,
    vX: 0,
    vY: 0,
    update: function(time) {
      if(Keyboard.isPressed(Keyboard.UP)) {
        if(this.vY > -this.maxY) {
          this.vY -= this.a;
        } else {
          this.vY = -this.maxY;
        }
      } else if(Keyboard.isPressed(Keyboard.DOWN)) {
        if(this.vY < this.maxY) {
          this.vY += this.a;
        } else {
          this.vY = this.maxY;
        }
      } else {
        if(this.vY < -0.2 || this.vY > 0.2) {
          this.vY *= 0.5;
        } else {
          this.vY = 0;
        }
      }
      if(Keyboard.isPressed(Keyboard.LEFT)) {
        if(this.vX > -this.maxX) {
          this.vX -= this.a;
        } else {
          this.vX = -this.maxX;
        }
      } else if(Keyboard.isPressed(Keyboard.RIGHT)) {
        if(this.vX < this.maxX) {
          this.vX += this.a;
        } else {
          this.vX = this.maxX;
        }
      } else {
        if(this.vX < -0.2 || this.vX > 0.2) {
          this.vX *= 0.5;
        } else {
          this.vX = 0;
        }
      }
      this.left += this.vX;
      this.top += this.vY;
    },
    fire: function() {
      console.log(time);
      createObj({
        id: 'fire' + time,
        width: 4,
        height: 6,
        top: this.top - 80,
        color: '#FFFF00',
        left: this.left + this.width*0.5,
        top: this.top,
        update: function(time) {
          this.top -= 20;
          if(this.top < -20) {
            killObj(this);
            return;
          }
          enemies.forEach((e) => {
            if(hitTestPoint(this.left, this.top, e)) {
              points += 10;
              killObj(this);
              killObj(e);
              return;
            }
          });
        }
      }).show();
    }
  }).show();

  var maxC = 10;
  var maxL = 3;
  var x;
  var enemy;
  for (l = 0; l < maxL; l++ ) {
    for (c = 0; c < maxC; c++ ) {
      var x = 200 + c*((w-400)/maxC) + (l%2)*50;
      enemy = createObj({
        id: 'enemy' + enemies.length,
        color: Math.random() < 0.5 ? '#AA0000' : '#00AA00',
        width: 20,
        height: 30,
        top: 60 + 60*l,
        leftBase: x,
        left: x,
        k: Math.random(),
        update: function(time) {
          this.left = this.leftBase + Math.sin(this.k + time*0.1)*150;
        }
      });
      enemies.push(enemy);
      enemy.show();
    }
  }
  /*
  enemy = createObj({
    id: 'enemyBoss',
    color: '#00AAAA',
    width: 100,
    height: 100,
    top: 250,
    leftBase: 300,
    left: 300,
    k: Math.random(),
    update: function(time) {
      this.left = this.leftBase + Math.sin(this.k + time*0.001)*150;
    }
  });
  enemies.push(enemy);
  enemy.show();
  */

  boot({
    id: 'SpaceWars',
    keydown: function(key) {
      switch(key) {
        case Keyboard.SPACE:
          getObj('spaceship').fire();
          break;
      }
    }
    /*
    ,
    keyup: function(key) {
      switch(key) {
        case Keyboard.LEFT:
          console.log("<<" + getObj('spaceship'));
          break;
        case Keyboard.RIGHT:
          console.log(">>" + getObj('spaceship'));
          break;
      }
    }
    */
  });

  //clickStartStop();
}

clickStartStop = (e) => {
  if(isRunning()) {
    stop();
    e.target.innerHTML = "Start";
    e.target.style.backgroundColor = '#009900';
  } else {
    play();
    e.target.innerHTML = "Stop";
    e.target.style.backgroundColor = '#990000';
  }
}
