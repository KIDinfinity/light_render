import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import PayType from 'opus/NewBusiness/Enum/PayType';
import { NAMESPACE } from '../_models';

export default function useWarnMsgHoldPayment() {
  const policyList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData.policyList) ||
    [];
  const currentReasonGroups = useSelector(
    ({ envoyController }: any) => envoyController.currentReasonGroups,
    shallowEqual
  );
  const historyReasonGroups = useSelector(
    ({ envoyController }: any) => envoyController.historyReasonGroups,
    shallowEqual
  );

  const WarningCreditCardRefund = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(modelnamepsace, 'regionalDefaultValue.WarningCreditCardRefund', {})
  );
  // console.log('WarningCreditCardRefund', WarningCreditCardRefund);
  const isPendCCDRefund = (currentReasonGroups || [])
    .concat(historyReasonGroups || [])
    .find((i) => i.groupCode === 'P_BP_PND_CreditCardRefund' && i.startTime);

  const { payType, policyInitialPremium, paymentList, premiumReceived } = lodash.pick(
    policyList[0],
    ['payType', 'policyInitialPremium', 'paymentList', 'premiumReceived']
  );
  const creditCardMode = lodash.get(paymentList?.[0], 'creditCardMode', '');

  const condition1 = payType === PayType.CreditCard && policyInitialPremium > 200000;
  // 分期付款
  const condition2 =
    payType === PayType.CreditCard && creditCardMode === 'K' && policyInitialPremium >= 30;
  const condition3 = !isPendCCDRefund || (isPendCCDRefund && premiumReceived > 0);

  const condition4 = WarningCreditCardRefund === 'Y';
  const isShow = (condition1 || condition2) && condition3 && condition4;

  return tenant.region({
    [Region.TH]: { isShow, typeCode: 'Label_COM_WarningMessage', dictCode: 'MSG_001102' },
    notMatch: { isShow: false, typeCode: '', dictCode: '' },
  });
}
