
var func1, func2;
var u_x, u_y, u_map;

function tp(speed){
    save_player_xy();
    func1 = window.setInterval(function(){
      teleport(u_x + Math.floor(Math.random()*2) , u_y + Math.floor(Math.random()*4) - 2)
    },speed);
}

function tp2(speed, size){

    save_player_xy();
    func1 = window.setInterval(function(){
      teleport(u_x + Math.floor(Math.random()*size*2) - size , u_y + Math.floor(Math.random()*size*2) - size)
    },speed);
}

var angle = 0; 
var round_size = 0;
var round_speed = 0;
function save_player_xy() {
    var player = getPlayer();
    u_x = player.x;
    u_y = player.y;
    u_map = player.map;
}

function power(name) {
    local_play(name);
    tpC(100,5,360/3+1)
}

function locate_player(name) {
    stop2();
    func2 = window.setInterval(function(){
     const players = getPlayers();
     const selected = players.find(p => p.name === name);
     if (selected) {
       u_x = selected.x;
       u_y = selected.y;
       u_map = selected.map;
     } else {
       stop2()
       console.error('stop')
     }
    },100);
}

/*
 *
 * Circle around
 */

function tpC(speed, size, add){
    angle = 0; 
    save_player_xy();
    round_size = size;
    round_speed = add;
    func1 = window.setInterval(function(){
      let radian = angle /180 * Math.PI;
    
      teleport(
      Math.round(u_x + round_size * Math.cos(radian)) , 
      Math.round(u_y + round_size * Math.sin(radian)),
      u_map);
     angle += round_speed;
    },speed);
}

function magic(x, y) {
    var player = getPlayer();
    teleport(player.x + x, player.y + y )
    u_x = player.x + x;
    u_y = player.y + y;
}

function stop(){
    window.clearInterval(func1);
}

function stop2(){
    window.clearInterval(func2);
}

var magicJump = 1;
function magicMove(e) {
  var key = e.key;
  if (key == "h") {
    magic(-magicJump, 0);
  } else if (key == "j") {
    magic(0, magicJump);
  } else if (key == "k") {
    magic(0, -magicJump);
  } else if (key == "l") {
    magic(magicJump, 0);
  } else if (key == "J") {
    magicJump -= 1;
    console.log("speed Down"+ magicJump);
  } else if (key == "K") {
    magicJump += 1;
    console.log("speed up" + magicJump);
  } else if (key == "r") {
    magicJump = 1;
    console.log("reset speed " + magicJump);
  }
}

document.addEventListener('keydown', magicMove);
