/* Game keys */
export const MAINKEY = "main";
export const GAME_INSTANCE_KEY = "gameInstance";

/* Sprites */
export const SPR_LOUNGE = "lounge";
export const SPR_RAIN = "rain";
export const SPR_SUN = "sun";
export const SPR_FLASH = "flash";
export const SPR_FLASH_WINDOW = "flash_window";

/* Weather keys */
export const THUNDER = "Thunderstorm";
export const DRIZZLE = "Drizzle";
export const RAIN = "Rain";
export const SNOW = "Snow";
export const MIST = "Mist";
export const FOG = "Fog";
export const CLEAR = "Clear";
export const CLOUDS = "Clouds";

export const AllWeathers = [
  THUNDER,
  //DRIZZLE,
  RAIN,
  // SNOW,
  // MIST,
  // FOG,
  CLEAR,
  CLOUDS
]

export const weatherToHex = {
  [THUNDER]: '#464e70',
  [DRIZZLE]: '#f2f0f3',
  [RAIN]: '#466470',
  [SNOW]: '#97bce6',
  [MIST]: '#fcfefd',
  [FOG]: '#b1b3b2',
  [CLEAR]: '#4f8bc2',
  [CLOUDS]: '#617faf'
}

export const defaultLocation = {
  lat: 53.8059209,
  lon: -1.6758144
}