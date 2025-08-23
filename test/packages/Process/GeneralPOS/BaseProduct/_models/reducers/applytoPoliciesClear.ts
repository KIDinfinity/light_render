/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id } = payload;

    if (draftState.entities?.transactionTypesMap?.[id]) {
      draftState.entities.transactionTypesMap[id].applyToPolicyBOList = [];
    }
  });
