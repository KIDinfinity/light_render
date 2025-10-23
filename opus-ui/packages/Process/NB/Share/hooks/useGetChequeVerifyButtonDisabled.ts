import { useMemo } from 'react';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';
import useGetChequeEditStatus from 'process/NB/Share/hooks/useGetChequeEditStatus';

export default () => {
  const chequeEditStatus = useGetChequeEditStatus();
  return useMemo(() => {
    return chequeEditStatus === ChequeEditStatus.Verified;
  }, [chequeEditStatus]);
};
