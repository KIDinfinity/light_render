import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { eClaimDecision } from 'claim/enum/claimDecision';

export const sumDecision = (list: any) => {
  const rule = [
    eClaimDecision.pending,
    eClaimDecision.exgratia,
    eClaimDecision.approve,
    eClaimDecision.deny,
    eClaimDecision.na,
  ];
  let result = null;
  lodash.forEach(rule, (item) => {
    if (lodash.some(list, (self) => formUtils.queryValue(self.claimDecision) === item)) {
      result = item;
      return false;
    }
  });
  return result;
};

export const payableDays = (prex: any, next: any) => {
  return formUtils.queryValue(prex) >= formUtils.queryValue(next)
    ? formUtils.queryValue(prex)
    : formUtils.queryValue(next);
};

const mapToBenefitItem = (data: any, benefitCategory: any) =>
  lodash
    .chain(data)
    .groupBy((item) => formUtils.queryValue(item?.benefitItemCode))
    .map((self, selfKey) => ({
      claimDecision: sumDecision(self),
      benefitItemCode: selfKey,
      ...lodash.reduce(
        self,
        (result: any, reduceItem: any) => ({
          systemCalculationAmount: add(
            result?.systemCalculationAmount || 0,
            formUtils.queryValue(reduceItem?.systemCalculationAmount)
          ),
          systemPayableDays: add(
            result?.systemPayableDays || 0,
            formUtils.queryValue(reduceItem?.systemPayableDays)
          ),
          payableAmount: add(
            result?.payableAmount || 0,
            formUtils.queryValue(reduceItem?.payableAmount)
          ),
          payableDays: payableDays(result?.payableDays || '', reduceItem?.payableDays),
        }),
        {}
      ),
      ...lodash.pick(lodash.first(self), [
        'policyNo',
        'productCode',
        'benefitTypeCode',
        'isAdjustment',
        'payableId',
      ]),
      benefitCategory,
      sourceId: lodash.map(self, (sourceItem) => sourceItem.id),
    }))
    .value();

export default ({ benefitTypeItem }: any) => {
  return useMemo(() => {
    const {
      basic,
      basic: { children: basicChildren },
      booster: { children: boosterChildren },
    } = benefitTypeItem;

    const basicAdjustBenefitItem = lodash.filter(
      basicChildren,
      (item: any) => item?.isAdjustment === IsAdjustment.Yes
    );
    const basicBenefitItem = lodash.filter(
      basicChildren,
      (item: any) => item?.isAdjustment !== IsAdjustment.Yes
    );
    const boosterAdjustBenefitItem = lodash.filter(
      boosterChildren,
      (item: any) => item?.isAdjustment === IsAdjustment.Yes
    );
    const boosterBenefitItem = lodash.filter(
      boosterChildren,
      (item: any) => item?.isAdjustment !== IsAdjustment.Yes
    );

    const groupByBasic = mapToBenefitItem(basicBenefitItem, basic?.benefitCategory);
    const groupByBooster = mapToBenefitItem(boosterBenefitItem, basic?.benefitCategory);
    const groupByBasicAdj = mapToBenefitItem(basicAdjustBenefitItem, basic?.benefitCategory);
    const groupByBoosterAdj = mapToBenefitItem(boosterAdjustBenefitItem, basic?.benefitCategory);

    const basicResult = lodash.map(groupByBasic, (item: any) => {
      const boosterTarget = lodash.find(groupByBooster, { benefitItemCode: item?.benefitItemCode });
      if (basic?.booster === 'Y') {
        item = {
          ...item,
          payableDays: '',
          systemPayableDays: '',
          payableAmount: '',
          systemCalculationAmount: '',
        };
      }
      return {
        basic: { ...item, sourceBoosterId: boosterTarget?.sourceId },
        booster: boosterTarget,
      };
    });

    const adjResult = lodash.map(groupByBasicAdj, (item: any) => {
      const boosterTarget = lodash.find(groupByBoosterAdj, {
        benefitItemCode: item?.benefitItemCode,
      });
      if (basic?.booster === 'Y') {
        item = {
          ...item,
          payableDays: '',
          systemPayableDays: '',
          payableAmount: '',
          systemCalculationAmount: '',
        };
      }
      return {
        basic: { ...item, sourceBoosterId: boosterTarget?.sourceId },
        booster: boosterTarget,
      };
    });

    const result = lodash
      .chain(basicResult)
      .concat(adjResult)
      .map((item: any, key: any) => ({ ...item, key: `benefitItem${key}` }))
      .orderBy('benefitItemCode')
      .value();

    return result;
  }, [benefitTypeItem]);
};
