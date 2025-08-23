import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientNameConfig from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameConfig';
import DefaultValueConfig from 'process/NB/Enum/DefaultValueConfig';

export default () => {
  const cfgRegionalDefaultValueList = useGetClientNameConfig();
  return useMemo(() => {
    return lodash
      .chain(cfgRegionalDefaultValueList)
      .find((item) => item.codeType === DefaultValueConfig.RequireCoverageDecisionRemark)
      .get('defaultValue')
      .isEqual('Y')
      .value();
  }, [cfgRegionalDefaultValueList]);
};
