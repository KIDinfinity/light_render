const lodash = require('lodash');
const { standardColors } = require('./standardColors');
const { calcHexColorsDistance } = require('./calcHexColorsDistance');

const findClosestStandardColor = (color) => {
  const distances = standardColors.map(item => {
    const distance = calcHexColorsDistance(color, item.hex);
    return {
      ...item,
      distance
    }
  });
  console.log('distances', distances)
  const closestColor = lodash.minBy(distances, o=> o.distance);
  return closestColor;
}

module.exports = { findClosestStandardColor };
