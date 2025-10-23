import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';
import { tenant, Region } from '@/components/Tenant';
import payType from '../Enum/payType';

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
            defaultRefundPayType !== payType.CreditCard &&
            item.paymentCode === payType.CreditCard
          )
      )
      .map(({ paymentCode, paymentMethod, ...rest }: any) => ({
        dictCode: paymentCode,
        dictName: paymentMethod,
        paymentMethod,
        paymentCode,
        ...rest,
      }))
      .value();
  }, [businessData, defaultRefundPayType]);
};
