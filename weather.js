#!//usr/bin/env node
import {getArgs} from './helpers/args.js';
import {printHelp, printError, printSuccess} from './services/log.service.js';
import {saveKeyValue, KEY_DICTIONARY} from './services/storage.service.js';
import {getWeather} from './services/api.service.js'

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

const getForecast = async () => {
  try {  
  const weather = await getWeather(process.env.CITY);
  console.log(weather)
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
  // const args = process.env;
  // console.log('args ', args)
  const args = getArgs(process.argv);
  console.log(process.env)

  if (args.h) {
    printHelp()
  }
  if (args.s) {
    // save city settings
  }
  if (args.t) {
    return saveToken(args.t)
  }
  getForecast();
}

initCLI()