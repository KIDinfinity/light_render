/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id } = payload;

    draftState.processData.transactionTypes = draftState.processData.transactionTypes?.filter(
      (item: string) => item !== id
    );
    if (draftState.entities?.transactionTypesMap?.[id]) {
      delete draftState.entities.transactionTypesMap[id];
    }
  });
