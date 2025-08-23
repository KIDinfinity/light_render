/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { policyId } = payload;

    if (!draftState.processData) {
      draftState.processData = {};
    }

    draftState.processData.mainPolicyId = policyId || '';
  });
