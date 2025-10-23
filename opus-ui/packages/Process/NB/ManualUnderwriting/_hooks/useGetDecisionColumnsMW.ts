import { useMemo } from 'react';
import lodash from 'lodash';
import useGetDecisionColumns from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionColumns';

export default () => {
  const columns = useGetDecisionColumns();

  return useMemo(() => {
    return lodash.filter(
      columns,
      (column: any) =>
        !(
          column.key === 'clientId'
        )
    );
  }, [columns]);
};
