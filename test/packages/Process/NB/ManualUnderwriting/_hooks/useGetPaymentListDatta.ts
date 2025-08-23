import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import useGetPremiumShortfall from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumShortfall';
export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const paymentListData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.paymentListData,
    shallowEqual
  );

  const premiumShortfall = useGetPremiumShortfall();
  const paymentList = useMemo(() => {
    const paidAmount = lodash
      .chain(businessData)
      .get('policyList[0].paidAmount', '')
      .toNumber()
      .value()
      .toFixed(2);
    const paymentReferenceNo = lodash
      .chain(businessData)
      .get('policyList[0].uwPremiumStatusTrackList', [])
      .map((item: any) => item?.receiptNo)
      .filter((item: any) => !!item)
      .join(', ')
      .value();

    const data = lodash
      .chain(businessData)
      .get('policyList[0].paymentList')
      .map((item: any) => {
        return {
          ...item,
          policyInitialPremium: getFieldDisplayAmount(
            item?.policyInitialPremium,
            'nb.policyList.paidAmount'
          ),
          paymentDate: lodash.get(item, 'dateOfDeduction'),
          paymentOption: lodash.get(businessData, 'policyList[0].paymentOption'),
          paymentMethodType: lodash.get(businessData, 'policyList[0].premiumMethod'),
          haveCreditCard: lodash.get(businessData, 'policyList[0].haveCreditCard'),
          cardIssuerCountry: lodash.get(businessData, 'policyList[0].cardIssuerCountry'),
          paymentMethod: lodash.get(businessData, 'policyList[0].paymentMethodType'),
          payType: lodash.get(businessData, 'policyList[0].payType'),
          policyInitialPremium: lodash.get(businessData, 'policyList[0].policyInitialPremium'),
          paidAmount: paidAmount,
          premiumShortfall: premiumShortfall,
          paymentReferenceNo: paymentReferenceNo,
        };
      })
      .value();

    if (!lodash.isEmpty(paymentListData)) {
      const newPaymentReferenceNo = lodash
        .chain(paymentListData)
        .get('receiptNoList')
        .map((item: any) => item)
        .filter((item: any) => !!item)
        .join(', ')
        .value();
      return lodash.map(data, (item) => {
        return {
          ...item,
          ...paymentListData,
          paymentReferenceNo: newPaymentReferenceNo || paymentReferenceNo,
        };
      });
    } else {
      return data;
    }
  }, [businessData, premiumShortfall, paymentListData]);
  return paymentList;
};
