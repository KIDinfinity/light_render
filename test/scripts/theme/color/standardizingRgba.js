const { rgbaPointReg } = require('./reg');
/**
 * 标准化rgba的写法
 * @param {String} text
 * @return {String} rgba(number, number, number, numser%)
 */
const standardizingRgba = (text) => {
  if (rgbaPointReg.test(text)) {
    const result = text.split(rgbaPointReg).map(t => {
      if(/[0|1].[0-9]{1,2}/ig.test(t)) {
        return `${Number(t) * 100}%`
      }
      return t;
    }).join('');
    return result;
  }
  return text;
}

module.exports = { standardizingRgba }
