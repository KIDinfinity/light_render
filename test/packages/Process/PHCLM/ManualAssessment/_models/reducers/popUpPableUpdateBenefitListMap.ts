/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 更新 - base
 */
import { produce }  from 'immer';

const popUpPableUpdateBenefitListMap = (state: any, { payload }: any) => {
  const { benefitListMap } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.popUpPayable.benefitListMap = benefitListMap;
  });

  return { ...nextState };
};

export default popUpPableUpdateBenefitListMap;
