import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import type { PolicyBenefitModal, BeneficiaryModal } from '../../_dto/Models';
import { ERelationshipWithPayee, EPolicySource, EPaymentMethod } from '../../_dto/Enums';
import {
  getPayeeDicts,
  judgePayeeAdd,
  addPayeeMapBeneficiary,
  setBeneficiaryVal,
  handleBeneficiary,
  getBeneficiary,
  updatePayoutAmount,
  calculateBeneficiaryAmount,
  getBeneficiaryName,
  getPolicyOwnerPayeeIds,
} from '../../_function';
import {
  VLD_PayableBenefitAmount,
  VLD_MultiplePolicyOwner,
  VLD_MultipleBeneficiary,
} from '../../_validators/sectionValidators';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { changedFields, id: beneficiaryId, benefitId } = payload;

    const { claimData, payeeDicts } = draft;
    const { policyBenefitList, claimDecision, claimPayableList } = claimData;
    const editPayableType = lodash.has(changedFields, 'payableType');
    const editPayto = lodash.has(changedFields, 'payTo');
    const editBenefitAmount = lodash.has(changedFields, 'benefitAmount');
    const editRelationshipWithPayee = lodash.has(changedFields, 'relationshipWithPayee');
    const editPayeeId = lodash.has(changedFields, 'payeeId');
    const editClientId = lodash.has(changedFields, 'clientId');
    const systemCurrency = tenant.currency();

    const editStatus = lodash.keys(changedFields).length === 1;

    const tempPolicyBenefitList: any[] = lodash
      .chain(policyBenefitList)
      .compact()
      .map((policyBenefit: PolicyBenefitModal) => {
        let policyBenefitTemp = { ...policyBenefit };
        const { beneficiaryList, id } = policyBenefitTemp;
        const policyNo = formUtils.queryValue(policyBenefitTemp.policyNo);

        if (id === benefitId) {
          const beneficiaries = lodash
            .chain(beneficiaryList)
            .compact()
            .map((beneficiaryItem: BeneficiaryModal) => {
              if (beneficiaryItem.id === beneficiaryId) {
                let beneficiaryTemp = { ...beneficiaryItem, ...changedFields };

                if (editStatus && editPayableType) {
                  beneficiaryTemp = {
                    ...beneficiaryTemp,
                    ...changedFields,
                    payTo: changedFields?.payableType?.value === '03' ? 'O' : null,
                  };
                }

                if (editStatus && (editPayto || editPayableType)) {
                  const payTo = formUtils.queryValue(beneficiaryTemp.payTo);
                  // lodash.set(
                  //   beneficiaryTemp,
                  //   `beneficiaryDicts.${payTo}`,
                  //   C(claimData, policyNo, payTo)
                  // );
                  // 处理香港的逻辑
                  beneficiaryTemp = handleBeneficiary(beneficiaryTemp, payTo);
                  beneficiaryTemp = VLD_MultipleBeneficiary(
                    policyBenefitTemp,
                    beneficiaryTemp,
                    beneficiaryTemp.clientId
                  );
                }

                if (editStatus && editClientId) {
                  beneficiaryTemp = {
                    ...getBeneficiary(
                      claimData,
                      formUtils.queryValue(beneficiaryItem.payTo),
                      policyNo,
                      beneficiaryTemp
                    ),
                    ...changedFields,
                  };
                }

                if (editStatus && editBenefitAmount) {
                  beneficiaryTemp = calculateBeneficiaryAmount(
                    beneficiaryTemp,
                    changedFields.benefitAmount
                  );
                }

                if (
                  editStatus &&
                  editRelationshipWithPayee &&
                  formUtils.queryValue(changedFields.relationshipWithPayee) ===
                    ERelationshipWithPayee.Self &&
                  judgePayeeAdd(payeeDicts, beneficiaryTemp)
                ) {
                  const result = addPayeeMapBeneficiary(claimData, beneficiaryTemp);
                  draft.claimData.payeeList = result.payeeList;
                  beneficiaryTemp = { ...beneficiaryTemp, ...result.beneficiary };
                }

                // 若修改payeeId，则同时同步对应的payee name到beneficiary对象
                if (editStatus && lodash.has(changedFields, 'payeeId')) {
                  const payeeId = formUtils.queryValue(changedFields.payeeId);
                  const selectedPayee = lodash.find(draft.claimData.payeeList, { id: payeeId });
                  if (beneficiaryTemp?.sourceSystem !== EPolicySource.IL) {
                    draft.claimData.payeeList = lodash.map(draft.claimData.payeeList, (item) => {
                      return formUtils.queryValue(item?.paymentMethod) === EPaymentMethod.Draft &&
                        item?.id === payeeId
                        ? { ...item, paymentMethod: '' }
                        : item;
                    });
                  }
                  lodash.set(
                    beneficiaryTemp,
                    'payee',
                    getBeneficiaryName(selectedPayee?.firstName, selectedPayee?.surname)
                  );
                  beneficiaryTemp.payoutCurrency =
                    formUtils.queryValue(selectedPayee?.payoutCurrency) ||
                    formUtils.queryValue(claimDecision.payoutCurrency) ||
                    systemCurrency;

                  beneficiaryTemp = setBeneficiaryVal(draft.claimData.payeeList, beneficiaryTemp);
                }

                return beneficiaryTemp;
              }

              return beneficiaryItem;
            })
            .value();

          policyBenefitTemp = { ...policyBenefitTemp, beneficiaryList: beneficiaries };

          if (editStatus && editBenefitAmount) {
            // 校验同一个保单号下面的payable amount和benefit amount总和是否相等
            policyBenefitTemp = tenant.region({
              notMatch: () => VLD_PayableBenefitAmount(policyBenefitTemp, claimPayableList),
              [Region.PH]: policyBenefitTemp,
            });
          }
        }

        return policyBenefitTemp;
      })
      .value();

    draft.claimData.policyBenefitList = tempPolicyBenefitList;

    if (editStatus && editRelationshipWithPayee) {
      draft.payeeDicts = getPayeeDicts(draft.claimData.payeeList);
    }

    if (editStatus && (editPayto || editBenefitAmount)) {
      draft.claimData.payeeList = updatePayoutAmount(
        tempPolicyBenefitList,
        draft.claimData.payeeList
      );
    }

    if (editStatus && (editPayto || editPayeeId)) {
      draft.relatePolicyOwnerPayeeIds = getPolicyOwnerPayeeIds(tempPolicyBenefitList);

      draft.claimData.payeeList = VLD_MultiplePolicyOwner(
        draft.claimData.payeeList,
        draft.relatePolicyOwnerPayeeIds
      );
    }
  });
};
