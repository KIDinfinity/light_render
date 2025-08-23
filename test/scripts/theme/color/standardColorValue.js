const { standardizingRgba } = require('./standardizingRgba');
const { rgbToHex } = require('./rgbToHex');
const { formatFileContent } = require('./formatFileContent');
const { formatDirFiles } = require('../../helper/formatDirFiles');
const { filterLessFile } = require('./filterLessFile');
const { replaceHardCardHexColorValue } = require('./replaceHardCardHexColorValue');

const standardColorValue = (dictPath) => {
  formatDirFiles({
    dictPath,
    format: (filePath) => {
      return formatFileContent(filePath, text =>  standardizingRgba(rgbToHex(replaceHardCardHexColorValue(text))))
    },
    fileFilter: filterLessFile
  })
}

module.exports = {
  standardColorValue
}
