import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#c91e36",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./sm-logo.png",
  fullDecal: "./sm-logo.png",
});

export default state;
