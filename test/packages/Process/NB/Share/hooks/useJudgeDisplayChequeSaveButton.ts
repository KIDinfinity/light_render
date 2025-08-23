import { useMemo } from 'react';
import useGetChequeEditStatus from 'process/NB/Share/hooks/useGetChequeEditStatus';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';

export default () => {
  const chequeEditStatus = useGetChequeEditStatus();
  return useMemo(() => {
    return chequeEditStatus === ChequeEditStatus.Editing;
  }, [chequeEditStatus]);
};
