import { useMemo } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { add } from '@/utils/precisionUtils';

const getMomentDate = (date: any) => moment(date).format('YYYY/MM/DD');

export default ({ treatmentPayableItem, opTreatmentPayableListMap }: any) => {
  const { opTreatmentPayableList = [] } = treatmentPayableItem || {};

  return useMemo(() => {
    return (
      lodash
        .chain(opTreatmentPayableList)
        .reduce((arr: any, id: any) => {
          const opTreatmentPayableItem = opTreatmentPayableListMap[id] || {};

          const hasDate = lodash.find(
            arr,
            (el: any) =>
              getMomentDate(el?.dateOfConsultation) ===
              getMomentDate(opTreatmentPayableItem.dateOfConsultation)
          );

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
                            [el]: lodash.isNumber(opTreatmentPayableItem[el])
                              ? add(obj?.[el], opTreatmentPayableItem[el])
                              : obj?.[el],
                          };
                        },
                        {
                          adjustOriginPayableAmount: null,
                          adjustOriginPayableDays: null,
                          changeObjectAmount: null,
                        }
                      ),

                      opTreatmentPayableList: [
                        ...data.opTreatmentPayableList,
                        opTreatmentPayableItem,
                      ],
                    }
                  : data;
              })
            : [
                ...arr,
                {
                  id,
                  ...lodash.pick(opTreatmentPayableItem, [
                    'dateOfConsultation',
                    'opTreatmentId',
                    'adjustOriginPayableAmount',
                    'adjustOriginPayableDays',
                    'changeObjectAmount',
                  ]),
                  opTreatmentPayableList: [opTreatmentPayableItem],
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
              totalItem?.opTreatmentPayableList,
              (el: any) => Number(el.payableAmount) < 0
            ) || {};
          const positiveItem =
            lodash.find(
              totalItem?.opTreatmentPayableList,
              (el: any) => Number(el.payableAmount) > 0
            ) || {};

          return {
            ...totalItem,
            changeHospitalizationSequentialNo:
              totalItem?.opTreatmentPayableList.length > 0
                ? positiveItem?.hospitalizationSequentialNo
                : '',
            hospitalizationSequentialNo:
              totalItem?.opTreatmentPayableList.length > 0
                ? minusItem?.hospitalizationSequentialNo
                : totalItem?.opTreatmentPayableList[0].hospitalizationSequentialNo,
          };
        })
        .sortBy('dateOfConsultation')
        .value() || []
    );
  }, [treatmentPayableItem, opTreatmentPayableListMap]);
};
