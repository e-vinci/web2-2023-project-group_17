import Phaser from 'phaser';
import bgScene from '../../assets/background_scene.png';
import backgroundImg from '../../img/background_clouds.png';
import idleSprite from '../../assets/idle.png';
import walkLeftSprite from '../../assets/walk_left.png';
import walkRightSprite from '../../assets/walk_right.png';
import Navigate from '../Router/Navigate';
import accueilButton from '../../img/accueil_button.png';
import hoveredAccueil from '../../img/hovered_accueil.png';
import catSittingBrown from '../../assets/brown_v2.png';
import bunnyIdle from '../../assets/bunny.png';
import catSittingBlackv2 from '../../assets/black_sitting_v2.png';
import { getAutenticatedUser, setAutenticatedUser, logout } from '../../utils/auths';
import hoveredMenu from '../../img/hoveredMenuIcon.png';
import menuButton from '../../img/menuIcon.png';
import pnj1 from '../../assets/Girl-Sheet.png';
import music from '../../assets/bgMusic.mp3';
import moneySound from '../../assets/sounds/moneySound.mp3.mp3';


document.title='Neko café'



const user = getAutenticatedUser();
const IDLE_KEY = 'idle';
const MOVE_RIGHT_KEY = 'walkRight';
const MOVE_LEFT_KEY = 'walkLeft';
const SITTING_BLACK_CAT = 'blackSitting';
const SITTING_BROWN_CAT = 'brownSitting';
const BUNNY_IDLE = 'bunnyIdle';
const PNJ1_ANIM = 'pnj1Anim';


