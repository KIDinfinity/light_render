import { useEffect } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();

  const SAMultiplierOPUSListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.SAMultiplierOPUSListMap,
    shallowEqual
  );
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig
  );
  useEffect(() => {
    if (lodash.isNil(SAMultiplierOPUSListMap) && !lodash.isEmpty(planProductConfig)) {
      dispatch({
        type: `${NAMESPACE}/getSAMultiplierOPUS`,
      });
    }
  }, [planProductConfig]);
};
