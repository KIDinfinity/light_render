import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { isEmpty, chain } from 'lodash';
import { useEffect, useMemo } from 'react';

export default (reasonCode: string, loadingIndicator: string, value: string) => {
  const dispatch = useDispatch();
  const loadingAllowableConfigs = useSelector(
    ({ [NAMESPACE]: model }) => model.loadingAllowableConfigs
  );

  useEffect(() => {
    if (isEmpty(loadingAllowableConfigs)) {
      dispatch({
        type: `${NAMESPACE}/getCfgLoadingAllowable`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const condition = useMemo(
    () =>
      chain(loadingAllowableConfigs)
        .find((cfg) => cfg.loadingReasonCode === reasonCode)
        .value(),
    [loadingAllowableConfigs, reasonCode]
  );

  return useMemo(() => !reasonCode || !condition || condition[loadingIndicator] === value, [
    condition,
    loadingIndicator,
    reasonCode,
    value,
  ]);
};
