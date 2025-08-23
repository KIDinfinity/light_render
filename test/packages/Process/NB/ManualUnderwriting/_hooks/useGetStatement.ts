import lodash from 'lodash';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );

  const replacementInfoList = lodash.get(businessData, 'policyList[0].replacementInfoList');
  let statement = '';

  if (replacementInfoList && replacementInfoList?.length > 0) {
    if (replacementInfoList[0].statement) {
      statement = replacementInfoList[0].statement;
    }
  }
  return statement;
};
