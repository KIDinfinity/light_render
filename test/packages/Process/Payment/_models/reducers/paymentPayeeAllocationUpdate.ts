import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { multiply, divide, subtract } from '@/utils/precisionUtils';
import { relationshipWithInsuredForHK } from 'claim/enum';
import payeeAllocationLinkPayee from './paymentPayeeAllocationLinkPayee';
const parseNum = (num) => parseFloat(num.toFixed(2));

const payeeAllocationUpdate = (state: any, action: any) => {
  const { benefitItemId, id, changedFields } = action?.payload || {};

  return produce(state, (draftState: any) => {
    const benefitItem = draftState.paymentModal.datas.policyBenefitList?.find(
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
              beneficiaryAmount: parseNum(
                multiply(
                  formUtils.queryValue(benefitItem.benefitAmount),
                  divide(formUtils.queryValue(item.beneficiaryPercentage), 100)
                )
              ),
              benefitAmount: benefitItem.benefitAmount,
              payoutAmount: parseNum(
                multiply(
                  formUtils.queryValue(benefitItem.benefitAmount),
                  divide(formUtils.queryValue(item.beneficiaryPercentage), 100)
                )
              ),
            };
          });

          if (percentageSum === 100) {
            const lastBeneficiary = lodash.last(beneficiaryList);
            lastBeneficiary.beneficiaryAmount = beneficiaryList
              .slice(0, -1)
              .reduce(
                (sum, item) => subtract(sum, item.beneficiaryAmount),
                benefitItem.benefitAmount
              );
            lastBeneficiary.payoutAmount = lastBeneficiary.beneficiaryAmount;
          }
          benefitItem.beneficiaryList = beneficiaryList;
        }
      }

      if (lodash.has(changedFields, 'payeeName')) {
        if (
          [relationshipWithInsuredForHK.policyOwner, relationshipWithInsuredForHK.self].includes(
            formUtils.queryValue(benefitItem.beneficiaryList[beneficiaryIndex].payTo)
          )
        ) {
          const newState = payeeAllocationLinkPayee(draftState, {
            payload: {
              benefitItemId,
              id,
              fullName: formUtils.queryValue(changedFields.payeeName),
            },
          });
          draftState.paymentModal = newState.paymentModal;
        }
      }

      if (
        lodash.has(changedFields, 'advancedPayoutAmount') ||
        lodash.has(changedFields, 'beneficiaryPercentage')
      ) {
        const beneficiaryItem = benefitItem.beneficiaryList[beneficiaryIndex];

        beneficiaryItem.outstandingPayoutAmount = Math.max(
          formUtils.queryValue(beneficiaryItem.beneficiaryAmount) -
            (formUtils.queryValue(beneficiaryItem.advancedPayoutAmount) || 0),
          0
        );
      }
    }
  });
};

export default payeeAllocationUpdate;
