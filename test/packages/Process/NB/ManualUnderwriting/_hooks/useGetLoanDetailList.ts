import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from '../activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );

  const loanDetailList =
    lodash.get(businessData, 'policyList[0].loanInfoList[0].loanDetailList') || [];

  return useMemo(() => {
    return loanDetailList;
  }, [businessData]);
};
