import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ policyPayMode = '', typeCode, renewalPayType }: any) => {
  const dicts = getDrowDownList(typeCode);
  const cfgPlanProductOptions = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.cfgPlanProductOptions,
    shallowEqual
  );

  return useMemo(() => {
    const renewalPayTypeDicts =
      lodash
        .chain(cfgPlanProductOptions)
        .filter((item) => item.acceptablePaymentMode === formUtils.queryValue(policyPayMode))
        .map((item) => {
          return {
            dictCode: lodash.get(item, 'renewalPaymentMethod'),
            dictName: formatMessageApi({
              [typeCode]: lodash.get(item, 'renewalPaymentMethod'),
            }),
          };
        })
        .value() || [];

    return !lodash.isEmpty(renewalPayTypeDicts) ? renewalPayTypeDicts : dicts;
  }, [cfgPlanProductOptions, dicts, policyPayMode, renewalPayType, typeCode]);
};
