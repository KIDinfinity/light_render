import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add, multiply } from '@/utils/precisionUtils';
import { ClaimDecision, BenefitCategory } from 'claim/pages/utils/claim';

const map: any = {
  [BenefitCategory.S]: {
    parentItem: 'treatmentPayableListMap',
    parentList: 'treatmentPayableList',
    item: 'procedurePayableListMap',
    list: 'procedurePayableList',
  },
  [BenefitCategory.reimbursement]: {
    parentItem: 'treatmentPayableListMap',
    parentList: 'treatmentPayableList',
    item: 'invoicePayableListMap',
    list: 'invoicePayableList',
    children: {
      parentItem: 'invoicePayableListMap',
      parentList: 'invoicePayableList',
      item: 'serviceItemPayableListMap',
      list: 'serviceItemPayableList',
    },
  },
  [BenefitCategory.T]: {
    parentItem: 'treatmentPayableListMap',
    parentList: 'treatmentPayableList',
    item: 'otherProcedurePayableListMap',
    list: 'otherProcedurePayableList',
  },
  [BenefitCategory.CIC]: {
    parentItem: 'treatmentPayableListMap',
    parentList: 'treatmentPayableList',
    item: 'otherProcedurePayableListMap',
    list: 'otherProcedurePayableList',
  },
};

const calculReduce = (result: any, id: string, target: any, exchangeRate: number) => {
  const payablItem = formUtils.cleanValidateData(target?.[id]);

  return {
    payableAmount: add(payablItem?.payableAmount, result?.payableAmount),
    changeObjectAmount: lodash.isNumber(payablItem?.changeObjectAmount)
      ? add(payablItem?.changeObjectAmount, result?.changeObjectAmount)
      : result?.changeObjectAmount,
    payoutAmount: add(multiply(payablItem?.payableAmount, exchangeRate || 1), result?.payoutAmount),

    ...lodash.reduce(
      ['assessorOverrideAmount', 'systemCalculationAmount'],
      (obj: any, el: any) => {
        return {
          ...obj,
          [el]: lodash.isNumber(payablItem?.[el])
            ? add(payablItem?.[el], result?.[el] || 0)
            : result?.[el],
        };
      },
      {}
    ),
  };
};

const calculatForBenefitCategory = (
  mapItem: any,
  exchangeRatePolicyPayout: any,
  claimEntities: any,
  currentItem: any
) => {
  const target = claimEntities?.[mapItem?.item];
  const parentTarget = claimEntities?.[mapItem?.parentItem];
  const parentTargetList = currentItem?.[mapItem?.parentList];
  return lodash.reduce(
    parentTargetList,
    (tResult, id) => {
      const payableItem = parentTarget?.[id];
      const targetList = payableItem?.[mapItem?.list];
      const response = lodash.has(mapItem, 'children')
        ? calculatForBenefitCategory(
            mapItem?.children,
            exchangeRatePolicyPayout,
            claimEntities,
            payableItem
          )
        : lodash.reduce(
            targetList,
            (result, pid) => calculReduce(result, pid, target, exchangeRatePolicyPayout),
            {
              payableAmount: 0,
              changeObjectAmount: null,
              payoutAmount: 0,
              assessorOverrideAmount: null,
              systemCalculationAmount: null,
            }
          );

      payableItem.payableAmount = response?.payableAmount;
      payableItem.changeObjectAmount = response?.changeObjectAmount;
      payableItem.payoutAmount = response?.payoutAmount;
      payableItem.assessorOverrideAmount = lodash.isNumber(response?.assessorOverrideAmount)
        ? response?.assessorOverrideAmount
        : null;
      payableItem.systemCalculationAmount = lodash.isNumber(response?.systemCalculationAmount)
        ? response?.systemCalculationAmount
        : null;
      return calculReduce(tResult, id, parentTarget, exchangeRatePolicyPayout);
    },
    {
      payableAmount: 0,
      changeObjectAmount: 0,
      payoutAmount: 0,
      assessorOverrideAmount: null,
      systemCalculationAmount: null,
    }
  );
};

