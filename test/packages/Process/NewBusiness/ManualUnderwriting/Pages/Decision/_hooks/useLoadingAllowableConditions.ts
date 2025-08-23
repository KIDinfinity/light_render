import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import {  chain } from 'lodash';
import {  useMemo } from 'react';

export default (reasonCode: string, loadingIndicator: string, value: string) => {
  const loadingAllowableConfigs = useSelector(
    ({ [NAMESPACE]: model }) => model.loadingAllowableConfigs
  );

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
