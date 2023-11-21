import Phaser from 'phaser';
import bgScene from '../../assets/background_scene.png';
import backgroundImg from '../../img/background_clouds.png';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  
  preload() {
    this.load.image('map', bgScene);
    this.load.image('background', backgroundImg);
  }

    create() {
      const bgImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
  const scaleX = this.scale.width / bgImage.width;
  const scaleY = this.scale.height / bgImage.height;
  const scale = Math.max(scaleX, scaleY);
  bgImage.setScale(scale);

  // Ajoutez l'image de la carte à une partie de la page
  const map = this.add.image(0, 0, 'map').setOrigin(-0.45, 0);
  map.setScale(0.39);

  // Définissez la couleur de fond de la caméra
  this.cameras.main.setBackgroundColor('#ffffff');
    
  }

  // eslint-disable-next-line class-methods-use-this
  update() {
  }
}

export default GameScene;
