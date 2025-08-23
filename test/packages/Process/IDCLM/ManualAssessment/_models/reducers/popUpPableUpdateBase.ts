/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 更新 - base
 */
import { produce }  from 'immer';
import lodash from 'lodash';

const popUpPableUpdateBase = (state: any, { payload }: any) => {
  const { changedFields } = payload;

  const nextState = produce(state, (draftState: any) => {
    let extra = {};

    if (lodash.size(changedFields) === 1) {
      // TODO：这里是否可以用map的方式去实现
      if (lodash.has(changedFields, 'claimDecision')) {
        extra = {
          policyNo: '',
          benefitTypeCode: '',
        };
      }
      if (lodash.has(changedFields, 'policyNo')) {
        extra = {
          benefitTypeCode: '',
        };
      }
    }

    draftState.popUpPayable.basic = {
      ...draftState.popUpPayable.basic,
      ...changedFields,
      ...extra,
    };
    draftState.popUpPayable.benefitListMap = {};
  });

  return { ...nextState };
};

export default popUpPableUpdateBase;
