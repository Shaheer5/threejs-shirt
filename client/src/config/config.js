const config = {
  development: {
    backendUrl: "https://api.openai.com/v1/images/generations",
  },
  production: {
    backendUrl: "https://devswag.onrender.com/api/v1/images/generations",
    // backendUrl: "https://devswag.onrender.com/api/v1/dalle",
  },
};

export default config;
