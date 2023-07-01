import zlib from 'node:zlib';
import fs from 'fs';
import fsPromises from 'fs/promises'
import { getArgs } from '../utils/getArgs.js';
import path from 'node:path';
import { Consts } from '../utils/consts/consts.js';
import { pipeline } from 'node:stream/promises';

export const compressOperations = async (prompt) => {
  return new Promise(async (resolve) => {
    if (prompt.startsWith('compress')){
      await fileTransform(prompt, zlib.createBrotliCompress());
      resolve(true);
    } else 
    if (prompt.startsWith('decompress')){
      await fileTransform(prompt, zlib.createBrotliDecompress(), false);
      resolve(true);
    } else {
      resolve(false)
    }
  })
}

const fileTransform = async (prompt, transfomrObject, compress = true) => {
  return new Promise(async (resolve) => {
    try {
      const [pathToFile, pathToDestination] = getArgs(prompt);
      const isError = await fsPromises.stat(pathToFile).then(() => false).catch(() => {
        return true;
      })
      if (isError) {
        resolve(true);
        return;
      };
      const fileName = path.basename(pathToFile);
      const isDestinationFile = await fsPromises.stat(pathToDestination).then(() => false).catch(() => true);
      const destination = isDestinationFile ?
      pathToDestination :
      path.resolve(pathToDestination, fileName.replace(/\.[^/.]+$/, compress ? '.br' : '.txt'))
      const readStream = fs.createReadStream(pathToFile);
      const writeStream = fs.createWriteStream(destination);
      readStream.on('error', () =>{
         console.log(Consts.invalidData)
         resolve(true)
      });
      writeStream.on('error', () => {
        console.log(Consts.invalidData);
        resolve(true);
      });
      writeStream.on('finish', () =>  {
        console.log(`${Consts.responseSign}"${fileName}" file has been succsessfully`+
        ` ${compress ? 'compressed' : 'decompressed'} to "${path.dirname(destination)}"`)
        resolve(true);
      })

      readStream.pipe(transfomrObject).pipe(writeStream);

    } catch (e){
      console.log(Consts.operationError);
      resolve(true)
    }
  })
}