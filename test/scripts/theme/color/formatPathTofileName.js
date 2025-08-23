const lodash = require('lodash');

const formatPathToFilename = (path) => {
  const fileNameReg = /(Venus-UI\/)([\w|\/]*\/\w*)(\.less)$/;
  const array = path.split(fileNameReg);
  console.log('array', array)
  const chunk = lodash
  .chain(array)
  .get('[2]')
  .replace(/\//g, '-')
  .split('-')
  .chunk(3)
  .value();
  console.log(chunk, 'chunk');
  let nameBase = lodash.first(chunk);
  if (chunk.length > 1) {
   nameBase = lodash
    .chain(chunk)
    .filter(item => item.length === 3)
    .last()
    .value()
  }
  console.log(nameBase, 'namebase')
  const name =  nameBase.join('-');
  return name;
}

module.exports = { formatPathToFilename };
