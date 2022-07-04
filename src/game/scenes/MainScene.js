import lounge from "../../assets/the_lounge.png";
import rain from "../../assets/rain_static.png";
import sun from "../../assets/sun.png";
import flash from "../../assets/flash_static.png";
import flashWindow from "../../assets/flash_window.png";
import {
  SPR_LOUNGE,
  SPR_RAIN,
  SPR_SUN,
  SPR_FLASH,
  SPR_FLASH_WINDOW,
  THUNDER,
  DRIZZLE,
  RAIN,
  SNOW,
  MIST,
  FOG,
  CLEAR,
  CLOUDS
} from "../../system/consts";

const randomFloat = (min, max) =>
  Math.random() * (max - min + 1) + min;

const bindToWeatherGroup = (groups, groupNames, ga) => {
  for (let i = 0; i < groupNames.length; i++) {
    const group = groups[groupNames[i]];
    group.push(ga);
  }
}

const deactivateWeatherGroups = groups => {
  Object.values(groups).forEach(v =>
    v.forEach(item => item.setVisible(false)));
}

const activateWeatherGroup = (name, groups) => {
  const group = groups[name];
  if (group !== null)
    group.forEach(g => g.setVisible(true))
}

export default ({
  sceneKey,
  emitter
}) => {

  let rainDropPool = null;
  let randomRectangle = null;
  let activeWeatherType = null;

  let weatherGroups = {
    [THUNDER]: [],
    [DRIZZLE]: [],
    [RAIN]: [],
    [SNOW]: [],
    [MIST]: [],
    [FOG]: [],
    [CLEAR]: [],
    [CLOUDS]: []
  }

  const setWeatherType = currentWeatherType => {
    activeWeatherType = currentWeatherType;
    deactivateWeatherGroups(weatherGroups);
    activateWeatherGroup(activeWeatherType, weatherGroups);
  }

  const applyLightningEffect = (tweens, objects) => {
    const lightingTimeline = tweens.createTimeline({
      loop: -1
    });

    lightingTimeline.add({
      targets: objects,
      alpha: 0,
      duration: 1
    })

    lightingTimeline.add({
      targets: objects,
      alpha: .8,
      duration: 100,
      delay: 6000
    })

    lightingTimeline.add({
      targets: objects,
      alpha: 0,
      duration: 1
    })

    lightingTimeline.add({
      targets: objects,
      alpha: .6,
      duration: 100,
      delay: 10
    })

    lightingTimeline.add({
      targets: objects,
      alpha: 0,
      duration: 1
    })

    lightingTimeline.add({
      targets: objects,
      alpha: .6,
      duration: 100,
      delay: 10
    })

    lightingTimeline.add({
      targets: objects,
      alpha: 0,
      duration: 1
    })

    return lightingTimeline;
  }

  function preload() {
    this.load.image(SPR_LOUNGE, lounge);
    this.load.image(SPR_RAIN, rain);
    this.load.image(SPR_FLASH, flash);
    this.load.image(SPR_FLASH_WINDOW, flashWindow);

    this.load.spritesheet(SPR_SUN, sun, {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  function create() {
    rainDropPool = this.add.group();

    rainDropPool = this.physics.add.group({
      key: SPR_RAIN,
      frameQuantity: 64
    })

    randomRectangle = new Phaser.Geom.Rectangle(80, 35, 55, 120); //this.physics.world.bounds
    Phaser.Actions.RandomRectangle(rainDropPool.getChildren(), randomRectangle);

    bindToWeatherGroup(weatherGroups, [RAIN, THUNDER], rainDropPool);

    const lightingFlash = this.add.sprite(96, 64, SPR_FLASH);

    this.add.sprite(80, 80, SPR_LOUNGE);

    const lightingFlashWindowA = this.add.sprite(79, 73, SPR_FLASH_WINDOW);
    const lightingFlashWindowB = this.add.sprite(103, 85, SPR_FLASH_WINDOW);
    lightingFlashWindowA.alpha = 0;
    lightingFlashWindowB.alpha = 0;

    const lightingTimeline = applyLightningEffect(this.tweens, [lightingFlash, lightingFlashWindowA, lightingFlashWindowB]);
    lightingTimeline.play();

    bindToWeatherGroup(weatherGroups, [THUNDER], lightingFlash);
    bindToWeatherGroup(weatherGroups, [THUNDER], lightingFlashWindowA);
    bindToWeatherGroup(weatherGroups, [THUNDER], lightingFlashWindowB);

    this.anims.create({
      key: 'sun_idle',
      frames: this.anims.generateFrameNumbers(SPR_SUN, { frames: [0, 1, 2, 3] }),
      frameRate: 2,
      repeat: -1,
      yoyo: true
    });

    const sunA = this.add.sprite(72, 73, SPR_SUN);
    sunA.play("sun_idle");

    const sunB = this.add.sprite(96, 85, SPR_SUN);
    sunB.play("sun_idle");

    bindToWeatherGroup(weatherGroups, [CLOUDS, CLEAR], sunA);
    bindToWeatherGroup(weatherGroups, [CLOUDS, CLEAR], sunB);

    // Call this to bring all sprites just created up to speed
    setWeatherType(activeWeatherType);
  };

  function update() {
    if (rainDropPool !== null) {
      rainDropPool
        .getChildren()
        .forEach(item => {
          if (item.y > 100) {
            item.setVelocityY(0);
            item.x = randomFloat(randomRectangle.x, randomRectangle.x + randomRectangle.width);
            item.y = randomFloat(randomRectangle.y, randomRectangle.y - 5);
            item.setAlpha(randomFloat(0.1, 1));
          }
        });
    }
  }

  emitter.on("weatherUpdated", setWeatherType);

  return {
    key: sceneKey,
    preload,
    create,
    update
  };
}
