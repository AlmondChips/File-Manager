export const getArgs = (prompt) => {
  const [,...args] = prompt.split(' ');
  const str = args.join(' ');
  const regex = /(["'].*?["']|\S+)/g;
  const matches = str.match(regex);

  if (matches.length > 2 || matches.includes(' ')) {
    throw new Error();
  }

  const result = matches.map((item) => item.replace(/["']/g, ''))

  return [...result];
}