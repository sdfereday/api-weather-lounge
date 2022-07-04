import Phaser from "phaser";
import React, { useEffect } from "react";
import { createStore } from "state-pool";
import { systemConfig } from "../system/config";
import MainScene from "./scenes/MainScene";
import {
  MAINKEY,
  GAME_INSTANCE_KEY,
  RAIN
} from "../system/consts";

const GameShell = () => {
  const emitter = new Phaser.Events.EventEmitter();
  const game = new Phaser.Game(systemConfig);

  game.scene.add(
    MAINKEY,
    MainScene({
      sceneKey: MAINKEY,
      emitter
    }),
    true
  );

  return {
    changeWeather: gameWeatherMode => {
      emitter.emit("weatherUpdated", gameWeatherMode ? gameWeatherMode : RAIN);
    }
  };
};

const store = createStore();
store.setState(GAME_INSTANCE_KEY, GameShell());

export default ({
  children,
  gameWeatherMode
}) => {
  const [gameInstance] = store.useState(GAME_INSTANCE_KEY);

  useEffect(() =>
    gameInstance.changeWeather(gameWeatherMode), [gameWeatherMode])

  return (
    <div id="gameRoot">
      {children}
    </div>
  );
};