class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.cat1 = undefined;
    this.cat2 = undefined;
    this.score = user?.score !== undefined ? user.score : 0;
    this.money = user?.money !== undefined ? user.money : 0;
    this.bunny = undefined;
    this.moneyText = undefined;
    this.scoreText = undefined;
    this.client1=undefined;
    this.client2 = undefined;
    this.client3 = undefined;
  }


  preload() {
    this.load.image('map', bgScene);
    this.load.audio('bgMusic', music);

    this.load.image('background', backgroundImg);
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
    this.load.image('homeButton', accueilButton);
    this.load.image('hoveredButtonHome', hoveredAccueil);
    this.load.image('menuButton', menuButton);
    this.load.image('hoveredButtonMenu', hoveredMenu);

    this.load.spritesheet(SITTING_BLACK_CAT, catSittingBlackv2, {
      frameWidth: 32,
      frameHeight: 22,
    });


    this.load.spritesheet(SITTING_BROWN_CAT, catSittingBrown, {
      frameWidth: 32,
      frameHeight: 21,
    });

    this.load.spritesheet(BUNNY_IDLE, bunnyIdle, {
      frameWidth: 16.5,
      frameHeight: 17,
    });

    this.load.spritesheet(PNJ1_ANIM, pnj1, {
      frameWidth: 24,
      frameHeight: 24,
    });

    
    this.load.audio('moneySound', [moneySound]);
  

  }

  create() {
    const bgImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
    const scaleX = this.scale.width / bgImage.width;
    const scaleY = this.scale.height / bgImage.height;
    const scale = Math.max(scaleX, scaleY);
    bgImage.setScale(scale);

    const backgroundMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
    backgroundMusic.play();


    const map = this.add.image(0, 0, 'map').setOrigin(-0.45, -0.1);
    map.setScale(0.39);

    // add a rectangle with bounds
    const bounds = new Phaser.Geom.Rectangle(370, 230, 770, 350);
    this.physics.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
    
     const boundsInterior = this.createBounds();
     boundsInterior.setAlpha(0);

    // make the rectangle appear on the map (easier to code position)
    // const graphics = this.add.graphics();
    // graphics.lineStyle(2, 0xff0000); 
    // graphics.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);

    // bouton home
    const buttonHome = this.add.image(20, 30, 'homeButton');
    buttonHome.setScale(0.09, 0.09);
    buttonHome.setOrigin(-0.8, -1);
    buttonHome.setInteractive();

    buttonHome.on('pointerdown', () => {
      this.gameSave();
      logout();
    });
    buttonHome.on('pointerover', () => {
      buttonHome.setTexture('hoveredButtonHome');
    });

    buttonHome.on('pointerout', () => {
      buttonHome.setTexture('homeButton');
    });

    // bouton menu
    const buttonMenu = this.add.image(20, 30, 'menuButton');
    buttonMenu.setScale(0.09, 0.09);
    buttonMenu.setOrigin(-0.8, -2.3);
    buttonMenu.setInteractive();

    buttonMenu.on('pointerdown', () => {
      this.gameSave();
      Navigate('/menucoffee');
    });
    buttonMenu.on('pointerover', () => {
      buttonMenu.setTexture('hoveredButtonMenu');
    });

    buttonMenu.on('pointerout', () => {
      buttonMenu.setTexture('menuButton');
    });


    this.cursors = this.input.keyboard.createCursorKeys();

    this.cat1 = this.createCatOne();
    this.cat1.play('sitting');
    this.cat1.setInteractive();
    this.cat2 = this.createCatTwo();
    this.cat2.play('sittingBrown');
    this.cat2.setInteractive();

    this.cat1.on('pointerdown', () => {
      this.touchCat();
    });

    this.cat2.on('pointerdown', () => {
      this.touchCat();
    });

    // Cat name
    this.cat1Name = this.add.text(this.cat1.x + 10, this.cat1.y - 20, 'Salem', {
      fontSize: '15px',
      fill: 'white',
      backgroundColor: 'pink',
    });
    this.cat1Name.setOrigin(0.5, 1);
    this.cat1Name.setVisible(false);

    this.cat1.on('pointerover', () => {
      this.cat1Name.setVisible(true);
    });

    this.cat1.on('pointerout', () => {
      this.cat1Name.setVisible(false);
    });

    this.cat2Name = this.add.text(this.cat2.x - 10, this.cat2.y - 20, 'Coco', {
      fontSize: '15px',
      fill: 'white',
      backgroundColor: 'pink',
    });
    this.cat2Name.setOrigin(0.5, 1);
    this.cat2Name.setVisible(false);

    this.cat2.on('pointerover', () => {
      this.cat2Name.setVisible(true);
    });

    this.cat2.on('pointerout', () => {
      this.cat2Name.setVisible(false);
    });

    this.bunny=this.createBunny();
    this.bunny.play('bunnyIdle');

    // TODO mettre en commentaire dans la version finale
   this.client1 = this.createClient();

     this.time.addEvent({
      delay: 7000,
      callback: () => {
      if(this.client1===undefined || this.client1.alpha===0){
        this.client1 = this.createClient();
      }else
      if (this.client2===undefined || this.client2.alpha===0){
        this.client2 = this.createClientTwo();
      }else{
        this.client3 = this.createClientThree();
      }
        
      },
      callbackScope: this,
      loop: true 
    });

    this.player = this.createPlayer();
    
    this.physics.add.collider(this.player, boundsInterior);


    this.moneyText = this.add.text(20, 20, `CatCoins : ${this.money}`, {
      fontSize: '25px',
      fill: '#ffc0CB',
      backgroundColor: '#fff',

    });
    this.moneyText.setPosition(850, 50);


    this.scoreText = this.add.text(20, 20, `score : ${this.score}`, {
      fontSize: '25px',
      fill: '#ffc0CB',
      backgroundColor: '#fff',

    });
    this.moneyText.setPosition(850, 50);
    this.moneySound = this.sound.add('moneySound')
    this.scoreText.setPosition(525, 50);

    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));

  }

  handleBeforeUnload() {
    this.gameSave();
  }


  update() {
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    if (this.cursors.left.isDown && this.cursors.up.isDown) {
      this.player.setVelocityX(-160);
      this.player.setVelocityY(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown && this.cursors.up.isDown) {
      this.player.setVelocityX(160);
      this.player.setVelocityY(-160);
      this.player.anims.play('right', true);
    } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
      this.player.setVelocityX(-160);
      this.player.setVelocityY(160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
      this.player.setVelocityX(160);
      this.player.setVelocityY(160);
      this.player.anims.play('right', true);
    } else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play('idleAnim', true);
    }

  }

  createPlayer() {
    const player = this.physics.add.sprite(750, 520, IDLE_KEY);
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
      frames: this.anims.generateFrameNumbers(IDLE_KEY, { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
    });

    return player;
  }

  createCatOne() {
    const cat = this.add.sprite(480, 400, SITTING_BLACK_CAT);

    cat.setScale(2);

    this.anims.create({
      key: 'sitting',
      frames: this.anims.generateFrameNumbers(SITTING_BLACK_CAT, { start: 0, end: 14 }),
      frameRate: 4,
      repeat: -1,
      repeatDelay: 500,
    });

    return cat;
  }

  createCatTwo() {
    const cat = this.add.sprite(1080, 400, SITTING_BROWN_CAT);

    cat.setScale(2);

    this.anims.create({
      key: 'sittingBrown',
      frames: this.anims.generateFrameNumbers(SITTING_BROWN_CAT, { start: 0, end: 2 }),
      frameRate: 1,
      repeat: -1,
      repeatDelay: 2000,
    });

    return cat;
  }

