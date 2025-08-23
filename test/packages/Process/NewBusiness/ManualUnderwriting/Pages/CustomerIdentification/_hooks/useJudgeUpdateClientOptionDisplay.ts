import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';
import { useMemo } from 'react';
import lodash from 'lodash';

export default () => {
  const cfgRegionalDefaultValueList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.cfgRegionalDefaultValueList,
    shallowEqual
  );

  /**
   * "refreshFromLaForSuspectClient" as an indicator which come from 'cfgRegionalDefaultValueList' to control whether to display the suspect client Update Client Option
   * @returns {string} - S: display the suspect client Update Client Option, else: hide the suspect client Update Client Option
   */
  return useMemo(() => {
    const result = lodash.isEmpty(cfgRegionalDefaultValueList)
      ? undefined
      : lodash
          .chain(cfgRegionalDefaultValueList)
          .find((item: any) => item?.codeType === 'refreshFromLaForSuspectClient')
          .get('defaultValue')
          .value();
    return result === 'S';
  }, [cfgRegionalDefaultValueList]);
};
