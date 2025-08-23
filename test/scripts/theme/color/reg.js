const classReg = /(\s{0,}\.[a-z|A-Z|\-]{1,})(\s\{)/;
const colorValueReg = /@[a-z|A-Z|\s|\d|\-]{1,};/;
const classNameReg = /&?(\.|:)[a-z|A-Z\-]{1,}$/;
const classNameHasBlank = /^(\n{0,})\s{0,}\.\w*$/
// const colorReg = /(background|border-color|color|border)(:\s)(solid\s\d+px\s?)(@[a-z|A-Z|\-|\d]{1,};)/g;
// const colorReg = /(background|background-color|border|border-[left|right|top|bottom]-color|border-color|border-[left|right|top|bottom]|color)(:\s(\w|\d){0,}\s?[\d|\w]{0,}?\s?)(@[a-z|A-Z|\-|\d]{1,};)/i;
const colorReg = /(border-left|border-right|border-top|border-bottom|background-color|border|color|background)(:\s[\w|\d]{0,}\s?[\d|\w]{0,}?\s?)(@[a-z|A-Z|\-|\d]{1,};)/i;
const classBlockReg = /(&?\s?[\.|:][a-z|A-Z|\-]{1,})(\s?\{\n\s{1,}[%|\w|:|\s|;|\-|\(|\)|\>|\.|&|\{|@]*)/;
const rgbaPointReg = /(background-color|color|border-color)(:\srgba\([0-9]{1,3},\s[0-9]{1,3},\s[0-9]{1,3},\s)(1|0\.[1-9])(\))/ig;
const hexRegEnd = /(#)([a-z|A-Z|0-9]{6}$|[a-z|A-Z|0-9]{3}$)/i;
const hexReg = /(#)([a-z|0-9]{6}|[a-z|0-9]{3})/ig;
const hexColorValue = /[a-z|A-Z|0-9]{3}|[a-z|A-Z|0-9]{6}/
const colorValueStartReg = /^@[a-z|A-Z|\-|\d]{1,};/;

/*
const reg16 = /(background-color|border-color|color):\s#[1-9|a-z|A-Z]{6,6}|color:\s#[1-9|a-z|A-Z]{6,6}｜border-color:#[1-9|a-z|A-Z]{6,6}/ig;
  const testResult = reg16.test(text);
  if (testResult) {
    // console.log('text', text)
  }
  const rgb = /(background-color|border-color|color):\srgb\([0-9]{1,3},\s[0-9]{1,3},\s[0-9]{1,3}\)/ig;
  if (rgb.test(text)) {
    // console.log('rgb here', text);
  }
  const rgba = /(background-color|border-color|color):\srgba\([0-9]{1,3},\s[0-9]{1,3},\s[0-9]{1,3},\s([0|1]\.?[0-9]{1,2}|[0-9]{1,2}\%)?\)/ig
  if (rgba.test(text)) {
    // console.log('rgba here', text);
  }

*/


  module.exports = {
    classReg,
    colorValueReg,
    classNameReg,
    classNameHasBlank,
    colorReg,
    classBlockReg,
    rgbaPointReg,
    hexRegEnd,
    hexColorValue,
    hexReg,
    colorValueStartReg
  }
