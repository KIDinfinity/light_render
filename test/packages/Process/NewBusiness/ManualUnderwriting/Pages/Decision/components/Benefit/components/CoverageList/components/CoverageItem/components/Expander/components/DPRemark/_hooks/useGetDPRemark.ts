import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ coverageId }: any) => {
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.coverageList,
    shallowEqual
  );
  return useMemo(() => {
    return (
      lodash
        .chain(coverageList)
        .find((item: any) => item?.id === coverageId)
        .get('coverageRemarkList')
        .value() || []
    );
  }, [coverageList, coverageId]);
};
