import isGBSN from 'basic/components/CaseContainer/utils/isGBSN';
import { produce }  from 'immer';
import lodash from 'lodash';
import PayType from 'process/NB/Enum/PayType';
import PaymentOption from 'process/NB/ManualUnderwriting/Enum/PaymentOption';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const isGbsn = isGBSN({ caseCategory: lodash.get(state, 'businessData.caseCategory') });

  // 匹配对应payType初始值
  const nextState = produce(state, (draftState: any) => {
    const paymentOptionValue = lodash.get(changedFields, 'paymentOption.value');
    let nextPayType = null;

    if (isGbsn) {
      switch (paymentOptionValue) {
        case PaymentOption.FPXPayment:
        case PaymentOption.CreditCard:
          nextPayType = PayType.PayWay;
          break;
        case PaymentOption.PaymentSlip:
          nextPayType = PayType.Cheque;
          break;
        case PaymentOption.IBG:
        case PaymentOption.InstantTransfer:
        case PaymentOption.Rentas:
          nextPayType = PayType.DirectTransfer;
          break;
        default:
          break;
      }
    } else {
      switch (paymentOptionValue) {
        case PaymentOption.Cheque:
          nextPayType = PayType.Cheque;
          break;
        case PaymentOption.FPXPayment:
        case PaymentOption.CreditCard:
          nextPayType = PayType.PayWay;
          break;
        case PaymentOption.BiroAngkasa:
          nextPayType = PayType.BiroAngkasa;
          break;
        case PaymentOption.IBG:
        case PaymentOption.InstantTransfer:
        case PaymentOption.Rentas:
          nextPayType = PayType.DirectTransfer;
          break;
        default:
          break;
      }
    }

    if (nextPayType) {
      lodash.set(draftState, 'businessData.policyList[0].payType', nextPayType);
    }
  });

  return { ...nextState };
};
