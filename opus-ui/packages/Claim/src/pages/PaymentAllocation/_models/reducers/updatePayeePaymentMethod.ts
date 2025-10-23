/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { PaymentMethod, TransferAccount } from 'claim/pages/Enum';
import { getBankAccount, cleanBankAccount, getPaymentMethodIn } from '../../_function';
import { ECommonExchangeRate } from '../../_dto/Enums';
import updatePayeePayByPolicyCurrency from './updatePayeePayByPolicyCurrency';

const updatePayeePaymentMethod = (state: any, { payload }: any) => {
  const { payeeIndex, paymentMethod } = payload;

  const paymentMethodIn = getPaymentMethodIn({
    paymentMethod: formUtils.queryValue(paymentMethod),
  });

  const nextState = produce(state, (draftState: any) => {
    const { policyBenefitList, c360BeneficiaryInfo } = draftState.claimData;

    const payeeItem = draftState.claimData.payeeList[payeeIndex] || {};

    const benefitItem: any = lodash.first(policyBenefitList);
    const payeeBankAccountList = getBankAccount(
      c360BeneficiaryInfo?.policyBankAccountList || [],
      '',
      formUtils.queryValue(benefitItem?.policyNo)
    );

    let extra = {};

    if (paymentMethodIn) {
      extra = {
        ...extra,
        payoutCurrency: tenant.region({
          [Region.HK]: () => ECommonExchangeRate.HongKong,
          [Region.JP]: () => ECommonExchangeRate.Japan,
          [Region.TH]: () => ECommonExchangeRate.Thailand,
          [Region.ID]: () => ECommonExchangeRate.Thailand,
        }),
      };
    }

    draftState.claimData.payeeList[payeeIndex] = {
      ...payeeItem,
      payeeBankAccountList: lodash
        .chain(payeeBankAccountList)
        .compact()
        .map((accountItem: any) => {
          const bankCodeCache = formUtils.queryValue(accountItem.bankCode);
          return tenant.region({
            [Region.JP]: () => cleanBankAccount({ ...accountItem, bankCodeCache }, paymentMethod),
            notMatch: { ...accountItem, bankCodeCache },
          });
        })
        .value(),
      transferAccount:
        paymentMethod === PaymentMethod.PremiumAccount
          ? TransferAccount.TransferAccount
          : TransferAccount.PointingAccount,
      sourceBank: tenant.isPH() ? null : payeeItem.sourceBank,
      ...extra,
    };
  });

  if (paymentMethodIn) {
    return updatePayeePayByPolicyCurrency(nextState, {
      type: 'updatePayeePayByPolicyCurrency',
      payload: {
        payeeIndex,
        isPayByPolicyCurrency: 0,
      },
    });
  }

  return { ...nextState };
};

export default updatePayeePaymentMethod;
