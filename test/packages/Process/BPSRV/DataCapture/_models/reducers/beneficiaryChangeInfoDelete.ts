/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, id } = payload;
    const beneficiaryList =
      draftState.entities.transactionTypesMap[transactionId].beneficiaryChange.beneficiaryList;
    beneficiaryList.splice(
      beneficiaryList.findIndex((item: any) => item.id === id),
      1
    );
  });
