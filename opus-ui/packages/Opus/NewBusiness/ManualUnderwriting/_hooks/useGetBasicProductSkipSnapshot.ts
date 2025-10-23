import { shallowEqual } from '@xstate/react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useMemo } from 'react';
import lodash from 'lodash';
import BooleanEnum from 'basic/enum/BooleanEnum';

export default () => {
  const coverageList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.businessData?.policyList?.[0]?.coverageList;
  }, shallowEqual);

  return useMemo(
    () => lodash.find(coverageList, (c) => c.isMain === BooleanEnum.Yes),
    [coverageList]
  );
};
