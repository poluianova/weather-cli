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

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp()
  }
  if (args.s) {
    // save city settings
  }
  if (args.t) {
    return saveToken(args.t)
  }
  getWeather('moscow')
}

initCLI()