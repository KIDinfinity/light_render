import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default () => {
  const dispatch = useDispatch();
  const currentReasonGroups = useSelector(
    (state: any) => state.envoyController.currentReasonGroups,
    shallowEqual
  );
  return useCallback(
    (value) => {
      dispatch({
        type: 'envoyController/handleBatchEnvoySelect',
        payload: {
          batchEnvoySelected: value,
        },
      });
      if (!lodash.isEmpty(value)) {
        const index = lodash.findIndex(currentReasonGroups, (item: any) => {
          return item.id === lodash.last(value);
        });
        dispatch({
          type: 'envoyController/setActivedGroupKey',
          payload: {
            activedGroupKey: index,
          },
        });
      }
    },
    [currentReasonGroups]
  );
};
