import { useCallback } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

export default () => {
  const taskNotEditable = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  return useCallback(
    ({ record }: any) => {
      if (taskNotEditable) {
        return true;
      }

      if (record?.verifyInd === 'Y') {
        return true;
      }
      return false;
    },
    [taskNotEditable]
  );
};
