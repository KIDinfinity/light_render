const path = require('path');
const { formatFileContent } = require('./formatFileContent');
const { findClosestStandardColor } = require('./findClosestStandardColor');
const { updateColorChangeLog } = require('./updateColorChangeLog');

const renameColorVarFile = (filePath) => {
  formatFileContent(filePath, (text) => {
    const hexVarReg = /(@.{1,}:\s)(#[0-9|a-z|A-Z]{6,6})(;)/
    const splitResult = text.split(hexVarReg);
    const colorValue = splitResult.find(item => /#[0-9|a-z|A-Z]{3,6}$/.test(item));
    if (colorValue) {
      const closestStandardColor = findClosestStandardColor(colorValue);
      console.log('closestStandardColor', closestStandardColor);
      console.log('color value ', colorValue);
      const rename = splitResult.map(item => {
        const originNameReg = /@.{1,}:\s/
        if (originNameReg.test(item)) {
          const distance = Math.ceil(closestStandardColor.distance);
          if (distance) {
            const newName = `@${closestStandardColor.name}-${distance}`;
            updateColorChangeLog({
              from: item.replace(/:\s/, ''),
              to: newName
            })
            return `${newName}: `
          }
        }
        return item;
      }).join('')
      return rename;
    }
    return text;
  })
};

module.exports =  { renameColorVarFile }
