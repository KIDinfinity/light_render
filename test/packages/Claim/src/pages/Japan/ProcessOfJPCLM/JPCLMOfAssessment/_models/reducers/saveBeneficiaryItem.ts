import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveBeneficiaryItem = (state: any, action: any) => {
  const { changedFields, beneficiaryId, policyBenefitId, addressSearchResult } = action.payload;
  const finalChangedFields = { ...changedFields };
  if (
    lodash.has(changedFields, 'organization') &&
    lodash.isBoolean(formUtils.queryValue(changedFields.organization))
  ) {
    finalChangedFields.organization = changedFields.organization.value ? 1 : 0;
  }

  if (lodash.has(changedFields, 'firstName')) {
    const policyNo = formUtils.queryValue(
      state.claimEntities.policyBenefitListMap[policyBenefitId]?.policyNo
    );
    const dictFirstNameMap = state.dictFirstNameMap[policyNo] || [];
    finalChangedFields.gender = lodash.reduce(
      dictFirstNameMap,
      (result, item) => {
        if (item.dictName === changedFields.firstName.value) {
          return item.gender;
        }
        return result;
      },
      ''
    );
  }

  if (lodash.has(changedFields, 'beneficiaryPercentage')) {
    if (!lodash.isEmpty(changedFields.beneficiaryPercentage?.errors)) {
      finalChangedFields.beneficiaryPercentage.value = '';
      finalChangedFields.beneficiaryAmount = '';
    } else {
      const benefitAmount = formUtils.queryValue(
        state.claimEntities.policyBenefitListMap[policyBenefitId]?.benefitAmount
      );
      const beneficiaryList = lodash.filter(
        state.claimEntities.policyBenefitListMap[policyBenefitId]?.beneficiaryList,
        (item) => item !== beneficiaryId
      );
      const balance = lodash.reduce(
        beneficiaryList,
        (result, item) => {
          const beneficiaryAmount: number =
            state.claimEntities.beneficiaryListMap[item]?.beneficiaryAmount;
          result += beneficiaryAmount;
          return result;
        },
        0
      );
      const isLast = lodash
        .chain(state.claimEntities.beneficiaryListMap)
        .filter((item: any) =>
          lodash.includes(
            lodash.filter(beneficiaryList, (id) => id !== beneficiaryId),
            item.id
          )
        )
        .every((item) => formUtils.queryValue(item.beneficiaryPercentage))
        .value();
      const beneficiaryAmount = Math.floor(
        (formUtils.queryValue(changedFields.beneficiaryPercentage) / 100) * benefitAmount || 0
      );

      finalChangedFields.beneficiaryAmount = isLast ? benefitAmount - balance : beneficiaryAmount;
    }
  }

  if (lodash.has(changedFields, 'postCode')) {
    finalChangedFields.addressSearchResult =
      addressSearchResult ||
      state.claimEntities.beneficiaryListMap[beneficiaryId].addressSearchResult;
  }

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.beneficiaryListMap[beneficiaryId] = {
      ...state.claimEntities.beneficiaryListMap[beneficiaryId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveBeneficiaryItem;
