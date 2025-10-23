import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import flatProductConfig from 'opus/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';

export default () => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  return useMemo(() => {
    return flatProductConfig({ planProductConfig });
  }, [planProductConfig]);
};
