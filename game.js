/////////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
//////
//////
//////   INFINITY STELLA
//////
//////   Use arrows to move
//////   Press Z to attack
//////   Press X to defend
//////
//////
/////////////////////////////////////
/////////////////////////////////////

////////////// Game /////////////////
// You can cheat by editing the money,
// the level. But please don't use it
// to get into the leaderboard.
var sketchProc = function (processingInstance) {
  with (processingInstance) {
    size(800, 800);
    frameRate(100);
    println(
      "Play full size here : https://www.khanacademy.org/computer-programming/infinity-stella/6689870969782272?editor=no&width=800&height=800"
    );
    println(
      "Play full size  width code here : https://www.khanacademy.org/computer-programming/infinity-stella/6689870969782272?width=800&height=800"
    );
    println("Tip: Scroll + Ctrl to Zoom");
    var d = 50;
    var d_sate = 20;
    var G = 1;
    var Width = 800;
    var Height = 800;
    var gameLevel = 1;
    var maxLevel = gameLevel;
    var n_planet = 0;
    var n_meteor = 0;
    var n_black = 0;
    var n_red = 0;
    var planets = [];
    var meteors = [];
    var blacks = [];
    var reds = [];
    var money = 10;
    var score = 0;
    var choice = "earth";
    var scene = "game";
    var top5Name = [
      "Aarav Dekate",
      "Sax Man",
      "DudeSup101",
      "Butterfly",
      "Aarav Dekate",
    ];
    var top5Score = [730, 568, 443, 140, 30];

    var keys = [];

    //////////////////// Earth /////////////
    {
      var Earth = function () {
        this.level = 1;
        this.r = 50;
        this.x = 400;
        this.y = 400;
        this.time = 0;
        this.mass = 5;
        this.damage = 1 + (this.level - 1) * 0.1;
        this.health = 1 + (this.level - 1) * 0.5;
        this.maxHealth = this.health;
      };

      Earth.prototype.upgrade = function () {
        this.level++;
        this.damage = 1 + (this.level - 1) * 0.1;
        this.health = 1 + (this.level - 1) * 0.5;
        this.maxHealth = this.health;
      };

      Earth.prototype.display = function () {
        this.time += 1;
        noStroke();
        fill(9, 0, 255);
        ellipse(this.x, this.y, 50, 50);
        rectMode(CENTER);
        fill(3, 92, 3);
        ellipse(this.x + 10, this.y - 10, 20, 20);
        ellipse(this.x + 2, this.y - 15, 30, 10);
        ellipse(this.x - 8, this.y + 10, 30, 10);
        fill(255, 255, 255);
        ellipse(this.x - 5, this.y - 5, 15, 5);
        ellipse(this.x - 6, this.y - 2, 25, 5);
        ellipse(this.x + 10, this.y + 10, 25, 5);
        ellipse(this.x, this.y + 12, 15, 5);

        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 4) + 1) * this.r;
          var loc = this.time + i * 90 + ((layer / this.r) % 2) * 45;
          fill(194, 194, 194);
          ellipse(
            this.x + layer * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate,
            d_sate
          );
          fill(255, 255, 255);
          ellipse(
            this.x + layer * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate - 10,
            d_sate - 10
          );
        }

        fill(255, 0, 0);
        rect(this.x, this.y - 40, 50, 10, 20);
        fill(0, 255, 0);
        rect(this.x, this.y - 40, (50 * this.health) / this.maxHealth, 10, 20);
      };

      Earth.prototype.act = function () {
        if (keys[39] && this.x < Width) {
          this.x += 5;
        }
        if (keys[40] && this.y < Height) {
          this.y += 5;
        }
        if (keys[37] && this.x > 0) {
          this.x -= 5;
        }
        if (keys[38] && this.y > 0) {
          this.y -= 5;
        }
        if (keys[90] && this.r <= 200) {
          this.r += 1;
        }
        if (keys[88] && this.r >= 50) {
          this.r -= 1;
        }
      };

      Earth.prototype.hit = function (enemy_pos, enemy_d) {
        var count = 0;
        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 4) + 1) * this.r;
          var loc = this.time + i * 90 + ((layer / this.r) % 2) * 45;
          var sate = new PVector(
            this.x + layer * cos(radians(loc)),
            this.y + layer * sin(radians(loc))
          );
          var distance = PVector.sub(enemy_pos, sate);
          distance = distance.mag();
          if (distance <= (d_sate + enemy_d) / 2) {
            count++;
          }
        }
        return count;
      };
    }

    ////////////////// Mars ////////////
    {
      var Mars = function () {
        this.isLock = true;
        this.level = 1;
        this.r = 50;
        this.x = 400;
        this.y = 400;
        this.time = 0;
        this.mass = 5;
        this.damage = 1.5 + (this.level - 1) * 0.15;
        this.health = 2 + (this.level - 1) * 0.55;
        this.maxHealth = this.health;
      };

      Mars.prototype.upgrade = function () {
        this.level++;
        this.damage = 1.5 + (this.level - 1) * 0.15;
        this.health = 2 + (this.level - 1) * 0.55;
        this.maxHealth = this.health;
      };

      Mars.prototype.display = function () {
        this.time += 1;
        noStroke();
        fill(207, 50, 39);
        ellipse(this.x, this.y, 50, 50);
        rectMode(CENTER);
        fill(237, 168, 29);
        rect(this.x - 10, this.y + 5, 30, 10, 20);
        rect(this.x - 2, this.y + 13, 27, 8, 20);
        rect(this.x + 6, this.y - 13, 27, 8, 20);

        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 4) + 1) * this.r;
          var loc = this.time + i * 90 + (layer / this.r) * 60;
          fill(255, 8, 8);
          ellipse(
            this.x + layer * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate,
            d_sate
          );
          fill(232, 84, 86);
          ellipse(
            this.x + layer * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate - 10,
            d_sate - 10
          );
        }

        fill(255, 0, 0);
        rect(this.x, this.y - 40, 50, 10, 20);
        fill(0, 255, 0);
        rect(this.x, this.y - 40, (50 * this.health) / this.maxHealth, 10, 20);
      };

      Mars.prototype.act = function () {
        if (keys[39] && this.x < Width) {
          this.x += 5;
        }
        if (keys[40] && this.y < Height) {
          this.y += 5;
        }
        if (keys[37] && this.x > 0) {
          this.x -= 5;
        }
        if (keys[38] && this.y > 0) {
          this.y -= 5;
        }
        if (keys[90] && this.r <= 200) {
          this.r += 1;
        }
        if (keys[88] && this.r >= 50) {
          this.r -= 1;
        }
      };

      Mars.prototype.hit = function (enemy_pos, enemy_d) {
        var count = 0;
        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 4) + 1) * this.r;
          var loc = this.time + i * 90 + (layer / this.r) * 60;
          var sate = new PVector(
            this.x + layer * cos(radians(loc)),
            this.y + layer * sin(radians(loc))
          );
          var distance = PVector.sub(enemy_pos, sate);
          distance = distance.mag();
          if (distance <= (d_sate + enemy_d) / 2) {
            count++;
          }
        }
        return count;
      };
    }

    ////////////// Jupiter /////////////////
    {
      var Jupiter = function () {
        this.isLock = true;
        this.level = 1;
        this.r = 50;
        this.x = 400;
        this.y = 400;
        this.time = 0;
        this.mass = 5;
        this.damage = 2 + (this.level - 1) * 0.2;
        this.health = 3 + (this.level - 1) * 0.6;
        this.maxHealth = this.health;
      };

      Jupiter.prototype.upgrade = function () {
        this.level++;
        this.damage = 2 + (this.level - 1) * 0.2;
        this.health = 3 + (this.level - 1) * 0.6;
        this.maxHealth = this.health;
      };

      Jupiter.prototype.display = function () {
        this.time += 1;
        noStroke();
        fill(194, 166, 134);
        ellipse(this.x, this.y, 50, 50);
        rectMode(CENTER);
        fill(184, 105, 14);
        rect(this.x, this.y - 15, 38, 5, 20);
        rect(this.x, this.y, 48, 5, 20);
        rect(this.x, this.y + 15, 38, 5, 20);
        ellipse(this.x + 10, this.y + 4, 10, 10);

        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 5) + 1) * this.r;
          var layer2 = (floor(i / 5) + 1) * this.r;
          var loc = this.time + i * 72 - (layer / this.r) * 36;
          fill(44, 153, 37);
          ellipse(
            this.x + layer2 * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate,
            d_sate
          );
          fill(14, 94, 8);
          ellipse(
            this.x + layer2 * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate - 10,
            d_sate - 10
          );
        }

        fill(255, 0, 0);
        rect(this.x, this.y - 40, 50, 10, 20);
        fill(0, 255, 0);
        rect(this.x, this.y - 40, (50 * this.health) / this.maxHealth, 10, 20);
      };

      Jupiter.prototype.act = function () {
        if (keys[39] && this.x < Width) {
          this.x += 5;
        }
        if (keys[40] && this.y < Height) {
          this.y += 5;
        }
        if (keys[37] && this.x > 0) {
          this.x -= 5;
        }
        if (keys[38] && this.y > 0) {
          this.y -= 5;
        }
        if (keys[90] && this.r <= 200) {
          this.r += 1;
        }
        if (keys[88] && this.r >= 50) {
          this.r -= 1;
        }
      };

      Jupiter.prototype.hit = function (enemy_pos, enemy_d) {
        var count = 0;
        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 5) + 1) * this.r;
          var layer2 = (floor(i / 5) + 1) * this.r;
          var loc = this.time + i * 72 - (layer / this.r) * 36;
          var sate = new PVector(
            this.x + layer2 * cos(radians(loc)),
            this.y + layer * sin(radians(loc))
          );
          var distance = PVector.sub(enemy_pos, sate);
          distance = distance.mag();
          if (distance <= (d_sate + enemy_d) / 2) {
            count++;
          }
        }
        return count;
      };
    }

    ////////////// Saturn /////////////////
    {
      var Saturn = function () {
        this.isLock = true;
        this.level = 1;
        this.r = 50;
        this.x = 400;
        this.y = 400;
        this.time = 0;
        this.mass = 5;
        this.damage = 2.5 + (this.level - 1) * 0.3;
        this.health = 4 + (this.level - 1) * 0.65;
        this.maxHealth = this.health;
      };

      Saturn.prototype.upgrade = function () {
        this.level++;
        this.damage = 2.5 + (this.level - 1) * 0.3;
        this.health = 4 + (this.level - 1) * 0.65;
        this.maxHealth = this.health;
      };

      Saturn.prototype.display = function () {
        this.time += 1;
        noStroke();
        fill(217, 199, 178);
        ellipse(this.x, this.y, 50, 50);
        rectMode(CENTER);
        fill(163, 114, 65);
        rect(this.x, this.y - 15, 38, 2, 20);
        rect(this.x, this.y - 8, 48, 2, 20);
        rect(this.x, this.y, 48, 2, 20);
        rect(this.x, this.y + 8, 48, 2, 20);
        rect(this.x, this.y + 15, 38, 2, 20);

        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 8) + 1) * this.r;
          var layer2 = (floor(i / 8) + 2) * this.r;

          var loc = this.time + i * 45 - (layer / this.r) * 36;
          if (i >= 8) {
            var layer = (floor((i - 8) / 20) + 2) * this.r;
            var layer2 = (floor((i - 8) / 20) + 4) * this.r;
            var loc = this.time + i * 18 - (layer / this.r) * 30;
          }
          if (i >= 28) {
            var layer = (floor((i - 28) / 30) + 3) * this.r;
            var layer2 = (floor((i - 28) / 30) + 6) * this.r;
            var loc = this.time + i * 12 - (layer / this.r) * 30;
          }
          fill(235, 78, 0);
          ellipse(
            this.x + layer2 * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate,
            d_sate
          );
          fill(255, 255, 0);
          ellipse(
            this.x + layer2 * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate - 10,
            d_sate - 10
          );
        }

        fill(255, 0, 0);
        rect(this.x, this.y - 40, 50, 10, 20);
        fill(0, 255, 0);
        rect(this.x, this.y - 40, (50 * this.health) / this.maxHealth, 10, 20);
      };

      Saturn.prototype.act = function () {
        if (keys[39] && this.x < Width) {
          this.x += 5;
        }
        if (keys[40] && this.y < Height) {
          this.y += 5;
        }
        if (keys[37] && this.x > 0) {
          this.x -= 5;
        }
        if (keys[38] && this.y > 0) {
          this.y -= 5;
        }
        if (keys[90] && this.r <= 200) {
          this.r += 1;
        }
        if (keys[88] && this.r >= 50) {
          this.r -= 1;
        }
      };

      Saturn.prototype.hit = function (enemy_pos, enemy_d) {
        var count = 0;
        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 8) + 1) * this.r;
          var layer2 = (floor(i / 8) + 2) * this.r;

          var loc = this.time + i * 45 - (layer / this.r) * 36;
          if (i >= 8) {
            var layer = (floor((i - 8) / 20) + 2) * this.r;
            var layer2 = (floor((i - 8) / 20) + 4) * this.r;
            var loc = this.time + i * 18 - (layer / this.r) * 30;
          }
          if (i >= 28) {
            var layer = (floor((i - 28) / 30) + 3) * this.r;
            var layer2 = (floor((i - 28) / 30) + 6) * this.r;
            var loc = this.time + i * 12 - (layer / this.r) * 30;
          }
          var sate = new PVector(
            this.x + layer2 * cos(radians(loc)),
            this.y + layer * sin(radians(loc))
          );
          var distance = PVector.sub(enemy_pos, sate);
          distance = distance.mag();
          if (distance <= (d_sate + enemy_d) / 2) {
            count++;
          }
        }
        return count;
      };
    }

    ////////////// Sun /////////////////
    {
      var Sun = function () {
        this.isLock = true;
        this.level = 1;
        this.r = 50;
        this.x = 400;
        this.y = 400;
        this.time = 0;
        this.mass = 5;
        this.damage = 3 + (this.level - 1) * 0.5;
        this.health = 5 + (this.level - 1) * 0.7;
        this.maxHealth = this.health;
      };

      Sun.prototype.upgrade = function () {
        this.level++;
        this.damage = 3 + (this.level - 1) * 0.5;
        this.health = 5 + (this.level - 1) * 0.7;
        this.maxHealth = this.health;
      };

      Sun.prototype.display = function () {
        this.time += 1;
        noStroke();
        rectMode(CENTER);
        fill(240, 24, 24);
        ellipse(this.x, this.y, 50, 50);
        fill(250, 30, 30);
        ellipse(this.x, this.y, 40, 40);
        fill(250, 124, 45);
        ellipse(this.x, this.y, 30, 30);
        fill(255, 255, 0);
        ellipse(this.x, this.y, 20, 20);

        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 12) + 1) * this.r;
          var layer2 = (floor(i / 12) + 2) * this.r;

          var loc = this.time + i * 30 - (layer / this.r) * 36;
          if (i >= 12) {
            var layer = (floor((i - 12) / 12) + 2) * this.r;
            var layer2 = floor((i - 12) / 12) * this.r;
            var loc = this.time + i * 30 - (layer / this.r) * 36;
          }
          if (i >= 24) {
            var layer = (floor((i - 24) / 12) + 1) * this.r;
            var layer2 = floor((i - 24) / 12) * this.r;
            var loc = this.time + i * 30 - (layer / this.r) * 36;
          }
          if (i >= 36) {
            var layer = (floor((i - 24) / 12) + 1) * this.r;
            var layer2 = floor((i - 24) / 12) * this.r;
            var loc = this.time + i * 30 - (layer / this.r) * 36;
          }
          if (i >= 48) {
            var layer = floor((i - 48) / 12) * this.r;
            var layer2 = (floor((i - 48) / 12) + 2) * this.r;
            var loc = this.time + i * 30 - (layer / this.r) * 36;
          }
          if (i >= 60) {
            var layer = (floor((i - 60) / 18) + 2) * this.r;
            var layer2 = (floor((i - 60) / 18) + 2) * this.r;
            var loc = this.time + i * 20 - (layer / this.r) * 10;
          }

          fill(255, 0, 0);
          ellipse(
            this.x + layer2 * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate,
            d_sate
          );
          fill(208, 252, 10);
          ellipse(
            this.x + layer2 * cos(radians(loc)),
            this.y + layer * sin(radians(loc)),
            d_sate - 10,
            d_sate - 10
          );
        }

        fill(255, 0, 0);
        rect(this.x, this.y - 40, 50, 10, 20);
        fill(0, 255, 0);
        rect(this.x, this.y - 40, (50 * this.health) / this.maxHealth, 10, 20);
      };

      Sun.prototype.act = function () {
        if (keys[39] && this.x < Width) {
          this.x += 5;
        }
        if (keys[40] && this.y < Height) {
          this.y += 5;
        }
        if (keys[37] && this.x > 0) {
          this.x -= 5;
        }
        if (keys[38] && this.y > 0) {
          this.y -= 5;
        }
        if (keys[90] && this.r <= 200) {
          this.r += 1;
        }
        if (keys[88] && this.r >= 50) {
          this.r -= 1;
        }
      };

      Sun.prototype.hit = function (enemy_pos, enemy_d) {
        var count = 0;
        for (var i = 0; i < this.level; i++) {
          var layer = (floor(i / 12) + 1) * this.r;
          var layer2 = (floor(i / 12) + 2) * this.r;

          var loc = this.time + i * 30 - (layer / this.r) * 36;
          if (i >= 12) {
            var layer = (floor((i - 12) / 12) + 2) * this.r;
            var layer2 = floor((i - 12) / 12) * this.r;
            var loc = this.time + i * 30 - (layer / this.r) * 36;
          }
          if (i >= 24) {
            var layer = (floor((i - 24) / 12) + 1) * this.r;
            var layer2 = floor((i - 24) / 12) * this.r;
            var loc = this.time + i * 30 - (layer / this.r) * 36;
          }
          if (i >= 36) {
            var layer = (floor((i - 24) / 12) + 1) * this.r;
            var layer2 = floor((i - 24) / 12) * this.r;
            var loc = this.time + i * 30 - (layer / this.r) * 36;
          }
          if (i >= 48) {
            var layer = floor((i - 48) / 12) * this.r;
            var layer2 = (floor((i - 48) / 12) + 2) * this.r;
            var loc = this.time + i * 30 - (layer / this.r) * 36;
          }
          if (i >= 60) {
            var layer = (floor((i - 60) / 18) + 2) * this.r;
            var layer2 = (floor((i - 60) / 18) + 2) * this.r;
            var loc = this.time + i * 20 - (layer / this.r) * 10;
          }
          var sate = new PVector(
            this.x + layer2 * cos(radians(loc)),
            this.y + layer * sin(radians(loc))
          );
          var distance = PVector.sub(enemy_pos, sate);
          distance = distance.mag();
          if (distance <= (d_sate + enemy_d) / 2) {
            count++;
          }
        }
        return count;
      };
    }

    ///////////////////// Planet ////////////
    {
      var Planet = function (x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.d = 50;
        this.mass = 3;
        this.speed = 3 * pow(1.02, gameLevel - 1);
        this.health = 10 + gameLevel * 2;
        this.maxHealth = 10 + gameLevel * 2;
      };

      Planet.prototype.display = function () {
        noStroke();
        rectMode(CENTER);
        fill(48, 48, 46);
        ellipse(this.position.x, this.position.y, this.d, this.d);
        fill(129, 130, 120);
        ellipse(this.position.x, this.position.y, this.d - 15, this.d - 15);

        fill(255, 0, 0);
        rect(this.position.x, this.position.y - this.d + 10, this.d, 10, 20);
        fill(0, 252, 25);
        rect(
          this.position.x,
          this.position.y - this.d + 10,
          (this.d * this.health) / this.maxHealth,
          10,
          20
        );
      };

      Planet.prototype.applyForce = function (force) {
        var f = PVector.div(force, this.mass);
        this.acceleration.add(f);
      };

      Planet.prototype.beHitted = function (player) {
        var count = player.hit(this.position, this.d);
        if (count) {
          if (this.health <= 0) {
            return true;
          }
          this.health -= count * player.damage;
        }
        return false;
      };

      Planet.prototype.hit = function (player) {
        var player_pos = new PVector(player.x, player.y);
        var distance = PVector.sub(this.position, player_pos);
        distance = distance.mag();
        if (distance <= (50 + this.d) / 2) {
          return true;
        }

        return false;
      };

      Planet.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      };

      Planet.prototype.calculateAttraction = function (player) {
        var force = PVector.sub(this.position, new PVector(player.x, player.y));
        var distance = force.mag();
        distance = constrain(distance, 5.0, 25.0);
        force.normalize();
        var strength = (G * this.mass * player.mass) / (distance * distance);
        force.mult(-this.speed * strength);
        return force;
      };
    }

    ///////////// Meteor ////////////////////
    {
      var Meteor = function (x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(1, 1);
        this.velocity.mult(2 * pow(1.02, gameLevel - 1));
        this.acceleration = new PVector(0, 0);
        this.d = 20;
        this.mass = 2;
        this.speed = 8 * pow(1.02, gameLevel - 1);
        this.health = 10 + gameLevel;
        this.maxHealth = 10 + gameLevel;
      };

      Meteor.prototype.display = function () {
        noStroke();
        rectMode(CENTER);

        fill(0, 213, 255);
        ellipse(this.position.x, this.position.y, this.d, this.d);

        fill(255, 0, 0);
        rect(this.position.x, this.position.y - this.d + 5, this.d, 5, 20);

        fill(0, 252, 25);

        rect(
          this.position.x,
          this.position.y - this.d + 5,
          (this.d * this.health) / this.maxHealth,
          5,
          20
        );
      };

      Meteor.prototype.applyForce = function (force) {
        var f = PVector.div(force, this.mass);
        this.acceleration.add(f);
      };

      Meteor.prototype.beHitted = function (player) {
        var count = player.hit(this.position, this.d);
        if (count) {
          if (this.health <= 0) {
            return true;
          }
          this.health -= count * player.damage;
        }
        return false;
      };

      Meteor.prototype.hit = function (player) {
        var player_pos = new PVector(player.x, player.y);
        var distance = PVector.sub(this.position, player_pos);
        distance = distance.mag();
        if (distance <= (50 + this.d) / 2) {
          return true;
        }

        return false;
      };

      Meteor.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        if (this.position.x > Width) {
          this.position.x = 0;
          this.position.y = random(Height);
        }
        if (this.position.x < 0) {
          this.position.x = Width;
          this.position.y = random(Height);
        }
        if (this.position.y > Height) {
          this.position.y = 0;
          this.position.x = random(Width);
        }
        if (this.position.y < 0) {
          this.position.y = Height;
          this.position.x = random(Width);
        }
        this.acceleration.mult(0);
      };

      Meteor.prototype.calculateAttraction = function (player) {
        var force = PVector.sub(this.position, new PVector(player.x, player.y));
        var distance = force.mag();
        distance = constrain(distance, 5.0, 25.0);
        force.normalize();
        var strength = (G * this.mass * player.mass) / (distance * distance);
        force.mult(-this.speed * strength);
        return force;
      };
    }

    /////////////Black Eye ////////////
    {
      var BlackEye = function (x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.d = 200;
        this.mass = 10;
        this.speed = 1 * pow(1.01, gameLevel - 1);
        this.health = 1000 + gameLevel * 200;
        this.maxHealth = 1000 + gameLevel * 200;
        this.timeCharge = 100;
        this.timeCount = 0;
      };

      BlackEye.prototype.display = function () {
        noStroke();
        rectMode(CENTER);
        this.timeCount++;
        fill(207, 207, 207);
        ellipse(this.position.x, this.position.y, this.d, this.d);
        fill(255, 255, 255);
        ellipse(this.position.x, this.position.y, this.d - 20, this.d - 20);

        if (this.timeCount % (4 * this.timeCharge) < this.timeCharge) {
          fill(0, 0, 0);
          ellipse(this.position.x, this.position.y, this.d / 2, this.d / 2);
          fill(255, 255, 255);
          ellipse(this.position.x, this.position.y, this.d / 4, this.d / 2);
        } else {
          fill(0, 0, 0);
          stroke(0);
          line(
            this.position.x - this.d / 4,
            this.position.y,
            this.position.x + this.d / 4,
            this.position.y
          );
          noStroke();
        }

        noStroke();

        fill(255, 0, 0);
        rect(this.position.x, this.position.y - this.d + 80, this.d, 10, 20);

        fill(0, 252, 25);
        rect(
          this.position.x,
          this.position.y - this.d + 80,
          (this.d * this.health) / this.maxHealth,
          10,
          20
        );
      };

      BlackEye.prototype.applyForce = function (force) {
        var f = PVector.div(force, this.mass);
        this.acceleration.add(f);
      };

      BlackEye.prototype.beHitted = function (player) {
        var count = player.hit(this.position, this.d);
        if (count) {
          if (this.health <= 0) {
            return true;
          }
          this.health -= count * player.damage;
        }
        return false;
      };

      BlackEye.prototype.hit = function (player) {
        var player_pos = new PVector(player.x, player.y);
        var distance = PVector.sub(this.position, player_pos);
        distance = distance.mag();
        if (distance <= (50 + this.d) / 2) {
          return true;
        }

        return false;
      };

      BlackEye.prototype.update = function (player) {
        var distance = PVector.sub(
          this.position,
          new PVector(player.x, player.y)
        );
        distance.normalize();
        distance.mult(-this.speed);
        this.velocity = distance;
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      };

      BlackEye.prototype.calculateAttraction = function (player) {
        var force = PVector.sub(this.position, new PVector(player.x, player.y));
        var distance = force.mag();
        distance = constrain(distance, 5.0, 25.0);
        force.normalize();
        var strength = (G * this.mass * player.mass) / (distance * distance);
        force.mult(-this.speed * strength);
        return force;
      };

      BlackEye.prototype.openEye = function (player) {
        if (this.timeCount % (4 * this.timeCharge) === 0) {
          var distance = PVector.sub(
            this.position,
            new PVector(player.x, player.y)
          );
          distance.normalize();
          distance.mult(100);
          player.x += distance.x;
          player.y += distance.y;
        }
      };
    }

    ////////////// Red Eye ///////////
    {
      var RedEye = function (x, y) {
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.d = 200;
        this.mass = 10;
        this.speed = 1 * pow(1.02, gameLevel - 1);
        this.health = 1000 + gameLevel * 200;
        this.maxHealth = 1000 + gameLevel * 200;
        this.timeCharge = 100;
        this.timeCount = 0;
      };

      RedEye.prototype.display = function () {
        noStroke();
        rectMode(CENTER);
        this.timeCount++;
        fill(207, 207, 207);
        ellipse(this.position.x, this.position.y, this.d, this.d);
        fill(255, 255, 255);
        ellipse(this.position.x, this.position.y, this.d - 20, this.d - 20);

        if (this.timeCount % (4 * this.timeCharge) < this.timeCharge) {
          fill(255, 0, 0);
          ellipse(this.position.x, this.position.y, this.d / 2, this.d / 2);
          fill(255, 255, 255);
          ellipse(this.position.x, this.position.y, this.d / 9, this.d / 2);
        } else {
          fill(255, 0, 0);
          stroke(0);
          line(
            this.position.x - this.d / 4,
            this.position.y,
            this.position.x + this.d / 4,
            this.position.y
          );
          noStroke();
        }

        noStroke();

        fill(255, 0, 0);
        rect(this.position.x, this.position.y - this.d + 80, this.d, 10, 20);

        fill(0, 252, 25);
        rect(
          this.position.x,
          this.position.y - this.d + 80,
          (this.d * this.health) / this.maxHealth,
          10,
          20
        );
      };

      RedEye.prototype.applyForce = function (force) {
        var f = PVector.div(force, this.mass);
        this.acceleration.add(f);
      };

      RedEye.prototype.beHitted = function (player) {
        var count = player.hit(this.position, this.d);
        if (count) {
          if (this.health <= 0) {
            return true;
          }
          this.health -= count * player.damage;
        }
        return false;
      };

      RedEye.prototype.hit = function (player) {
        var player_pos = new PVector(player.x, player.y);
        var distance = PVector.sub(this.position, player_pos);
        distance = distance.mag();
        if (distance <= (50 + this.d) / 2) {
          return true;
        }

        return false;
      };

      RedEye.prototype.update = function (player) {
        var distance = PVector.sub(
          this.position,
          new PVector(player.x, player.y)
        );
        distance.normalize();
        distance.mult(-this.speed);
        this.velocity = distance;
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      };

      RedEye.prototype.calculateAttraction = function (player) {
        var force = PVector.sub(this.position, new PVector(player.x, player.y));
        var distance = force.mag();
        distance = constrain(distance, 5.0, 25.0);
        force.normalize();
        var strength = (G * this.mass * player.mass) / (distance * distance);
        force.mult(-this.speed * strength);
        return force;
      };

      RedEye.prototype.openEye = function (player) {
        if (this.timeCount % (4 * this.timeCharge) === 0) {
          var distance = PVector.sub(
            this.position,
            new PVector(player.x, player.y)
          );
          distance.normalize();
          distance.mult(100);
          player.x -= distance.x;
          player.y -= distance.y;
        }
      };
    }

    ////////////// Game function ///////
    var earth = new Earth();
    var mars = new Mars();
    var jupiter = new Jupiter();
    var saturn = new Saturn();
    var sun = new Sun();
    var player = earth;

    // x = gameLevel
    var isClear = function () {
      if (
        planets.length +
          meteors.length +
          blacks.length +
          reds.length +
          n_planet +
          n_meteor +
          n_black +
          n_red ===
        0
      ) {
        return true;
      }
      return false;
    };

    var calculateNumBots = function () {
      n_planet = 3 + gameLevel;
      n_meteor = floor(gameLevel / 2);
      n_black = floor(gameLevel / 5);
      n_red = floor(gameLevel / 8);
    };

    var randomLocation = function () {
      // top, bottom, left, right
      var locate = floor(random(4));
      if (locate === 0) {
        return [random(-900, 900), -900];
      }
      if (locate === 1) {
        return [random(-900, 900), 900];
      }
      if (locate === 2) {
        return [0, random(-900, 900)];
      }
      return [900, random(-900, 900)];
    };

    var spawnBots = function () {
      var loc = randomLocation();
      if (frameCount === 0) {
        return;
      }
      if (frameCount % 100 === 0 && planets.length < 5 && n_planet > 0) {
        planets.push(new Planet(loc[0], loc[1]));
        n_planet--;
      }

      if (frameCount % 200 === 0 && meteors.length < 5 && n_meteor > 0) {
        meteors.push(new Meteor(loc[0], loc[1]));
        n_meteor--;
      }

      if (frameCount % 1000 === 0 && reds.length < 3 && n_red > 0) {
        reds.push(new RedEye(loc[0], loc[1]));
        n_red--;
      }

      if (frameCount % 1500 === 0 && blacks.length < 3 && n_black > 0) {
        blacks.push(new BlackEye(loc[0], loc[1]));
        n_black--;
      }
    };

    var updateArray = function (A, loc) {
      A.splice(loc, 1);
    };

    var updateBots = function (player) {
      spawnBots();
      for (var i = 0; i < planets.length; i++) {
        var force = planets[i].calculateAttraction(player);
        planets[i].applyForce(force);
        if (planets[i].beHitted(player)) {
          updateArray(planets, i);
          money++;
          score++;
          break;
        }
        if (planets[i].hit(player)) {
          if (player.health > 0) {
            player.health--;
          }
          if (player.health <= 0) {
            scene = "lost";
          }
        }
        planets[i].update();
        planets[i].display();
      }

      for (var i = 0; i < meteors.length; i++) {
        if (meteors[i].beHitted(player)) {
          updateArray(meteors, i);
          money++;
          score++;
          break;
        }
        if (meteors[i].hit(player)) {
          if (player.health > 0) {
            player.health--;
          }
          if (player.health <= 0) {
            scene = "lost";
          }
        }
        meteors[i].update();
        meteors[i].display();
      }

      for (var i = 0; i < reds.length; i++) {
        if (reds[i].beHitted(player)) {
          updateArray(reds, i);
          money += 3;
          score += 3;
          break;
        }
        if (reds[i].hit(player)) {
          if (player.health > 0) {
            player.health--;
          }
          if (player.health <= 0) {
            scene = "lost";
          }
        }
        reds[i].openEye(player);
        reds[i].update(player);
        reds[i].display();
      }

      for (var i = 0; i < blacks.length; i++) {
        if (blacks[i].beHitted(player)) {
          updateArray(blacks, i);
          money += 3;
          score += 3;
          break;
        }
        if (blacks[i].hit(player)) {
          if (player.health > 0) {
            player.health--;
          }
          if (player.health <= 0) {
            scene = "lost";
          }
        }
        blacks[i].openEye(player);
        blacks[i].update(player);
        blacks[i].display();
      }
    };

    var clearBots = function () {
      n_planet = 0;
      n_meteor = 0;
      n_black = 0;
      n_red = 0;
      planets = [];
      meteors = [];
      blacks = [];
      reds = [];
    };

    var keyPressed = function () {
      //println(keyCode);
      keys[keyCode] = true;
    };

    keyReleased = function () {
      keys[keyCode] = false;
    };

    // background
    {
      var starX = [];
      var starY = [];
      var star2X = [];
      var star2Y = [];
      var blackHoleX = random(800);
      var blackHoleY = random(800);
      var bigStarX = random(800);
      var bigStarY = random(800);
      var blueStarX = random(800);
      var blueStarY = random(800);

      for (var i = 0; i < 100; i++) {
        starX.push(random(800));
        starY.push(random(800));
      }

      for (var i = 0; i < 100; i++) {
        star2X.push(random(800));
        star2Y.push(random(800));
      }

      var star = function () {
        for (var i = 0; i < 100; i++) {
          noStroke();
          fill(255, 255, 255);
          ellipse(starX[i], starY[i], 5, 5);
        }
      };

      var star2 = function () {
        for (var i = 0; i < 10; i++) {
          noStroke();
          fill(255, 255, 255);
          fill(255, 255, 255);
          ellipse(star2X[i], star2Y[i], 5, 5);
          ellipse(star2X[i], star2Y[i], 15, 2);
        }
      };

      var blackHole = function (x, y) {
        noStroke();
        fill(20, 0, 48, 50);
        ellipse(blackHoleX, blackHoleY, 200, 200);
        fill(34, 0, 82, 50);
        ellipse(blackHoleX, blackHoleY, 150, 150);
        fill(45, 2, 110, 50);
        ellipse(blackHoleX, blackHoleY, 100, 100);
        fill(63, 0, 171, 50);
        ellipse(blackHoleX, blackHoleY, 50, 50);
      };

      var bigStar = function () {
        for (var i = 0; i < 5; i++) {
          noStroke();
          fill(14, 5, 54, 50);
          ellipse(bigStarX, bigStarY, 300, 300);
          fill(18, 3, 82, 50);
          ellipse(bigStarX, bigStarY, 200, 200);
          fill(29, 7, 125, 50);
          ellipse(bigStarX, bigStarY, 100, 100);
          fill(34, 3, 173, 50);
          ellipse(bigStarX, bigStarY, 40, 40);
        }
      };

      var blueStar = function () {
        noStroke();
        fill(0, 4, 54, 50);
        ellipse(blueStarX, blueStarY, 100, 100);
        fill(6, 16, 122, 50);
        ellipse(blueStarX, blueStarY, 80, 80);
        fill(4, 20, 199, 50);
        ellipse(blueStarX, blueStarY, 60, 60);
        fill(27, 43, 212, 50);
        ellipse(blueStarX, blueStarY, 40, 40);
      };
    }

    var drawBackground = function () {
      background(0, 0, 0);
      blackHole();
      blueStar();
      bigStar();
      star();
      star2();
    };

    calculateNumBots();

    var menuScene = function () {
      drawBackground();
      noStroke();
      rectMode(CENTER);
      textAlign(CENTER, CENTER);
      textFont("monospace", 80);
      fill(255, 255, 255);
      text("INFINITY STELLA", 0, 50, 800, 200);

      // Play
      fill(255, 255, 255);
      rect(400, 350, 400, 100);
      fill(0, 0, 0);
      rect(400, 350, 380, 80);

      fill(255, 255, 255);
      textSize(40);
      text("Play", 200, 300, 400, 80);

      if (mouseX >= 200 && mouseX <= 600 && mouseY >= 300 && mouseY <= 400) {
        fill(21, 230, 24);
        rect(400, 350, 400, 100);
        fill(255, 255, 255);
        rect(400, 350, 380, 80);

        fill(0, 0, 0);
        textSize(40);
        text("Play", 200, 300, 400, 80);
      }

      // Shop
      fill(255, 255, 255);
      rect(400, 500, 400, 100);
      fill(0, 0, 0);
      rect(400, 500, 380, 80);

      fill(255, 255, 255);
      textSize(40);
      text("Introduction", 200, 450, 400, 80);

      if (mouseX >= 200 && mouseX <= 600 && mouseY >= 450 && mouseY <= 550) {
        fill(21, 230, 24);
        rect(400, 500, 400, 100);
        fill(255, 255, 255);
        rect(400, 500, 380, 80);

        fill(0, 0, 0);
        textSize(40);
        text("Introduction", 200, 450, 400, 80);
      }

      // Leaderboard
      fill(255, 255, 255);
      rect(400, 650, 400, 100);
      fill(0, 0, 0);
      rect(400, 650, 380, 80);

      fill(255, 255, 255);
      textSize(40);
      text("Leaderboard", 200, 600, 400, 80);

      if (mouseX >= 200 && mouseX <= 600 && mouseY >= 600 && mouseY <= 700) {
        fill(21, 230, 24);
        rect(400, 650, 400, 100);
        fill(255, 255, 255);
        rect(400, 650, 380, 80);

        fill(0, 0, 0);
        textSize(40);
        text("Leaderboard", 200, 600, 400, 80);
      }
    };

    var gameScene = function () {
      drawBackground();

      updateBots(player);

      player.display();
      player.act();

      fill(255, 255, 255);
      textFont("monospace", 30);
      textAlign(LEFT);
      text(money + "$", 50, 50, 300, 300);
      text("Level " + gameLevel, 300, 50, 300, 300);
      text("Score " + score, 600, 50, 300, 300);
      if (isClear()) {
        scene = "clear";
        gameLevel++;
        if (gameLevel > maxLevel) {
          maxLevel = gameLevel;
        }
      }
    };

    var introScene = function () {
      drawBackground();
      drawBackground();
      noStroke();
      rectMode(CENTER);
      textAlign(CENTER, CENTER);
      textFont("monospace", 50);
      fill(255, 255, 255);
      text("Use arrows to move", 0, 100, 800, 100);
      text("Press Z to attack", 0, 200, 800, 100);
      text("Press X to defend", 0, 300, 800, 100);
      text("Avoid enemies to survive", 0, 400, 800, 100);

      fill(255, 255, 255);
      rect(400, 650, 400, 100);
      fill(0, 0, 0);
      rect(400, 650, 380, 80);
      fill(255, 255, 255);
      text("Play", 200, 600, 400, 80);

      if (mouseX >= 200 && mouseX <= 600 && mouseY >= 600 && mouseY <= 700) {
        fill(21, 230, 24);
        rect(400, 650, 400, 100);
        fill(255, 255, 255);
        rect(400, 650, 380, 80);
        fill(0, 0, 0);
        text("Play", 200, 600, 400, 80);
      }
    };

    var clearScene = function () {
      fill(255, 255, 255);
      textFont("monospace", 60);
      textAlign(CENTER, CENTER);
      text("Game Clear!", 200, 100, 400, 200);

      rectMode(CENTER);
      fill(255, 255, 255);
      rect(400, 425, 400, 150);
      fill(0, 0, 0);
      rect(400, 425, 380, 130);
      fill(255, 255, 255);
      text("Next Level", 200, 335, 400, 150);

      fill(255, 255, 255);
      rect(400, 625, 400, 150);
      fill(0, 0, 0);
      rect(400, 625, 380, 130);
      fill(255, 255, 255);
      text("Shop", 200, 535, 400, 150);

      if (mouseX >= 200 && mouseX <= 600 && mouseY >= 350 && mouseY <= 500) {
        fill(0, 0, 0);
        rect(400, 425, 400, 150);
        fill(255, 255, 255);
        rect(400, 425, 380, 130);
        fill(0, 0, 0);
        text("Next Level", 200, 335, 400, 150);
      }

      if (mouseX >= 200 && mouseX <= 600 && mouseY >= 550 && mouseY <= 700) {
        fill(0, 0, 0);
        rect(400, 625, 400, 150);
        fill(255, 255, 255);
        rect(400, 625, 380, 130);
        fill(0, 0, 0);
        text("Shop", 200, 535, 400, 150);
      }
    };

    var lostScene = function () {
      fill(255, 255, 255);
      textFont("monospace", 60);
      textAlign(CENTER, CENTER);
      text("You dead!", 200, 100, 400, 200);

      rectMode(CENTER);
      fill(255, 255, 255);
      rect(400, 425, 400, 150);
      fill(0, 0, 0);
      rect(400, 425, 380, 130);
      fill(255, 255, 255);
      text("Play again", 200, 335, 400, 150);

      fill(255, 255, 255);
      rect(400, 625, 400, 150);
      fill(0, 0, 0);
      rect(400, 625, 380, 130);
      fill(255, 255, 255);
      text("Shop", 200, 535, 400, 150);

      if (mouseX >= 200 && mouseX <= 600 && mouseY >= 350 && mouseY <= 500) {
        fill(0, 0, 0);
        rect(400, 425, 400, 150);
        fill(255, 255, 255);
        rect(400, 425, 380, 130);
        fill(0, 0, 0);
        text("Play again", 200, 335, 400, 150);
      }

      if (mouseX >= 200 && mouseX <= 600 && mouseY >= 550 && mouseY <= 700) {
        fill(0, 0, 0);
        rect(400, 625, 400, 150);
        fill(255, 255, 255);
        rect(400, 625, 380, 130);
        fill(0, 0, 0);
        text("Shop", 200, 535, 400, 150);
      }
    };

    var shopScene = function () {
      background(0, 0, 0);
      noStroke();
      star();
      rectMode(CENTER);
      textAlign(CENTER, CENTER);

      fill(255, 255, 255);
      rect(400, 50, 400, 100);
      fill(0, 0, 0);
      textFont("monospace", 50);
      text(money + "$", 200, 0, 400, 80);

      // Choice
      {
        if (choice === "earth") {
          fill(21, 230, 24);
          rect(200, 200, 320, 120);
        }
        if (choice === "mars") {
          fill(21, 230, 24);
          rect(600, 200, 320, 120);
        }
        if (choice === "jupiter") {
          fill(21, 230, 24);
          rect(200, 350, 320, 120);
        }
        if (choice === "saturn") {
          fill(21, 230, 24);
          rect(600, 350, 320, 120);
        }
        if (choice === "sun") {
          fill(21, 230, 24);
          rect(400, 500, 320, 120);
        }
      }

      // Earth
      {
        fill(255, 255, 255);
        rect(200, 200, 300, 100);

        fill(0, 0, 0);
        rect(100, 200, 80, 80);
        fill(9, 0, 255);
        ellipse(100, 200, 50, 50);
        fill(3, 92, 3);
        ellipse(110, 190, 20, 20);
        ellipse(102, 185, 30, 10);
        ellipse(92, 210, 30, 10);
        fill(255, 255, 255);
        ellipse(95, 195, 15, 5);
        ellipse(94, 198, 25, 5);
        ellipse(110, 210, 25, 5);
        ellipse(100, 212, 15, 5);

        fill(173, 173, 173);
        rect(300, 200, 80, 80);
        fill(0, 0, 0);
        textSize(15);
        text("UP\n" + earth.level + "$", 260, 160, 80, 80);

        text(
          "EARTH\nLVL " +
            earth.level +
            "\nHP " +
            earth.health.toFixed(1) +
            "\nDMG " +
            earth.damage.toFixed(1),
          150,
          160,
          90,
          80
        );

        if (mouseX >= 260 && mouseX <= 340 && mouseY >= 160 && mouseY <= 240) {
          fill(0, 79, 1);
          rect(300, 200, 80, 80);
          fill(255, 255, 255);
          textSize(15);
          text("UP\n" + earth.level + "$", 260, 160, 80, 80);
        }
      }

      // Mars
      {
        fill(255, 255, 255);
        rect(600, 200, 300, 100);

        fill(0, 0, 0);
        rect(500, 200, 80, 80);
        fill(207, 50, 39);
        ellipse(500, 200, 50, 50);
        rectMode(CENTER);
        fill(237, 168, 29);
        rect(490, 205, 30, 10, 20);
        rect(498, 213, 27, 8, 20);
        rect(506, 187, 27, 8, 20);

        fill(173, 173, 173);
        rect(700, 200, 80, 80);
        fill(0, 0, 0);
        textSize(15);
        if (mars.isLock) {
          text("UNLOCK\n10$", 660, 160, 80, 80);
        } else {
          text("UP\n" + 2 * mars.level + "$", 660, 160, 80, 80);
        }

        text(
          "MARS\nLVL " +
            mars.level +
            "\nHP " +
            mars.health.toFixed(1) +
            "\nDMG " +
            mars.damage.toFixed(1),
          550,
          160,
          90,
          80
        );

        if (mouseX >= 660 && mouseX <= 740 && mouseY >= 160 && mouseY <= 240) {
          fill(0, 79, 1);
          rect(700, 200, 80, 80);
          fill(255, 255, 255);
          textSize(15);
          if (mars.isLock) {
            text("UNLOCK\n10$", 660, 160, 80, 80);
          } else {
            text("UP\n" + 2 * mars.level + "$", 660, 160, 80, 80);
          }
        }
      }

      // Jupiter
      {
        fill(255, 255, 255);
        rect(200, 350, 300, 100);

        fill(0, 0, 0);
        rect(100, 350, 80, 80);
        fill(194, 166, 134);
        ellipse(100, 350, 50, 50);
        rectMode(CENTER);
        fill(184, 105, 14);
        rect(100, 350 - 15, 38, 5, 20);
        rect(100, 350, 48, 5, 20);
        rect(100, 350 + 15, 38, 5, 20);
        ellipse(110, 350 + 4, 10, 10);

        fill(173, 173, 173);
        rect(300, 350, 80, 80);
        fill(0, 0, 0);
        textSize(15);
        if (jupiter.isLock) {
          text("UNLOCK\n20$", 260, 310, 80, 80);
        } else {
          text("UP\n" + 3 * jupiter.level + "$", 260, 310, 80, 80);
        }
        text(
          "JUPITER\nLVL " +
            jupiter.level +
            "\nHP " +
            jupiter.health.toFixed(1) +
            "\nDMG " +
            jupiter.damage.toFixed(1),
          150,
          310,
          90,
          80
        );

        if (mouseX >= 260 && mouseX <= 340 && mouseY >= 310 && mouseY <= 390) {
          fill(0, 79, 1);
          rect(300, 350, 80, 80);
          fill(255, 255, 255);
          textSize(15);
          if (jupiter.isLock) {
            text("UNLOCK\n20$", 260, 310, 80, 80);
          } else {
            text("UP\n" + 3 * jupiter.level + "$", 260, 310, 80, 80);
          }
        }
      }

      // Saturn
      {
        fill(255, 255, 255);
        rect(600, 350, 300, 100);

        fill(0, 0, 0);
        rect(500, 350, 80, 80);
        fill(217, 199, 178);
        ellipse(500, 350, 50, 50);
        rectMode(CENTER);
        fill(163, 114, 65);
        rect(500, 350 - 15, 38, 2, 20);
        rect(500, 350 - 8, 48, 2, 20);
        rect(500, 350, 48, 2, 20);
        rect(500, 350 + 8, 48, 2, 20);
        rect(500, 350 + 15, 38, 2, 20);

        fill(173, 173, 173);
        rect(700, 350, 80, 80);
        fill(0, 0, 0);
        textSize(15);
        if (saturn.isLock) {
          text("UNLOCK\n40$", 660, 310, 80, 80);
        } else {
          text("UP\n" + 4 * saturn.level + "$", 660, 310, 80, 80);
        }
        text(
          "SARTURN\nLVL " +
            saturn.level +
            "\nHP " +
            saturn.health.toFixed(1) +
            "\nDMG " +
            saturn.damage.toFixed(1),
          550,
          310,
          90,
          80
        );

        if (mouseX >= 660 && mouseX <= 740 && mouseY >= 310 && mouseY <= 390) {
          fill(0, 79, 1);
          rect(700, 350, 80, 80);
          fill(255, 255, 255);
          textSize(15);
          if (saturn.isLock) {
            text("UNLOCK\n40$", 660, 310, 80, 80);
          } else {
            text("UP\n" + 4 * saturn.level + "$", 660, 310, 80, 80);
          }
        }
      }

      // Sun
      {
        fill(255, 255, 255);
        rect(400, 500, 300, 100);

        fill(0, 0, 0);
        rect(300, 500, 80, 80);
        fill(240, 24, 24);
        ellipse(300, 500, 50, 50);
        fill(250, 30, 30);
        ellipse(300, 500, 40, 40);
        fill(250, 124, 45);
        ellipse(300, 500, 30, 30);
        fill(255, 255, 0);
        ellipse(300, 500, 20, 20);

        fill(173, 173, 173);
        rect(500, 500, 80, 80);
        fill(0, 0, 0);
        textSize(15);
        if (sun.isLock) {
          text("UNLOCK\n80$", 460, 460, 80, 80);
        } else {
          text("UP\n" + 5 * sun.level + "$", 460, 460, 80, 80);
        }
        text(
          "SUN\nLVL " +
            sun.level +
            "\nHP " +
            sun.health.toFixed(1) +
            "\nDMG " +
            sun.damage.toFixed(1),
          350,
          460,
          90,
          80
        );

        if (mouseX >= 460 && mouseX <= 540 && mouseY >= 460 && mouseY <= 550) {
          fill(0, 79, 1);
          rect(500, 500, 80, 80);
          fill(255, 255, 255);
          textSize(15);
          if (sun.isLock) {
            text("UNLOCK\n80$", 460, 460, 80, 80);
          } else {
            text("UP\n" + 5 * sun.level + "$", 460, 460, 80, 80);
          }
        }
      }

      // Play Button
      {
        fill(255, 255, 255);
        rect(225, 675, 300, 100);
        fill(0, 0, 0);
        rect(225, 675, 280, 80);
        fill(255, 255, 255);
        textSize(40);
        text("Play", 75, 625, 300, 80);

        if (mouseX >= 75 && mouseX < 375 && mouseY >= 625 && mouseY <= 725) {
          fill(21, 230, 24);
          rect(225, 675, 300, 100);
          fill(255, 255, 255);
          rect(225, 675, 280, 80);
          fill(0, 0, 0);
          textSize(40);
          text("Play", 75, 625, 300, 80);
        }
      }

      // LeaderBoard Button
      {
        fill(255, 255, 255);
        rect(575, 675, 300, 100);
        fill(0, 0, 0);
        rect(575, 675, 280, 80);
        fill(255, 255, 255);
        textSize(40);
        text("LeaderBoard", 425, 625, 300, 80);

        if (mouseX >= 425 && mouseX <= 725 && mouseY >= 625 && mouseY <= 725) {
          fill(21, 230, 24);
          rect(575, 675, 300, 100);
          fill(255, 255, 255);
          rect(575, 675, 280, 80);
          fill(0, 0, 0);
          textSize(40);
          text("LeaderBoard", 425, 625, 300, 80);
        }
      }
    };

    var levelScene = function () {
      background(0, 0, 0);
      noStroke();
      star();
      rectMode(CENTER);
      textAlign(CENTER, CENTER);

      fill(255, 255, 255);
      textFont("monospace", 50);
      text("Level Select", 200, 50, 400, 80);

      // Level
      fill(255, 255, 255);
      rect(400, 400, 400, 400);
      fill(0, 0, 0);
      rect(400, 400, 360, 360);
      fill(255, 255, 255);
      textSize(100);
      text(gameLevel, 200, 200, 400, 360);

      if (mouseX >= 200 && mouseX <= 600 && mouseY >= 200 && mouseY <= 600) {
        fill(21, 230, 24);
        rect(400, 400, 400, 400);
        fill(255, 255, 255);
        rect(400, 400, 360, 360);
        fill(0, 0, 0);
        textSize(100);
        text(gameLevel, 200, 200, 400, 360);
      }

      // Sub
      fill(255, 255, 255);
      rect(100, 400, 100, 200);
      fill(0, 0, 0);
      rect(100, 400, 80, 180);
      fill(255, 255, 255);
      textSize(80);
      text("-", 50, 300, 100, 160);

      if (mouseX >= 50 && mouseX <= 150 && mouseY >= 300 && mouseY <= 500) {
        fill(255, 0, 0);
        rect(100, 400, 100, 200);
        fill(255, 255, 255);
        rect(100, 400, 80, 180);
        fill(0, 0, 0);
        textSize(80);
        text("-", 50, 300, 100, 160);
      }

      // Add
      fill(255, 255, 255);
      rect(700, 400, 100, 200);
      fill(0, 0, 0);
      rect(700, 400, 80, 180);
      fill(255, 255, 255);
      textSize(80);
      text("+", 650, 300, 100, 160);

      if (mouseX >= 650 && mouseX <= 750 && mouseY >= 300 && mouseY <= 500) {
        fill(0, 0, 255);
        rect(700, 400, 100, 200);
        fill(255, 255, 255);
        rect(700, 400, 80, 180);
        fill(0, 0, 0);
        textSize(80);
        text("+", 650, 300, 100, 160);
      }
    };

    var leaderScene = function () {
      background(0, 0, 0);
      noStroke();
      star();
      rectMode(CENTER);
      textAlign(CENTER, CENTER);

      textFont("monospace", 50);
      fill(255, 255, 255);
      text("Leaderboard", 200, 50, 400, 80);

      textSize(40);
      text("Name", 100, 150, 300, 100);
      text("Score", 500, 150, 200, 100);

      for (var i = 0; i < top5Name.length; i++) {
        text(top5Name[i], 100, 220 + 70 * i, 300, 100);
        text(top5Score[i], 500, 220 + 70 * i, 200, 100);
      }

      // Play
      fill(255, 255, 255);
      rect(225, 675, 250, 100);
      fill(0, 0, 0);
      rect(225, 675, 230, 80);
      fill(255, 255, 255);
      text("Play", 100, 625, 250, 80);

      if (mouseX >= 100 && mouseX <= 350 && mouseY >= 625 && mouseY <= 725) {
        fill(21, 230, 24);
        rect(225, 675, 250, 100);
        fill(255, 255, 255);
        rect(225, 675, 230, 80);
        fill(0, 0, 0);
        text("Play", 100, 625, 250, 80);
      }

      // Shop
      fill(255, 255, 255);
      rect(575, 675, 250, 100);
      fill(0, 0, 0);
      rect(575, 675, 230, 80);
      fill(255, 255, 255);
      text("Shop", 450, 625, 250, 80);

      if (mouseX >= 450 && mouseX <= 700 && mouseY >= 625 && mouseY <= 725) {
        fill(21, 230, 24);
        rect(575, 675, 250, 100);
        fill(255, 255, 255);
        rect(575, 675, 230, 80);
        fill(0, 0, 0);
        text("Shop", 450, 625, 250, 80);
      }
    };

    mouseClicked = function () {
      if (scene === "menu") {
        if (mouseX >= 200 && mouseX <= 600 && mouseY >= 300 && mouseY <= 400) {
          frameCount = 0;
          scene = "level";
        }
        if (mouseX >= 200 && mouseX <= 600 && mouseY >= 450 && mouseY <= 550) {
          frameCount = 0;
          scene = "intro";
        }
        if (mouseX >= 200 && mouseX <= 600 && mouseY >= 600 && mouseY <= 700) {
          frameCount = 0;
          scene = "leader";
        }
      }

      if (scene === "intro") {
        if (mouseX >= 200 && mouseX <= 600 && mouseY >= 600 && mouseY <= 700) {
          scene = "level";
        }
      }

      if (scene === "clear") {
        player.x = 400;
        player.y = 400;
        clearBots();
        player.health = player.maxHealth;
        if (mouseX >= 200 && mouseX <= 600 && mouseY >= 350 && mouseY <= 500) {
          calculateNumBots();
          frameCount = 0;
          scene = "game";
        }

        if (mouseX >= 200 && mouseX <= 600 && mouseY >= 550 && mouseY <= 700) {
          frameCount = 0;
          scene = "shop";
        }
      }

      if (scene === "leader") {
        if (
          mouseX >= 100 &&
          mouseX <= 350 &&
          mouseY >= 625 &&
          mouseY <= 725 &&
          frameCount >= 5
        ) {
          scene = "level";
        }

        if (
          mouseX >= 450 &&
          mouseX <= 700 &&
          mouseY >= 625 &&
          mouseY <= 725 &&
          frameCount >= 5
        ) {
          frameCount = 0;
          scene = "shop";
        }
      }

      if (scene === "lost") {
        player.x = 400;
        player.y = 400;
        clearBots();
        player.health = player.maxHealth;
        if (mouseX >= 200 && mouseX <= 600 && mouseY >= 350 && mouseY <= 500) {
          calculateNumBots();
          frameCount = 0;
          scene = "game";
        }

        if (mouseX >= 200 && mouseX <= 600 && mouseY >= 550 && mouseY <= 700) {
          frameCount = 0;
          scene = "shop";
        }
      }

      if (scene === "shop") {
        // Earth
        {
          if (mouseX >= 50 && mouseX <= 350 && mouseY >= 150 && mouseY <= 250) {
            choice = "earth";
            player = earth;
          }

          if (
            mouseX >= 260 &&
            mouseX <= 340 &&
            mouseY >= 160 &&
            mouseY <= 240 &&
            money >= earth.level
          ) {
            money -= earth.level;
            earth.upgrade();
          }
        }

        // Mars
        {
          if (
            mouseX >= 450 &&
            mouseX <= 750 &&
            mouseY >= 150 &&
            mouseY <= 250 &&
            !mars.isLock
          ) {
            choice = "mars";
            player = mars;
          }

          if (
            mouseX >= 660 &&
            mouseX <= 740 &&
            mouseY >= 160 &&
            mouseY <= 240
          ) {
            if (mars.isLock && money >= 10) {
              mars.isLock = false;
              money -= 10;
            } else if (!mars.isLock && money >= 2 * mars.level) {
              money -= 2 * mars.level;
              mars.upgrade();
            }
          }
        }

        //Jupiter
        {
          if (
            mouseX >= 50 &&
            mouseX <= 350 &&
            mouseY >= 300 &&
            mouseY <= 400 &&
            !jupiter.isLock
          ) {
            choice = "jupiter";
            player = jupiter;
          }

          if (
            mouseX >= 260 &&
            mouseX <= 340 &&
            mouseY >= 310 &&
            mouseY <= 390
          ) {
            if (jupiter.isLock && money >= 20) {
              jupiter.isLock = false;
              money -= 20;
            } else if (!jupiter.isLock && money >= 3 * jupiter.level) {
              money -= 3 * jupiter.level;
              jupiter.upgrade();
            }
          }
        }

        // Saturn
        {
          if (
            mouseX >= 450 &&
            mouseX <= 750 &&
            mouseY >= 300 &&
            mouseY <= 400 &&
            !saturn.isLock
          ) {
            choice = "saturn";
            player = saturn;
          }

          if (
            mouseX >= 660 &&
            mouseX <= 740 &&
            mouseY >= 310 &&
            mouseY <= 390
          ) {
            if (saturn.isLock && money >= 40) {
              saturn.isLock = false;
              money -= 40;
            } else if (!saturn.isLock && money >= 4 * saturn.level) {
              money -= 4 * saturn.level;
              saturn.upgrade();
            }
          }
        }

        // Sun
        {
          if (
            mouseX >= 250 &&
            mouseX <= 550 &&
            mouseY >= 450 &&
            mouseY <= 550 &&
            !sun.isLock
          ) {
            choice = "sun";
            player = sun;
          }

          if (
            mouseX >= 460 &&
            mouseX <= 540 &&
            mouseY >= 460 &&
            mouseY <= 540
          ) {
            if (sun.isLock && money >= 80) {
              sun.isLock = false;
              money -= 80;
            } else if (!sun.isLock && money >= 5 * sun.level) {
              money -= 5 * sun.level;
              sun.upgrade();
            }
          }
        }

        // Play button
        if (
          mouseX >= 75 &&
          mouseX < 375 &&
          mouseY >= 625 &&
          (mouseY <= 725) & (frameCount >= 5)
        ) {
          scene = "level";
        }

        // Leaderboard button
        if (
          mouseX >= 425 &&
          mouseX <= 725 &&
          mouseY >= 625 &&
          mouseY <= 725 &&
          frameCount >= 5
        ) {
          scene = "leader";
        }
      }

      if (scene === "level") {
        if (
          mouseX >= 50 &&
          mouseX <= 150 &&
          mouseY >= 300 &&
          mouseY <= 500 &&
          gameLevel > 1
        ) {
          gameLevel--;
        }
        if (
          mouseX >= 650 &&
          mouseX <= 750 &&
          mouseY >= 300 &&
          mouseY <= 500 &&
          gameLevel < maxLevel
        ) {
          gameLevel++;
        }

        if (
          mouseX >= 200 &&
          mouseX <= 600 &&
          mouseY >= 200 &&
          mouseY <= 600 &&
          frameCount >= 5
        ) {
          player.x = 400;
          player.y = 400;
          clearBots();
          player.health = player.maxHealth;
          calculateNumBots();
          frameCount = 0;
          scene = "game";
        }
      }
    };

    scene = "menu";
    draw = function () {
      if (scene === "menu") {
        menuScene();
      }
      if (scene === "intro") {
        introScene();
      }
      if (scene === "game") {
        gameScene();
      }
      if (scene === "lost") {
        lostScene();
      }
      if (scene === "shop") {
        shopScene();
      }
      if (scene === "level") {
        levelScene();
      }
      if (scene === "clear") {
        clearScene();
      }
      if (scene === "leader") {
        leaderScene();
      }
    };

    /////////////////////////////////////////
  }
};

var canvas = document.getElementById("mycanvas");

var processingInstance = new Processing(canvas, sketchProc);
