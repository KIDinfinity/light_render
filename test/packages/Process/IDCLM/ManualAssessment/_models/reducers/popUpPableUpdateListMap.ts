/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 更新 - ListMap
 */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import lodash from 'lodash';

const popUpPableUpdateListMap = (state: any, { payload }: any) => {
  const { changedFields, benefitItemId, id } = payload;

  const nextState = produce(state, (draftState: any) => {
    const item = draftState.popUpPayable.benefitListMap[benefitItemId].listMap[id];

    let extra = {};

    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'chooise') && !formUtils.queryValue(changedFields?.chooise)) {
        extra = {
          ...extra,
          payableAmount: null,
          payableDays: null,
          boosterAmount: null,
          boosterDays: null,
          calculationAmount: null,
          uncoverAmount: null,
        };
      }
      if (lodash.has(changedFields, 'payableAmount')) {
        extra = {
          ...extra,
          calculationAmount: formUtils.queryValue(changedFields?.payableAmount),
          uncoverAmount: 0,
        };
      }
    }

    draftState.popUpPayable.benefitListMap[benefitItemId].listMap[id] = {
      ...item,
      ...changedFields,
      ...extra,
    };

    const mapKeys = [
      'payableAmount',
      'payableDays',
      'boosterAmount',
      'boosterDays',
      'calculationAmount',
      'uncoverAmount',
      'insurerCoInsuranceAmount',
    ];

    lodash.map(mapKeys, (key) => {
      if (lodash.size(changedFields) === 1) {
        let keyValue = 0;

        lodash.map(
          lodash.values(draftState.popUpPayable.benefitListMap[benefitItemId].listMap),
          (mapItem) => {
            keyValue = add(Number(keyValue), Number(formUtils.queryValue(mapItem[key]) || 0));
          }
        );
        draftState.popUpPayable.benefitListMap[benefitItemId][key] =
          keyValue !== 0 ? keyValue : null;
      }
    });
  });

  return { ...nextState };
};

export default popUpPableUpdateListMap;
