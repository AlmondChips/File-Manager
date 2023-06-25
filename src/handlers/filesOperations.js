import path, { resolve } from 'path';
import fs from 'fs';
import { Consts } from '../utils/consts/consts.js';

export const filesOperations = async (prompt) => {
  return new Promise((resolve) => {
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

    }
    else {
      resolve(false);
    }

  })
}