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
import {clearAuthenticatedUser, getAutenticatedUser} from '../../utils/auths';
import hoveredMenu from '../../img/hoveredMenuIcon.png';
import menuButton from '../../img/menuIcon.png';
import pnj1 from '../../assets/Girl-Sheet.png';
import music from '../../assets/bgMusic.mp3';
import moneySound from '../../assets/sounds/moneySound.mp3.mp3';
import catBubble from '../../assets/ghost.png';
import catRusty from '../../assets/red.png';
import catKali from '../../assets/seal_point_sitting.png';
import catPinkie from '../../assets/cotton_candy_pink.png';


document.title = 'Neko café'


const cats = [];
const user = () => getAutenticatedUser();
const IDLE_KEY = 'idle';
const MOVE_RIGHT_KEY = 'walkRight';
const MOVE_LEFT_KEY = 'walkLeft';
const SALEM_ANIM = 'salemAnim';
const ATCHOUM_ANIM = 'atchoumAnim';
const BUNNY_IDLE = 'bunnyIdle';
const PNJ1_ANIM = 'pnj1Anim';
const BUBBLE_ANIM = 'bubbleAnim';
const RUSTY_ANIM = 'redAnim';
const KALI_ANIM = 'kaliAnim';
const PINKIE_ANIM = 'pinkieAnim'

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.cat1 = undefined;
    this.cat2 = undefined;
    this.score = user()?.score ?? 0;
    this.money = user()?.money ?? 0;
    this.bunny = undefined;
    this.moneyText = undefined;
    this.scoreText = undefined;
    this.client1 = undefined;
    this.client2 = undefined;
    this.client3 = undefined;
    this.cats = [];
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

    // load all the sprites animations
    this.load.spritesheet(SALEM_ANIM, catSittingBlackv2, {
      frameWidth: 32,
      frameHeight: 22,
    });


    this.load.spritesheet(ATCHOUM_ANIM, catSittingBrown, {
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

    this.load.spritesheet(BUBBLE_ANIM, catBubble, {
      frameWidth: 32,
      frameHeight: 21,
    });

    this.load.spritesheet(RUSTY_ANIM, catRusty, {
      frameWidth: 32,
      frameHeight: 24,
    });

    this.load.spritesheet(KALI_ANIM, catKali, {
      frameWidth: 32,
      frameHeight: 21,
    });

    this.load.spritesheet(PINKIE_ANIM, catPinkie, {
      frameWidth: 31,
      frameHeight: 23,
    });

    this.load.audio('moneySound', [moneySound]);


  }

  create() {
    const bgImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
    const scaleX = this.scale.width / bgImage.width;
    const scaleY = this.scale.height / bgImage.height;
    const scale = Math.max(scaleX, scaleY);
    bgImage.setScale(scale);

    const backgroundMusic = this.sound.add('bgMusic', {loop: true, volume: 0.5});
    backgroundMusic.play();

    const map = this.add.image(0, 0, 'map').setOrigin(-0.45, -0.1);
    map.setScale(0.39);

    // add a rectangle with bounds
    const bounds = new Phaser.Geom.Rectangle(370, 230, 770, 350);
    this.physics.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

    // making it so the player can't leave the bounds and making them invisible
    const boundsInterior = this.createBounds();
    boundsInterior.setAlpha(0);

    // make the rectangle appear on the map (easier to code position)
    // const graphics = this.add.graphics();
    // graphics.lineStyle(2, 0xff0000);
    // graphics.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);

    //  home button
    const buttonHome = this.add.image(20, 30, 'homeButton');
    buttonHome.setScale(0.09, 0.09);
    buttonHome.setOrigin(-0.8, -1);
    buttonHome.setInteractive();

    // making the home button save the game and logout the player
    buttonHome.on('pointerdown', () => {
      this.gameSave();
      clearAuthenticatedUser();
      this.goToHomePage();
    });
    buttonHome.on('pointerover', () => {
      buttonHome.setTexture('hoveredButtonHome');
    });

    buttonHome.on('pointerout', () => {
      buttonHome.setTexture('homeButton');
    });

    // menu button
    const buttonMenu = this.add.image(20, 30, 'menuButton');
    buttonMenu.setScale(0.09, 0.09);
    buttonMenu.setOrigin(-0.8, -2.3);
    buttonMenu.setInteractive();

    // making the menu button save the game and redirect to the menu page
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

    // initialize the cats data so it shows the right ones
    this.initializeCatData();
    this.cursors = this.input.keyboard.createCursorKeys();

    // for each cat, displays the ones that are active if there's one
    cats.forEach(cat => {
      if (cat.isActive === true && this.cat1 === undefined) {
        this.cat1 = this.createCatOne(cat.name);
      } else if (cat.isActive === true && this.cat1 !== undefined && this.cat2 === undefined) {
        this.cat2 = this.createCatTwo(cat.name);
      }
    });


    if (this.cat1) {
      this.cat1.setInteractive();

      // make the cat generate money
      this.cat1.on('pointerdown', () => {
        this.touchCat(this.cat1.name);
      });

      // display cat's name
      this.cat1Name = this.add.text(this.cat1.x + 10, this.cat1.y - 20, this.cat1.name, {
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

    }


    if (this.cat2) {
      this.cat2.setInteractive();

      // make the cat generate money
      this.cat2.on('pointerdown', () => {
        this.touchCat(this.cat2.name);
      });
      // display cat's name
      this.cat2Name = this.add.text(this.cat2.x - 10, this.cat2.y - 20, this.cat2.name, {
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
    }

    // creating the bunny
    this.bunny = this.createBunny();
    this.bunny.play('bunnyIdle');

    // creating the differents client's animations
    this.anims.create({
      key: 'pnj1Anim',
      frames: this.anims.generateFrameNumbers(PNJ1_ANIM, {start: 0, end: 3}),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'pnj1walkLeft',
      frames: this.anims.generateFrameNumbers(PNJ1_ANIM, {start: 4, end: 7}),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'pnj1walkRight',
      frames: this.anims.generateFrameNumbers(PNJ1_ANIM, {start: 8, end: 11}),
      frameRate: 3,
      repeat: -1,
    });

    // calculating the delay of clients apparition based on active cats bonus
    let delayApparition = 0;

    if (this.cat1 && this.cat2) {
      delayApparition = this.calculateDelay(this.cat1.name, this.cat2.name);
    } else if (this.cat1 && !this.cat2) {
      delayApparition = this.calculateDelay(this.cat1.name, null);
    } else {
      delayApparition = 7500;
    }

    // making a client appear every delayApparition time
    this.time.addEvent({
      delay: delayApparition,
      callback: () => {
        if (this.client1 === undefined || this.client1.alpha === 0) {
          this.client1 = this.createClient();
        } else if (this.client2 === undefined || this.client2.alpha === 0) {
          this.client2 = this.createClientTwo();
        } else {
          this.client3 = this.createClientThree();
        }

      },
      callbackScope: this,
      loop: true
    });

    // creating the player and making it so they can't cross the bounds
    this.player = this.createPlayer();

    this.physics.add.collider(this.player, boundsInterior);

    // displaying player's money
    this.moneyText = this.add.text(20, 20, `CatCoins : ${this.money}`, {
      fontSize: '25px',
      fill: '#ffc0CB',
      backgroundColor: '#fff',

    });
    this.moneyText.setPosition(850, 50);

    // displaying player's score
    this.scoreText = this.add.text(20, 20, `score : ${this.score}`, {
      fontSize: '25px',
      fill: '#ffc0CB',
      backgroundColor: '#fff',

    });
    this.moneyText.setPosition(850, 50);
    this.moneySound = this.sound.add('moneySound')
    this.scoreText.setPosition(525, 50);

    // saving the game if its left
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));

  }

  handleBeforeUnload() {
    this.gameSave();
  }


  update() {
    // player's movements
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

  // creating the player
  createPlayer() {
    const player = this.physics.add.sprite(750, 520, IDLE_KEY);
    player.setScale(3.2);
    player.setCollideWorldBounds(true);
    player.body.setAllowGravity(false);

    // creating the different animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(MOVE_LEFT_KEY, {start: 0, end: 7}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(MOVE_RIGHT_KEY, {start: 0, end: 7}),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'idleAnim',
      frames: this.anims.generateFrameNumbers(IDLE_KEY, {start: 0, end: 1}),
      frameRate: 3,
      repeat: -1,
    });

    return player;
  }

  // creating the first cat
  createCatOne(name) {
    const cat = this.add.sprite(480, 400, SALEM_ANIM);
    cat.name = name;

    cat.setScale(2);

    // picking which animation to create and display depending on the cat given
    if (name === "Salem") {
      this.anims.create({
        key: 'salemAnim',
        frames: this.anims.generateFrameNumbers(SALEM_ANIM, {start: 3, end: 0}),
        frameRate: 4,
        repeat: -1,
        yoyo: true,
        repeatDelay: 4500,
      });
      cat.anims.play('salemAnim', true);
    }

    if (name === "Rusty") {
      this.anims.create({
        key: 'redAnim',
        frames: this.anims.generateFrameNumbers(RUSTY_ANIM, {start: 0, end: 4}),
        frameRate: 3,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1500,
      });
      cat.anims.play('redAnim', true);
    }

    if (name === "Bubbles") {
      this.anims.create({
        key: 'bubblesAnim',
        frames: this.anims.generateFrameNumbers(BUBBLE_ANIM, {start: 4, end: 1}),
        frameRate: 3,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1500,
      });
      cat.anims.play('bubblesAnim', true);
    }

    if (name === "Kali") {
      this.anims.create({
        key: 'kaliAnim',
        frames: this.anims.generateFrameNumbers(KALI_ANIM, {start: 0, end: 2}),
        frameRate: 1,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1500,
      });
      cat.anims.play('kaliAnim', true);
    }

    if (name === "Atchoum") {
      this.anims.create({
        key: 'atchoumAnim',
        frames: this.anims.generateFrameNumbers(ATCHOUM_ANIM, {start: 2, end: 0}),
        frameRate: 2,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2000,
      });
      cat.anims.play('atchoumAnim', true);
    }

    if (name === "Pinkie") {
      this.anims.create({
        key: 'pinkieAnim',
        frames: this.anims.generateFrameNumbers(PINKIE_ANIM, {start: 4, end: 0}),
        frameRate: 3,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2000,
      });
      cat.anims.play('pinkieAnim', true);
    }


    return cat;
  }

  // creating the second cat
  createCatTwo(name) {
    const cat = this.add.sprite(1080, 400, ATCHOUM_ANIM);
    cat.name = name;

    cat.setScale(2);

    // picking which animation to create and display depending on the cat given
    if (name === "Salem") {
      this.anims.create({
        key: 'salemAnim',
        frames: this.anims.generateFrameNumbers(SALEM_ANIM, {start: 3, end: 0}),
        frameRate: 4,
        repeat: -1,
        yoyo: true,
        repeatDelay: 4500,
      });
      cat.anims.play('salemAnim', true);
    }


    if (name === "Rusty") {
      this.anims.create({
        key: 'redAnim',
        frames: this.anims.generateFrameNumbers(RUSTY_ANIM, {start: 0, end: 4}),
        frameRate: 3,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1500,
      });
      cat.anims.play('redAnim', true);
    }

    if (name === "Bubbles") {
      this.anims.create({
        key: 'bubblesAnim',
        frames: this.anims.generateFrameNumbers(BUBBLE_ANIM, {start: 4, end: 1}),
        frameRate: 3,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1500,
      });
      cat.anims.play('bubblesAnim', true);
    }

    if (name === "Kali") {
      this.anims.create({
        key: 'kaliAnim',
        frames: this.anims.generateFrameNumbers(KALI_ANIM, {start: 0, end: 2}),
        frameRate: 1,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1500,
      });
      cat.anims.play('kaliAnim', true);
    }

    if (name === "Atchoum") {
      this.anims.create({
        key: 'atchoumAnim',
        frames: this.anims.generateFrameNumbers(ATCHOUM_ANIM, {start: 2, end: 0}),
        frameRate: 2,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2000,
      });
      cat.anims.play('atchoumAnim', true);
    }

    if (name === "Pinkie") {
      this.anims.create({
        key: 'pinkieAnim',
        frames: this.anims.generateFrameNumbers(PINKIE_ANIM, {start: 4, end: 0}),
        frameRate: 3,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2000,
      });
      cat.anims.play('pinkieAnim', true);
    }

    return cat;
  }

  // increases player's money when they touch a cat
  touchCat(catName) {
    const touchedCat = cats.find(cat => cat.name === catName);

    // choosing the amount depending on the cat's bonus
    if (touchedCat.bonusClick === 0) {
      this.money += 1;
    } else {
      this.money += touchedCat.bonusClick;
    }
    // update the display of the player's money
    this.moneyText.setText(`CatCoins : ${this.money}`);
    this.moneySound.play();
  }

// creating the bunny and its animation
  createBunny() {
    const bunny = this.add.sprite(857, 290, BUNNY_IDLE);

    bunny.setScale(3.5);

    this.anims.create({
      key: 'bunnyIdle',
      frames: this.anims.generateFrameNumbers(BUNNY_IDLE, {start: 0, end: 1}),
      frameRate: 3,
      repeat: -1,
    });

    return bunny;
  }

  // function to save the player's data
  async gameSave() {

    await fetch(`${process.env.API_BASE_URL}/users/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user().token}`,
      },
      body: JSON.stringify({
        score: this.score,
        money: this.money
      })
    });

  }


  // eslint-disable-next-line class-methods-use-this
  goToHomePage() {
    Navigate('/');
  }

  // creating bounds interior to the game scene
  createBounds() {
    const bounds = this.physics.add.staticGroup();

    bounds
      .create(10, 10)
      .refreshBody();

    // creating all the different bounds
    bounds.create(535, 470, 'bounds').setDisplaySize(80, 40).setSize(90, 40);
    bounds.create(975, 470, 'bounds').setDisplaySize(80, 40).setSize(90, 40);
    bounds.create(720, 350, 'bounds').setDisplaySize(250, 40).setSize(340, 40);
    bounds.create(975, 300, 'bounds').setDisplaySize(40, 40).setSize(40, 40);


    return bounds;
  }

  // creating the first client
