const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  backgroundColor: '#222',
  physics: {
    default: 'arcade',
    arcade: { debug: true }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};


// let → Can reassign the reference

// const → Reference can’t be reassigned


let player;
let pointer;
let gameOverText;

const game = new Phaser.Game(config);


function preload(){
  this.load.image('player', 'assets/WhiteCircle.png');
  this.load.image('food', 'assets/WhiteCircle.png')
  this.load.image('obstacle', 'assets/SpikyCircle.png')
}

function create() {
  //Add player in the middle of screen
  player = this.physics.add.image(640, 360, 'player');

  //Change size of the image
  player.setScale(0.1);
  player.setCircle(player.width / 2);


  //Voeg groep toe voor collectables
  this.collectables = this.physics.add.group();

  //Voeg groep toe voor obstakels
  this.obstacles = this.physics.add.group();


  //Spawn food collectables
  this.time.addEvent({
    delay: 2000,
    callback: () => spawnCollectable(this),
    loop: true
  });

  //Spawn obstacles (nu 4)
  for (let i = 0; i < 4; i++) {
    spawnObstacle(this);
  }

  //Overlap met consumables
  this.physics.add.overlap(player, this.collectables, (player, collectable) => {
    //Verwijder food item
    collectable.destroy();

    //Vergroot de speler een klein beetje op iedere consume
    player.setScale(player.scale + 0.005);
  });


  //Overlap met obstakels
  this.physics.add.overlap(player, this.obstacles, () => {
    gameOver(this);
  });


  //Save reference to the mouse
  pointer = this.input.activePointer;
}

function update() {
  //Als gameo over actief is, vermijd beweging.
  if (gameOverText) {
    return;
  }

  const speed = 5;

  const differencex = pointer.x - player.x;
  const differencey = pointer.y - player.y;

  //Calculate square root
  const distance = Math.sqrt(differencex * differencex + differencey * differencey);

  if (distance > 1) {
    player.x += differencex * 0.1 * speed * (1 / distance);
    player.y += differencey * 0.1 * speed * (1 / distance);
  }
}

function spawnCollectable(scene) {
  const randomx = Phaser.Math.Between(0, scene.sys.game.config.width);
  const randomy = Phaser.Math.Between(0, scene.sys.game.config.height);

  const food = scene.collectables.create(randomx, randomy, 'food');
  food.setScale(0.05); //Verklein de collectables erg vanwege de asset die zo groot is en de player hun size. 
  food.setCircle(food.width / 2);
  food.setTint(Phaser.Display.Color.RandomRGB(100, 255).color); //Geef food collectables een random kleur
}

function spawnObstacle(scene) {
  const safeZoneRadius = 250; //Straal ron speler waar geen obstakels mogen spawnen
  const minDistanceBetweenObstacles = 200; //Minimale afstand tussen obstakels

  //Set wat de center is voor beide assen
  const centerX = scene.sys.game.config.width / 2;
  const centerY = scene.sys.game.config.height / 2;

  let randomx, randomy, validPosition = false;

  //Probeer tot we een geldige positie vinden (max 50 pogingen om vastlopen te voorkomen)
  for (let attempts = 0; attempts < 50 && !validPosition; attempts++) {
    randomx = Phaser.Math.Between(50, scene.sys.game.config.width - 50);
    randomy = Phaser.Math.Between(50, scene.sys.game.config.height - 50);

    const distanceToCenter = Phaser.Math.Distance.Between(randomx, randomy, centerX, centerY);
    if (distanceToCenter < safeZoneRadius) continue; // te dicht bij speler

    //Check of het niet te dicht bij een bestaand obstakel is
    let tooClose = false;
    scene.obstacles.getChildren().forEach(obstacle => {
      const obstacleDistance = Phaser.Math.Distance.Between(randomx, randomy, obstacle.x, obstacle.y);
      if (obstacleDistance < minDistanceBetweenObstacles) tooClose = true;
    });

    if (!tooClose) validPosition = true;
  }

  if (validPosition){
    const obstacle = scene.obstacles.create(randomx, randomy, 'obstacle');
    obstacle.setScale(0.3);
    obstacle.setCircle(260, 20, 20);
    obstacle.setImmovable(true);
  }
}

function gameOver(scene) {
  //Stop physics
  scene.physics.pause();

  //Tint speler rood
  player.setTint(0xff0000);

  //Voeg Game Over tekst toe
  gameOverText = scene.add.text(scene.sys.game.config.width / 2, scene.sys.game.config.height / 2, 'GAME OVER', {
    fontSize: '64px',
    fill: '#ff0000'
  }).setOrigin(0.5);

  //Herstart na 3 seconden
  scene.time.delayedCall(3000, () => {
    scene.scene.restart();
    gameOverText = null;
  });
}