import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { SourceSystem } from 'process/Enum';
import { add, multiply } from '@/utils/precisionUtils';
import { ClaimDecision, BenefitCategory, BenefitSubCategory } from 'claim/pages/utils/claim';

const map: any = {
  [BenefitCategory.S]: {
    parentItem: 'treatmentPayableListMap',
    parentList: 'treatmentPayableList',
    item: 'procedurePayableListMap',
    list: 'procedurePayableList',
  },
  COP: {
    parentItem: 'treatmentPayableListMap',
    parentList: 'treatmentPayableList',
    item: 'opTreatmentPayableListMap',
    list: 'opTreatmentPayableList',
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
  [BenefitCategory.OTP]: {
    parentItem: 'treatmentPayableListMap',
    parentList: 'treatmentPayableList',
    item: 'otherProcedurePayableListMap',
    list: 'otherProcedurePayableList',
  },
};

const calculReduce = (
  result: any,
  id: string,
  target: any,
  exchangeRate: number,
  lastLayer: boolean
) => {
  const payablItem = formUtils.cleanValidateData(target?.[id]);

  let refundAmount, discountAmount;
  if (lastLayer) {
    refundAmount =
      payablItem.reversalFlag === 'Y' && payablItem?.payableAmount < 0
        ? -payablItem?.payableAmount
        : 0;
    discountAmount =
      payablItem.reversalFlag !== 'Y' && payablItem?.payableAmount < 0
        ? -payablItem?.payableAmount
        : 0;
  } else {
    refundAmount = payablItem.refundAmount;
    discountAmount = payablItem.discountAmount;
  }

  const payableAmount = payablItem?.payableAmount;

  return {
    payableAmount: add(payablItem?.payableAmount, result?.payableAmount),
    assessorOverrideAmount: add(payablItem?.payableAmount, result?.payableAmount),
    changeObjectAmount: lodash.isNumber(payablItem?.changeObjectAmount)
      ? add(payablItem?.changeObjectAmount, result?.changeObjectAmount)
      : result?.changeObjectAmount,
    payoutAmount: add(multiply(payableAmount, exchangeRate || 1), result?.payoutAmount),
    refundAmount: add(multiply(refundAmount, exchangeRate || 1), result?.refundAmount),
    discountAmount: add(multiply(discountAmount, exchangeRate || 1), result?.discountAmount),
    ...lodash.reduce(
      ['systemCalculationAmount'],
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
            (result, pid) => calculReduce(result, pid, target, exchangeRatePolicyPayout, true),
            {
              payableAmount: 0,
              changeObjectAmount: null,
              payoutAmount: 0,
              assessorOverrideAmount: null,
              systemCalculationAmount: null,
              refundAmount: 0,
              discountAmount: 0,
            }
          );

      payableItem.payableAmount = response?.payableAmount;
      payableItem.changeObjectAmount = response?.changeObjectAmount;
      payableItem.payoutAmount = response?.payoutAmount;
      payableItem.assessorOverrideAmount = lodash.isNumber(response?.payableAmount)
        ? response?.payableAmount
        : null;
      payableItem.systemCalculationAmount = lodash.isNumber(response?.systemCalculationAmount)
        ? response?.systemCalculationAmount
        : null;
      payableItem.refundAmount = lodash.isNumber(response?.refundAmount)
        ? response?.refundAmount
        : null;
      payableItem.discountAmount = lodash.isNumber(response?.discountAmount)
        ? response?.discountAmount
        : null;
      return calculReduce(tResult, id, parentTarget, exchangeRatePolicyPayout, false);
    },
    {
      payableAmount: 0,
      changeObjectAmount: 0,
      payoutAmount: 0,
      assessorOverrideAmount: null,
      systemCalculationAmount: null,
      refundAmount: 0,
      discountAmount: 0,
    }
  );
};

const calculateMajorIllnessCashBenefit = (claimPayableItem: any, claimEntities: any) => {
  const { claimIncidentPayableList, exchangeRatePolicyPayout } = claimPayableItem;
  const { claimIncidentPayableListMap } = claimEntities;
  const response = lodash.reduce(
    claimIncidentPayableList,
    (result, id) =>
      calculReduce(result, id, claimIncidentPayableListMap, exchangeRatePolicyPayout, true),
    {
      payableAmount: 0,
      payoutAmount: 0,
      assessorOverrideAmount: null,
      systemCalculationAmount: null,
    }
  );
  claimPayableItem.payableAmount = response?.payableAmount;

  claimPayableItem.payoutAmount = response?.payoutAmount;
  claimPayableItem.assessorOverrideAmount = lodash.isNumber(response?.payableAmount)
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
    (result, id) =>
      calculReduce(result, id, treatmentPayableListMap, exchangeRatePolicyPayout, true),
    {
      payableAmount: 0,
      changeObjectAmount: 0,
      payoutAmount: 0,
      refundAmount: 0,
      discountAmount: 0,
      assessorOverrideAmount: null,
      systemCalculationAmount: null,
    }
  );

  claimPayableItem.payableAmount = response?.payableAmount;
  claimPayableItem.changeObjectAmount = response?.changeObjectAmount;
  claimPayableItem.payoutAmount = response?.payoutAmount;
  claimPayableItem.refundAmount = response?.refundAmount;
  claimPayableItem.discountAmount = response?.discountAmount;
  claimPayableItem.assessorOverrideAmount = lodash.isNumber(response?.payableAmount)
    ? response?.payableAmount
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

  let mapItem = map?.[benefitCategory];

  if (
    claimPayableItem.benefitCategory === BenefitCategory.cashless &&
    claimPayableItem.benefitSubCategory === BenefitSubCategory.OP
  ) {
    mapItem = map.COP;
  }
  const tResponse = calculatForBenefitCategory(
    mapItem,
    exchangeRatePolicyPayout,
    claimEntities,
    claimPayableItem
  );

  claimPayableItem.payableAmount = tResponse?.payableAmount;
  claimPayableItem.changeObjectAmount = tResponse?.changeObjectAmount;
  claimPayableItem.payoutAmount = tResponse?.payoutAmount;
  claimPayableItem.refundAmount = tResponse?.refundAmount;
  claimPayableItem.discountAmount = tResponse?.discountAmount;

  claimPayableItem.assessorOverrideAmount = lodash.isNumber(tResponse?.payableAmount)
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
  [BenefitCategory.OTP]: calculatDefalut,
};

