/* eslint-disable no-param-reassign */
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import { findSubTypeCodeByTransactionType } from 'process/GeneralPOS/common/utils';

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
    const transactionTypeCodeMap = draftState.transactionTypeCodeMap;
    const cftFlag =
      transactionTypeCodeMap?.[formUtils.queryValue(addServicingRequestInfo.transactionTypes)]?.[0]
        ?.cftFlag;
    draftState.processData.cftFlag = cftFlag;

    draftState.entities.transactionTypesMap[addServicingRequestInfo.id] = {
      ...addServicingRequestInfo,
      subTransactionTypeCode: findSubTypeCodeByTransactionType(
        draftState.transactionTypeCodeMap,
        formUtils.queryValue(addServicingRequestInfo.transactionTypeCode),
        undefined,
        undefined
      ),
    };
  });
