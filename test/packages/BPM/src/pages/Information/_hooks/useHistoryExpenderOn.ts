import { useEffect, useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';

export default ({ isExpanderSwitchOn }: any) => {
  const dispatch = useDispatch();
  const { activityHistoryPanel, allCategoryHistory } = useSelector(
    (state: any) => ({
      activityHistoryPanel: state?.navigatorInformationController?.activityHistoryPanel,
      allCategoryHistory: state?.navigatorInformationController?.allCategoryHistory,
    }),
    shallowEqual
  );
  const handleChangeExpander = useCallback(
    (expanderSwitchOn) => {
      if (expanderSwitchOn) {
        if (activityHistoryPanel.length) {
          dispatch({
            type: 'navigatorInformationController/setActivityHistoryItem',
            payload: {
              activityHistoryItem: lodash
                .chain(activityHistoryPanel)
                .filter((item) => !!item)
                .last()
                .value(),
            },
          });
        } else {
          const firstHistoryItem = lodash
            .chain(allCategoryHistory)
            .map((category) => category?.categoryCode)
            .first()
            .value();
          dispatch({
            type: 'navigatorInformationController/setActivityHistoryItem',
            payload: {
              activityHistoryItem: firstHistoryItem,
            },
          });
        }
      }
    },
    [activityHistoryPanel, allCategoryHistory]
  );
  useEffect(() => {
    handleChangeExpander(isExpanderSwitchOn);
  }, [isExpanderSwitchOn, allCategoryHistory]);
};
