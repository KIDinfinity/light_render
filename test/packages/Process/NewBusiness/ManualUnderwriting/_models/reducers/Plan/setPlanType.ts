import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = lodash.pick(action?.payload, ['changedFields']);

  const nextState = produce(state, (draftState: any) => {
    draftState.processData.planInfoData = {
      ...draftState.processData.planInfoData,
      ...changedFields,
    };
  });

  return { ...nextState };
};
