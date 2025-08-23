/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id, changedFields } = payload;

    if (id) {
      draftState.entities.transactionTypesMap[id] = {
        ...draftState.entities.transactionTypesMap[id],
        ...changedFields,
      };
    } else {
      draftState.processData = {
        ...draftState.processData,
        ...changedFields,
      };
    }
  });
