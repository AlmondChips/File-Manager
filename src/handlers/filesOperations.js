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
          console.log(Consts.invalidData);
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
            console.log(Consts.operationError);
          }
        resolve(true);
    }
    else if (prompt.startsWith('rn')) {
      try {
        getArgsFromPrompt(prompt);
        
      } catch {
        console.log();
      }
      resolve(true);
    }
    else {
      resolve(false);
    }

  })
}

const getArgsFromPrompt = (prompt) => {
  const args = prompt.split(' ');
  console.log(args.length);
}