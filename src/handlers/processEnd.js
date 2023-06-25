import { parseInput } from "../utils/parseInput.js";

export const setUpCliClose = (userName) => {
  const processExit = () => {
    console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
  }
  process.stdin.on('data', (data) => {
    if(parseInput(data) === '.exit')
    processExit();
  })
  process.on('SIGINT', (data) => {
    processExit();
  });

}

