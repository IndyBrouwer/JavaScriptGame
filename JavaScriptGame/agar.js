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

const game = new Phaser.Game(config);


function preload(){
    this.load.image('player', 'assets/WhiteCircle.png');
}

function create() {
  //Add player in the middle of screen
  player = this.add.image(640, 360, 'player');

  //Change size of the image
  player.setScale(0.1);

  //Save reference to the mouse
  pointer = this.input.activePointer;
}

function update() {
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
  food.setScale(0.05); // kleiner dan speler
  food.setTint(Phaser.Display.Color.RandomRGB(100, 255).color); //Geef food collectables een random kleur
}