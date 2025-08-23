const { hexToRgb } = require('./hexToRgb');

const calcHexColorsDistance = (colorFirst, colorSecond) => {
  const hexReg = /#([a-z|1-9|A-Z]{6,6}$| [a-z|1-9|A-Z]{3,3}$)|/;
  if (hexReg.test(colorFirst) && hexReg.test(colorSecond)) {
    const rgbColorFirst = hexToRgb(colorFirst);
    const rgbColorSecond = hexToRgb(colorSecond);
    const distance = Math.sqrt(Math.pow((rgbColorFirst[0] - rgbColorSecond[0] )
    ,2)
    + Math.pow(
      (rgbColorFirst[1] - rgbColorSecond[1])
      , 2)
      +
      Math.pow((rgbColorFirst[2] - rgbColorSecond[2]),2)
    )
    return Math.ceil(distance);
  }
  return false;
}

module.exports = { calcHexColorsDistance };
