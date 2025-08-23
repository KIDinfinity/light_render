import lodash from 'lodash';

const sortOrderMapObj = {
  asc: 'ascend',
  desc: 'descend',
  ascend: 'asc',
  descend: 'desc',
};

const getSortOrderStr = (orderStr: string) => {
  if (lodash.isString(orderStr) && orderStr.length !== 0) {
    return sortOrderMapObj[lodash.toLower(orderStr)];
  }
  return false;
};

export default getSortOrderStr;