touchCat(){
  // TODO a changer :)
  this.money += 1;
  this.moneyText.setText(`CatCoins : ${this.money}`);
  this.moneySound.play();
}

createBunny(){
  const bunny = this.add.sprite(857, 290, BUNNY_IDLE);
 
  bunny.setScale(3.5);

    this.anims.create({
      key: 'bunnyIdle',
      frames: this.anims.generateFrameNumbers(BUNNY_IDLE, { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
    });

    return bunny;
  }

    // function to save the player data
    gameSave() {
      user.money = this.money
      user.score = this.score
      setAutenticatedUser(user);
    }

  // eslint-disable-next-line class-methods-use-this
  goToHomePage() {
    Navigate('/');
  }

  createBounds() {
    const bounds = this.physics.add.staticGroup();

    bounds
      .create(10, 10)
      .refreshBody();

    bounds.create(535, 470, 'bounds').setDisplaySize(80, 40).setSize(90,40);
    bounds.create(975, 470, 'bounds').setDisplaySize(80, 40).setSize(90,40);
    bounds.create(720, 350, 'bounds').setDisplaySize(250, 40).setSize(340,40);
    bounds.create(975, 300, 'bounds').setDisplaySize(40, 40).setSize(40,40);


    return bounds;
  }

// eslint-disable-next-line class-methods-use-this
createClient(){
  const client = this.add.sprite(760, 590, 'pnj1');
  client.setScale(3);

    this.anims.create({
    key: 'pnj1Anim',
    frames: this.anims.generateFrameNumbers(PNJ1_ANIM, { start: 0, end: 3 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: 'pnj1walkLeft',
    frames: this.anims.generateFrameNumbers(PNJ1_ANIM, { start: 4, end: 7}),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: 'pnj1walkRight',
    frames: this.anims.generateFrameNumbers(PNJ1_ANIM, { start: 8, end: 11}),
    frameRate: 3,
    repeat: -1,
  });

  client.anims.play('pnj1Anim', true);

  this.tweens.add({
    targets: client,
    x: 760,
    y: 500,
    ease: 'Linear',
    duration: 2000,
    onComplete: () => {
      client.anims.play('pnj1walkLeft', true);
      this.tweens.add({
        targets: client,
        x: 450,
        y: 500,
        ease: 'Linear',
        duration: 4000,
        
        onComplete: () => {
          client.anims.play('pnj1Anim', true);
          this.tweens.add({
            targets: client,
            x: 450,
            y: 500,
            ease: 'Linear',
            duration: 4000,
            
            onComplete: () => {
              this.money+=15;
              this.moneyText.setText(`CatCoins : ${this.money}`);
              client.anims.play('pnj1walkRight', true);
              this.tweens.add({
                targets: client,
                x: 760,
                y: 500,
                ease: 'Linear',
                duration: 4000,

                onComplete: () => {
                  client.anims.play('pnj1Anim', true);
                  this.tweens.add({
                    targets: client,
                    x: 760,
                    y: 590,
                    ease: 'Linear',
                    duration: 2000,
                    onComplete: () => {
                        client.setAlpha(0);
                      
                    }
                  });
                 
                }
              });
              
            },
          });
          
        },
      });
    },
  });
    
  return client;
}

createClientTwo(){
  const client = this.add.sprite(760, 590, 'pnj1');
  client.setScale(3);

    this.anims.create({
    key: 'pnj1Anim',
    frames: this.anims.generateFrameNumbers(PNJ1_ANIM, { start: 0, end: 3 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: 'pnj1walkLeft',
    frames: this.anims.generateFrameNumbers(PNJ1_ANIM, { start: 4, end: 7}),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: 'pnj1walkRight',
    frames: this.anims.generateFrameNumbers(PNJ1_ANIM, { start: 8, end: 11}),
    frameRate: 3,
    repeat: -1,
  });

  client.anims.play('pnj1Anim', true);

  this.tweens.add({
    targets: client,
    x: 760,
    y: 500,
    ease: 'Linear',
    duration: 2000,
    onComplete: () => {
      client.anims.play('pnj1walkRight', true);
      this.tweens.add({
        targets: client,
        x: 1080,
        y: 500,
        ease: 'Linear',
        duration: 4000,
        
        onComplete: () => {
          client.anims.play('pnj1Anim', true);
          this.tweens.add({
            targets: client,
            x: 1080,
            y: 500,
            ease: 'Linear',
            duration: 4000,
            
            onComplete: () => {
              this.money+=15;
              this.moneyText.setText(`CatCoins : ${this.money}`);
              client.anims.play('pnj1walkLeft', true);
              this.tweens.add({
                targets: client,
                x: 760,
                y: 500,
                ease: 'Linear',
                duration: 4000,

                onComplete: () => {
                  client.anims.play('pnj1Anim', true);
                  this.tweens.add({
                    targets: client,
                    x: 760,
                    y: 590,
                    ease: 'Linear',
                    duration: 2000,
                    onComplete: () => {
                        client.setAlpha(0);
                      
                    }
                  });
                 
                }
              });
              
            },
          });
          
        },
      });
    },
  });
    
  return client;
  
}

createClientThree(){
  const client = this.add.sprite(760, 590, 'pnj1');
  client.setScale(3);

    this.anims.create({
    key: 'pnj1Anim',
    frames: this.anims.generateFrameNumbers(PNJ1_ANIM, { start: 0, end: 3 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: 'pnj1walkLeft',
    frames: this.anims.generateFrameNumbers(PNJ1_ANIM, { start: 4, end: 7}),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: 'pnj1walkRight',
    frames: this.anims.generateFrameNumbers(PNJ1_ANIM, { start: 8, end: 11}),
    frameRate: 3,
    repeat: -1,
  });

  client.anims.play('pnj1Anim', true);

  this.tweens.add({
    targets: client,
    x: 760,
    y: 500,
    ease: 'Linear',
    duration: 2000,
    onComplete: () => {
      client.anims.play('pnj1walkLeft', true);
      this.tweens.add({
        targets: client,
        x: 650,
        y: 500,
        ease: 'Linear',
        duration: 1500,
        
        onComplete: () => {
          client.anims.play('pnj1Anim', true);
          this.tweens.add({
            targets: client,
            x: 650,
            y: 500,
            ease: 'Linear',
            duration: 4000,
            
            onComplete: () => {
              this.money+=15;
              this.moneyText.setText(`CatCoins : ${this.money}`);
              client.anims.play('pnj1walkRight', true);
              this.tweens.add({
                targets: client,
                x: 760,
                y: 500,
                ease: 'Linear',
                duration: 2000,

                onComplete: () => {
                  client.anims.play('pnj1Anim', true);
                  this.tweens.add({
                    targets: client,
                    x: 760,
                    y: 590,
                    ease: 'Linear',
                    duration: 2000,
                    onComplete: () => {
                        client.setAlpha(0);
                      
                    }
                  });
                 
                }
              });
              
            },
          });
          
        },
      });
    },
  });
    
  return client;

}

}
export {user}
export default GameScene;