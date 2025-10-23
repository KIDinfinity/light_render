/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any) =>
  produce(state, (draftState: any) => {
    const [id] = Object.keys(draftState?.entities?.transactionTypesMap || {});
    if (id) {
      if (
        !draftState?.processData?.decision &&
        draftState?.entities?.transactionTypesMap?.[id]?.decision
      ) {
        draftState.processData.decision = draftState.entities.transactionTypesMap[id].decision;
      }
    }
  });
