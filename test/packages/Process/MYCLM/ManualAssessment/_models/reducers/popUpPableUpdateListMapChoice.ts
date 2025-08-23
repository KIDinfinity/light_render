/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { updatePayableAmountDays } from 'process/Utils/Payable';

const popUpPableUpdateListMapChoice = (state: any, { payload }: any) => {
  const { changedFields, benefitItemId, listMapItemId, id } = payload;
  const nextState = produce(state, (draftState: any) => {
    const item = draftState.popUpPayable.benefitListMap[benefitItemId].listMap[listMapItemId];

    if (lodash.size(changedFields) === 1) {
      draftState.popUpPayable.benefitListMap[benefitItemId].listMap[listMapItemId] = {
        ...item,
        ...changedFields,
        ...updatePayableAmountDays({
          list: item.childrenMap,
          clear: !formUtils.queryValue(changedFields.chooise),
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

export default popUpPableUpdateListMapChoice;
