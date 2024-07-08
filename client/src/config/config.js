const config = {
  development: {
    backendUrl: "https://api.openai.com/v1/images/generations",
    // backendUrl: "http://localhost:8080/v1/images/generations",
    // backendUrl: "https://api.openai.com/api/v1/dalle",
    // backendUrl: "http://localhost:8080/api/v1/dalle",
  },
  production: {
    backendUrl: "https://devswag.onrender.com/api/v1/images/generations",
    // backendUrl: "https://devswag.onrender.com/api/v1/dalle",
  },
};

export default config;
