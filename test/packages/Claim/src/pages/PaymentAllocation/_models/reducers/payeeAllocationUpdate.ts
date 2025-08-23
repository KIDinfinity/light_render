import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { multiply, divide } from '@/utils/precisionUtils';
import { relationshipWithInsuredForHK } from 'claim/enum';
import payeeAllocationLinkPayee from './payeeAllocationLinkPayee';

const payeeAllocationUpdate = (state: any, action: any) => {
  const { benefitItemId, id, changedFields } = action?.payload || {};

  return produce(state, (draftState: any) => {
    const benefitItem = draftState.claimData.policyBenefitList?.find(
      (benefitItem) => benefitItem.id === benefitItemId
    );

    const beneficiaryIndex = benefitItem?.beneficiaryList?.findIndex(
      (beneficiary) => beneficiary.id === id
    );
    if (beneficiaryIndex === void 0 || beneficiaryIndex === -1) return;
    benefitItem.beneficiaryList[beneficiaryIndex] = {
      ...benefitItem.beneficiaryList[beneficiaryIndex],
      ...changedFields,
    };
    const beneficiaryItem = benefitItem.beneficiaryList[beneficiaryIndex];

    if (Object.keys(changedFields).length === 1) {
      benefitItem.isManual = 'Y';
      if (lodash.has(changedFields, 'beneficiaryPercentage')) {
        const percentageSum = benefitItem.beneficiaryList.reduce(
          (sum, item) => sum + (formUtils.queryValue(item?.beneficiaryPercentage) || 0),
          0
        );
        if (percentageSum <= 100) {
          const beneficiaryList = benefitItem.beneficiaryList.map((item, index) => {
            return {
              ...item,
              beneficiaryAmount: multiply(
                formUtils.queryValue(benefitItem.benefitAmount),
                divide(formUtils.queryValue(item.beneficiaryPercentage), 100)
              ),
              benefitAmount: benefitItem.benefitAmount,
              payoutAmount: multiply(
                formUtils.queryValue(benefitItem.benefitAmount),
                divide(formUtils.queryValue(item.beneficiaryPercentage), 100)
              ),
            };
          });

          if (percentageSum === 100)
            lodash.last(beneficiaryList).beneficiaryAmount = beneficiaryList
              .slice(0, -1)
              .reduce((sum, item) => sum - item.beneficiaryAmount, beneficiaryItem.benefitAmount);
          benefitItem.beneficiaryList = beneficiaryList;
        }

      }
      if (lodash.has(changedFields, 'payeeName') && [relationshipWithInsuredForHK.policyOwner, relationshipWithInsuredForHK.self].includes(formUtils.queryValue(benefitItem.beneficiaryList[beneficiaryIndex].payTo))) {
        const { claimData } = payeeAllocationLinkPayee(draftState, {payload: {
          benefitItemId,
          id,
          fullName: formUtils.queryValue(changedFields.payeeName)
        }})
        draftState.claimData = claimData;
      }
    }
  });
};

export default payeeAllocationUpdate;
