import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { Booster } from 'claim/enum/Booster';
import { comparePayableDays } from '../../_models/functions/utils';
import { mapToPayableListMap } from 'process/Utils/benefitCategoryUtils';
import { getPolicyItem } from 'basic/utils/PolicyUtils';
import { NAMESPACE } from '../../activity.config';

const benefitItemMap = (claimPayableItem: any) => {
  const benefitItemRule = [
    'policyNo',
    'benefitTypeCode',
    'booster',
    'productCode',
    'productPlan',
    'policyCurrency',
    'id',
  ];

  const { id: payableId, ...benefitItemMap } = formUtils.cleanValidateData(
    lodash.pick(claimPayableItem, benefitItemRule)
  );
  return { ...benefitItemMap, payableId };
};

const getClaimPolicyItem = (listPolicy: any, item: any) => {
  return getPolicyItem({
    listPolicy,
    ...lodash.pick(item, [
      'policyNo',
      'benefitTypeCode',
      'coreProductCode',
      'productPlan',
      'benefitCategory',
      'policyYear',
    ]),
  });
};
const getServicePolicyItem = (listPolicy: any, item: any) => {
  return getPolicyItem({
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
};

const findBoosterBenefitType = (claimPayableItem: any, claimEntities: any, listPolicy: any) => {
  const serviceItemPayableListMap = formUtils.cleanValidateData(
    claimEntities?.[mapToPayableListMap[eBenefitCategory.Reimbursement]]
  );

  if (claimPayableItem?.benefitCategory !== eBenefitCategory.Reimbursement) return {};

  const allBenefitItemPayable = lodash.filter(serviceItemPayableListMap, (item) =>
    lodash.isEqual(
      benefitItemMap(claimPayableItem),
      lodash.pick(item, [
        'policyNo',
        'benefitTypeCode',
        'booster',
        'productCode',
        'productPlan',
        'policyCurrency',
        'payableId',
      ])
    )
  );

  const benefitItemBoosterRule = [
    'policyNo',
    'benefitItemCode',
    'productCode',
    'productPlan',
    'policyCurrency',
    'serviceItemId',
    'booster',
  ];

  const claimPolicyItem = getClaimPolicyItem(listPolicy, claimPayableItem);

  const allBenefitItemBoosterPayable = lodash.filter(serviceItemPayableListMap, (item) => {
    const servicePolicyItem = getServicePolicyItem(listPolicy, item);
    return (
      ((claimPolicyItem?.isStandaloneBooster === Booster.Yes &&
        servicePolicyItem?.isStandaloneBooster === Booster.Yes) ||
        (claimPolicyItem?.isStandaloneBooster !== Booster.Yes && item?.booster === Booster.Yes)) &&
      lodash.find(allBenefitItemPayable, {
        ...lodash.pick(item, benefitItemBoosterRule),
        booster: claimPayableItem?.booster,
      })
    );
  });

  const booster = lodash.reduce(
    allBenefitItemBoosterPayable,
    (result: any, item: any) => ({
      payableAmount: add(result?.payableAmount || 0, formUtils.queryValue(item?.payableAmount)),
      payableDays: comparePayableDays(
        result?.payableDays || '',
        formUtils.queryValue(item?.payableDays)
      ),
      systemCalculationAmount: add(
        result?.systemCalculationAmount || 0,
        formUtils.queryValue(item?.systemCalculationAmount)
      ),
      systemPayableDays: comparePayableDays(
        result?.systemPayableDays || '',
        formUtils.queryValue(item?.systemPayableDays)
      ),
      isStandaloneBooster: claimPayableItem?.isStandaloneBooster,
      benefitCategory: claimPayableItem?.benefitCategory,
      sourceId: [...(result?.sourceId || []), item?.payableId],
      children: [...(result?.children || []), item],
    }),
    {}
  );

  return booster || {};
};

const findBenefitItem = (claimPayableItem: any, claimEntities: any) => {
  const benefitCategory = formUtils.queryValue(claimPayableItem?.benefitCategory);

  const source = claimEntities?.[mapToPayableListMap?.[benefitCategory]];
  if (lodash.isNil(source)) return [];

  return lodash.filter(source, (item) => lodash.find([item], benefitItemMap(claimPayableItem)));
};

const summaryPayableDays = (target: any) => {
  target.payableDays =
    lodash.reduce(
      target.children,
      (result, child) => comparePayableDays(result, formUtils.queryValue(child?.payableDays)),
      ''
    ) || '';
  target.systemPayableDays =
    lodash.reduce(
      target.children,
      (result, child) => comparePayableDays(result, formUtils.queryValue(child?.systemPayableDays)),
      ''
    ) || '';
};

export default ({ payableIds }: any) => {
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities
  );
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );
  return useMemo(
    () =>
      lodash
        .chain(claimEntities?.claimPayableListMap)
        .filter((item: any) => {
          const claimPolicyItem = getClaimPolicyItem(listPolicy, item);
          return (
            lodash.includes(payableIds, item?.id) &&
            (item?.booster !== Booster.Yes || claimPolicyItem?.isStandaloneBooster === 'Y')
          );
        })
        .map((item: any) => {
          const claimPolicyItem = getClaimPolicyItem(listPolicy, item);
          const basic = {
            ...item,
            oldBenefitTypeCode:
              !!item?.benefitTypeCode && !!item?.coverageKey
                ? `${item?.benefitTypeCode},${item?.coverageKey}`
                : '',
            children: lodash
              .chain(findBenefitItem(item, claimEntities))
              .filter((el: any) => {
                const servicePolicyItem = getServicePolicyItem(listPolicy, el);
                return (
                  (claimPolicyItem?.isStandaloneBooster === Booster.Yes &&
                    servicePolicyItem?.isStandaloneBooster === Booster.Yes) ||
                  (claimPolicyItem?.isStandaloneBooster !== Booster.Yes &&
                    item?.booster !== Booster.Yes)
                );
              })
              .map((el: any) => ({ ...el, benefitCategory: claimPolicyItem.benefitCategory }))
              .value(),
          };
          summaryPayableDays(basic);

          const booster: any = findBoosterBenefitType(item, claimEntities, listPolicy);

          if (item.booster !== Booster.Yes && !lodash.isEmpty(booster)) {
            basic.boosterId = booster?.sourceId;
          }
          if (item.booster === Booster.Yes) {
            basic.payableDays = '';
            basic.systemPayableDays = '';
            basic.payableAmount = '';
            basic.systemCalculationAmount = '';
          }
          return {
            basic,
            booster,
            key: basic?.id,
          };
        })
        .filter((el: any) => {
          return el.basic.booster === 'Y' && el.basic.isStandaloneBooster === 'Y'
            ? !lodash.isEmpty(el.booster)
            : true;
        })
        .value(),
    [claimEntities, listPolicy]
  );
};
