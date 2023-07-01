import { Consts } from '../utils/consts/consts.js';
import { EOL, cpus, homedir, userInfo, arch } from 'os';


export const operationSystemInfo = (prompt) => {
  if (prompt.startsWith('os')) {
    const [, command] = prompt.split('--');
    switch (command) {
      case 'EOL': {
        console.log(`${Consts.responseSign}Default end of line: ${colorIntoGreen(JSON.stringify(EOL).replace(/^"|"$/g, ''))}`)
        break;
      }
      case 'cpus': {
        const cpusData = cpus();
        console.log(`${Consts.responseSign}Total amount of CPUs is \x1b[33m${cpusData.length}\x1b[0m of model ${colorIntoGreen(cpusData[0].model)}`)
        cpusData.forEach((cpu, idx) => {
          console.log(`  ${idx + 1} cpu's rate - \x1b[33m${cpu['speed']}\x1b[0m${colorIntoGreen('GHz')}`);
        })
        break;
      }
      case 'homedir': {
        console.log(`${Consts.responseSign}Users's home directory: ${colorIntoGreen(homedir())}`);
        break;
      }
      case 'username': {
        console.log(`${Consts.responseSign}Current system user name: ${colorIntoGreen(userInfo().username)}`);
        break;
      }
      case 'architecture': {
        console.log(`${Consts.responseSign}CPU architecture for which Node.js binary has compiled: ${colorIntoGreen(arch())}`);
        break;
      }
      default:
        console.log(Consts.invalidData);
        break;
    }
    return true;
  }
  return false;
}

const colorIntoGreen = (text) => {
  return `\x1b[32m${text}\x1b[0m`
}