import lodash, { isArray, forEach, isNumber } from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { add, multiply, subtract } from '@/utils/precisionUtils';
import { POLICYBENEFITITEM, BENEFICIARYITEM } from '@/utils/claimConstant';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { eClaimDecision } from 'claim/enum/claimDecision';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { valueIsEmpty } from '@/utils/claimUtils';
import { BenefitCategory as enumBenefitCategory } from '../dto';

const AIPA = enumBenefitCategory.aipa;

const vldClaimDecision = (payableAmount, value) => {
  const errors = [];
  if (payableAmount === 0 && value === eClaimDecision.approve) {
    errors.push(formatMessageApi({ message: 'ERR_000266' }));
  }
  if (value === 'P') {
    errors.push(formatMessageApi({ message: 'ERR_000199' }));
  }
  return errors.length > 0 ? errors : undefined;
};

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
      if (payableItem.claimDecision === ClaimDecision.approve && lodash.isNumber(payableAmount)) {
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
const handleNewPolicyBenefitList = (processData, entities, tempPolicyBenefitList) => {
  const claimEntities = entities;
  const claimProcessData = processData;
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
const handleBeneficicayList = (processData, entities) => {
  const claimEntities = entities;
  const claimProcessData = processData;
  if (!claimProcessData || !claimEntities) return {};
  const insured = formUtils.cleanValidateData(claimProcessData.insured);
  const { policyBenefitList, payeeList } = claimProcessData;
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
        payeeId: payeeList[0],
        phoneNo: insured.phoneNo,
        policyBenefitId: policyBenefitItem.id,
        relationshipWithInsured: 'SLF',
        relationshipWithPayee: 'SLF',
        surname: insured.surname,
      };

      policyBenefitItem.beneficiaryList = [beneficiaryItemId];
      claimEntities.beneficiaryListMap[beneficiaryItemId] = beneficiaryItem;
    }
  });
};

