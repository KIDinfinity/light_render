import { useMemo } from 'react';
import lodash from 'lodash';
import useGetPremiumTransferList from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumTransferList';
import TransferPaymentStatus from 'process/NB/ManualUnderwriting/Enum/TransferPaymentStatus';

export default () => {
  const list = useGetPremiumTransferList();
  return useMemo(() => {
    return lodash.filter(list, (item: any) => item?.status !== TransferPaymentStatus.Cancel);
  }, [list]);
};
