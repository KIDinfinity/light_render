/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { EPayByPolicyCurrency } from '../../_dto/Enums';

const updatePayeePayByPolicyCurrency = (state: any, { payload }: any) => {
  const { payeeIndex, isPayByPolicyCurrency } = payload;
  const nextState = produce(state, (draftState: any) => {
    const payeeItem = draftState.claimData.payeeList[payeeIndex] || {};
    let policyCurrencyList: any[] = [];

    // 查找货币列表
    const getPolicyCourrencyList = ({ policyBenefitItem }: any) => {
      policyCurrencyList = lodash
        .chain(policyBenefitItem?.beneficiaryList || [])
        .filter((el: any) => el.payeeId === payeeItem?.id)
        .reduce((arr: any, beneficiaryItem: any) => {
          return !lodash.includes(policyCurrencyList, beneficiaryItem?.policyCurrency)
            ? [...arr, beneficiaryItem?.policyCurrency]
            : arr;
        }, policyCurrencyList)
        .value();
    };

    // 设置货币值
    draftState.claimData.policyBenefitList = lodash
      .chain(draftState.claimData.policyBenefitList || [])
      .map((policyBenefitItem: any) => {
        getPolicyCourrencyList({ policyBenefitItem });
        return {
          ...policyBenefitItem,
          beneficiaryList: lodash.map(
            policyBenefitItem?.beneficiaryList || [],
            (beneficiaryItem: any) => {
              return beneficiaryItem.payeeId === payeeItem?.id
                ? {
                    ...beneficiaryItem,
                    payoutCurrency: isPayByPolicyCurrency
                      ? beneficiaryItem?.policyCurrency
                      : payeeItem?.payoutCurrency,
                  }
                : beneficiaryItem;
            }
          ),
        };
      })
      .value();
    // eslint-disable-next-line no-param-reassign
    draftState.claimData.payeeList[payeeIndex] = {
      ...payeeItem,
      payByPolicyCurrency: isPayByPolicyCurrency
        ? EPayByPolicyCurrency.Yes
        : EPayByPolicyCurrency.No,
      payoutCurrency:
        isPayByPolicyCurrency && lodash.size(policyCurrencyList) === 1
          ? policyCurrencyList[0]
          : payeeItem.payoutCurrency,
    };
  });

  return { ...nextState };
};

export default updatePayeePayByPolicyCurrency;
