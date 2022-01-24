import axios from 'axios';
import { WEATHER_KEY, BASE_URL_WEATHER } from 'react-native-dotenv';

export const weatherApi = axios.create({
  baseURL: BASE_URL_WEATHER,
  params: {
    appid: WEATHER_KEY,
    lang: 'pt_br',
    units: 'metric',
  },
});
