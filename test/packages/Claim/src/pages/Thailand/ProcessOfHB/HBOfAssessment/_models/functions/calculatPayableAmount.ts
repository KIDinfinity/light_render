/* eslint-disable no-param-reassign */
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { add, multiply, subtract } from '@/utils/precisionUtils';
import { POLICYBENEFITITEM, BENEFICIARYITEM } from '@/utils/claimConstant';
import { valueIsEmpty } from '@/utils/claimUtils';

// 根据claimPayableList生成tempPolicyBenefitList;
const handleTempPolicyBenefitList = (claimProcessData, claimEntities) => {
  const claimPayableList = lodash.map(
    claimProcessData.claimPayableList,
    (claimpayableItemId) => claimEntities.claimPayableListMap[claimpayableItemId]
  );
  const claimPayableListValue = formUtils.cleanValidateData(claimPayableList);
  const policyGrouped = lodash.groupBy(claimPayableListValue, 'policyNo');
  const policyGroupedList = Object.entries(policyGrouped);
  const tempPolicyBenefitList = [];
  // 根据claimPayableList生成tempPolicyBenefitList
  lodash.map(policyGroupedList, (policyGroupedItem) => {
    let policyBenefitAmount = 0;
    // 计算claim decision为A的cliamPayable的赔付金额
    lodash.map(policyGroupedItem[1], (payableItem) => {
      const { payableAmount } = payableItem || {};
      if (payableItem.claimDecision === 'A' && lodash.isNumber(payableAmount)) {
        policyBenefitAmount = add(policyBenefitAmount, payableAmount);
      }
    });
    if (policyBenefitAmount > 0) {
      tempPolicyBenefitList.push({
        ...POLICYBENEFITITEM,
        benefitAmount: policyBenefitAmount,
        claimNo: claimProcessData.claimNo,
        id: uuidv4(),
        payablesType: 'C',
        policyNo: policyGroupedItem[0],
        policyType: 'I',
      });
    }
  });
  return tempPolicyBenefitList;
};

// 根据tempPolicyBenefitList生成newPolicyBenefitList
const handleNewPolicyBenefitList = (claimProcessData, claimEntities, tempPolicyBenefitList) => {
  const { policyBenefitList } = claimProcessData;
  const newPolicyBenefitList = [];
  const newPolicyBenefitListId = [];
  if (tempPolicyBenefitList.length === 0) {
    claimEntities.beneficiaryListMap = {};
  }
  // 根据tempPolicyBenefitList生成newPolicyBenefitList
  lodash.map(tempPolicyBenefitList, (tempPolicyBenefitItem) => {
    let policyBenefitIsExist = false;
    lodash.map(policyBenefitList, (policyBenefitItemId) => {
      // 当旧的policyBenefitList有更新后的这一条时，更新旧的benefitAmount，push进newPolicyBenefitList
      if (
        claimEntities.policyBenefitListMap[policyBenefitItemId].policyNo ===
        tempPolicyBenefitItem.policyNo
      ) {
        policyBenefitIsExist = true;
        const oldPolicyBenefitItemTemp = claimEntities.policyBenefitListMap[policyBenefitItemId];
        oldPolicyBenefitItemTemp.benefitAmount = tempPolicyBenefitItem.benefitAmount;
        newPolicyBenefitList.push(oldPolicyBenefitItemTemp);
      }
    });
    // 当旧的policyBenefitList没有更新后的这一条时，直接push进newPolicyBenefitList
    if (!policyBenefitIsExist) {
      newPolicyBenefitList.push(tempPolicyBenefitItem);
    }
  });
  claimEntities.policyBenefitListMap = {};
  lodash.map(newPolicyBenefitList, (newPolicyBenefitListItem) => {
    const itemId = newPolicyBenefitListItem.id;
    newPolicyBenefitListId.push(itemId);
    claimEntities.policyBenefitListMap[itemId] = newPolicyBenefitListItem;
    return itemId;
  });
  claimProcessData.policyBenefitList = newPolicyBenefitListId;
};

// 遍历最新生成的policyBenefitList，为新添加的Item的填充beneficiaryList
const handleBeneficicayList = (claimProcessData, claimEntities) => {
  if (!claimProcessData || !claimEntities) return {};
  const insured = formUtils.cleanValidateData(claimProcessData.insured);
  const { policyBenefitList, payeeList = [] } = claimProcessData;
  lodash.map(policyBenefitList, (policyBenefitItemId) => {
    const policyBenefitItem = claimEntities.policyBenefitListMap[policyBenefitItemId];
    const { beneficiaryList, benefitAmount } = policyBenefitItem;
    // 只有当insured不为死亡 && 受益人为空，为保单分配添加受益人，新加的受益人为insured
    if (
      insured.currentState !== 'D' &&
      !(lodash.isArray(beneficiaryList) && beneficiaryList.length > 0)
    ) {
      const beneficiaryItemId = uuidv4();
      const beneficiaryItem = {
        ...BENEFICIARYITEM,
        address: insured.address,
        beneficiaryAmount: benefitAmount,
        beneficiaryPercentage: 100,
        claimNo: claimProcessData.claimNo,
        firstName: insured.firstName,
        id: beneficiaryItemId,
        identityNo: insured.identityNo,
        identityType: insured.identityType,
        organization: insured.organization,
        payeeId: payeeList?.[0],
        phoneNo: insured.phoneNo,
        policyBenefitId: policyBenefitItem.id,
        relationshipWithInsured: 'SLF',
        surname: insured.surname,
      };

      policyBenefitItem.beneficiaryList = [...policyBenefitItem.beneficiaryList, beneficiaryItemId];
      claimEntities.beneficiaryListMap[beneficiaryItemId] = beneficiaryItem;
    }
  });
};

