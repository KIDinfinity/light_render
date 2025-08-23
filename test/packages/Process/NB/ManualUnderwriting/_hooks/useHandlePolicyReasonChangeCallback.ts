import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  const allReasonConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allReasonConfigList,
    shallowEqual
  );
  return useCallback(
    (reason: any) => {
      const { reasonName, reasonDescription } = lodash
        .chain(allReasonConfigList)
        .find((reasonItem) => reasonItem.reasonCode === reason)
        .pick(['reasonName', 'reasonDescription'])
        .value();
      dispatch({
        type: `${NAMESPACE}/setPolicySection`,
        payload: {
          changedFields: {
            reasonName,
            reasonDescription,
          },
        },
      });
    },
    [dispatch, allReasonConfigList]
  );
};
