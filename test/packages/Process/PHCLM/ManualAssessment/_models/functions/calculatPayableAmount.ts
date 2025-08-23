import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { add, multiply, subtract } from '@/utils/precisionUtils';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { POLICYBENEFITITEM, BENEFICIARYITEM } from '@/utils/claimConstant';
import { ClaimDecision, BenefitCategory } from 'claim/pages/utils/claim';
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
      const { payableAmount } = payableItem;
      if (
        (payableItem.claimDecision === ClaimDecision.pending ||
          payableItem.claimDecision === ClaimDecision.approve ||
          payableItem.claimDecision === ClaimDecision.exGratia) &&
        lodash.isNumber(payableAmount)
      ) {
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
  // 遍历旧的policyBenefitList，剔除不存在的保单分配
  lodash.map(policyBenefitList, (policyBenefitItemId) => {
    const oldPolicyBenefitItem = claimEntities.policyBenefitListMap[policyBenefitItemId];
    const { policyNo, beneficiaryList } = oldPolicyBenefitItem;
    const policyBenefitExistList = lodash.filter(
      tempPolicyBenefitList,
      (tempPolicyBenefitItem) => tempPolicyBenefitItem.policyNo === policyNo
    );

    if (policyBenefitExistList.length === 0) {
      lodash.map(beneficiaryList, (beneficiaryListItemId) => {
        delete claimEntities.beneficiaryListMap[beneficiaryListItemId];
      });
    }
  });
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
    if (!(lodash.isArray(beneficiaryList) && beneficiaryList.length > 0)) {
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
        relationshipWithInsured: relationshipWithInsuredForHK.self,
        relationshipWithPayee: 'SLF',
        surname: insured.surname,
      };
      lodash.set(policyBenefitItem, 'beneficiaryList', [beneficiaryItemId]);
      lodash.set(claimEntities, `beneficiaryListMap.${beneficiaryItemId}`, beneficiaryItem);
      // policyBenefitItem.beneficiaryList = [beneficiaryItemId];
      // claimEntities.beneficiaryListMap[beneficiaryItemId] = beneficiaryItem;
    }
  });
};

