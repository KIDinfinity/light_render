import { useMemo } from 'react';
import lodash from 'lodash';
import useGetPremiumTransferList from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumTransferList';
import { formUtils } from 'basic/components/Form';
import TransferPaymentStatus from 'process/NB/ManualUnderwriting/Enum/TransferPaymentStatus';

export default () => {
  const list = useGetPremiumTransferList();
  return useMemo(() => {
    return lodash
      .chain(list)
      .filter((item: any) => item?.status === TransferPaymentStatus.Success)
      .map((item: any) => formUtils.queryValue(item?.amount) || 0)
      .reduce((a: number, b: number) => {
        return a + b;
      })
      .value();
  }, [list]);
};
