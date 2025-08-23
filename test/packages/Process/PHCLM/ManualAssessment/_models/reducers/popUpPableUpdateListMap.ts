/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 更新 - ListMap
 */
import { produce }  from 'immer';
import { updatePayableAmountDays } from 'process/Utils/Payable';
import lodash from 'lodash';

const popUpPableUpdateListMap = (state: any, { payload }: any) => {
  const { id, listMapItemId, benefitItemId, changedFields } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      draftState.popUpPayable.benefitListMap[benefitItemId].listMap[listMapItemId].childrenMap[
        id
      ] = {
        ...draftState.popUpPayable.benefitListMap[benefitItemId].listMap[listMapItemId].childrenMap[
          id
        ],
        ...changedFields,
      };

      const item = draftState.popUpPayable.benefitListMap[benefitItemId].listMap[listMapItemId];

      draftState.popUpPayable.benefitListMap[benefitItemId].listMap[listMapItemId] = {
        ...item,
        ...updatePayableAmountDays({
          list: item?.childrenMap,
          clear: false,
        }),
      };

      draftState.popUpPayable.benefitListMap[benefitItemId] = {
        ...draftState.popUpPayable.benefitListMap[benefitItemId],
        ...updatePayableAmountDays({
          list: draftState.popUpPayable.benefitListMap[benefitItemId].listMap,
          clear: false,
        }),
      };
    }
  });

  return { ...nextState };
};

export default popUpPableUpdateListMap;
