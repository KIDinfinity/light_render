const lodash = require('lodash');
const { readFile, writeFile }  = require('fs/promises');

const updateColorBizCollection = async ({
  path,
  collectionFile,
  change
}) => {
  const content = await readFile(collectionFile, 'utf8');
  const reg = /^\{"change":/;
  let json = {
    change: {}
  }
  if (reg.test(content)) {
    json = JSON.parse(content);
  } else {
    console.log('aaaaaa')
  }
  const originChange = lodash.get(json, `change`);
  const currrentFileChange = lodash.get(originChange, `${path}`, []);
  const result = {
    change: {
      ...originChange,
      [path]: lodash.uniqWith([
        ...currrentFileChange,
        ...change
      ], lodash.isEqual)
    }
  }
  return await writeFile(collectionFile, JSON.stringify(result))
}

module.exports = { updateColorBizCollection }
