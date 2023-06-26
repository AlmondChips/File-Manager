const responseSign = '> '
const Consts = {
  responseSign: responseSign,
  operationError: `${responseSign}Operation failed`,
  invalidData: `${responseSign}Invalid input`,
  userInputError: 'Udentified user. Please, parse the user name ' +
  'after "start" command, like here: "npm start -- --username=your_username"',
}

export { Consts };