import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises'
import { Consts } from '../../utils/consts/consts.js';
import { getArgs } from '../../utils/getArgs.js';
import { copyFile } from './copyFile.js';

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
          console.log(`${Consts.responseSign}Data from passed file:\n${data}`);
          resolve(true);
        });
    } else if (prompt.startsWith('add')) {
        const fileName = prompt.substring(4);
        const resolvedPath = path.resolve(process.cwd(), fileName);
          try {
            await fsPromises.writeFile(resolvedPath, '', { flag: 'wx'})
            console.log(`${Consts.responseSign}File "${fileName}" has been successfully created at "${process.cwd()}"`);
          } catch (e){
            console.log(Consts.operationError, e);
          }
        resolve(true);
    }
    else if (prompt.startsWith('rn')) {
      try {
        const [filePath, newName] = getArgs(prompt);
        await fsPromises.rename(filePath, path.resolve(path.dirname(filePath), newName))
        const successMessage = `${Consts.responseSign}"${path.basename(filePath)}" file has been succsessfully renamed to "${newName}"`;
        console.log(successMessage);
      } catch {
        console.log(Consts.operationError);
      }
      resolve(true);
    }
    else if (prompt.startsWith('cp')) {
      await copyFile(prompt);
      resolve(true);
    }
    else if (prompt.startsWith('mv')) {
      await copyFile(prompt, true);
      resolve(true);
    }
    else if (prompt.startsWith('rm')) {
      try {
        const [filePath] = getArgs(prompt);
        await fsPromises.unlink(filePath);
        const successMessage = `${Consts.responseSign}"${path.basename(filePath)}" file has been succsessfully deleted`;
        console.log(successMessage);
      } catch {
        console.log(Consts.operationError);
      }
      resolve(true);
    }
    else {
      resolve(false);
    }
  })
}

