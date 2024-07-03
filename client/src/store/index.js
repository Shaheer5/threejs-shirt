import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./sm-logo.png",
  fullDecal: "./sm-logo.png",
});

export default state;
