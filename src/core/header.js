import { stdout } from 'node:process';

export const drawHeader = (userName) => {
  const headerMessage = `Welcome to the File Manager, ${userName}!`;
  const spaceLength = (stdout.columns - (stdout.columns / 2)) - headerMessage.length / 2 ;
  const header = ' '.repeat(spaceLength) + headerMessage + ' '.repeat(spaceLength);
  console.log(header);
  console.log(`╠` + '═'.repeat(stdout.columns-2) + `╣`);
}