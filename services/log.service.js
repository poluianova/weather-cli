import chalk from 'chalk';
import dedent from 'dedent';

const printError = error => {
console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}

const printSuccess = message => {
console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

const printHelp = () => {
console.log(
  dedent(`${chalk.bgCyan(' HELP ')}
  Без параметров - вывод погоды
  -s [CITY] для установки города
  -h для вывода помощи
  -t для сохранения токена
  `)
)
}

const printWeather = (res, icon) => {
  const {name, main : {temp, feels_like, humidity}, wind: {speed}} = res;

  console.log((dedent`${chalk.blue(' ПОГОДА ')} Погода в городе ${name}
      ${icon}  ${res.weather[0].description}
      Температура: ${temp}, ощущается как ${feels_like}
      Влажность: ${humidity}
      Скорость ветра: ${speed} м/с
      `))    
}

export {printError, printSuccess, printHelp, printWeather}