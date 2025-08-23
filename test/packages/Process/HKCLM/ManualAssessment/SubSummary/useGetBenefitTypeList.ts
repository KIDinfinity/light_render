import { useMemo } from 'react';
import { NAMESPACE } from '../activity.config';
import { useSelector } from 'dva';
import lodash from 'lodash';
import getPolicyYearValue from '../_models/functions/getPolicyYearValue';
import { Booster } from 'claim/enum/Booster';
import { formUtils } from 'basic/components/Form';
import { mapToPayableListMap } from 'process/Utils/benefitCategoryUtils';
import { getPolicyItem } from 'basic/utils/PolicyUtils';

const groupByRule = [
  {
    key: 'benefitTypeCode',
  },
  {
    key: 'policyYear',
    get: (item: any) => getPolicyYearValue(item),
  },
];

const groupByEngine = (item: any) =>
  lodash
    .chain(groupByRule)
    .map((rule) => (lodash.isFunction(rule?.get) ? rule.get(item) : lodash.get(item, rule.key)))
    .join('')
    .trim()
    .value();

export default ({ treatmentId }: any) => {
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  const isStandaloneBoosterMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.isStandaloneBoosterMap
  );
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.listPolicy
  );

  return useMemo(() => {
    const allBenefitItemList = lodash
      .chain(mapToPayableListMap)
      .map((item: any, key: string) => {
        return lodash
          .chain(claimEntities?.[item])
          .filter((self) => {
            const cleanItem = formUtils.cleanValidateData(
              claimEntities?.claimPayableListMap?.[self?.payableId]
            );
            return treatmentId === self?.treatmentId && cleanItem?.benefitCategory === key;
          })
          .map((self: any) => {
            const cleanItem = formUtils.cleanValidateData(
              claimEntities?.claimPayableListMap?.[self?.payableId]
            );
            return {
              ...self,
              policyYear: cleanItem?.policyYear,
              benefitTypeCode: cleanItem?.benefitTypeCode,
              benefitCategory: cleanItem?.benefitCategory,
              claimDecision: cleanItem?.claimDecision,
              viewOrder: cleanItem?.viewOrder,
              calculateByPolicyYear: cleanItem?.calculateByPolicyYear
            };
          })
          .value();
      })
      .flatten()
      .value();

    return lodash
      .chain(formUtils.cleanValidateData(allBenefitItemList))
      .filter((item) => {
        const cleanItem = formUtils.cleanValidateData(
          claimEntities?.claimPayableListMap?.[item?.payableId]
        );
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
        return cleanItem?.booster !== Booster.Yes || policyItem.isStandaloneBooster === Booster.Yes;
      })
      .groupBy((item: any) => groupByEngine(item))
      .map((item: any, key: string) => {
        const children = lodash
          .chain(item)
          .map((self) => {
            const target = lodash.find(allBenefitItemList, {
              ...lodash.pick(self, [
                'policyNo',
                'benefitItemCode',
                'productCode',
                'productPlan',
                'policyCurrency',
                'serviceItemId',
              ]),
              booster: 'Y',
            });
            return target && self.id !== target?.id ? [self, target] : [self];
          })
          .flatten()
          .value();
        return {
          key: key,
          children,
          ...lodash.pick(item?.[0], [
            'benefitTypeCode',
            'claimDecision',
            'viewOrder',
            'calculateByPolicyYear',
            'policyYear',
            'benefitCategory',
            'policyNo',
          ]),
        };
      })
      .orderBy('viewOrder')
      .value();
  }, [claimEntities, isStandaloneBoosterMap, listPolicy]);
};
