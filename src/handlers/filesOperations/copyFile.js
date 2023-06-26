import { Consts } from "../../utils/consts/consts.js";
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises'
import { getArgs } from '../../utils/getArgs.js';

export const copyFile = async (prompt, isMove = false) => {
  return new Promise((resolve) => {
    try {
      const [pathToFile, pathToNewDirectory] = getArgs(prompt);
      const fileName = path.basename(pathToFile);
      const newPathToFile = path.resolve(pathToNewDirectory, fileName);
  
      const readStream = fs.createReadStream(pathToFile);
      const writeStream = fs.createWriteStream(newPathToFile, );
      readStream.pipe(writeStream);
      if (isMove) {
        writeStream.on('finish', async () => {
          fsPromises.unlink(pathToFile).then(() => resolve());
          const successMessage = `${Consts.responseSign}"${path.basename(fileName)}" file has been succsessfully ${isMove ? "moved" : "copied"} to the "${pathToNewDirectory}" folder`;
          console.log(successMessage);
        })
      } else {
        writeStream.on('finish', async () => {
          const successMessage = `${Consts.responseSign}"${path.basename(fileName)}" file has been succsessfully ${isMove ? "moved" : "copied"} to the "${pathToNewDirectory}" folder`;
          console.log(successMessage);
          resolve();
        })
      }

    } catch{
      console.log(Consts.operationError);
    }
  });

}