// 逐级计算payableAmount和treatmentExpenseAmount： serveiceItem -> invoice -> treatment ->payable
export const calculatPayableAmountForSplit = (claimProcessData, claimEntities) => {
  let totlePayableAmount = 0;
  const { claimPayableList } = claimProcessData;
  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
      const { treatmentPayableList } = claimPayableItem;
      // 津贴时，总金额为所有治疗的总额的总和
      if (
        (claimPayableItem.benefitCategory === BenefitCategory.cashless ||
          claimPayableItem.benefitCategory === BenefitCategory.reimbursement) &&
        lodash.isArray(treatmentPayableList)
      ) {
        let totleTreatmentPayableAmount = 0;
        let totleAssessorOverrideAmount = null;
        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];
          if (!lodash.isEmpty(treatmentPayableItem)) {
            const assessorOverrideAmount = formUtils.queryValue(
              treatmentPayableItem.assessorOverrideAmount
            );
            // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
            const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

            if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
              totleAssessorOverrideAmount = add(
                totleAssessorOverrideAmount,
                assessorOverrideAmount
              );
            }
            totleTreatmentPayableAmount = add(
              totleTreatmentPayableAmount,
              treatmentPayableItem.payableAmount
            );
          }
        });

        claimPayableItem.payableAmount = totleTreatmentPayableAmount;
        claimPayableItem.assessorOverrideAmount = null;
        if (lodash.isNumber(totleAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totleTreatmentPayableAmount;
        }
      }

      if (
        formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.pending ||
        formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.approve ||
        formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.exGratia
      ) {
        totlePayableAmount = add(
          totlePayableAmount,
          formUtils.queryValue(claimPayableItem.payableAmount)
        );
      }
    });
  }

  claimProcessData.claimDecision = {
    ...claimProcessData.claimDecision,
    totalPayableAmount: totlePayableAmount,
    claimPayableAmount: totlePayableAmount,
  };
};
// 逐级计算payableAmount和treatmentExpenseAmount： serveiceItem -> invoice -> treatment ->payable
export const calculatPayableAmount = (claimProcessData, claimEntities = [], claimPayableList) => {
  let totlePayableAmount = 0;

  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
      claimPayableItem.payoutAmount = 0;
      const exchangeRate = claimPayableItem?.exchangeRatePolicyPayout || 1;
      const { treatmentPayableList } = claimPayableItem;
      // 津贴时，总金额为所有治疗的总额的总和
      if (
        (claimPayableItem.benefitCategory === BenefitCategory.cashless ||
          claimPayableItem.benefitCategory === BenefitCategory.aipa) &&
        lodash.isArray(treatmentPayableList)
      ) {
        let totleTreatmentPayableAmount = 0;
        let totleTreatmentPayoutAmount = 0;
        let totleAssessorOverrideAmount = null;

        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];
          if (!lodash.isEmpty(treatmentPayableItem)) {
            const assessorOverrideAmount = formUtils.queryValue(
              treatmentPayableItem.assessorOverrideAmount
            );
            // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
            const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

            if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
              totleAssessorOverrideAmount = add(
                totleAssessorOverrideAmount,
                assessorOverrideAmount
              );
            }

            totleTreatmentPayableAmount = add(
              totleTreatmentPayableAmount,
              formUtils.queryValue(treatmentPayableItem.payableAmount)
            );
            totleTreatmentPayoutAmount = add(
              totleTreatmentPayoutAmount,
              multiply(formUtils.queryValue(treatmentPayableItem.payableAmount), exchangeRate)
            );

            treatmentPayableItem.payoutAmount = multiply(
              formUtils.queryValue(treatmentPayableItem.payableAmount),
              exchangeRate
            );
          }
        });
        claimPayableItem.payableAmount = totleTreatmentPayableAmount;
        claimPayableItem.payoutAmount = totleTreatmentPayoutAmount;
        claimPayableItem.exchangeRatePolicyPayout = exchangeRate;

        claimPayableItem.assessorOverrideAmount = null;
        if (lodash.isNumber(totleAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totleTreatmentPayableAmount;
        }

        // if (claimPayableItem.payableAmount) {
        //   claimPayableItem.claimDecision = formUtils.queryValue(claimPayableItem.claimDecision);
        // }
      }

      if (
        claimPayableItem.benefitCategory === BenefitCategory.aipa &&
        lodash.isArray(treatmentPayableList)
      ) {
        let totleTreatmentPayableAmount = 0;
        let totleTreatmentPayoutAmount = 0;

        const totleAssessorOverrideAmount = null;
        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];
          let totleAccidentBenefitPayableAmount = 0;
          let totleAccidentBenefitPayoutAmount = 0;

          let totleAccidentBenefitAssessorOverrideAmount: any = null;
          const { accidentBenefitPayableList } = treatmentPayableItem;

          lodash.map(accidentBenefitPayableList, (accidentBenefitPayableId) => {
            const accidentBenefitPayableItem =
              claimEntities?.accidentBenefitPayableListMap?.[accidentBenefitPayableId];
            if (!lodash.isEmpty(accidentBenefitPayableItem)) {
              const assessorOverrideAmount = formUtils.queryValue(
                accidentBenefitPayableItem.assessorOverrideAmount
              );
              // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
              const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

              if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
                totleAccidentBenefitAssessorOverrideAmount = add(
                  totleAccidentBenefitAssessorOverrideAmount,
                  assessorOverrideAmount
                );
              }

              totleAccidentBenefitPayableAmount = add(
                totleAccidentBenefitPayableAmount,
                formUtils.queryValue(accidentBenefitPayableItem.payableAmount)
              );

              totleAccidentBenefitPayoutAmount = add(
                totleAccidentBenefitPayoutAmount,
                multiply(
                  formUtils.queryValue(accidentBenefitPayableItem.payableAmount),
                  exchangeRate
                )
              );
              accidentBenefitPayableItem.payoutAmount = multiply(
                formUtils.queryValue(accidentBenefitPayableItem.payableAmount),
                exchangeRate
              );
            }
          });
          treatmentPayableItem.payableAmount = totleAccidentBenefitPayableAmount;
          treatmentPayableItem.payoutAmount = totleAccidentBenefitPayoutAmount;

          treatmentPayableItem.assessorOverrideAmount = null;
          if (lodash.isNumber(totleAccidentBenefitAssessorOverrideAmount)) {
            treatmentPayableItem.assessorOverrideAmount = totleAccidentBenefitPayableAmount;
          }

          const assessorOverrideAmount = formUtils.queryValue(
            treatmentPayableItem.assessorOverrideAmount
          );
          // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
          const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

          if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
            totleAccidentBenefitAssessorOverrideAmount = add(
              totleAccidentBenefitAssessorOverrideAmount,
              assessorOverrideAmount
            );
          }

          totleTreatmentPayableAmount = add(
            totleTreatmentPayableAmount,
            formUtils.queryValue(treatmentPayableItem.payableAmount)
          );

          totleTreatmentPayoutAmount = add(
            totleTreatmentPayoutAmount,
            multiply(treatmentPayableItem.payableAmount, exchangeRate)
          );
        });
        claimPayableItem.payableAmount = totleTreatmentPayableAmount;
        claimPayableItem.payoutAmount = totleTreatmentPayoutAmount;
        claimPayableItem.exchangeRatePolicyPayout = exchangeRate;

        claimPayableItem.assessorOverrideAmount = null;
        if (lodash.isNumber(totleAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totleTreatmentPayableAmount;
        }
      }

      // procedure时，proceduceList -> treatment ->payable，逐级计算
      if (
        claimPayableItem.benefitCategory === BenefitCategory.S &&
        lodash.isArray(treatmentPayableList)
      ) {
        let totleTreatmentPayableAmount = 0;
        let totleTreatmentPayoutAmount = 0;

        let totleTreatmentAssessorOverrideAmount = null;

        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];

          const { procedurePayableList } = treatmentPayableItem;

          let totleProcedurePayableAmount = 0;
          let totleProcedurePayoutAmount = 0;
          let totleProcedureAssessorOverrideAmount = null;

          lodash.map(procedurePayableList, (procedurePayableItemId) => {
            // 计算每条账单的payableAmount
            const procedurePayableItem: any =
              claimEntities.procedurePayableListMap?.[procedurePayableItemId];

            if (!lodash.isEmpty(procedurePayableItem)) {
              const assessorOverrideAmount = formUtils.queryValue(
                procedurePayableItem.assessorOverrideAmount
              );
              // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
              const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

              if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
                totleProcedureAssessorOverrideAmount = add(
                  totleProcedureAssessorOverrideAmount,
                  assessorOverrideAmount
                );
              }

              totleProcedurePayableAmount = add(
                totleProcedurePayableAmount,
                formUtils.queryValue(procedurePayableItem.payableAmount)
              );

              totleProcedurePayoutAmount = add(
                totleProcedurePayoutAmount,
                multiply(formUtils.queryValue(procedurePayableItem.payableAmount), exchangeRate)
              );
              procedurePayableItem.payoutAmount = multiply(
                formUtils.queryValue(procedurePayableItem.payableAmount),
                exchangeRate
              );
            }
          });

          const assessorOverrideAmount = formUtils.queryValue(
            treatmentPayableItem.assessorOverrideAmount
          );
          // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
          const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

          treatmentPayableItem.payableAmount = totleProcedurePayableAmount;
          treatmentPayableItem.payoutAmount = totleProcedurePayoutAmount;

          treatmentPayableItem.assessorOverrideAmount = null;
          if (lodash.isNumber(totleProcedureAssessorOverrideAmount)) {
            treatmentPayableItem.assessorOverrideAmount = totleProcedurePayableAmount;
          }

          if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
            totleTreatmentAssessorOverrideAmount = add(
              totleTreatmentAssessorOverrideAmount,
              assessorOverrideAmount
            );
          }

          totleTreatmentPayableAmount = add(
            totleTreatmentPayableAmount,
            formUtils.queryValue(treatmentPayableItem.payableAmount)
          );
          totleTreatmentPayoutAmount = add(
            totleTreatmentPayoutAmount,
            multiply(formUtils.queryValue(treatmentPayableItem.payableAmount), exchangeRate)
          );
          treatmentPayableItem.payoutAmount = multiply(
            formUtils.queryValue(treatmentPayableItem.payableAmount),
            exchangeRate
          );
        });

        claimPayableItem.payableAmount = totleTreatmentPayableAmount;
        claimPayableItem.payoutAmount = totleTreatmentPayoutAmount;
        claimPayableItem.exchangeRatePolicyPayout = exchangeRate;

        claimPayableItem.assessorOverrideAmount = null;
        if (lodash.isNumber(totleTreatmentAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totleTreatmentPayableAmount;
        }
      }

      if (
        claimPayableItem.benefitCategory === BenefitCategory.Crisis &&
        lodash.isArray(treatmentPayableList)
      ) {
        let totleTreatmentPayableAmount = 0;
        let totleTreatmentPayoutAmount = 0;

        let totleTreatmentAssessorOverrideAmount = null;

        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];

          const { otherProcedurePayableList } = treatmentPayableItem;

          let totleOterProcedurePayableAmount = 0;
          let totleOtherProcedurePayoutAmount = 0;
          let totleOtherProcedureAssessorOverrideAmount = null;
          lodash.map(otherProcedurePayableList, (id) => {
            // 计算每条账单的payableAmount
            const payableItem: any = claimEntities?.otherProcedurePayableListMap?.[id];

            if (!lodash.isEmpty(payableItem)) {
              const assessorOverrideAmount = formUtils.queryValue(
                payableItem.assessorOverrideAmount
              );
              // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
              const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

              if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
                totleOtherProcedureAssessorOverrideAmount = add(
                  totleOtherProcedureAssessorOverrideAmount,
                  assessorOverrideAmount
                );
              }

              totleOterProcedurePayableAmount = add(
                totleOterProcedurePayableAmount,
                formUtils.queryValue(payableItem.payableAmount)
              );

              totleOtherProcedurePayoutAmount = add(
                totleOtherProcedurePayoutAmount,
                multiply(formUtils.queryValue(payableItem.payableAmount), exchangeRate)
              );
              payableItem.payoutAmount = multiply(
                formUtils.queryValue(payableItem.payableAmount),
                exchangeRate
              );
            }
          });
          treatmentPayableItem.payableAmount = totleOterProcedurePayableAmount;
          treatmentPayableItem.payoutAmount = totleOtherProcedurePayoutAmount;

          treatmentPayableItem.assessorOverrideAmount = null;
          if (lodash.isNumber(totleOtherProcedureAssessorOverrideAmount)) {
            treatmentPayableItem.assessorOverrideAmount = totleOterProcedurePayableAmount;
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

          totleTreatmentPayableAmount = add(
            totleTreatmentPayableAmount,
            formUtils.queryValue(treatmentPayableItem.payableAmount)
          );
          totleTreatmentPayoutAmount = add(
            totleTreatmentPayoutAmount,
            multiply(formUtils.queryValue(treatmentPayableItem.payableAmount), exchangeRate)
          );

          treatmentPayableItem.payoutAmount = multiply(
            formUtils.queryValue(treatmentPayableItem.payableAmount),
            exchangeRate
          );
        });

        claimPayableItem.payableAmount = totleTreatmentPayableAmount;
        claimPayableItem.payoutAmount = totleTreatmentPayoutAmount;
        claimPayableItem.exchangeRatePolicyPayout = exchangeRate;

        claimPayableItem.assessorOverrideAmount = null;
        if (lodash.isNumber(totleTreatmentAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totleTreatmentPayableAmount;
        }
      }

      if (claimPayableItem.benefitCategory === BenefitCategory.life) {
        claimPayableItem.payableAmount = formUtils.queryValue(
          claimPayableItem.lifePayable?.payableAmount || 0
        );
        claimPayableItem.payoutAmount = claimPayableItem.payableAmount;
      }

      // 医疗时，serveiceItem -> invoice -> treatment ->payable，逐级计算
      if (
        claimPayableItem.benefitCategory === BenefitCategory.reimbursement &&
        lodash.isArray(treatmentPayableList)
      ) {
        let totleTreatmentPayableAmount = 0;
        let totleTreatmentPayoutAmount = 0;

        let totleTreatmentAssessorOverrideAmount = null;

        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];
          let totleInvoicePayableAmount = 0;
          let totleInvoicePayoutAmount = 0;

          let totleInvoiceAssessorOverrideAmount = null;
          const { invoicePayableList } = treatmentPayableItem;

          lodash.map(invoicePayableList, (invoicePayableItemId) => {
            // 计算每条账单的payableAmount
            const invoicePayableItem = claimEntities.invoicePayableListMap[invoicePayableItemId];

            let totleServicePayableAmount = 0;
            let totleServicePayoutAmount = 0;

            let totleServiceAssessorOverrideAmount = null;
            const { serviceItemPayableList } = invoicePayableItem;

            lodash.map(serviceItemPayableList, (servicePayableItemId) => {
              const servicePayableItem =
                claimEntities.serviceItemPayableListMap[servicePayableItemId];
              if (!lodash.isEmpty(treatmentPayableItem)) {
                const assessorOverrideAmount = formUtils.queryValue(
                  servicePayableItem.assessorOverrideAmount
                );
                // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
                const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

                if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
                  totleServiceAssessorOverrideAmount = add(
                    totleServiceAssessorOverrideAmount,
                    assessorOverrideAmount
                  );
                }

                totleServicePayableAmount = add(
                  totleServicePayableAmount,
                  formUtils.queryValue(servicePayableItem.payableAmount)
                );

                totleServicePayoutAmount = add(
                  totleServicePayoutAmount,
                  multiply(formUtils.queryValue(servicePayableItem.payableAmount), exchangeRate)
                );
                servicePayableItem.payoutAmount = multiply(
                  formUtils.queryValue(servicePayableItem.payableAmount),
                  exchangeRate
                );
              }
            });

            invoicePayableItem.payableAmount = totleServicePayableAmount;
            invoicePayableItem.payoutAmount = totleServicePayoutAmount;

            invoicePayableItem.assessorOverrideAmount = null;
            if (lodash.isNumber(totleServiceAssessorOverrideAmount)) {
              invoicePayableItem.assessorOverrideAmount = totleServicePayableAmount;
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

            totleInvoicePayableAmount = add(
              totleInvoicePayableAmount,
              formUtils.queryValue(invoicePayableItem.payableAmount)
            );

            totleInvoicePayoutAmount = add(
              totleInvoicePayoutAmount,
              multiply(formUtils.queryValue(invoicePayableItem.payableAmount), exchangeRate)
            );
          });

          treatmentPayableItem.payableAmount = totleInvoicePayableAmount;
          treatmentPayableItem.payoutAmount = totleInvoicePayoutAmount;

          treatmentPayableItem.assessorOverrideAmount = null;
          if (lodash.isNumber(totleInvoiceAssessorOverrideAmount)) {
            treatmentPayableItem.assessorOverrideAmount = totleInvoicePayableAmount;
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

          totleTreatmentPayableAmount = add(
            totleTreatmentPayableAmount,
            formUtils.queryValue(treatmentPayableItem.payableAmount)
          );

          totleTreatmentPayoutAmount = add(
            totleTreatmentPayoutAmount,
            multiply(treatmentPayableItem.payableAmount, exchangeRate)
          );
        });

        claimPayableItem.payableAmount = totleTreatmentPayableAmount;
        claimPayableItem.payoutAmount = totleTreatmentPayoutAmount;
        claimPayableItem.exchangeRatePolicyPayout = exchangeRate;

        claimPayableItem.assessorOverrideAmount = null;
        if (lodash.isNumber(totleTreatmentAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totleTreatmentPayableAmount;
        }

        // if (claimPayableItem.payableAmount) {
        //   claimPayableItem.claimDecision = formUtils.queryValue(claimPayableItem.claimDecision);
        // }
      }

      if (
        formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.pending ||
        formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.approve ||
        formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.exGratia
      ) {
        totlePayableAmount = add(
          totlePayableAmount,
          formUtils.queryValue(claimPayableItem.payoutAmount)
        );
        const refundAmount = formUtils.queryValue(claimPayableItem.lifePayable?.refundAmount);
        if (refundAmount && claimPayableItem.benefitCategory === BenefitCategory.life) {
          totlePayableAmount = add(totlePayableAmount, refundAmount);
        }
      }
    });
  }

  claimProcessData.claimDecision = {
    ...claimProcessData.claimDecision,
    totalPayableAmount: +Number(totlePayableAmount).toFixed(2),
    claimPayableAmount: +Number(totlePayableAmount).toFixed(2),
    assessmentDecision: totlePayableAmount
      ? formUtils.queryValue(claimProcessData?.claimDecision?.assessmentDecision)
      : claimProcessData?.claimDecision?.assessmentDecision,
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
    // handleBeneficicayList(claimProcessData, claimEntities);
  }
};

