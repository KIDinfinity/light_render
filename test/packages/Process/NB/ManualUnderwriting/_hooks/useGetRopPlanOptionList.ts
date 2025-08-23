import { useEffect } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default (productCodeList?: string[]) => {
  const dispatch = useDispatch();

  const ropPlanOptionListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ropPlanOptionListMap,
    shallowEqual
  );
  useEffect(() => {
    if (lodash.isNil(ropPlanOptionListMap)) {
      dispatch({
        type: `${NAMESPACE}/getRopPlanOptionList`,
        payload: { productCodeList },
      });
    }
  }, [productCodeList]);
};
