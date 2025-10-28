const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  backgroundColor: '#222',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
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
  this.load.image('food', 'assets/WhiteCircle.png');
  this.load.image('obstacle', 'assets/SpikyCircle.png');
  this.load.image('background', 'assets/Background.jpg');

  this.load.audio('consume', 'assets/sounds/FoodConsume.wav');
  this.load.audio('hit', 'assets/sounds/PlayerHit.wav');
  this.load.audio('music', 'assets/sounds/SewerCity.wav');
}

function create() {
  this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background')
      .setOrigin(0);

  this.background.setTint(0x555555);

  //Add sounds
  this.consumeSound = this.sound.add('consume', { volume: 1 });
  this.hitSound = this.sound.add('hit', { volume: 1 });
  this.loopMusic = this.sound.add('music', { volume: 0.5, loop: true })

  //Start looping background music
  this.loopMusic.play();
  
  //Add player in the middle of screen
  player = this.physics.add.image(640, 360, 'player');

  //Change size of the image
  player.setScale(0.1);
  player.setCircle(player.width / 2);


  //Add group for collectables
  this.collectables = this.physics.add.group();

  //Add group for obstacles
  this.obstacles = this.physics.add.group();


  //Spawn food collectables
  this.time.addEvent({
    delay: 2000,
    callback: () => spawnCollectable(this),
    loop: true
  });

  //Spawn obstacles (4 as of now)
  for (let i = 0; i < 4; i++) {
    spawnObstacle(this);
  }

  //Overlap with consumables
  this.physics.add.overlap(player, this.collectables, (player, collectable) => {
    //Remove food item
    collectable.destroy();

    //Play eat sound
    this.consumeSound.play();

    //Increase player slightly on every consume
    player.setScale(player.scale + 0.005);
  });


  //Overlap with obstacles
  this.physics.add.overlap(player, this.obstacles, () => {
    gameOver(this);
  });


  //Save reference to the mouse
  pointer = this.input.activePointer;
}

function update() {
  //If game over is active, avoid movement
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
  if (gameOverText){
    return;
  }

  const randomx = Phaser.Math.Between(0, scene.sys.game.config.width);
  const randomy = Phaser.Math.Between(0, scene.sys.game.config.height);

  const food = scene.collectables.create(randomx, randomy, 'food');

  //Downscale the foods by a lot as the image is very big and the default player is also downscaled by a lot.
  food.setScale(0.05);
  food.setCircle(food.width / 2);

  //Give food image a random color
  food.setTint(Phaser.Display.Color.RandomRGB(100, 255).color);
}

function spawnObstacle(scene) {
  const safeZoneRadius = 250; //Amount of space around player where obstacles cant spawn
  const minDistanceBetweenObstacles = 200; //Minimum space between obstacles when spawning

  //Set and save centers
  const centerX = scene.sys.game.config.width / 2;
  const centerY = scene.sys.game.config.height / 2;

  let randomx, randomy, validPosition = false;

  //Try to get a valid pos (max 50 tries to prevent freezing)
  for (let attempts = 0; attempts < 50 && !validPosition; attempts++) {
    randomx = Phaser.Math.Between(50, scene.sys.game.config.width - 50);
    randomy = Phaser.Math.Between(50, scene.sys.game.config.height - 50);

    const distanceToCenter = Phaser.Math.Distance.Between(randomx, randomy, centerX, centerY);
    if (distanceToCenter < safeZoneRadius) continue; // te dicht bij speler

    //Check if the obstacle isn't too close to another obstacle
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
  //Play hit sound
  scene.hitSound.play();

  //Stop physics
  scene.physics.pause();

  //Change player color to red
  player.setTint(0xff0000);

  //Add game over text
  gameOverText = scene.add.text(scene.sys.game.config.width / 2, scene.sys.game.config.height / 2, 'GAME OVER', {
    fontSize: '64px',
    fill: '#ff0000'
  }).setOrigin(0.5);

  //Restart after 3 seconds
  scene.time.delayedCall(3000, () => {
    scene.scene.restart();
    gameOverText = null;
  });
}