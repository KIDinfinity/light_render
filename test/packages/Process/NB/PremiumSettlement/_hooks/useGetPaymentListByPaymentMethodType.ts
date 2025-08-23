import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import { tenant, Region } from '@/components/Tenant';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const defaultRefundPayType = lodash
    .chain(businessData)
    .get('policyList[0].defaultRefundPayType', '')
    .value();

  return useMemo(() => {
    const paymentMethodType = lodash.get(businessData, 'policyList[0].paymentMethodType');
    return lodash
      .chain(businessData)
      .get('policyList[0].premiumPaymentCfgList', [])
      .filter((item: any) => item.paymentMethodType === paymentMethodType)
      .filter(
        (item) =>
          !(
            tenant.region() === Region.TH &&
            defaultRefundPayType !== 'CCD' &&
            item.paymentCode === 'CCD'
          )
      )
      .value();
  }, [businessData, defaultRefundPayType]);
};
