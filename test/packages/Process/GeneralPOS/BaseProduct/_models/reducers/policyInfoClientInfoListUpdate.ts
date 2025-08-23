/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { index, changedFields } = payload;

    draftState.processData.policyInfo.clientInfoList[index] = {
      ...draftState.processData.policyInfo.clientInfoList[index],
      ...changedFields,
    };
  });
