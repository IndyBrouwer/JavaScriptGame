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

let player;
let pointer;
let gameOverText;
let timeText;

let amountEaten = 0;
let highestMass;
let timeAlive = 0;
let lastUpdate = Date.now();

const game = new Phaser.Game(config);

function preload(){
  this.load.image('player', 'assets/WhiteCircle.png');
  this.load.image('food', 'assets/WhiteCircle.png');
  this.load.image('obstacle', 'assets/SpikyCircle.png');
  this.load.image('background', 'assets/Background.jpg');

  this.load.audio('consume', 'assets/sounds/FoodConsume.wav');
  this.load.audio('hit', 'assets/sounds/PlayerHit.wav');
  this.load.audio('music', 'assets/sounds/SewerCity.wav');

  timeAlive = 0;
  amountEaten = 0;
  highestMass = 0;
}

function create() {
  this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background')
      .setOrigin(0);
  this.background.setTint(0x555555);

  //Add sounds
  this.consumeSound = this.sound.add('consume', { volume: 1 });
  this.hitSound = this.sound.add('hit', { volume: 1 });
  this.loopMusic = this.sound.add('music', { volume: 0.5, loop: true });
  this.loopMusic.play();
  
  //Add player
  player = this.physics.add.image(640, 360, 'player');
  player.setScale(0.1);
  player.setCircle(player.width / 2);

  //Groups
  this.collectables = this.physics.add.group();
  this.obstacles = this.physics.add.group();

  //Spawn food
  this.time.addEvent({
    delay: 2000,
    callback: () => spawnCollectable(this),
    loop: true
  });

  //Spawn obstacles
  for (let i = 0; i < 4; i++) {
    spawnObstacle(this);
  }

  //Collisions
  this.physics.add.overlap(player, this.collectables, (player, collectable) => {
    collectable.destroy();
    amountEaten++;
    this.consumeSound.play();
    player.setScale(player.scale + 0.005);
  });

  this.physics.add.overlap(player, this.obstacles, () => {
    gameOver(this);
  });

  pointer = this.input.activePointer;

  timeText = this.add.text(this.scale.width / 2, 20, "Time alive: 0", {
    fontSize: "32px",
    fill: "#ffffff"
  }).setOrigin(0.5, 0);
}

function update() {
  if (gameOverText) return;

  const now = Date.now();
  const deltaTime = (now - lastUpdate) / 1000;
  lastUpdate = now;
  timeAlive += deltaTime;
  timeText.setText(`Time alive: ${Math.floor(timeAlive)}`);

  const speed = 5;
  const dx = pointer.x - player.x;
  const dy = pointer.y - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    player.x += dx * 0.1 * speed * (1 / distance);
    player.y += dy * 0.1 * speed * (1 / distance);
  }
}

function spawnCollectable(scene) {
  if (gameOverText) return;

  const randomx = Phaser.Math.Between(0, scene.sys.game.config.width);
  const randomy = Phaser.Math.Between(0, scene.sys.game.config.height);
  const food = scene.collectables.create(randomx, randomy, 'food');

  food.setScale(0.05);
  food.setCircle(food.width / 2);
  food.setTint(Phaser.Display.Color.RandomRGB(100, 255).color);
}

function spawnObstacle(scene) {
  const safeZoneRadius = 250;
  const minDistanceBetweenObstacles = 200;

  const centerX = scene.sys.game.config.width / 2;
  const centerY = scene.sys.game.config.height / 2;
  let randomx, randomy, validPosition = false;

  for (let attempts = 0; attempts < 50 && !validPosition; attempts++) {
    randomx = Phaser.Math.Between(50, scene.sys.game.config.width - 50);
    randomy = Phaser.Math.Between(50, scene.sys.game.config.height - 50);

    const distanceToCenter = Phaser.Math.Distance.Between(randomx, randomy, centerX, centerY);
    if (distanceToCenter < safeZoneRadius) continue;

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
  scene.hitSound.play();
  highestMass = player.scale;
  scene.physics.pause();
  player.setTint(0xff0000);

  gameOverText = scene.add.text(scene.sys.game.config.width / 2, scene.sys.game.config.height / 2, 'GAME OVER', {
    fontSize: '64px',
    fill: '#ff0000'
  }).setOrigin(0.5);

  // 🟢 Highscore opslaan
  const scoresData = loadHighScores();

  scoresData.HighScores.push({
    PlayerRank: 0,
    PlayerName: "Player",
    HighestMass: Number(highestMass.toFixed(3)),
    FoodEaten: amountEaten,
    TimeSurvived: timeAlive.toFixed(2)
  });

  scoresData.HighScores.sort((a, b) => b.HighestMass - a.HighestMass);
  scoresData.HighScores = scoresData.HighScores.map((s, i) => ({
    ...s,
    PlayerRank: i + 1
  }));
  scoresData.HighScores = scoresData.HighScores.slice(0, 10);
  saveHighScores(scoresData);

  console.log("Highscores opgeslagen:", scoresData);

  // Toon top 5 highscores op scherm
  const highscoreText = scene.add.text(scene.scale.width / 2, scene.scale.height / 2 + 100, 
    formatHighScores(scoresData), {
    fontSize: '24px',
    fill: '#ffffff',
    align: 'center'
  }).setOrigin(0.5);

  scene.time.delayedCall(3000, () => {
    scene.scene.restart();
    gameOverText = null;
    highscoreText.destroy();
  });
}

// ---------------- JSON / LocalStorage functies ----------------

function loadHighScores() {
  const saved = localStorage.getItem('HighScores');
  if (saved) {
    return JSON.parse(saved);
  }
  return { HighScores: [] };
}

function saveHighScores(data) {
  localStorage.setItem('HighScores', JSON.stringify(data, null, 2));
}

function formatHighScores(data) {
  let text = "🏆 Top 5 Highscores 🏆\n\n";
  data.HighScores.slice(0, 5).forEach(score => {
    text += `${score.PlayerRank}. ${score.PlayerName} — Size: ${score.HighestMass}, Time: ${score.TimeSurvived}s\n`;
  });
  return text;
}