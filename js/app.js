var Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.reset = function () {
    this.x = 0;
    this.y = bug_pos();
    this.speed = bug_speed();
};

// This update function updates the movement of the enemy across the board,
// and if the enemy's x position is greater than 450, it resets the enemy, 
// which is through a reset function created below.
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=this.speed*dt;
    if (this.x > 450) {
        this.reset();
    }    
  
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var player = function(x,y) {

    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

};

player.prototype.reset = function () {
    this.x = 200;
    this.y = 375;
};

// The following collision function runs through each instance of the enemy,
// checks the relationship between the player's position with the enemies position,
// and if the parameters are met, will reset the player to its original starting position.
player.prototype.collision = function () {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y) {
            window.alert ("The bugs got to you! Try again!");
            this.reset();
            }
    }
};

player.prototype.update = function (dt) {
    this.collision ();
};

player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The handleInput function allows for the game to interpret the key input by the user, 
//but sets limits on when the key input is valid. This way, it keeps the player within
//the boundaries of the game board/level.
player.prototype.handleInput = function (keys) {
    switch(keys){
        case 'left' : if(this.x > 0) {
            this.x=this.x-101;
            }
            break;
        case 'right': if(this.x < 400) {
            this.x=this.x+101;
            }
            break;
        case 'up': this.y=this.y-83;
            break;
        case 'down': if(this.y<=374) {
            this.y=this.y+83;
            }
            break;
            }
    
    if (this.y < 5)
        this.reset();
    };



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Player = new player(200,375);

var allEnemies = [];

var bug_pos = function () {
    var stone_row = [42, 125, 208];
    var bug_stone = stone_row [Math.floor(Math.random()*stone_row.length)];
    return bug_stone;
    };

var bug_speed = function () {
    var speed_group = [60, 120, 200];
    var randomSpeed = speed_group[Math.floor(Math.random()*speed_group.length)];
    return randomSpeed;
};

for (var i = 0; i < 5; i++) {
        var enemy = new Enemy(0, bug_pos(), bug_speed());
        allEnemies.push(enemy);
    }




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    Player.handleInput(allowedKeys[e.keyCode]);
});
