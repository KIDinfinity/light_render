import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { add } from '@/utils/precisionUtils';

import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

/**
 * 规则

 */

export default ({ incidentId }: any) => {
  const claimPayableListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.claimPayableListMap
    ) || {};

  return useMemo(() => {
    return lodash
      .chain(lodash.values(claimPayableListMap) || [])
      .filter({ incidentId })
      .reduce((arr: any, item: any) => {
        const extraPolicyNo = lodash.find(arr, ({ policyNo }: any) => item.policyNo === policyNo);

        const setItem: any = lodash.pick(item, [
          'id',
          'benefitCategory',
          'mainProductCode',
          'policyNo',
          'settlementDecision',
          'detailedAssessmentDecision',
          'payableAmount',
          'changeObjectAmount',
          'refundAmount',
          'discountAmount',
          'systemCalculationAmount',
          'assessorOverrideAmount',
          'viewOrder',
        ]);
        if (setItem.payableAmount) {
          setItem.payableAmount = formUtils.queryValue(setItem.payableAmount);
        }
        if (setItem.refundAmount) {
          setItem.refundAmount = formUtils.queryValue(setItem.refundAmount);
        }
        if (setItem.discountAmount) {
          setItem.discountAmount = formUtils.queryValue(setItem.discountAmount);
        }

        return !extraPolicyNo
          ? [...arr, { ...setItem, benefitTypeList: [item] }]
          : lodash.map(arr, (arrItem: any) => {
              return item?.policyNo === arrItem.policyNo
                ? {
                    ...arrItem,
                    ...lodash.reduce(
                      [
                        'payableAmount',
                        'changeObjectAmount',
                        'refundAmount',
                        'discountAmount',
                        'systemCalculationAmount',
                        'assessorOverrideAmount',
                      ],
                      (obj: any, key: any) => {
                        return {
                          ...obj,
                          [key]: add(formUtils.queryValue(item?.[key]), arrItem?.[key]),
                        };
                      },
                      []
                    ),
                    benefitTypeList: [...arrItem?.benefitTypeList, item],
                  }
                : arrItem;
            });
      }, [])
      .orderBy('viewOrder')
      .value();
  }, [claimPayableListMap]);
};

export const useGetCurIncidentPayableList = ({ incidentId }: any) => {
  const claimPayableListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.claimPayableListMap
    ) || {};
  return lodash.filter(claimPayableListMap, { incidentId });
};
