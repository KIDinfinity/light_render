import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default ({ type }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    const bankInfoTypeRIndex = lodash
      .chain(businessData)
      .get('policyList[0].bankInfoList')
      .findIndex((item: any) => item.type === type)
      .value();
    const bankInfoTypeNullIndex = lodash
      .chain(businessData)
      .get('policyList[0].bankInfoList')
      .findIndex((item: any) => !item.type)
      .value();
    if (bankInfoTypeRIndex === -1 && bankInfoTypeNullIndex !== -1) {
      return bankInfoTypeNullIndex;
    } else {
      return bankInfoTypeRIndex;
    }
  }, [businessData, type]);
};
