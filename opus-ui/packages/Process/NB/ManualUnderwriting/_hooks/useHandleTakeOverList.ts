import { useCallback } from 'react';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { useDispatch, useSelector } from 'dva';

export default () => {
  const takeOverList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.businessData?.takeOverList
    ) || [];
  const dispatch = useDispatch();

  return useCallback(
    (value: any) => {
      if (lodash.isEmpty(takeOverList) && value === 'Y') {
        dispatch({
          type: `${NAMESPACE}/addTakeOverList`,
        });
      }
    },
    [takeOverList]
  );
};
