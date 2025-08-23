import { useMemo } from 'react';
import { NAMESPACE } from '../activity.config';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const result = useMemo(() => {
    const addressInfo = lodash
      .chain(businessData)
      .get('policyList[0].policyAddressList[0]')
      .value();
    return addressInfo;
  }, [businessData]);
  return result;
};