// 逐级计算payableAmount和treatmentExpenseAmount： serveiceItem -> invoice -> treatment ->payable
export const calculatPayableAmountForSplit = (processData, entities) => {
  let totlePayableAmount = 0;
  const claimEntities = entities;
  const claimProcessData = processData;
  const { claimPayableList } = claimProcessData;
  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
      const { treatmentPayableList } = claimPayableItem;
      // 津贴时，总金额为所有治疗的总额的总和
      if (
        (claimPayableItem.benefitCategory === 'C' || claimPayableItem.benefitCategory === 'R') &&
        lodash.isArray(treatmentPayableList)
      ) {
        let totleTreatmentPayableAmount = 0;
        let totleAssessorOverrideAmount = null;
        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];
          const assessorOverrideAmount = formUtils.queryValue(
            treatmentPayableItem.assessorOverrideAmount
          );
          // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
          const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

          if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
            totleAssessorOverrideAmount = add(totleAssessorOverrideAmount, assessorOverrideAmount);
          }
          totleTreatmentPayableAmount = add(
            totleTreatmentPayableAmount,
            treatmentPayableItem.payableAmount
          );
        });

        claimPayableItem.payableAmount = totleTreatmentPayableAmount;
        claimPayableItem.assessorOverrideAmount = null;
        if (lodash.isNumber(totleAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totleTreatmentPayableAmount;
        }
      }

      if (formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.approve) {
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

export const calculatAdjustmentAmount = (processData, entities) => {
  let totlePayableAmount = 0;
  const claimEntities = entities;
  const claimProcessData = processData;
  const { claimPayableList } = claimProcessData;
  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
      const isDeny = formUtils.queryValue(claimPayableItem.appealRequestDecision) === 'D';
      const isClaimDeny = formUtils.queryValue(claimPayableItem.claimDecision) === 'D';

      const { treatmentPayableList } = claimPayableItem;

      if (
        claimPayableItem.benefitCategory === enumBenefitCategory.cashless &&
        lodash.isArray(treatmentPayableList)
      ) {
        let totleTreatmentPayableAmount = 0;
        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];

          treatmentPayableItem.payableAmount = formUtils.queryValue(
            treatmentPayableItem.claimAdjustment
          );

          totleTreatmentPayableAmount = add(
            totleTreatmentPayableAmount,
            formUtils.queryValue(treatmentPayableItem.claimAdjustment)
          );
          if (isClaimDeny) {
            treatmentPayableItem.claimAdjustment = treatmentPayableItem.assessorOverrideAmount
              ? -treatmentPayableItem.assessorOverrideAmount
              : 0;
            treatmentPayableItem.payableAmount = treatmentPayableItem.claimAdjustment;
          }
          if (isDeny) {
            treatmentPayableItem.payableAmount = 0;
            treatmentPayableItem.claimAdjustment = 0;
          }
        });

        claimPayableItem.claimAdjustment = totleTreatmentPayableAmount;
        claimPayableItem.payableAmount = totleTreatmentPayableAmount;

        if (isClaimDeny) {
          claimPayableItem.claimAdjustment = claimPayableItem.assessorOverrideAmount
            ? -claimPayableItem.assessorOverrideAmount
            : 0;
          claimPayableItem.payableAmount = claimPayableItem.claimAdjustment;
          if (!lodash.isEmpty(claimPayableItem.lifePayable)) {
            claimPayableItem.lifePayable.payableAmount = 0;
          }
        }
        if (isDeny) {
          claimPayableItem.payableAmount = 0;
          claimPayableItem.claimAdjustment = 0;
        }
      }

      if (
        claimPayableItem.benefitCategory === enumBenefitCategory.reimbursement &&
        lodash.isArray(treatmentPayableList)
      ) {
        let totleTreatmentPayableAmount = 0;
        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];

          if (!lodash.isEmpty(treatmentPayableItem)) {
            let totleInvoicePayableAmount = 0;
            const { invoicePayableList } = treatmentPayableItem;

            lodash.map(invoicePayableList, (invoicePayableItemId) => {
              // 计算每条账单的payableAmount
              const invoicePayableItem = claimEntities.invoicePayableListMap[invoicePayableItemId];
              if (!lodash.isEmpty(invoicePayableItem)) {
                let totleBenefitItemPayableAmount = 0;
                const { benefitItemPayableList } = invoicePayableItem;

                lodash.map(benefitItemPayableList, (benefitItemPayableId) => {
                  // 计算每条账单的payableAmount
                  const benefitItemPayableItem =
                    claimEntities.benefitItemPayableListMap[benefitItemPayableId];
                  if (!lodash.isEmpty(benefitItemPayableItem)) {
                    benefitItemPayableItem.payableAmount = formUtils.queryValue(
                      benefitItemPayableItem.claimAdjustment
                    );

                    totleBenefitItemPayableAmount = add(
                      totleBenefitItemPayableAmount,
                      formUtils.queryValue(benefitItemPayableItem.claimAdjustment)
                    );

                    if (isClaimDeny) {
                      benefitItemPayableItem.claimAdjustment = benefitItemPayableItem.assessorOverrideAmount
                        ? -benefitItemPayableItem.assessorOverrideAmount
                        : 0;
                      benefitItemPayableItem.payableAmount = benefitItemPayableItem.claimAdjustment;
                    }
                    if (isDeny) {
                      benefitItemPayableItem.payableAmount = 0;
                      benefitItemPayableItem.claimAdjustment = 0;
                    }
                  }
                });

                invoicePayableItem.claimAdjustment = totleBenefitItemPayableAmount;
                invoicePayableItem.payableAmount = totleBenefitItemPayableAmount;

                totleInvoicePayableAmount = add(
                  totleInvoicePayableAmount,
                  formUtils.queryValue(invoicePayableItem.claimAdjustment)
                );
                if (isClaimDeny) {
                  invoicePayableItem.claimAdjustment = invoicePayableItem.assessorOverrideAmount
                    ? -invoicePayableItem.assessorOverrideAmount
                    : 0;
                  invoicePayableItem.payableAmount = invoicePayableItem.claimAdjustment;
                }
                if (isDeny) {
                  invoicePayableItem.payableAmount = 0;
                  invoicePayableItem.claimAdjustment = 0;
                }
              }
            });

            treatmentPayableItem.claimAdjustment = totleInvoicePayableAmount;
            treatmentPayableItem.payableAmount = totleInvoicePayableAmount;

            totleTreatmentPayableAmount = add(
              totleTreatmentPayableAmount,
              formUtils.queryValue(treatmentPayableItem.claimAdjustment)
            );

            if (isClaimDeny) {
              treatmentPayableItem.claimAdjustment = treatmentPayableItem.assessorOverrideAmount
                ? -treatmentPayableItem.assessorOverrideAmount
                : 0;
              treatmentPayableItem.payableAmount = treatmentPayableItem.claimAdjustment;
            }
            if (isDeny) {
              treatmentPayableItem.payableAmount = 0;
              treatmentPayableItem.claimAdjustment = 0;
            }
          }
        });

        claimPayableItem.claimAdjustment = totleTreatmentPayableAmount;
        claimPayableItem.payableAmount = totleTreatmentPayableAmount;

        if (isClaimDeny) {
          claimPayableItem.claimAdjustment = claimPayableItem.assessorOverrideAmount
            ? -claimPayableItem.assessorOverrideAmount
            : 0;
          claimPayableItem.payableAmount = claimPayableItem.claimAdjustment;
          if (!lodash.isEmpty(claimPayableItem.lifePayable)) {
            claimPayableItem.lifePayable.payableAmount = 0;
          }
        }
        if (isDeny) {
          claimPayableItem.payableAmount = 0;
          claimPayableItem.claimAdjustment = 0;
        }
      }

      if (claimPayableItem.benefitCategory === enumBenefitCategory.life) {
        claimPayableItem.payableAmount = formUtils.queryValue(claimPayableItem.claimAdjustment);

        if (isClaimDeny) {
          claimPayableItem.claimAdjustment = claimPayableItem.assessorOverrideAmount
            ? -claimPayableItem.assessorOverrideAmount
            : 0;
          claimPayableItem.payableAmount = claimPayableItem.claimAdjustment;
          if (!lodash.isEmpty(claimPayableItem.lifePayable)) {
            claimPayableItem.lifePayable.payableAmount = 0;
          }
        }
        if (isDeny) {
          claimPayableItem.payableAmount = 0;
          claimPayableItem.claimAdjustment = 0;
        }
      }

      if (
        claimPayableItem.benefitCategory === enumBenefitCategory.aipa &&
        isArray(treatmentPayableList)
      ) {
        let totalTreatmentPayableAmount: number = 0;
        forEach(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];
          let totleAccidentPayableAmount = 0;

          const { accidentBenefitPayableList } = treatmentPayableItem;
          forEach(accidentBenefitPayableList, (benefitId) => {
            const accidentPayableItem = claimEntities.accidentBenefitPayableListMap[benefitId];
            const payableAmount = formUtils.queryValue(accidentPayableItem.claimAdjustment);

            accidentPayableItem.payableAmount = payableAmount;

            totleAccidentPayableAmount = add(totleAccidentPayableAmount, Number(payableAmount));

            if (isDeny) {
              accidentPayableItem.payableAmount = 0;
              accidentPayableItem.claimAdjustment = 0;
            }
          });

          treatmentPayableItem.claimAdjustment = totleAccidentPayableAmount;
          treatmentPayableItem.payableAmount = totleAccidentPayableAmount;

          totalTreatmentPayableAmount = add(
            totalTreatmentPayableAmount,
            formUtils.queryValue(treatmentPayableItem.claimAdjustment)
          );

          if (isDeny) {
            treatmentPayableItem.payableAmount = 0;
            treatmentPayableItem.claimAdjustment = 0;
          }
        });

        claimPayableItem.claimAdjustment = totalTreatmentPayableAmount;
        claimPayableItem.payableAmount = totalTreatmentPayableAmount;

        if (isDeny) {
          claimPayableItem.payableAmount = 0;
          claimPayableItem.claimAdjustment = 0;
        }
      }

      if (formUtils.queryValue(claimPayableItem.appealRequestDecision) === ClaimDecision.approve) {
        totlePayableAmount = add(
          totlePayableAmount,
          formUtils.queryValue(claimPayableItem.claimAdjustment)
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

function calculatAIPA(claimPayableItem, claimEntities) {
  const { treatmentPayableList, benefitCategory } = claimPayableItem;
  const { treatmentPayableListMap, accidentBenefitPayableListMap } = claimEntities;
  if (benefitCategory === AIPA && isArray(treatmentPayableList)) {
    let totalTreatmentPayableAmount: number = 0;
    let totleTreatmentSystemOverrideAmount: number = 0;
    let totleTreatmentAssessorOverrideAmount: number | null = null;

    forEach(treatmentPayableList, (treatmentPayableItemId) => {
      const treatmentPayableItem = treatmentPayableListMap[treatmentPayableItemId];
      let totleAccidentPayableAmount = 0;
      let totleAccidentAssessorOverrideAmount = null;
      let totleAccidentSystemOverrideAmount = 0;
      const { accidentBenefitPayableList } = treatmentPayableItem;

      forEach(accidentBenefitPayableList, (benefitId) => {
        const accidentPayableItem = accidentBenefitPayableListMap[benefitId];
        const systemCalculationAmount = formUtils.queryValue(
          accidentPayableItem.systemCalculationAmount
        );
        const assessorOverrideAmount = formUtils.queryValue(
          accidentPayableItem.assessorOverrideAmount
        );
        const payableAmount = formUtils.queryValue(accidentPayableItem.payableAmount);

        if (isNumber(assessorOverrideAmount)) {
          totleAccidentAssessorOverrideAmount = add(
            Number(totleAccidentAssessorOverrideAmount),
            assessorOverrideAmount
          );
        }
        totleAccidentPayableAmount = add(totleAccidentPayableAmount, Number(payableAmount));
        totleAccidentSystemOverrideAmount = add(
          totleAccidentSystemOverrideAmount,
          Number(systemCalculationAmount)
        );
      });
      treatmentPayableItem.systemCalculationAmount = totleAccidentSystemOverrideAmount;
      treatmentPayableItem.payableAmount = totleAccidentPayableAmount;
      treatmentPayableItem.assessorOverrideAmount = null;
      if (isNumber(totleAccidentAssessorOverrideAmount)) {
        treatmentPayableItem.assessorOverrideAmount = totleAccidentPayableAmount;

        totleTreatmentAssessorOverrideAmount = add(
          Number(totleTreatmentAssessorOverrideAmount),
          treatmentPayableItem.assessorOverrideAmount
        );
      }

      totalTreatmentPayableAmount = add(
        totalTreatmentPayableAmount,
        treatmentPayableItem.payableAmount
      );

      totleTreatmentSystemOverrideAmount = add(
        totleTreatmentSystemOverrideAmount,
        treatmentPayableItem.systemCalculationAmount
      );
    });

    if (claimPayableItem.payableAmount !== totalTreatmentPayableAmount) {
      claimPayableItem.claimDecision = {
        value: formUtils.queryValue(claimPayableItem.claimDecision),
        name: 'claimDecision',
        touched: true,
        dirty: false,
        errors: vldClaimDecision(
          totalTreatmentPayableAmount,
          formUtils.queryValue(claimPayableItem.claimDecision)
        ),
        validating: false,
      };
    }

    claimPayableItem.payableAmount = totalTreatmentPayableAmount;
    claimPayableItem.systemCalculationAmount = totleTreatmentSystemOverrideAmount;
    claimPayableItem.assessorOverrideAmount = null;
    if (isNumber(totleTreatmentAssessorOverrideAmount)) {
      claimPayableItem.assessorOverrideAmount = totalTreatmentPayableAmount;
    }
  }
}

// 逐级计算payableAmount和treatmentExpenseAmount： serveiceItem -> invoice -> treatment ->payable
export const calculatPayableAmount = (processData, entities) => {
  const totlePayableAmount = 0;
  const claimEntities = entities;
  const claimProcessData = processData;
  const { claimPayableList } = claimProcessData;
  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
      const { treatmentPayableList } = claimPayableItem;
      // 津贴时，总金额为所有治疗的总额的总和

      if (claimPayableItem.benefitCategory === 'C' && lodash.isArray(treatmentPayableList)) {
        let totleTreatmentPayableAmount = 0;
        let totleAssessorOverrideAmount = null;
        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];
          const assessorOverrideAmount = formUtils.queryValue(
            treatmentPayableItem.assessorOverrideAmount
          );
          // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
          const assessorAmountIsEmpty = valueIsEmpty(assessorOverrideAmount);

          if (!assessorAmountIsEmpty && lodash.isNumber(assessorOverrideAmount)) {
            totleAssessorOverrideAmount = add(totleAssessorOverrideAmount, assessorOverrideAmount);
          }
          totleTreatmentPayableAmount = add(
            totleTreatmentPayableAmount,
            treatmentPayableItem.payableAmount
          );
        });

        claimPayableItem.payableAmount = totleTreatmentPayableAmount;
        if (lodash.isNumber(totleAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totleAssessorOverrideAmount;
        }
      }

      // 医疗时，serveiceItem -> invoice -> treatment ->payable，逐级计算
      if (claimPayableItem.benefitCategory === 'R' && lodash.isArray(treatmentPayableList)) {
        let totleTreatmentPayableAmount = 0;
        let totleTreatmentAssessorOverrideAmount = null;

        lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
          const treatmentPayableItem =
            claimEntities.treatmentPayableListMap[treatmentPayableItemId];
          if (!lodash.isEmpty(treatmentPayableItem)) {
            let totleInvoicePayableAmount = 0;
            let totleInvoiceAssessorOverrideAmount = null;
            const { invoicePayableList } = treatmentPayableItem;

            lodash.map(invoicePayableList, (invoicePayableItemId) => {
              // 计算每条账单的payableAmount
              const invoicePayableItem = claimEntities.invoicePayableListMap[invoicePayableItemId];
              if (!lodash.isEmpty(invoicePayableItem)) {
                let totleServicePayableAmount = 0;
                let totleServiceAssessorOverrideAmount = null;
                const { benefitItemPayableList } = invoicePayableItem;

                lodash.map(benefitItemPayableList, (servicePayableItemId) => {
                  const servicePayableItem =
                    claimEntities.benefitItemPayableListMap[servicePayableItemId];
                  if (!lodash.isEmpty(servicePayableItem)) {
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
                      servicePayableItem.payableAmount
                    );
                  }
                });

                invoicePayableItem.payableAmount = totleServicePayableAmount;
                if (lodash.isNumber(totleServiceAssessorOverrideAmount)) {
                  invoicePayableItem.assessorOverrideAmount = totleServiceAssessorOverrideAmount;
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
                  invoicePayableItem.payableAmount
                );
              }
            });

            treatmentPayableItem.payableAmount = totleInvoicePayableAmount;
            if (lodash.isNumber(totleInvoiceAssessorOverrideAmount)) {
              treatmentPayableItem.assessorOverrideAmount = totleInvoiceAssessorOverrideAmount;
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
              treatmentPayableItem.payableAmount
            );
          }
        });

        claimPayableItem.payableAmount = totleTreatmentPayableAmount;
        if (lodash.isNumber(totleTreatmentAssessorOverrideAmount)) {
          claimPayableItem.assessorOverrideAmount = totleTreatmentAssessorOverrideAmount;
        }
      }

      calculatAIPA(claimPayableItem, claimEntities);
    });
  }
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

