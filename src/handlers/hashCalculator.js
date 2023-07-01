import crypto from 'crypto';
import { getArgs } from '../utils/getArgs.js';
import fsPromises from 'fs/promises';
import path from 'path';
import { Consts } from '../utils/consts/consts.js';

export const hashCalculator = async (prompt) => {
  if (prompt.startsWith('hash')) {
    try {
      const [pathToFile] = getArgs(prompt);
      const fileName = path.basename(pathToFile);
      const hash = crypto.createHash('sha256');
      await fsPromises.readFile(pathToFile)
      .then((data) => {
        hash.update(data);
        console.log(`${Consts.responseSign}Hex hash of the "${fileName}" file: ${hash.digest('hex')}`);
      })
    } catch {
      console.log(Consts.operationError);
    }
    return true;
  }
  return false;
}