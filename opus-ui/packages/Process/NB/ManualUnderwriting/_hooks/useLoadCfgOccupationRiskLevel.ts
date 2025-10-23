import { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import lodash from 'lodash';

export default () => {
  const dispatch = useDispatch();
  const cfgOccupationRiskLevel = useSelector(
    ({ [NAMESPACE]: model }) => model.cfgOccupationRiskLevel
  );
  useEffect(() => {
    if (lodash.isNil(cfgOccupationRiskLevel)) {
      dispatch({ type: `${NAMESPACE}/getCfgOccupationRiskLevel` });
    }
  }, []);
};
