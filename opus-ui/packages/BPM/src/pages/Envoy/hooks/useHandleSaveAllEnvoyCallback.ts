import { useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const currentReasonGroups = useSelector(
    ({ envoyController }: any) => envoyController.currentReasonGroups,
    shallowEqual
  );
  return useCallback(async () => {
    let i = 0;
    for (const currentGroup of currentReasonGroups) {
      await dispatch({
        type: 'envoyController/setStatus',
        payload: {
          status: 'Save',
          needReload: false,
          groupIdx: i,
        },
      });
      i = i + 1;
    }
  }, [currentReasonGroups]);
};
