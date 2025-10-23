import RecordFormatEnem from '../enum/RecordFormatEnem';

function replaceRecord(str = '', record) {
  const recordMap = {
    [RecordFormatEnem.bulletPoint]: ' • ',
    [RecordFormatEnem.seqNo]: ' recordSeqNoIndex. ',
  };
  const whiteList = ['STP is not passed as'];
  const regSign = '$%^&';
  const regSign2 = '\n$%^&';
  // 换行处添加特殊标签
  let changeStr = str.replace(/\n/gi, regSign2);
  // 开头添加特别标签
  changeStr = `${regSign}${changeStr}`;
  // 白名单去除特别标签
  whiteList.forEach((item) => {
    changeStr = changeStr.replace(`${regSign}${item}`, item);
  });
  // 将特殊标签转化成对应标签
  changeStr = changeStr.replaceAll(regSign, recordMap[record] || '');
  // 如果是显示数字，那么转化成数字
  if (record === RecordFormatEnem.seqNo) {
    let index = 0;
    return changeStr.replace(/recordSeqNoIndex/gi, (item) => {
      index += 1;
      return index;
    });
  }
  return changeStr;
}
export default replaceRecord;
