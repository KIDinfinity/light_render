const lodash = require('lodash');
const { getClassLevel } = require('./getClassLevel');
const { getColorType } = require('./getColorType');
const { classReg, classNameReg, classNameHasBlank, colorValueStartReg } = require('./reg');
const { formatPathToFilename } = require('./formatPathToFilename');

/**
 * 重命名颜色业务变量
 * @param {Array} Object.codeSplited 切割之后的代码片段
 * @param {String} Object.path 文件路径，用于当收集变量的 key 使用
 * @param {String} Object.originFileContent 原始文件内容
 * @returns {String} 重命名颜色变量之后的代码片段
 */
const colorBizVarNameRule = ({ codeSplited, path, originFileContent }) => {
  const changeSet = new Set();
  // console.log('codeSplited', codeSplited);
  const renameAfter = codeSplited.map((item, index) => {
    if (!colorValueStartReg.test(item)) {
      return item;
    } else {
      console.log('here is color value', item)
    }
    const colorValue = item;
    const type = getColorType({
      codeSplited,
      valueIndex: codeSplited.findIndex(i => i === item),
    })
    let closestClassName = '';
    let closestClassNameLevel = 0;
    for(let i = index; i>=0; i--) {
      const content = codeSplited[i];
      const testResult = classReg.test(content);
      // console.log('content', content);
      // console.log('test result ', testResult);
      if (testResult) {
        const nameBase = new Set();
        const splitByClassName = content.split(classReg).reverse();
        const nameIndex = splitByClassName.findIndex(item => classNameReg.test(item));
        for (let j = nameIndex ; j < splitByClassName.length; j++) {
          if (!classNameHasBlank.test(splitByClassName[j])) {
            console.log('class has not blank', splitByClassName[j])
            continue;
          }
          const className = splitByClassName[j];
          const classNameLevel = getClassLevel(splitByClassName[j]);
          if (!closestClassName) {
            closestClassName = className;
          }
          if (!closestClassNameLevel) {
            closestClassNameLevel = classNameLevel;
            nameBase.add({
              name: className,
              level: classNameLevel
            })
          }
          if (classNameLevel < closestClassNameLevel) {
            nameBase.add({
              name: className,
              level: classNameLevel
            })
          }
        }

        let finalName = lodash.chain([...nameBase])
        .sortBy('level')
        .map(item =>
          item.name.replace('.', '')
          .replace('\n', '')
          .replace(/\s*/, '')
        )
        .join('-')
        .value();
        console.log('finalName', finalName);
        const variable = ['-','p', formatPathToFilename(path), 'c', finalName, 't', type]
        .filter(item => !!item)
        .join('-');
        // console.log('colorValue', colorValue)
        const privateLessVar = new RegExp(`${colorValue.replace(';', ':')}`);
        // 变量是less 文件内自己声明的
        if (privateLessVar.test(originFileContent)) {
          console.log('private var', item);
          return colorValue;
        } else {
          changeSet.add({
            from: colorValue,
            to: variable,
          })
          return `var(${variable});`;
        }

      }
    }
    return item;
  });
  // console.log('before', codeSplited);
  // console.log('after', renameAfter)
  // console.log('change set ', [...changeSet])
  return {
    change: [...changeSet],
    content: renameAfter
  }
}

module.exports = { colorBizVarNameRule };