/**
 *
 * @param claimProcessData
 * @param claimEntities
 * 计算保单分配列表的每个受益人的的收益金额
 */
export const calculatBeneficiaryAmount = (processData, entities) => {
  const claimEntities = entities;
  const claimProcessData = processData;
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
export const calculatPaymentAmount = (processData, entities) => {
  const claimEntities = entities;
  const claimProcessData = processData;
  if (!claimProcessData || !claimEntities) return {};
  const { payeeList } = claimProcessData;
  if (lodash.isArray(payeeList) && payeeList.length > 0) {
    // 合并所有的beneficiary
    const beneficiaryListEntities = Object.entries(claimEntities.beneficiaryListMap);
    const allBeneficiaryList = [];
    lodash.map(beneficiaryListEntities, (item) => {
      const beneficiaryItem = {
        ...item[1],
      };
      beneficiaryItem.payeeId = formUtils.queryValue(beneficiaryItem.payeeId);
      allBeneficiaryList.push(beneficiaryItem);
    });
    // 根据payeeId对allBeneficiaryList分组，计算每个payeeId的paymentAmount
    const payeeIdPaymentAmountMap = {};
    const payeeIdGrouped = lodash.groupBy(allBeneficiaryList, 'payeeId');
    const payeeIdGroupedEntries = Object.entries(payeeIdGrouped);
    lodash.map(payeeIdGroupedEntries, (groupItem) => {
      let paymentAmount = null;
      lodash.map(groupItem[1], (payeeItem) => {
        paymentAmount = add(paymentAmount, payeeItem.beneficiaryAmount);
      });
      payeeIdPaymentAmountMap[groupItem[0]] = paymentAmount;
    });
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
  calculatAdjustmentAmount,
  updataPolicyBenefitList,
};
