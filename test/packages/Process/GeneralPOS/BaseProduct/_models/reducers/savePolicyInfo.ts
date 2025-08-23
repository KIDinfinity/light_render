/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { data, key } = payload;

    draftState.processData.policyInfo[key] = data;
  });
