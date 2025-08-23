import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';

export default ({ payableIds, treatmentPayableListMap }: any) => {
  return useMemo(() => {
    return (
      lodash
        .chain(payableIds)
        .reduce((arr: any, id: any) => {
          const treatmentPayable = formUtils.cleanValidateData(treatmentPayableListMap[id]) || {};

          const compactList =
            lodash.reduce(
              arr,
              (array: any, item: any) => {
                return [...array, ...item.treatmentPayableList];
              },
              []
            ) || [];

          const hasDate = lodash.find(compactList, {
            ...lodash.pick(treatmentPayable, [
              'policyNo',
              'productCode',
              'productPlan',
              'benefitItemCode',
              'benefitTypeCode',
            ]),
          });

          return hasDate
            ? lodash.map(arr, (data: any) => {
                return hasDate.id === data.id
                  ? {
                      ...data,
                      ...lodash.reduce(
                        [
                          'adjustOriginPayableAmount',
                          'adjustOriginPayableDays',
                          'changeObjectAmount',
                        ],
                        (obj: any, el: any) => {
                          return {
                            ...obj,
                            [el]: lodash.isNumber(treatmentPayable[el])
                              ? add(obj?.[el], treatmentPayable[el])
                              : obj?.[el],
                          };
                        },
                        {
                          adjustOriginPayableAmount: null,
                          adjustOriginPayableDays: null,
                          changeObjectAmount: null,
                        }
                      ),

                      treatmentPayableList: [...data.treatmentPayableList, treatmentPayable],
                    }
                  : data;
              })
            : [
                ...arr,
                {
                  id,
                  ...lodash.pick(treatmentPayable, [
                    'benefitTypeCode',
                    'adjustOriginPayableAmount',
                    'adjustOriginPayableDays',
                    'changeObjectAmount',
                  ]),
                  treatmentPayableList: [treatmentPayable],
                },
              ];
        }, [])
        .map((totalItem: any) => {
          /**
           * 业务
           * 有两笔:hospitalizationSequentialNo为负数那笔,changeHospitalizationSequentialNo为正数那笔
           * 只有一笔:hospitalizationSequentialNo为正数那笔,changeHospitalizationSequentialNo为空
           */
          const minusItem =
            lodash.find(
              totalItem?.treatmentPayableList,
              (el: any) => Number(el.payableAmount) < 0
            ) || {};
          const positiveItem =
            lodash.find(
              totalItem?.treatmentPayableList,
              (el: any) => Number(el.payableAmount) > 0
            ) || {};

          return {
            ...totalItem,
            changeHospitalizationSequentialNo:
              totalItem?.treatmentPayableList.length > 0
                ? positiveItem?.hospitalizationSequentialNo
                : '',
            hospitalizationSequentialNo:
              totalItem?.treatmentPayableList.length > 0
                ? minusItem?.hospitalizationSequentialNo
                : totalItem?.treatmentPayableList[0].hospitalizationSequentialNo,
          };
        })
        .sortBy('benefitTypeCode')

        .value() || []
    );
  }, [payableIds, treatmentPayableListMap]);
};
