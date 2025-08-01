let IS_PROD = true;
const server = IS_PROD
  ? "https://meetup-em0z.onrender.com"
  : "http://localhost:8000";

export default server;
