import { useCallback } from 'react';
import lodash from 'lodash';
import useGetProductionAndRider from 'process/NB/ManualUnderwriting/_hooks/useGetProductionAndRider';

export default ({ conditionFieldKey, conditionFieldValue }: any) => {
  const dicts = useGetProductionAndRider();
  return useCallback(
    (productCode) => {
      const needTrigger: boolean = lodash
        .chain(dicts)
        .find((item: any) => item.productCode === productCode)
        .get(conditionFieldKey)
        .isEqual(conditionFieldValue)
        .value();
      return needTrigger;
    },
    [conditionFieldKey, conditionFieldValue, dicts]
  );
};
