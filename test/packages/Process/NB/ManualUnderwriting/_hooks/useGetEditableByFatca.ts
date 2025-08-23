import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ id }: any) => {
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList[0]?.clientInfoList,
    shallowEqual
  );
  return useMemo(() => {
    const fatca = lodash.find(clientInfoList, (item: any) => item?.id === id)?.fatca;

    return lodash.isEmpty(fatca) ? true : formUtils.queryValue(fatca) === 'Y';
  }, [id, clientInfoList]);
};
