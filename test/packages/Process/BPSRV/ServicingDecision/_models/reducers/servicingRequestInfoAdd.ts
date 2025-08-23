/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { addServicingRequestInfo } = payload;

    if (!draftState.processData.transactionTypes) {
      draftState.processData.transactionTypes = [];
    }
    if (!draftState.entities.transactionTypesMap) {
      draftState.entities.transactionTypesMap = {};
    }

    draftState.processData.transactionTypes = [
      ...draftState.processData.transactionTypes,
      addServicingRequestInfo.id,
    ];
    draftState.entities.transactionTypesMap[addServicingRequestInfo.id] = addServicingRequestInfo;
  });
