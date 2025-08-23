import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useCalcTransferPaymentSumPaidAmount from 'process/NB/ManualUnderwriting/_hooks/useCalcTransferPaymentSumPaidAmount';
import useGetPayorName from 'process/NB/ManualUnderwriting/_hooks/useGetPayorName';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.businessData,
    shallowEqual
  );
  const transferedAmount = useCalcTransferPaymentSumPaidAmount();
  const paymentListData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentListData,
    shallowEqual
  );

  const policyPayor = useGetPayorName();
  return useMemo(() => {
    return {
      paidAmount: paymentListData?.paidAmount,
      policyId: businessData?.policyId,
      policyPayor,
      transferedAmount,
    };
  }, [businessData, transferedAmount, paymentListData, policyPayor]);
};
