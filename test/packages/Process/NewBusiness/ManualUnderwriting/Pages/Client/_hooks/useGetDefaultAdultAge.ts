import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const defaultAdultAge = lodash
    .chain(businessData)
    .get('cfgRegionalDefaultValueList', [])
    .find((item: any) => item?.codeType === 'adultAge')
    .get('defaultValue')
    .value();

  return useMemo(() => defaultAdultAge, [defaultAdultAge]);
};
