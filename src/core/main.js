import { stdin, stdout } from 'node:process';
import {setUpCliClose} from '../handlers/processEnd.js';
import { parseInput } from '../utils/parseInput.js';
import { Consts } from '../utils/consts/consts.js';
import { drawHeader } from './header.js';

import { operations } from '../utils/consts/operations.js';
const app = async () => {
  process.chdir( process.env['HOME']);
  let userName;
  try {
    [,userName] = process.argv.find(str => str.startsWith('--username')).split('=');
  } catch (error) {
    throw new Error();
  }

  drawHeader(userName);
  askForPrompt();
  stdin.on('data', async (data) => {
    const prompt = parseInput(data);

    if (prompt === '.exit') return;

    let isOperationFound = false;
    
    for (const operationGroup of operations) {
      if(await operationGroup(prompt)) {
        isOperationFound = true;
        break;
      }
    }
    isOperationFound || console.log(`${Consts.responseSign}Operation is not found`);
    console.log();
    askForPrompt();
  })

  setUpCliClose(userName);
}

const askForPrompt = () => {
  console.log(`You are currently in ${process.cwd()}`); 
  stdout.write('Your prompt> ');
}

app();