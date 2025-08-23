import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const policyReplacementFlag = useMemo(() => {
    return lodash.get(businessData, 'policyList[0].policyReplacementFlag');
  }, [businessData]);
  return policyReplacementFlag;
};