const calculateMajorIllnessCashBenefit = (claimPayableItem: any, claimEntities: any) => {
  const { claimIncidentPayableList, exchangeRatePolicyPayout } = claimPayableItem;
  const { claimIncidentPayableListMap } = claimEntities;
  const response = lodash.reduce(
    claimIncidentPayableList,
    (result, id) => calculReduce(result, id, claimIncidentPayableListMap, exchangeRatePolicyPayout),
    {
      payableAmount: 0,
      payoutAmount: 0,
      assessorOverrideAmount: null,
      systemCalculationAmount: null,
    }
  );
  claimPayableItem.payableAmount = response?.payableAmount;
  claimPayableItem.payoutAmount = response?.payoutAmount;
  claimPayableItem.assessorOverrideAmount = lodash.isNumber(response?.assessorOverrideAmount)
    ? response?.payableAmount
    : null;
  claimPayableItem.systemCalculationAmount = lodash.isNumber(response?.systemCalculationAmount)
    ? response?.systemCalculationAmount
    : null;
};

const calculateCashless = (claimPayableItem: any, claimEntities: any) => {
  const { treatmentPayableList, exchangeRatePolicyPayout } = claimPayableItem;
  const { treatmentPayableListMap } = claimEntities;

  const response = lodash.reduce(
    treatmentPayableList,
    (result, id) => calculReduce(result, id, treatmentPayableListMap, exchangeRatePolicyPayout),
    {
      payableAmount: 0,
      changeObjectAmount: 0,
      payoutAmount: 0,
      assessorOverrideAmount: null,
      systemCalculationAmount: null,
    }
  );

  claimPayableItem.payableAmount = response?.payableAmount;
  claimPayableItem.changeObjectAmount = response?.changeObjectAmount;
  claimPayableItem.payoutAmount = response?.payoutAmount;
  claimPayableItem.assessorOverrideAmount = lodash.isNumber(response?.assessorOverrideAmount)
    ? response?.assessorOverrideAmount
    : null;
  claimPayableItem.systemCalculationAmount = lodash.isNumber(response?.systemCalculationAmount)
    ? response?.systemCalculationAmount
    : null;
};

const calculateLife = (claimPayableItem: any) => {
  const { exchangeRatePolicyPayout } = claimPayableItem;
  claimPayableItem.payoutAmount = multiply(
    claimPayableItem?.payableAmount,
    exchangeRatePolicyPayout
  );
};

const calculatDefalut = (claimPayableItem: any, claimEntities: any) => {
  const { benefitCategory, exchangeRatePolicyPayout } = claimPayableItem;

  const mapItem = map?.[benefitCategory];
  const tResponse = calculatForBenefitCategory(
    mapItem,
    exchangeRatePolicyPayout,
    claimEntities,
    claimPayableItem
  );
  claimPayableItem.payableAmount = tResponse?.payableAmount;
  claimPayableItem.changeObjectAmount = tResponse?.changeObjectAmount;
  claimPayableItem.payoutAmount = tResponse?.payoutAmount;
  claimPayableItem.assessorOverrideAmount = lodash.isNumber(tResponse?.assessorOverrideAmount)
    ? tResponse?.assessorOverrideAmount
    : null;
  claimPayableItem.systemCalculationAmount = lodash.isNumber(tResponse?.systemCalculationAmount)
    ? tResponse?.systemCalculationAmount
    : null;
};

const funMap = {
  [BenefitCategory.S]: calculatDefalut,
  [BenefitCategory.T]: calculatDefalut,
  [BenefitCategory.reimbursement]: calculatDefalut,
  [BenefitCategory.cashless]: calculateCashless,
  [BenefitCategory.LumpSum]: calculateCashless,
  [BenefitCategory.life]: calculateLife,
  [BenefitCategory.CIC]: calculatDefalut,
  [BenefitCategory.MajorIllnessCashBenefit]: calculateMajorIllnessCashBenefit,
};

// 逐级计算payableAmount和treatmentExpenseAmount： serveiceItem -> invoice -> treatment ->payable
export const calculatPayableAmount = (claimProcessData: any, claimEntities: any = []) => {
  let totlePayableAmount = 0;
  const { claimPayableList } = claimProcessData;

  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimEntities?.claimPayableListMap?.[claimPayableItemId];
      claimPayableItem.payoutAmount = 0;

      const handler = funMap?.[claimPayableItem?.benefitCategory];
      if (lodash.isFunction(handler)) handler(claimPayableItem, claimEntities);

      if (
        formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.pending ||
        formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.approve ||
        formUtils.queryValue(claimPayableItem.claimDecision) === ClaimDecision.exGratia
      ) {
        totlePayableAmount = add(
          totlePayableAmount,
          formUtils.queryValue(claimPayableItem.payoutAmount)
        );
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

  return { claimProcessData, claimEntities };
};

export default {
  calculatPayableAmount,
};
