import https from 'https';
import {KEY_DICTIONARY, getKeyValue} from './storage.service.js';
import axios from 'axios';

const getIcon = (icon) => {
switch (icon.slice(0, -1)) {
  case '01' :
    return '☀️';
  case '02' :
    return '⛅︎';
  case '03' :
    return '☁️';
  case '04' :
    return '☁️';
  case '09' :
    return '🌧︎';
  case '10' :
    return '🌦︎';
  case '11' :
    return '🌩︎';
  case '13' :
    return '❄️';
  case '50' :
    return '🌫️';
  
  }
}


const getWeather = async (city) => {
  const token = process.env.TOKEN ?? await getKeyValue(KEY_DICTIONARY.token);
  if (!token) {
    throw new Error('Не задан ключ')
  }

  const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      units: 'metric', 
      lang: 'ru'
    }
  })
  return data;

  // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  // url.searchParams.append('q', city);
  // url.searchParams.append('appid', token);
  // url.searchParams.append('units', 'metric');
  // url.searchParams.append('lang', 'ru');

  // https.get(url, (response) => {
  //   let res = '';
  //   response.on('data', (chank) => {
  //     res += chank;;
  //   })
  //   response.on('end', () => {
  //     console.log(res)
  //   })
  // })
}

export {getWeather, getIcon}