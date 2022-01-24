#!//usr/bin/env node
import {getArgs} from './helpers/args.js';
import {printHelp, printError, printSuccess, printWeather} from './services/log.service.js';
import {getKeyValue, saveKeyValue, KEY_DICTIONARY} from './services/storage.service.js';
import {getWeather, getIcon} from './services/api.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Нужно заполнить токен, для этого вызовите команду -t [API KEY]');
    return;
  }
try {
  await saveKeyValue(KEY_DICTIONARY.token, token);
  printSuccess('Token is saved successfully')
} catch (e) {
  printError(e.message)
}
}

const saveCity = async (city) => {
  if (!city.length) {
    printError('Нужно заполнить город, для этого вызовите команду -s [CITY]');
    return;
  }
try {
  await saveKeyValue(KEY_DICTIONARY.city, city);
  printSuccess('City is saved successfully')
} catch (e) {
  printError(e.message)
}
}

const getForecast = async () => {
  try {  
    const city = process.env.CITY ?? await getKeyValue(KEY_DICTIONARY.city)
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon))
  } catch(e) {
    if (e?.response?.status === 401) {
      printError('Неверно указан токен')
    } else if (e?.response?.status === 404) {
      printError('Неверно указан город')
    } else {
      printError(e.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp()
  }
  if (args.s) {
    return saveCity(args.s)
  }
  if (args.t) {
    return saveToken(args.t)
  }
  return getForecast();
}

initCLI()