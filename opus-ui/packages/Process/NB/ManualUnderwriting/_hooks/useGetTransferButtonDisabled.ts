import { useMemo } from 'react';
import lodash from 'lodash';
import useGetPremiumTransferList from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumTransferList';
import TransferPaymentStatus from 'process/NB/ManualUnderwriting/Enum/TransferPaymentStatus';

export default () => {
  const list = useGetPremiumTransferList();

  return useMemo(() => {
    return lodash.every(list, (item: any) => {
      return item?.status === TransferPaymentStatus.Success;
    });
  }, [list]);
};
