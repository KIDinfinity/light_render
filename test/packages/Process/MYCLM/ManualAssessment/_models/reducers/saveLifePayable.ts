import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const Link = {
  payableAmount: ({ finishData }: any) => {
    return {
      assessorOverrideAmount: finishData.payableAmount,
    };
  },
};

const saveLifePayable = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.showRegisterAlert = true;
    const { changedFields, claimPayableId, validating } = action.payload;

    const lifePayable = draftState.claimEntities.claimPayableListMap[claimPayableId].lifePayable;

    let finishData = {
      ...lifePayable,
      ...changedFields,
    };

    if (
      lodash.size(changedFields) === 1 &&
      lodash.isFunction(Link[lodash.keys(changedFields)[0]])
    ) {
      finishData = {
        ...finishData,
        ...Link[lodash.keys(changedFields)[0]]({
          finishData: formUtils.cleanValidateData(finishData),
        }),
      };
    }

    if (!validating) {
      const {
        benefitItemCode,
        benefitTypeCode,
        policyNo,
        calculationAmount,
      } = formUtils.cleanValidateData(lifePayable || {});
      if (lodash.has(changedFields, 'benefitItemCode')) {
        const reimbursementPercentage =
          draftState.reimbursementPercentageMap[
            `${policyNo}-${benefitTypeCode}-${benefitItemCode}`
          ];
        finishData.reimbursementPercentage = lodash.isUndefined(reimbursementPercentage)
          ? null
          : reimbursementPercentage;
        finishData.payableAmount = lodash.isUndefined(reimbursementPercentage)
          ? null
          : (Number(reimbursementPercentage) * Number(calculationAmount)) / 100;
      }
      if (lodash.has(changedFields, 'reimbursementPercentage')) {
        const reimbursementPercentage = formUtils.queryValue(changedFields.reimbursementPercentage);

        finishData.payableAmount =
          lodash.isUndefined(reimbursementPercentage) || lodash.isNull(reimbursementPercentage)
            ? null
            : (Number(reimbursementPercentage) * Number(calculationAmount)) / 100;
      }
    }

    draftState.claimEntities.claimPayableListMap[claimPayableId].lifePayable = finishData;
  });

  return { ...nextState };
};

export default saveLifePayable;