// 逐级计算payableAmount和treatmentExpenseAmount： serveiceItem -> invoice -> treatment ->payable
export const calculatPayableAmount = (claimProcessData, claimEntities) => {
  let payToHospital = 0;
  let payToCustomer = 0;
  const { claimPayableList } = claimProcessData;
  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId] || {};
      const { treatmentPayableList } = claimPayableItem;

      // 津贴时，总金额为所有治疗的总额的总和
      if (claimPayableItem.benefitCategory === 'C' && lodash.isArray(treatmentPayableList)) {
        let totalTreatmentPayableAmount = 0;
        let totalAssessorOverrideAmount = null;
        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];
          const assessorOverrideAmount = formUtils.queryValue(
            treatmentPayableItem.assessorOverrideAmount
          );
          // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
          const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

          if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
            totalAssessorOverrideAmount = add(totalAssessorOverrideAmount, assessorOverrideAmount);
          }
          totalTreatmentPayableAmount = add(
            totalTreatmentPayableAmount,
            treatmentPayableItem.payableAmount
          );
        });

        claimPayableItem.payableAmount = totalTreatmentPayableAmount;
        claimPayableItem.assessorOverrideAmount = null;
        if (lodash.isNumber(totalAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totalTreatmentPayableAmount;
        }
      }

      // 医疗时，serveiceItem -> invoice -> treatment ->payable，逐级计算
      if (claimPayableItem.benefitCategory === 'R' && lodash.isArray(treatmentPayableList)) {
        let totalTreatmentPayableAmount = 0;
        let totleTreatmentAssessorOverrideAmount = null;

        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId] || {};
          let totalInvoicePayableAmount = 0;
          let totleInvoiceAssessorOverrideAmount = null;
          const { invoicePayableList } = treatmentPayableItem || {};
          if (lodash.compact(invoicePayableList).length > 0)
            lodash.map(invoicePayableList, (invoicePayableItemId) => {
              // 计算每条账单的payableAmount
              const invoicePayableItem =
                claimEntities.invoicePayableListMap[invoicePayableItemId] || {};
              let totalBenefitPayableAmount = 0;
              let totalBenefitAssessorOverrideAmount = null;
              const { benefitItemPayableList } = invoicePayableItem || {};
              lodash.map(lodash.compact(benefitItemPayableList), (benefitPayableItemId) => {
                const benefitPayableItem =
                  claimEntities.benefitItemPayableListMap[benefitPayableItemId] || {};
                const assessorOverrideAmount = formUtils.queryValue(
                  benefitPayableItem.assessorOverrideAmount
                );
                // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
                const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

                if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
                  totalBenefitAssessorOverrideAmount = add(
                    totalBenefitAssessorOverrideAmount,
                    assessorOverrideAmount
                  );
                }
                totalBenefitPayableAmount = add(
                  totalBenefitPayableAmount,
                  benefitPayableItem.payableAmount
                );
              });

              invoicePayableItem.payableAmount = totalBenefitPayableAmount;
              invoicePayableItem.assessorOverrideAmount = null;
              if (lodash.isNumber(totalBenefitAssessorOverrideAmount)) {
                invoicePayableItem.assessorOverrideAmount = totalBenefitPayableAmount;
              }

              const assessorOverrideAmount = formUtils.queryValue(
                invoicePayableItem.assessorOverrideAmount
              );
              // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
              const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

              if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
                totleInvoiceAssessorOverrideAmount = add(
                  totleInvoiceAssessorOverrideAmount,
                  assessorOverrideAmount
                );
              }
              totalInvoicePayableAmount = add(
                totalInvoicePayableAmount,
                invoicePayableItem.payableAmount
              );
            });

          treatmentPayableItem.payableAmount = totalInvoicePayableAmount;

          treatmentPayableItem.assessorOverrideAmount = null;
          if (lodash.isNumber(totleInvoiceAssessorOverrideAmount)) {
            treatmentPayableItem.assessorOverrideAmount = totalInvoicePayableAmount;
          }

          const assessorOverrideAmount = formUtils.queryValue(
            treatmentPayableItem.assessorOverrideAmount
          );
          // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
          const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

          if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
            totleTreatmentAssessorOverrideAmount = add(
              totleTreatmentAssessorOverrideAmount,
              assessorOverrideAmount
            );
          }
          totalTreatmentPayableAmount = add(
            totalTreatmentPayableAmount,
            treatmentPayableItem.payableAmount
          );
        });

        claimPayableItem.payableAmount = totalTreatmentPayableAmount;
        claimPayableItem.assessorOverrideAmount = null;
        if (lodash.isNumber(totleTreatmentAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totalTreatmentPayableAmount;
        }
      }
      if (
        formUtils.queryValue(claimPayableItem.claimDecision) === 'A' &&
        claimPayableItem.benefitCategory === 'R'
      ) {
        payToHospital = add(payToHospital, formUtils.queryValue(claimPayableItem.payableAmount));
      }
      if (
        formUtils.queryValue(claimPayableItem.claimDecision) === 'A' &&
        claimPayableItem.benefitCategory === 'C'
      ) {
        payToCustomer = add(payToCustomer, formUtils.queryValue(claimPayableItem.payableAmount));
      }
    });
  }

  claimProcessData.claimDecision = {
    ...claimProcessData.claimDecision,
    payToCustomer,
    payToHospital,
    totalPayableAmount: add(payToCustomer, payToHospital),
    claimPayableAmount: add(payToCustomer, payToHospital),
  };
};

