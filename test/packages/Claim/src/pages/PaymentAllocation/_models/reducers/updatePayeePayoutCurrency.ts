/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { EPayByPolicyCurrency } from '../../_dto/Enums';

const updatePayeePayoutCurrency = (state: any, { payload }: any) => {
  const { payeeIndex } = payload;

  const nextState = produce(state, (draftState: any) => {
    const payeeItem = draftState.claimData.payeeList[payeeIndex] || {};
    const payByPolicyCurrency = formUtils.queryValue(payeeItem.payByPolicyCurrency);

    if (!payByPolicyCurrency || payByPolicyCurrency === EPayByPolicyCurrency.No) {
      // 设置货币值
      draftState.claimData.policyBenefitList = lodash.map(
        draftState.claimData.policyBenefitList,
        (el: any) => ({
          ...el,
          beneficiaryList: lodash.map(el?.beneficiaryList || [], (beneficiaryItem: any) => ({
            ...beneficiaryItem,
            payoutCurrency:
              beneficiaryItem.payeeId === payeeItem?.id
                ? payeeItem?.payoutCurrency
                : beneficiaryItem?.payoutCurrency,
          })),
        })
      );
    }
  });
  // 这里用克隆的原因是有些proxy没有转
  return { ...lodash.cloneDeep(nextState) };
};

export default updatePayeePayoutCurrency;
