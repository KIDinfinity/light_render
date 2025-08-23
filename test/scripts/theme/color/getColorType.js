const lodash = require('lodash');

const getColorType = ({
  codeSplited,
  valueIndex,
}) => {
  console.log('ccc', codeSplited);
  console.log('vvv', valueIndex);
  const map = [{
    reg: /background/,
    value: 'bgColor'
  }, {
    reg: /border/,
    value: 'borderColor'
  }, {
    reg: /color/,
    value: 'color'
  }];
  const contentBase = lodash
  .chain(codeSplited)
  .filter((item, index) =>  index < valueIndex)
  .reverse()
  .value();
  console.log('content base', contentBase);
  let type = 'unkownType';
  for (let i = 0 ; i < map.length; i++) {
    const item = map[i];
    const typeItem = contentBase.find(c => item.reg.test(c))
    console.log('typeItem', typeItem)
    if (typeItem) {
      type = item.value;
      break
    }
  }
  return type;
};

module.exports = {
  getColorType
}
