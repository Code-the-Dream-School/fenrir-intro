
let pause = document.getElementById('pause');
let world = $('#world').attr('data-world');
let totalLives = $('#TotalLives').attr('data-lives');
let $background = $('.background');
let totalCoins = [];
let start = true;
let user = [];
$('#lives-span').text(totalLives);
$('#world-span').text(world);

function Level(plan) {     
    if (plan === undefined ){
          console.log('winner of the game ! ')
             $('.WINNER').show()
             let $finish = $('.finish')
             $finish.show();
         };

  this.width = plan[0].length;
  this.height = plan.length;   // height === plan.length
  this.grid = [];
  this.actors = []; 
 for (var y = 0; y < this.height; y++) { // if 0 < plan length, y++
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) { //if 0 < plan[0].length, x++
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "wall";
      else if (ch == "!")
        fieldType = "lava";
     
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine); //grid is now [array of lava and wall]
  }
  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
  this.status = this.finishDelay = null;

}

Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

function Vector(x, y) {
  this.x = x; this.y = y;
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};

var actorChars = {
  "@": Player,
  "o": Coin,
  "=": Lava, "|": Lava, "v": Lava, 
  '*': Dragon, "#" : Dragon, '&': Dragon,
  '%': Princess,
  "^": Evil
};
// PLAYER FUNCTION **********************************************
function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";


// DRAGON FUNCTION ***********************************************
function Dragon(pos, ch) {
  this.pos = pos.plus(new Vector(-1, -2)); // LEFT / UP - DOWN
  this.size = new Vector(1.9, 1.3);   // SIZE OF DRAGON
  this.speed = new Vector(1.5, -3); // SPEED FROM LEFT TO RIGHT , TOP TO BOTTOM
if (ch == "*") {
    this.speed = new Vector(8, 2); //col span when goes up, speed
  }else if (ch == "#") {
    this.speed = new Vector(2, 3);
  } else if (ch == "&") {
    this.speed = new Vector(0, 3);
    this.repeatPos = pos;
  }
  }
  Dragon.prototype.type ='dragon';
// Princess FUNCTION ************************************************
function Princess(pos) {

  this.basePos = this.pos = pos.plus(new Vector(1.2, 1.1));
  this.size = new Vector(1.6, 1.9);
  this.wobble = Math.random() * Math.PI * 2;
}
Princess.prototype.type = "princess";

// LAVA FUNCTION ***************************************************
function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "=") {
    this.speed = new Vector(2, 0);
  }else if (ch == "|") {
    this.speed = new Vector(0, 2);
  } else if (ch == "v") {
    this.speed = new Vector(0, 3);
    this.repeatPos = pos;
  }
}
Lava.prototype.type = "lava";

// COIN FUNCTION *******************************************************************
function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";

// EVIL FUNCTION******************************

function Evil(pos,ch){
 this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(1.5, 1.5);
  if (ch == "^") {
    this.speed = new Vector(2, 0);
  
 }
}
Evil.prototype.type = 'evil';

function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(elt("div", "game"));
  this.level = level;
  this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}

var scale = 25;

DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  table.style.width = this.level.width * scale + "px";
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

DOMDisplay.prototype.drawActors = function() {
  var wrap = elt("div");
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;
  var margin = width / 3;

  // The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};
// LEVEL PROTOTYPE *****************************************
Level.prototype.obstacleAt = function(pos, size) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wall";
  if (yEnd > this.height)
    return "lava";
  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x];
      if (fieldType) return fieldType;
      
    }
  }
};

Level.prototype.actorAt = function(actor) {
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      return other;
  }
};

var maxStep = 0.05;
Level.prototype.animate = function(step, keys) {
  if (this.status != null)
    this.finishDelay -= step;

  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      actor.act(thisStep, this, keys);
    }, this);
    step -= thisStep;
  }
};
// DRAGON PROTOTYPE ******************************************
Dragon.prototype.act = function(step,level) {
  var newPos = this.pos.plus(this.speed.times(step));
      if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};
// PRINCESS PROPTYPE*******************************************

var wobbleSpeed = 8, wobbleDist = 0.07;
Princess.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
// EVIL PROPTYPE***********************************************
Evil.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};



//LAVA PROTOTYPE***********************************************
Lava.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

//  COIN PROTOTYPE ***********************************************
var wobbleSpeed = 8, wobbleDist = 0.07;
Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};


// PLAYER PROTOTYPE ***********************************************
var playerXSpeed = 7;
Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle)
    level.playerTouched(obstacle);
  else
    this.pos = newPos;
};

var gravity = 30;
var jumpSpeed = 17;

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
    level.playerTouched(obstacle);
    if (keys.up && this.speed.y > 0)
      this.speed.y = -jumpSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

  // Losing animation
  if (level.status == "lost") {
    this.pos.y += step;
    this.size.y -= step; 
   
  }
  var $start = $('#start'); 
$start.on('click', function() {
  var $game = $('.game');
  $game.show();
  $start.hide();
  }) 
};

Level.prototype.playerTouched = function(type, actor) {
  // console.log(type == 'evil')
  if((type == 'evil' || type == 'dragon'  ) && actor.pos.y * scale + "px" ) {
    console.log('ive been touched.... :) ')
  }
  if ((type == "lava" || type =='dragon' || type == 'evil') && this.status == null) {
    this.status = "lost";  
    this.finishDelay = 1;
  } else if (type == "coin" || type == 'princess') {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
    if (!this.actors.some(function(actor) {
      return actor.type == "coin";
    })) 
   if (!this.actors.some(function(actor) {
      return actor.type == "princess";
    }))
    {
      this.status = "won";
      this.finishDelay = 1;   
    }
  }  
};
var arrowCodes = {37: "left", 38: "up", 39: "right"};
function trackKeys(codes) {
  var pressed = Object.create(null);
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

var arrows = trackKeys(arrowCodes);

function runLevel(level, display, andThen) {
  display = new DOMDisplay(document.body, level);
  runAnimation(function(step) {
    level.animate(step, arrows);
    display.drawFrame(step);
   
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    };
  });
}
function runGame(plans, display) {
  function startLevel(n) {
    runLevel(new Level(plans[n]), display, function(status) {
      
    //pass level and receive an extra life
  if (status ==='won' && n !== plans.length){
          world++;
          $('#world-span').text(world);
          totalLives++;
          $('#lives-span').text(totalLives);
      
          startLevel(n+1);
         };

  if (status == "lost") {
     totalLives -= 1;
         //Restarts game with four lives     
  if(totalLives === 0) {
    totalLives = 4;
    $('#lives-span').text(totalLives);
    return startLevel(0);
  };
      $('#lives-span').text(totalLives);
       if(n< plans.length){
        return startLevel(n+0)
      } 
     }; 
    });   
  }  
  startLevel(0);
}



// working pausing game process

// pause.onclick = function(){
//   async function* powers(n){
//   for(let current = n;; current *= n){
//       yield  current;  
//       }
//   }
//   console.log('heloo');
// powers(runGame(GAME_LEVELS, DOMDisplay));
// }