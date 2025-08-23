import { useCallback } from 'react';
import lodash from 'lodash';
import useGetDecisionColumnsMW from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionColumnsMW';

export default () => {
  const decisionColumns = useGetDecisionColumnsMW();
  return useCallback(
    ({ field }) => {
      return (
        lodash
          .chain(decisionColumns)
          .find((fieldConfig: any) => fieldConfig.field === field)
          .get('field-props.x-layout.lg.span')
          .value() || 0
      );
    },
    [decisionColumns]
  );
};
