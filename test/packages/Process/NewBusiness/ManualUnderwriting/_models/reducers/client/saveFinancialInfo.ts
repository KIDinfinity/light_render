import { produce } from 'immer';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import { calIncomeInLocalCurrency } from 'process/NewBusiness/ManualUnderwriting/_utils/financialInfoUtils';

export default (state: any, { payload }: any) => {
  const { changedFields, id } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (
        lodash.has(changedFields, 'annualIncome') ||
        lodash.has(changedFields, 'annualIncomeCurrency') ||
        lodash.has(changedFields, 'monthlyIncome')
      ) {
        const annualIncome = lodash.has(changedFields, 'annualIncome')
          ? formUtils.queryValue(changedFields?.annualIncome)
          : formUtils.queryValue(
              draftState.modalData.entities.clientMap?.[id]?.financialInfo?.annualIncome
            );
        const monthlyIncome = lodash.has(changedFields, 'monthlyIncome')
          ? formUtils.queryValue(changedFields?.monthlyIncome)
          : formUtils.queryValue(
              draftState.modalData.entities.clientMap?.[id]?.financialInfo?.monthlyIncome
            );
        const annualIncomeCurrency = lodash.has(changedFields, 'annualIncomeCurrency')
          ? formUtils.queryValue(changedFields?.annualIncomeCurrency)
          : formUtils.queryValue(
              draftState.modalData.entities.clientMap?.[id]?.financialInfo?.annualIncomeCurrency
            );
        const exchangeRate = lodash.get(draftState, 'exchangeRate', 1);
        const annualIncomeInLocalCurrency = calIncomeInLocalCurrency(
          annualIncome,
          exchangeRate,
          annualIncomeCurrency
        );
        const monthlyIncomeInLocalCurrency = calIncomeInLocalCurrency(
          monthlyIncome,
          exchangeRate,
          annualIncomeCurrency
        );
        changedFields.annualIncomeInLocalCurrency = annualIncomeInLocalCurrency;
        changedFields.monthlyIncomeInLocalCurrency = monthlyIncomeInLocalCurrency;
      }
      if (lodash.has(changedFields, 'annualIncomeCurrency')) {
        // 不确定存来干嘛 TODO
        draftState.modalData.entities.clientMap[id] = {
          ...draftState.modalData.entities.clientMap[id],
          ...changedFields,
        };
      }
    }

    draftState.modalData.entities.clientMap[id].financialInfo = {
      ...draftState.modalData.entities.clientMap[id].financialInfo,
      ...changedFields,
    };
  });

  return {
    ...nextState,
  };
};
