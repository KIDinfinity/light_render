import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { id, transactionId } = payload || {};

  const nextState = produce(state, (draftState: any) => {
    draftState.entities.transactionTypesMap[transactionId].deleteRider.riderList = lodash.filter(
      draftState.entities.transactionTypesMap[transactionId].deleteRider.riderList,
      (item: any) => item.id !== id
    );
  });
  return { ...nextState };
};
