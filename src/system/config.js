import Phaser from "phaser";

const zoom = 3;

export const systemConfig = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  parent: "gameRoot",
  pixelArt: true,
  transparent: true,
  width: 480 / zoom,
  height: 480 / zoom,
  zoom,
  physics: {
    default: "arcade",
    arcade: {
      tileBias: 4,
      gravity: { y: 600 },
      debug: false
    }
  }
};
