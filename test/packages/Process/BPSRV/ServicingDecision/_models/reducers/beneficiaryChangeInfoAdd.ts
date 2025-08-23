/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { findSubTypeCodeByTransactionType } from 'process/BPSRV/common/findSubTypeCodeByTransactionType';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;

    if (!draftState.entities.transactionTypesMap[transactionId]?.beneficiaryChange) {
      lodash.set(draftState.entities.transactionTypesMap[transactionId], 'beneficiaryChange', {
        subTypeCode: findSubTypeCodeByTransactionType(
          draftState.transactionTypeCodeMap,
          'SRV009',
          /Beneficiary/gi,
          'SRV_SUB006'
        ),
        policyId: draftState.processData.mainPolicyId,
        beneficiaryList: [],
      });
    }
    if (!draftState.entities.transactionTypesMap[transactionId]?.beneficiaryChange?.beneficiaryList) {
      draftState.entities.transactionTypesMap[transactionId].beneficiaryChange.beneficiaryList = [];
    }
    draftState.entities.transactionTypesMap[transactionId].beneficiaryChange.beneficiaryList.push({
      id: uuidv4(),
    });
  });
