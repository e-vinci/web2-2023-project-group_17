import Phaser from 'phaser';
import bgScene from '../../assets/background_scene.png';
import backgroundImg from '../../img/background_clouds.png';
import idleSprite from '../../assets/idle.png';
import walkLeftSprite from '../../assets/walk_left.png';
import walkRightSprite from '../../assets/walk_right.png';
import obstacleImg from '../../assets/obstacles.png';




const IDLE_KEY = 'idle';
const MOVE_RIGHT_KEY = 'walkRight';
const MOVE_LEFT_KEY = 'walkLeft';
const OBSTACLE_KEY = 'obstacle';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.obstacles = undefined;
  }

  
  preload() {
    this.load.image('map', bgScene);
    
    this.load.image('background', backgroundImg);
    this.load.image(OBSTACLE_KEY, obstacleImg);
    this.load.spritesheet(IDLE_KEY, idleSprite, {
      frameWidth: 24,
      frameHeight: 22,
    });
    this.load.spritesheet(MOVE_RIGHT_KEY, walkRightSprite, {
      frameWidth: 24,
      frameHeight: 23,
    });
    this.load.spritesheet(MOVE_LEFT_KEY, walkLeftSprite, {
      frameWidth: 24,
      frameHeight: 21.5,
    });
  }

    create() {
      const bgImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
    const scaleX = this.scale.width / bgImage.width;
    const scaleY = this.scale.height / bgImage.height;
    const scale = Math.max(scaleX, scaleY);
    bgImage.setScale(scale);


    const map = this.add.image(0, 0, 'map').setOrigin(-0.45, 0);
    map.setScale(0.39);


      this.obstacles = this.physics.add.image(0, 0, OBSTACLE_KEY).setAlpha(0).setOrigin(-0.45, 0);
    // this.obstacles = this.physics.add.sprite(0, 0, OBSTACLE_KEY).setOrigin(-0.45, 0);
    this.obstacles.setScale(0.39);
    this.obstacles.body.setAllowGravity(false);
    this.physics.world.enable(this.obstacles);
    this.obstacles.body.setImmovable(true);
    


    this.player = this.createPlayer();
    this.cursors = this.input.keyboard.createCursorKeys();
    // this.physics.add.collider(this.player, this.obstacles, this.handleCollision, null, this)
      
  }

 
  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
     
      this.player.anims.play('right', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play('right', true);
    } 
    else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('right', true);
    } 
    else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play('idleAnim', true);
    }
    console.log(this.physics.overlap(this.player, this.obstacles));

    
   /* if (this.physics.overlap(this.player, this.obstacles)) {
      this.player.setVelocity(0);
     console.log('Collision with obstacle!');
    } */
  }

createPlayer(){
  const player = this.physics.add.sprite(750, 450, IDLE_KEY);
  player.setScale(3.2);
  player.setCollideWorldBounds(true);
  player.body.setAllowGravity(false);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers(MOVE_LEFT_KEY, { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });


  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers(MOVE_RIGHT_KEY, { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'idleAnim',
    frames: this.anims.generateFrameNumbers(IDLE_KEY, { start: 0, end: 1}),
    frameRate: 3,
    repeat: -1,
  });

  return player;
}
  

}

export default GameScene;
