import { useMemo } from 'react';
import lodash from 'lodash';
import useGetDecisionColumnsMW from './useGetDecisionColumnsMW';

export default () => {
  const decisionColumns = useGetDecisionColumnsMW();

  return useMemo(() => {
    return lodash
      .chain(decisionColumns)
      .map((fieldConfig: any) => fieldConfig.span)
      .reduce((sum, n) => {
        return sum + n;
      }, 0)
      .value();
  }, [decisionColumns]);
};
