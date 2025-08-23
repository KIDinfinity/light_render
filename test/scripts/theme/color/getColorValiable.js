const fs = require('fs');
const path = require('path');
const lodash = require('lodash');

(() => {
  const valiableFile = path.join(__dirname, './colorValiable.json')
  const colorValiable = path.resolve(__dirname, '../../../src/themes/variables/colors.less');
  const content = fs.readFileSync(colorValiable, 'utf-8');
  const reg = /@[\-|\w]{1,}:\s(\d.)?(\d{1,})?(\w{1,}?(\(\d{1,3},\s\d{1,3},\s\d{1,3}(,\s\d\.?\d{0,2}?%?)?\))?)?(#\w{3,6})?;/g;
  const matchReg = `{${content.match(reg)}}`.replace(/@/g, '\"@').replace(/: /g, '\": \"').replace(/;/g, '\"');
  const result = JSON.parse(matchReg);
  let resultArr = [];
  lodash.forIn(result, (value, key) => {
    let obj = { 'name': key, 'value': value };
    resultArr.push(obj);
  })
  fs.writeFileSync(valiableFile, JSON.stringify(resultArr));
})()
