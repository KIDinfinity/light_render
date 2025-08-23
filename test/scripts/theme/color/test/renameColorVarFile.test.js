const path = require('path');
const { renameColorVarFile } = require('../renameColorVarFile');

(() => {
const filePath = path.resolve(__dirname, '../../../../src/themes/variables/colors.less');
renameColorVarFile(filePath)
})();
