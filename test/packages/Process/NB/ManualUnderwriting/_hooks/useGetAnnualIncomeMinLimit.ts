import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { formUtils } from 'basic/components/Form';

export default ({ clientId }: any) => {
  const list = useGetClientDetailList();
  return useMemo(() => {
    const value = formUtils.queryValue(
      lodash
        .chain(list)
        .find((item: any) => item.id === clientId)
        .get('incomeRange')
        .value()
    );
    const annualIncomeMinMapping = {
      '01': 0,
      '02': 25000,
      '03': 36000,
      '04': 51000,
      '05': 76000,
      '06': 100000,
      '07': 150000,
      '08': 200000,
    };
    const min = annualIncomeMinMapping[value] || 0;
    return min;
  }, [list, clientId]);
};
