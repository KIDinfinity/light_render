/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, _: any) =>
  produce(state, (draftState: any) => {
    draftState.processData.policyInfo = {};
  });
