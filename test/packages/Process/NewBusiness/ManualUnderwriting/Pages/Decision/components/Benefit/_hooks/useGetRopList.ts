import { useEffect } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();

  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );

  useEffect(() => {
    if (lodash.isEmpty(planProductConfig)) {
      return;
    }

    dispatch({
      type: `${NAMESPACE}/getRopList`,
    });
  }, [planProductConfig]);
};
