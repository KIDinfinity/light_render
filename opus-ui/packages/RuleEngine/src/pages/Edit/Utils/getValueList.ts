import lodash from 'lodash';

export default ({ atomInfo, operator, }: any) => {
  if (!operator) return [];
  let operatorType = '';
  if (operator.includes('belongs')) {
    operatorType = 'belongs to';
  } else if (operator.includes('in')) {
    operatorType = 'in';
  } else {
    operatorType = 'others';
  }

  return !lodash.isEmpty(atomInfo)
    ? lodash
      .chain(atomInfo?.dataMap[operatorType])
      .filter((el: any) => !lodash.isEmpty(el.itemCode) && !lodash.isEmpty(el.itemName))
      .value() || []
    : [];

};
