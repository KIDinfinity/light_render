import { useEffect, useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';

export default ({ isExpanderSwitchOn }: any) => {
  const dispatch = useDispatch();
  const { activityHistoryItem } = useSelector(
    (state: any) => ({
      activityHistoryItem: state?.navigatorInformationController?.activityHistoryItem,
    }),
    shallowEqual
  );
  const handleChangeExpander = useCallback(
    (expanderSwitchOn) => {
      if (!expanderSwitchOn) {
        dispatch({
          type: 'navigatorInformationController/setActivityHistoryPanel',
          payload: {
            activityHistoryPanel: lodash.isArray(activityHistoryItem)
              ? activityHistoryItem
              : [activityHistoryItem],
          },
        });
      }
    },
    [activityHistoryItem]
  );
  useEffect(() => {
    handleChangeExpander(isExpanderSwitchOn);
  }, [isExpanderSwitchOn]);
};
