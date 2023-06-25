import path from 'path';
import fs from 'fs/promises';
import { Consts } from '../utils/consts/consts.js';

export const filesOperations = async (prompt) => {
  return new Promise(async (resolve) => {
    if (prompt.startsWith('cat')) {
        const pathToFile = prompt.substring(4);
        const resolvedPath = path.resolve(pathToFile);
        const readStream = fs.createReadStream(resolvedPath, { encoding: 'utf-8'});
        readStream.on('error', () => {
          console.log(Consts.responseSign + Consts.invalidData);
          resolve(true);
        })
        readStream.on('data', (data) => {
          console.log('Data from passed file:\n', data);
          resolve(true);
        });
    } else if (prompt.startsWith('add')) {
        const fileName = prompt.substring(4);
        const resolvedPath = path.resolve(process.cwd(), fileName);
          try {
            await fs.writeFile(resolvedPath, '', { flag: 'wx'})
            console.log(`${Consts.responseSign}File "${fileName}" has been successfully created at "${process.cwd()}"`);
          } catch {
            console.log(Consts.responseSign + Consts.operationError);
          }
        resolve(true);
    }
    else if (prompt.startsWith('rn')) {
      const str = prompt;
      const regex = /'([^']+)'|"([^"]+)"|\S+/g;
      const result = [];
      let match;
      
      while ((match = regex.exec(str))) {
        result.push(match[1] || match[2] || match[0]);
      }
      
      const [command, ...args] = result;
      
      const pathArgIndex = args.findIndex(arg => !arg.startsWith('-'));
      
      if (pathArgIndex === -1 || args.length < 2) {
        throw new Error('Ошибка: Недостаточно аргументов или указаны некорректные аргументы.');
      }
      
      const pathToFile = args[pathArgIndex];
      const newFilename = args[pathArgIndex + 1];
      console.log(pathToFile, newFilename);

    }
    else {
      resolve(false);
    }

  })
}