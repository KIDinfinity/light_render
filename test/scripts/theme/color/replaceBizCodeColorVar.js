const path = require('path');
const fs = require('fs');
const { readFile }  = require('fs/promises');

const { formatFileContent } = require('./formatFileContent');
// src/themes/variables/colors.less
const { formatDirFiles } = require('../../helper/formatDirFiles');
const { filterLessFile } = require('./filterLessFile');
const lodash = require('lodash');

/**
 * 替换业务代码中的颜色变量
 * @param {String} object.dictPath 文件夹路径
 * @param {Array} object.changeLog 颜色变量变更记录
 */
const replaceBizCodeColorVar = ({ dictPath, changeLog }) => {
  formatDirFiles({
    dictPath,
    fileFilter: filterLessFile,
    format: async (filePath) => {
      // const fileContent = await readFile(filePath, 'utf-8');

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      // console.log(fileContent, 'filecontent');
      // const writeStream = fs.createWriteStream(filePath);

      let result = fileContent;
      changeLog.forEach(item => {
        const reg = new RegExp(`${item.from};`);
        const regBlank = RegExp(`${item.from} `);
        const regC = new RegExp(`${item.from},`);
        const regD = new RegExp(`${item.from}\\)`);
        const regE = new RegExp(`${item.from}`+ '\n');
        const rules = [{
            target: reg,
            result: `${item.to};`
          }, {
            target: regBlank,
            result: `${item.to} `
          }, {
            target: regC,
            result:`${item.to},`
          }, {
            target: regD,
            result:`${item.to})`
          }, {
            target: regE,
            result: `${item.to}` + '\n'
          }]
          const formatContent = () => {
            rules.forEach(rule => {
              result = result.replace(rule.target, rule.result)
            })
            if (rules.find(rule => rule.target.test(result))) {
              formatContent()
            }
          }
          formatContent();
      })


      fs.writeFileSync(filePath, result, (err) => {
        if (err) {
          console.error(`write ${filePath} error`);
        }
      })
    }
  })
}

module.exports = {
  replaceBizCodeColorVar
}
