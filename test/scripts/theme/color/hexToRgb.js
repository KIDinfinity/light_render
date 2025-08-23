const {  hexColorValue } = require('./reg');

const hexToRgb = text => {
  const hexReg = /(#)([a-z|A-Z|0-9]{6}|[a-z|A-Z|0-9]{3})/ig;
  if (hexReg.test(text)) {
    const array = text.split(hexReg);
    let colorValue = array.find(item => hexColorValue.test(item));
    if (colorValue.length === 3) {
      colorValue = `${colorValue}${colorValue}`;
    }
    const result = colorValue.split(/([a-z|A-Z|0-9]{2})([a-z|A-Z|0-9]{2})([a-z|A-Z|0-9]{2})/)
    .filter(item => !!item)
    .map(item => {
      // console.log('item', item);
      return parseInt(item, 16)
    })
    return result;
  } else {
    console.log('not pass', `6666-${text}-666`);

  }
  return text;
}

module.exports = { hexToRgb };
