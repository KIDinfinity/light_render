import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/EWS/activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const ewsDataMap = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.ewsDataMap,
    shallowEqual
  );
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/setEwsSelectedEwsVersion`,
      payload: {
        selectedEwsVersion: id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/setCurrentVersionEWS`,
      payload: {
        currentVersionEWS: lodash.get(ewsDataMap, id),
      },
    });
  }, [ewsDataMap, id]);
};
