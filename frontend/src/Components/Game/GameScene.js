import Phaser from 'phaser';
import bgScene from '../../assets/background_scene.png';
import backgroundImg from '../../img/background_clouds.png';
import idleSprite from '../../assets/idle.png';
import walkLeftSprite from '../../assets/walk_left.png';
import walkRightSprite from '../../assets/walk_right.png';



const IDLE_KEY = 'idle';
const MOVE_RIGHT_KEY = 'walkRight';
const MOVE_LEFT_KEY = 'walkLeft';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  
  preload() {
    this.load.image('map', bgScene);
    this.load.image('background', backgroundImg);
    this.load.spritesheet(IDLE_KEY, idleSprite, {
      frameWidth: 100,
      frameHeight: 16,
      // put randomly gotta fix this
    });
    this.load.spritesheet(MOVE_RIGHT_KEY, walkRightSprite, {
      frameWidth: 100,
      frameHeight: 16,
      // put randomly gotta fix this
    });
    this.load.spritesheet(MOVE_LEFT_KEY, walkLeftSprite, {
      frameWidth: 100,
      frameHeight: 16,
      // put randomly gotta fix this
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

    
    
   
  
    
  }

  // eslint-disable-next-line class-methods-use-this
  update() {
  }
}

export default GameScene;
