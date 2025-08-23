import { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const productCode =
    formUtils.queryValue(
      lodash
        .chain(businessData)
        .get('policyList[0].coverageList', [])
        .find((item: any) => item?.isMain === 'Y')
        .get('coreCode')
        .value()
    ) || null;
  const businessSource =
    formUtils.queryValue(
      lodash
        .chain(businessData)
        .get('agentList', [])
        .find((item: any) => item?.agentType === 'P')
        .get('agentChannelCode')
        .value()
    ) || null;
  const bankCode =
    formUtils.queryValue(
      lodash
        .chain(businessData)
        .get('agentList', [])
        .find((item: any) => item?.agentType === 'P')
        .get('bankNo')
        .value()
    ) || null;
  const acceptablePaymentMode =
    formUtils.queryValue(lodash.get(businessData, 'policyList[0].policyPayMode')) || null;
  const premiumType =
    formUtils.queryValue(lodash.get(businessData, 'policyList[0].premiumType')) || null;

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getRenewalPaymentMethod`,
      payload: {
        params: {
          productCode,
          businessSource,
          bankCode,
          acceptablePaymentMode,
          premiumType,
        },
      },
    });
  }, [productCode, businessSource, bankCode, acceptablePaymentMode, premiumType]);
};
