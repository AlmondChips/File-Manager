import { Consts } from "../../utils/consts/consts.js";

export const drawTable = (result) => {
  if (result.length === 0) {
    process.stdout.write(`${Consts.responseSign}Folder is empty!\n`)
    return;
  }
  // 1
  const longestIndex = result.length.toString();
  // 2
  const longestName = [...result].sort(
     (a, b) => {
        return b.name.length - a.name.length;
    }
  )[0].name;
  const nameLable = 'Name';
  const indexLable = '(index)';
  const typeLable = 'Type';

  const indexData = [indexLable, longestIndex, 2];
  const nameData = [nameLable,longestName, 2];
  const typeData = [typeLable,'Folder', 2];

  const indexColumnText = drawTableLable(...indexData);
  const nameColumnText = drawTableLable(...nameData);
  const typeColumnText = drawTableLable(...typeData);

  console.log(`┌${drawStraightLine(...indexData)}┬${drawStraightLine(...nameData)}┬${drawStraightLine(...typeData)}┐`);
  console.log(`│${indexColumnText}│${nameColumnText}│${typeColumnText}│`);
  console.log(`├${drawStraightLine(...indexData)}┼${drawStraightLine(...nameData)}┼${drawStraightLine(...typeData)}┤`);
  result.forEach((item, idx) => {
    console.log(`│${drawTableLable(idx.toString(), indexColumnText)}│\x1b[32m${drawTableLable(item.name, nameColumnText)}\x1b[0m│\x1b[32m${drawTableLable(item.type, typeColumnText)}\x1b[0m│`)
  });
  console.log(`└${drawStraightLine(...indexData)}┴${drawStraightLine(...nameData)}┴${drawStraightLine(...typeData)}┘`);
}

const drawTableLable = (lable, longestString, gap = 0) => {
  const padding = Math.abs(lable.length - longestString.length);
  const isPaddingEven = padding % 2 === 0;
  const halfOfLableLength = Math.floor(padding / 2);
  return `${drawPadding(gap)}${' '.repeat(halfOfLableLength)}${lable}${' '.repeat(isPaddingEven ? halfOfLableLength : halfOfLableLength + 1 )}${drawPadding(gap)}`
}

// Accepts number of paddings
const drawPadding = (padding) => {
  return ' '.repeat(padding);
}

const drawStraightLine = (lable, longestString, gap = 0) => {
  return '─'.repeat(lable.length + Math.abs(longestString.length - lable.length) + gap*2)
}