/**
 *
 * @param claimProcessData
 * @param claimEntities
 * 计算保单分配列表的每个受益人的的收益金额
 */
export const calculatBeneficiaryAmount = (claimProcessData, claimEntities) => {
  if (!claimProcessData || !claimEntities) return {};
  const { policyBenefitList, payeeList } = claimProcessData;
  if (lodash.isArray(policyBenefitList) && policyBenefitList.length > 0) {
    lodash.map(policyBenefitList, (policyBenefitItemId) => {
      let totleBeneficiaryAmount = 0; // beneficiaryAmount累加的总金额
      let lastBeneficiaryAmount = 0; // 除去第一个beneficiaryAmount之外的累加的总金额
      const policyBenefitItem = claimEntities.policyBenefitListMap[policyBenefitItemId];
      const { beneficiaryList, benefitAmount } = policyBenefitItem;
      if (lodash.isArray(beneficiaryList) && beneficiaryList.length > 0) {
        lodash.map(beneficiaryList, (beneficiaryListItemId, index) => {
          const beneficiaryItem = claimEntities.beneficiaryListMap[beneficiaryListItemId];
          const beneficiaryPercentage = formUtils.queryValue(beneficiaryItem.beneficiaryPercentage);
          let beneficiaryAmount = 0;
          if (!valueIsEmpty(beneficiaryPercentage)) {
            beneficiaryAmount = Number(multiply(benefitAmount, beneficiaryPercentage) / 100);
          }
          beneficiaryItem.beneficiaryAmount = beneficiaryAmount;
          totleBeneficiaryAmount = add(totleBeneficiaryAmount, beneficiaryAmount);
          if (index > 0) {
            lastBeneficiaryAmount = add(lastBeneficiaryAmount, beneficiaryAmount);
          }
        });
        // 如果受益人分配的金额累加大于分配金额，则第一个受益人的分配金额就为总分配金额减去除第一个之外受益人的分配金额
        if (totleBeneficiaryAmount > benefitAmount) {
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

/**
 *
 * @param claimProcessData
 * @param claimEntities
 * 计算payeeList中每个领款人的paymentAmount
 */
export const calculatPaymentAmount = (claimProcessData, claimEntities) => {
  if (!claimProcessData || !claimEntities) return {};
  const { payeeList } = claimProcessData;
  if (lodash.isArray(payeeList) && payeeList.length > 0) {
    // 合并所有的beneficiary
    const beneficiaryListEntities = lodash.toPairs(claimEntities.beneficiaryListMap);
    const allBeneficiaryList = [];
    lodash.map(beneficiaryListEntities, (item) => {
      const beneficiaryItem = {
        ...(item[1] || {}),
      };
      beneficiaryItem.payeeId = formUtils.queryValue(beneficiaryItem.payeeId);
      allBeneficiaryList.push(beneficiaryItem);
    });
    // 根据payeeId对allBeneficiaryList分组，计算每个payeeId的paymentAmount
    const payeeIdPaymentAmountMap = {};
    lodash.map(payeeList, (payeeId) => {
      if (lodash.isNumber(payeeIdPaymentAmountMap[payeeId])) {
        claimEntities.payeeListMap[payeeId].paymentAmount = payeeIdPaymentAmountMap[payeeId];
      } else {
        const { paymentAmount } = claimEntities.payeeListMap[payeeId];
        claimEntities.payeeListMap[payeeId].paymentAmount = lodash.isPlainObject(paymentAmount)
          ? {
              ...(claimEntities.payeeListMap[payeeId]?.paymentAmount || {}),
              value: null,
            }
          : null;
      }
    });
  }
};

export default {
  calculatPayableAmount,
  updataPolicyBenefitList,
};
