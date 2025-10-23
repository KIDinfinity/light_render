import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { defaultPayType } = lodash.pick(action?.payload, ['defaultPayType']);

  const nextState = produce(state, (draftState: any) => {
    draftState.processData.planInfoData = {
      ...draftState.processData.planInfoData,
      defaultPayType,
    };
  });

  return { ...nextState };
};
