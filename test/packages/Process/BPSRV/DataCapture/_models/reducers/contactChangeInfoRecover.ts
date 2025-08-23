/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id, recoverItem = {} } = payload;

    draftState.entities.transactionTypesMap[id].contactInfo = {
      ...draftState.entities.transactionTypesMap[id].contactInfo,
      ...recoverItem,
    };
  });
