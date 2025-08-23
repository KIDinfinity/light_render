/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 删除 - benefitItem
 */
import { produce } from 'immer';

const popUpPableRemoveBenefitItem = (state: any, { payload }: any) => {
  const { id } = payload;

  const nextState = produce(state, (draftState: any) => {
    delete draftState.popUpPayable.benefitListMap[id];
  });

  return { ...nextState };
};

export default popUpPableRemoveBenefitItem;
