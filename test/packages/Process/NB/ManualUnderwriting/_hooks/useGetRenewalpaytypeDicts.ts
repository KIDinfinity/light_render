import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../activity.config';

export default () => {
  const policyPayMode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList?.[0]?.policyPayMode,
    shallowEqual
  );
  const cfgPlanProductOptions = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.cfgPlanProductOptions,
    shallowEqual
  );
  return useMemo(() => {
    const renewalpaytypeDicts = lodash
      .chain(cfgPlanProductOptions)
      .filter((item) => item.acceptablePaymentMode === formUtils.queryValue(policyPayMode))
      .map((item) => {
        return {
          dictCode: lodash.get(item, 'renewalPaymentMethod'),
          dictName: formatMessageApi({
            Dropdown_POL_PaymentMethod: lodash.get(item, 'renewalPaymentMethod'),
          }),
        };
      })
      .value();
    return !lodash.isEmpty(cfgPlanProductOptions) && renewalpaytypeDicts;
  }, [cfgPlanProductOptions, policyPayMode]);
};
