/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { findSubTypeCodeByTransactionType } from 'process/BPSRV/common/findSubTypeCodeByTransactionType';

export default (state: any, { payload, validating }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, id, changedFields } = payload;
    const index = draftState.entities.transactionTypesMap[
      transactionId
    ].beneficiaryChange.beneficiaryList.findIndex((item: any) => item.id === id);

    draftState.entities.transactionTypesMap[transactionId].beneficiaryChange.beneficiaryList[
      index
    ] = {
      ...draftState.entities.transactionTypesMap[transactionId].beneficiaryChange.beneficiaryList[
        index
      ],
      ...changedFields,
      subTypeCode: findSubTypeCodeByTransactionType(
        draftState.transactionTypeCodeMap,
        'SRV009',
        /Beneficiary/gi,
        'SRV_SUB006'
      ),
      policyId: draftState.processData.mainPolicyId,
    };
  });
