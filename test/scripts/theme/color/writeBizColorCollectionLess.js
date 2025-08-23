const path = require('path');
const lodash = require('lodash');
const { readFile, writeFile } = require('fs/promises');

const writeBizColorCollectionLess =  async ({ sourcePath, targetPath, theme }) => {
  try {
    const content = await readFile(sourcePath, 'utf-8');
    const data = JSON.parse(content);
    let result = '';
    lodash
    .chain(data)
    .get('change')
    .entries()
    .forEach(([key, value]) => {
      // console.log(key, value);
      lodash.forEach(value, item => {
        result = `${result}\n${item.to}: ${item.from}`;
      })

    })
    .value();
    const finalString = `@import (reference) '~@/themes/variables.less';

    body[data-class='body-wrap-${theme}'] {${result}
    }`
    await writeFile(targetPath, finalString, 'utf8');
  } catch (e) {
    console.error('write file error')
  }
}

module.exports = {
  writeBizColorCollectionLess
}
