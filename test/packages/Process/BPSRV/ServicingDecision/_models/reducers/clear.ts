/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any) =>
  produce(state, (draftState: any) => {
    draftState.processData = {
      mainPolicyId: draftState.processData.mainPolicyId,
    };
    draftState.entities = {};
  });
