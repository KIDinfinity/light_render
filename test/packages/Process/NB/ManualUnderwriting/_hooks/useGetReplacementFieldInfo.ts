import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';
import policyReplacementFirstField from 'process/NB/ManualUnderwriting/PolicyReplacement/Detail/policyReplacementFirstField';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );

  return useMemo(() => {
    return {
      ...lodash.get(businessData, 'policyList[0].replacementInfoList[0]'),
      ...lodash.chain(businessData).get('policyList[0]').pick(policyReplacementFirstField).value(),
    };
  }, [businessData]);
};
