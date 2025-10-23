import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetChequeEditStatus from 'process/NB/Share/hooks/useGetChequeEditStatus';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';

export default () => {
  const taskNotEditable = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const chequeEditStatus = useGetChequeEditStatus();
  return useMemo(() => {
    if (taskNotEditable) {
      return true;
    }
    if (chequeEditStatus !== ChequeEditStatus.Editing) {
      return true;
    }
    return false;
  }, [taskNotEditable, chequeEditStatus]);
};
