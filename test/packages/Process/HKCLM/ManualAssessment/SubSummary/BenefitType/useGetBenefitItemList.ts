import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { mapToBenefitItemV2 } from '../../_models/functions/utils';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { getPolicyItem } from 'basic/utils/PolicyUtils';
import { Booster } from 'claim/enum/Booster';

export default (benefitTypeList: any) => {
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  return useMemo(() => {
    const basic = lodash.filter(benefitTypeList, (item) => {
      const policyItem = getPolicyItem({
        listPolicy,
        ...lodash.pick(item, [
          'policyNo',
          'benefitItemCode',
          'coreProductCode',
          'productPlan',
          'benefitCategory',
          'policyYear',
        ]),
      });
      return item?.booster !== Booster.Yes || policyItem?.isStandaloneBooster === 'Y';
    });

    const booster = lodash.filter(benefitTypeList, (item) => {
      const policyItem = getPolicyItem({
        listPolicy,
        ...lodash.pick(item, [
          'policyNo',
          'benefitItemCode',
          'coreProductCode',
          'productPlan',
          'benefitCategory',
          'policyYear',
        ]),
      });

      return item?.booster === Booster.Yes || policyItem?.isStandaloneBooster === Booster.Yes;
    });

    const basicAdjustBenefitItem = lodash.filter(
      basic,
      (item: any) => item?.isAdjustment === IsAdjustment.Yes
    );
    const basicBenefitItem = lodash.filter(
      basic,
      (item: any) => item?.isAdjustment !== IsAdjustment.Yes
    );
    const boosterAdjustBenefitItem = lodash.filter(
      booster,
      (item: any) => item?.isAdjustment === IsAdjustment.Yes
    );
    const boosterBenefitItem = lodash.filter(
      booster,
      (item: any) => item?.isAdjustment !== IsAdjustment.Yes
    );

    const groupByBasic = mapToBenefitItemV2(basicBenefitItem);
    const groupByBooster = mapToBenefitItemV2(boosterBenefitItem);
    const groupByBasicAdj = mapToBenefitItemV2(basicAdjustBenefitItem);
    const groupByBoosterAdj = mapToBenefitItemV2(boosterAdjustBenefitItem);

    const basicResult = lodash.map(groupByBasic, (item: any) => {
      const boosterTarget = lodash.find(groupByBooster, { benefitItemCode: item?.benefitItemCode });
      if (item?.booster === 'Y') {
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
      if (item?.booster === 'Y') {
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
  }, [benefitTypeList, listPolicy]);
};
