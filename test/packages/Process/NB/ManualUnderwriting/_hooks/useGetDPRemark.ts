import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ coverageId }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    return (
      lodash
        .chain(businessData)
        .get('policyList[0].coverageList', [])
        .find((item: any) => item?.id === coverageId)
        .get('coverageRemarkList')
        .value() || []
    );
  }, [businessData, coverageId]);
};
