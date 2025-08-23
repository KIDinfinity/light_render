const { hexReg } = require('./reg');

const replaceHardCardHexColorValue = (text) => {
  // console.log('text', text);
  const testHex = hexReg.test(text);
  if (testHex) {
    console.log(text, 'text Hexx')
  }
  return text;
}

module.exports = {replaceHardCardHexColorValue};
