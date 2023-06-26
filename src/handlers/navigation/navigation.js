import path from 'path';
import fs from 'node:fs/promises';
import { Consts } from '../../utils/consts/consts.js';
import { drawTable } from './drawTable.js';


// Returns True if prompt was caught.
export const navigationOperations = async (prompt) => {
  if (prompt === 'up') {
    const prevDir = process.cwd();
    if (prevDir === `${process.env['HOMEDRIVE']}\\`) {
      console.log(`${Consts.responseSign}You can't go upper`)
      return true;
    }
    process.chdir(path.dirname(process.cwd()));
    console.log(`${Consts.responseSign}You got upper from "${prevDir}"`)
    return true;
  }

  if (prompt.startsWith('cd')) {
    try {
      const newPath = prompt.substring(3);
      const resolvedPath = path.resolve(process.cwd(), newPath);
      process.chdir(resolvedPath);

    } catch {
      console.log(Consts.operationError);
    }
    return true;
  }

  if (prompt === 'ls') {
    const files = await fs.readdir(process.cwd());
    files.sort();

    const foldersList = [];
    const filesList = [];
    for (const file of files) {
      const filePath = path.join(process.cwd(), file);
      let stat;
      try {
      stat = await fs.stat(filePath);
      } catch {continue;};
      stat.isFile() ?
      filesList.push({name: file, type: 'File'}) :
      foldersList.push({name: file, type: 'Folder'});
    };
    const result = [...foldersList,...filesList];
    drawTable(result);
    
    return true;
  }

  return false;
}
