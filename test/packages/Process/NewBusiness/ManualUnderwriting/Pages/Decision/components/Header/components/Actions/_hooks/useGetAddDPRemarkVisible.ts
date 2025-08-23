import { useMemo } from 'react';
import lodash from 'lodash';
import DefaultValueConfig from 'process/NewBusiness/Enum/DefaultValueConfig';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const cfgRegionalDefaultValueList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.cfgRegionalDefaultValueList,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(cfgRegionalDefaultValueList)
      .find((item) => item.codeType === DefaultValueConfig.RequireCoverageDecisionRemark)
      .get('defaultValue')
      .isEqual('Y')
      .value();
  }, [cfgRegionalDefaultValueList]);
};