// 单独汇总payoutAmdount的值
const getTotalPayoutAmount = ({ incidentListMap = {}, claimPayableListMap = {} }: any) => {
  const klipTotalPolicyPayableAmount = lodash
    .chain(lodash.values(incidentListMap) || [])
    .reduce((prev: Record<string, number | undefined>, { klipCaseInfoList = [] }): any => {
      const totalAmount = lodash.reduce(
        klipCaseInfoList,
        (
          amountObject: any,
          { policyId, sourceSystem, lifejRefundPayoutAmount = 0, policyPayoutAmount = 0 }: any
        ) => {
          const addAmount =
            sourceSystem === SourceSystem.Lifej ? lifejRefundPayoutAmount : policyPayoutAmount;

          return lodash.includes(lodash.keys(amountObject), policyId)
            ? {
                ...amountObject,
                [policyId]: Number(amountObject[policyId]) + Number(addAmount),
              }
            : {
                ...amountObject,
                [policyId]: Number(addAmount),
              };
        },
        Object.create({})
      );

      return { ...prev, ...totalAmount };
    }, Object.create({}))
    .value();

  const claimPayablePayoutAmount = lodash
    .chain(lodash.values(claimPayableListMap) || [])
    .reduce((amountObject: any, { policyNo = '', claimDecision, payoutAmount = 0 }): any => {
      const newPayoutAmount = formUtils.queryValue(payoutAmount);
      const newClaimDecision = formUtils.queryValue(claimDecision);
      if (
        newClaimDecision === ClaimDecision.pending ||
        newClaimDecision === ClaimDecision.approve ||
        newClaimDecision === ClaimDecision.exGratia
      ) {
        return lodash.includes(lodash.keys(amountObject), policyNo)
          ? {
              ...amountObject,
              [policyNo]: Number(amountObject[policyNo]) + Number(newPayoutAmount),
            }
          : {
              ...amountObject,
              [policyNo]: Number(newPayoutAmount),
            };
      }
      return amountObject;
    }, Object.create({}))
    .value();

  return lodash
    .chain(lodash.keys(claimPayablePayoutAmount) || [])
    .reduce((total: any, key: string) => {
      return klipTotalPolicyPayableAmount?.[key] && klipTotalPolicyPayableAmount?.[key] > 0
        ? total + Number(klipTotalPolicyPayableAmount?.[key])
        : total + Number(claimPayablePayoutAmount[key]);
    }, 0)

    .value();
};

// 逐级计算payableAmount和treatmentExpenseAmount： serveiceItem -> invoice -> treatment ->payable
export const calculatPayableAmount = (claimProcessData: any, claimEntities: any = []) => {
  let totalRefundAmount = 0;
  let totalDiscountAmount = 0;
  let totalPayableAmount = 0;
  const { claimPayableList } = claimProcessData;

  // claimEntities不能用formUtils.cleanValidateData,不然会导致claimEntities 数据层没有更新
  const { incidentListMap, claimPayableListMap } = claimEntities;

  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimPayableListMap?.[claimPayableItemId];

      claimPayableItem.payoutAmount = 0;
      claimPayableItem.refundAmount = 0;
      claimPayableItem.discountAmount = 0;

      let handler = funMap?.[claimPayableItem?.benefitCategory as keyof typeof funMap];

      if (
        claimPayableItem.benefitCategory === BenefitCategory.cashless &&
        claimPayableItem.benefitSubCategory === BenefitSubCategory.OP
      ) {
        handler = calculatDefalut;
      }
      if (lodash.isFunction(handler)) handler(claimPayableItem, claimEntities);

      const itemClaimDecision = formUtils.queryValue(claimPayableItem?.claimDecision);
      if (
        itemClaimDecision === ClaimDecision.pending ||
        itemClaimDecision === ClaimDecision.approve ||
        itemClaimDecision === ClaimDecision.exGratia
      ) {
        totalPayableAmount = add(totalPayableAmount, claimPayableItem.payoutAmount);
        totalRefundAmount = add(totalRefundAmount, claimPayableItem.refundAmount);

        totalDiscountAmount = add(totalDiscountAmount, claimPayableItem.discountAmount);
      }
    });
  }

  const totlePayoutAmount = getTotalPayoutAmount({
    incidentListMap,
    claimPayableListMap,
  });

  const totalNonRefundAmount = add(totlePayoutAmount, totalDiscountAmount);
  const totalNonRefundPayableAmount = add(totalPayableAmount, totalDiscountAmount);

  claimProcessData.claimDecision = {
    ...claimProcessData.claimDecision,
    totalPayableAmount: +Number(totalNonRefundAmount).toFixed(2),
    claimPayableAmount: +Number(add(totalNonRefundPayableAmount, totalRefundAmount)).toFixed(2),
  };

  console.log(
    'claimEntities---',
    lodash.cloneDeep(claimEntities?.claimPayableListMap),
    lodash.cloneDeep(claimPayableListMap)
  );
  return { claimProcessData, claimEntities };
};

export default {
  calculatPayableAmount,
};
