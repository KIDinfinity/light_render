import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import type { planProductConfig } from '../types';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import flatProductConfig from 'process/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';

export default () => {
  const planProductConfig: planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  return useMemo(() => {
    return flatProductConfig({ planProductConfig });
  }, [planProductConfig]);
};
