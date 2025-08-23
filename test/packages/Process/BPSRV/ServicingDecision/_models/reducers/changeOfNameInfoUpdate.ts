/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { findSubTypeCodeByTransactionType } from 'process/BPSRV/common/findSubTypeCodeByTransactionType';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, changedFields } = payload;
    if (!draftState.entities.transactionTypesMap[transactionId].nameChange) {
      draftState.entities.transactionTypesMap[transactionId].nameChange = {};
    }
    draftState.entities.transactionTypesMap[transactionId].nameChange = {
      ...draftState.entities.transactionTypesMap[transactionId].nameChange,
      ...changedFields,
      subTypeCode: findSubTypeCodeByTransactionType(
        draftState.transactionTypeCodeMap,
        'SRV005',
        /name/gi,
        'SRV_SUB005'
      ),
      policyId: draftState.processData.mainPolicyId,
    };
  });