/**
 *
 * @param claimProcessData
 * @param claimEntities
 * 第一步：根据claimPayableList的policyNo分组，生成保单号对应的保单分配数组tempPolicyBenefitList
 * 第二步：根据第一步生成的tempPolicyBenefitList和当前policyBenefitList，遍历tempPolicyBenefitList，
 *        如果当前policyBenefitList存在相同保单号的benefit，则push当前policyBenefitList的，
 *        如果当前policyBenefitList不存在相同保单号的benefit，则push tempPolicyBenefitList的
 * 第三步：根据生成的newPolicyBenefitListId，为claimProcessdata的policyBenefitList赋值
 * 第四步：遍历policyBenefitList，如果policyBenefitItem的受益人为空 && insured不为死亡，为保单分配添加受益人，新加的受益人为insured
 */
export const updataPolicyBenefitList = (claimProcessData, claimEntities) => {
  if (!claimProcessData || !claimEntities) return {};
  const { claimPayableList } = claimProcessData;
  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    // 根据根据claimPayableList生成对应的policyBenefitList;
    const tempPolicyBenefitList = handleTempPolicyBenefitList(claimProcessData, claimEntities);
    // 根据对应的policyBenefitList和当前policyBenefitList合成新的policyBenefitList
    handleNewPolicyBenefitList(claimProcessData, claimEntities, tempPolicyBenefitList);
    // 为新添加的policybenefit填充beneficiaryList
    handleBeneficicayList(claimProcessData, claimEntities);
  }
};

export const calculatBeneficiaryAmount = (claimProcessData, claimEntities) => {
  if (!claimProcessData || !claimEntities) return {};
  const { policyBenefitList, payeeList } = claimProcessData;
  if (lodash.isArray(policyBenefitList) && policyBenefitList.length > 0) {
    lodash.map(policyBenefitList, (policyBenefitItemId) => {
      let totalBeneficiaryAmount = 0; // beneficiaryAmount累加的总金额
      let lastBeneficiaryAmount = 0; // 除去第一个beneficiaryAmount之外的累加的总金额
      const policyBenefitItem = claimEntities.policyBenefitListMap[policyBenefitItemId];
      const { beneficiaryList, benefitAmount } = policyBenefitItem;
      if (lodash.isArray(beneficiaryList) && beneficiaryList.length > 0) {
        lodash.map(beneficiaryList, (beneficiaryListItemId, index) => {
          const beneficiaryItem = claimEntities.beneficiaryListMap[beneficiaryListItemId];
          const beneficiaryPercentage = formUtils.queryValue(beneficiaryItem.beneficiaryPercentage);
          let beneficiaryAmount = 0;
          if (!valueIsEmpty(beneficiaryPercentage)) {
            beneficiaryAmount = (multiply(benefitAmount, beneficiaryPercentage) / 100).toFixed(2);
          }
          totalBeneficiaryAmount = add(totalBeneficiaryAmount, beneficiaryAmount);
          if (index > 0) {
            lastBeneficiaryAmount = add(lastBeneficiaryAmount, beneficiaryAmount);
          }
        });
        if (totalBeneficiaryAmount > benefitAmount) {
          const firstBeneficiaryId = beneficiaryList[0];
          claimEntities.beneficiaryListMap[firstBeneficiaryId].beneficiaryAmount = subtract(
            benefitAmount,
            lastBeneficiaryAmount
          );
        }
      }
    });
  } else {
    lodash.map(payeeList, (payeeId) => {
      claimEntities.payeeListMap[payeeId].paymentAmount = null;
    });
  }
};

export default {
  calculatPayableAmount,
  updataPolicyBenefitList,
};
