import lodash from 'lodash';
import  checkNoneEdit  from './checkNoneEdit';

export default (claimProcessData: any) => {
  const isNoneEdit = checkNoneEdit({
    originRows: claimProcessData?.originRows,
    rows: claimProcessData?.changeData,
    dataFieldList: claimProcessData?.functionData?.dataFieldList,
  });
  return isNoneEdit && !lodash.isEmpty(claimProcessData?.changeData);
};
