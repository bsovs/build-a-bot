
const API_URL = !process.env.PORT ? `http://localhost:8080` : 'https://zellobot.herokuapp.com';
const ALLOW_ORIGIN = !process.env.PORT ? [`http://localhost:8080`, `http://localhost:3000`] : 'https://zellobot.herokuapp.com';

const HOME_PATH = __dirname;

const ROULETTE_SIZE = 31;

module.exports = {
    API_URL,
    ALLOW_ORIGIN,
    HOME_PATH,
    ROULETTE_SIZE
}