// eslint-disable-next-line class-methods-use-this
  createClient() {
    const client = this.add.sprite(760, 590, 'pnj1');
    client.setScale(3);

// creating a predefined path 
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
                this.money += 15;
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
                        // makes the client invisible when its done with the path
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

// creating the second client
  createClientTwo() {
    const client = this.add.sprite(760, 590, 'pnj1');
    client.setScale(3);

    client.anims.play('pnj1Anim', true);

    // creating a predefined path
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
                this.money += 15;
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
                        // makes the client invisible when its done with the path
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

// create a third client
  createClientThree() {
    const client = this.add.sprite(760, 590, 'pnj1');
    client.setScale(3);

    client.anims.play('pnj1Anim', true);
// create a predefined path
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
                this.money += 15;
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
                        // makes the client invisible when its done with the path
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

// eslint-disable-next-line class-methods-use-this
  initializeCatData() {
    // taking cats from the localstorages and pushing the needed infos in an array
    const storedCatData = localStorage.getItem('catData');

    if (storedCatData) {
      const parsedData = JSON.parse(storedCatData);

      cats.length = 0;

      for (let i = 0; i < parsedData.length; i += 1) {
        cats.push({
          isAdopted: parsedData[i].isAdopted,
          isActive: parsedData[i].isActive,
          name: parsedData[i].name,
          bonusClick: parsedData[i].bonusClick,
          bonusAppearing: parsedData[i].bonusAppearing
        });
      }
    }
  }

// calculating the delay between each clients apparition depending on the active cats
// eslint-disable-next-line class-methods-use-this
  calculateDelay(catName1, catName2) {
    let delay = 7500;
    let bonus = 0;

    const cat1 = cats.find(cat => cat.name === catName1);
    const cat2 = cats.find(cat => cat.name === catName2);

    // if the cat exists, check its bonus
    if (cat1) {
      bonus += cat1.bonusAppearing;
    }
    if (cat2) {
      bonus += cat2.bonusAppearing;
    }

    delay -= bonus * 100 * 1.8;

    return delay;
  }


}

export {user}
export default GameScene;